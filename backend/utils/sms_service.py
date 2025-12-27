import os
import re
import logging
from typing import Dict
from twilio.rest import Client
from twilio.base.exceptions import TwilioRestException

logger = logging.getLogger(__name__)


def validate_phone_number(phone: str) -> bool:
    """
    Validate phone number format.
    Accepts international format with country code.
    """
    if not phone:
        return False
    
    # Remove spaces, dashes, parentheses
    cleaned = re.sub(r'[\s\-\(\)]', '', phone)
    
    # Check if it starts with + and has 10-15 digits
    pattern = r'^\+?[1-9]\d{9,14}$'
    return bool(re.match(pattern, cleaned))


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
        if not validate_phone_number(phone):
            logger.warning(f"Invalid phone number format: {phone}")
            return {
                "success": False,
                "error": "Invalid phone number format"
            }
        
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
        
        # Send SMS
        message = client.messages.create(
            body=message_body,
            from_=from_number,
            to=phone
        )
        
        logger.info(f"SMS sent successfully to {phone}, SID: {message.sid}")
        
        return {
            "success": True,
            "message": "SMS sent successfully",
            "phone": phone,
            "sid": message.sid
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
