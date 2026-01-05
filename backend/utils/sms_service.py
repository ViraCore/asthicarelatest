import os
import re
import logging
from typing import Dict
from twilio.rest import Client
from twilio.base.exceptions import TwilioRestException

logger = logging.getLogger(__name__)


def normalize_phone_number(phone: str) -> str:
    """
    Normalize phone number to E.164 format required by Twilio.
    Adds '+' prefix if missing.
    
    Args:
        phone: Phone number string
        
    Returns:
        Phone number in E.164 format (with + prefix)
    """
    if not phone:
        return phone
    
    # Remove spaces, dashes, parentheses
    cleaned = re.sub(r'[\s\-\(\)]', '', phone)
    
    # Add '+' prefix if not present
    if not cleaned.startswith('+'):
        cleaned = '+' + cleaned
    
    return cleaned


def validate_phone_number(phone: str) -> tuple[bool, str]:
    """
    Validate phone number format with detailed error messages.
    Accepts international format with country code.
    
    Returns:
        Tuple of (is_valid, error_message)
    """
    if not phone:
        return False, "Phone number is required"
    
    # Remove spaces, dashes, parentheses
    cleaned = re.sub(r'[\s\-\(\)]', '', phone)
    
    # Remove + for digit counting
    digits_only = cleaned.lstrip('+')
    
    # Check basic format
    if not re.match(r'^\+?[1-9]\d{9,14}$', cleaned):
        return False, "Phone number must be in international format with country code (10-15 digits)"
    
    # Specific validation for common country codes
    if digits_only.startswith('966'):  # Saudi Arabia
        if len(digits_only) != 12:  # 966 + 9 digits
            return False, f"Saudi Arabian numbers require 9 digits after country code (966). Your number has {len(digits_only) - 3} digits. Example: +966501234567"
        if digits_only[3] not in ['5', '1']:  # Mobile or landline
            return False, "Saudi Arabian numbers should start with 5 (mobile) or 1 (landline) after country code"
    
    elif digits_only.startswith('91'):  # India
        if len(digits_only) != 12:  # 91 + 10 digits
            return False, f"Indian numbers require 10 digits after country code (91). Your number has {len(digits_only) - 2} digits. Example: +919876543210"
    
    elif digits_only.startswith('1'):  # US/Canada
        if len(digits_only) != 11:  # 1 + 10 digits
            return False, f"US/Canadian numbers require 10 digits after country code (1). Your number has {len(digits_only) - 1} digits. Example: +14155551234"
    
    return True, ""


def send_sms(phone: str, patient_name: str, appointment_date: str) -> Dict:
    """
    Send SMS notification via Twilio.
    
    Args:
        phone: Recipient phone number in international format
        patient_name: Patient's full name
        appointment_date: Formatted appointment date string
        
    Returns:
        Dict with success status and message
    """
    try:
        # Validate phone number
        is_valid, error_message = validate_phone_number(phone)
        if not is_valid:
            logger.warning(f"Invalid phone number format: {phone} - {error_message}")
            return {
                "success": False,
                "error": error_message
            }
        
        # Normalize phone number to E.164 format (add + if missing)
        normalized_phone = normalize_phone_number(phone)
        logger.info(f"Normalized phone number from {phone} to {normalized_phone}")
        
        # Load Twilio credentials from environment
        account_sid = os.environ.get('TWILIO_ACCOUNT_SID')
        auth_token = os.environ.get('TWILIO_AUTH_TOKEN')
        from_number = os.environ.get('TWILIO_PHONE_NUMBER')
        
        if not all([account_sid, auth_token, from_number]):
            logger.error("Missing Twilio credentials in environment variables")
            return {
                "success": False,
                "error": "SMS service configuration error"
            }
        
        # Initialize Twilio client
        client = Client(account_sid, auth_token)
        
        # Prepare message
        message_body = f"""Asthi Care Appointment Reminder

Dear {patient_name},

Your follow-up appointment is scheduled for:
{appointment_date} at 10:00 AM

Please arrive 10 minutes early. Reply STOP to unsubscribe.

- Asthi Care Team"""
        
        # Send SMS using normalized phone number
        logger.info(f"Attempting to send SMS - From: {from_number}, To: {normalized_phone}")
        message = client.messages.create(
            body=message_body,
            from_=from_number,
            to=normalized_phone
        )
        
        logger.info(f"SMS sent successfully to {normalized_phone}, SID: {message.sid}")

        return {
            "success": True,
            "message": "SMS sent successfully",
            "phone": normalized_phone,
            "sid": message.sid,
            "message_body": message_body,
        }
        
    except TwilioRestException as e:
        logger.error(f"Twilio error sending SMS to {phone}: {str(e)}")
        return {
            "success": False,
            "error": "Failed to send SMS. Please check phone number."
        }
        
    except Exception as e:
        logger.error(f"Unexpected error sending SMS to {phone}: {str(e)}")
        return {
            "success": False,
            "error": "Failed to send SMS. Please try again."
        }
        
