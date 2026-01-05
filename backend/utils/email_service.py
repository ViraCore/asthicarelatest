import os
import re
import logging
from typing import Dict
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail, Email, To, Content

logger = logging.getLogger(__name__)


def validate_email(email: str) -> bool:
    """
    Validate email address format.
    """
    if not email:
        return False
    
    # Basic email validation pattern
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return bool(re.match(pattern, email))


def get_email_html_template(patient_name: str, appointment_date: str) -> str:
    """
    Generate HTML email template.
    """
    return f"""<!DOCTYPE html>
<html>
<head>
  <style>
    body {{ font-family: Arial, sans-serif; margin: 0; padding: 0; }}
    .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
    .header {{ background: #4F46E5; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }}
    .content {{ padding: 30px; background: #f9fafb; }}
    .appointment-box {{ background: white; padding: 20px; border-left: 4px solid #4F46E5; margin: 20px 0; border-radius: 4px; }}
    .footer {{ text-align: center; padding: 20px; color: #6b7280; font-size: 12px; }}
    ul {{ line-height: 1.8; }}
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 style="margin: 0;">Asthi Care</h1>
    </div>
    <div class="content">
      <h2>Follow-Up Reminder</h2>
      <p>Dear {patient_name},</p>
      <p>Your follow-up appointment is scheduled for tomorrow!</p>
      
      <div class="appointment-box">
        <h3 style="margin-top: 0;">Appointment Details</h3>
        <p><strong>Date:</strong> {appointment_date}</p>
        <p><strong>Time:</strong> 10:00 AM</p>
        <p><strong>Location:</strong> Asthi Care Clinic</p>
      </div>
      
      <p><strong>Important Reminders:</strong></p>
      <ul>
        <li>Please arrive 10 minutes early for check-in</li>
        <li>Bring any recent medical reports or test results</li>
        <li>Fasting not required</li>
      </ul>
      
      <p>If you need to reschedule, please contact us at least 24 hours in advance.</p>
    </div>
    <div class="footer">
      <p>© 2025 Asthi Care. All rights reserved.</p>
      <p>This is an automated message. Please do not reply to this email.</p>
    </div>
  </div>
</body>
</html>"""


def send_email(email: str, patient_name: str, appointment_date: str) -> Dict:
    """
    Send email notification via SendGrid.
    
    Args:
        email: Recipient email address
        patient_name: Patient's full name
        appointment_date: Formatted appointment date string
        
    Returns:
        Dict with success status and message
    """
    try:
        # Validate email
        if not validate_email(email):
            logger.warning(f"Invalid email format: {email}")
            return {
                "success": False,
                "error": "Invalid email format"
            }
        
        # Load SendGrid credentials from environment
        api_key = os.environ.get('SENDGRID_API_KEY')
        from_email = os.environ.get('SENDGRID_FROM_EMAIL')
        from_name = os.environ.get('SENDGRID_FROM_NAME', 'Asthi Care')
        
        if not all([api_key, from_email]):
            logger.error("Missing SendGrid credentials in environment variables")
            return {
                "success": False,
                "error": "Email service configuration error"
            }
        
        # Create email
        message = Mail(
            from_email=Email(from_email, from_name),
            to_emails=To(email),
            subject='Asthi Care - Appointment Confirmation',
            html_content=Content("text/html", get_email_html_template(patient_name, appointment_date))
        )
        
        # Send email
        sg = SendGridAPIClient(api_key)
        response = sg.send(message)
        
        logger.info(f"Email sent successfully to {email}, Status: {response.status_code}")
        
        email_html = get_email_html_template(patient_name, appointment_date)

        return {
          "success": True,
          "message": "Email sent successfully",
          "email": email,
          "status_code": response.status_code,
          "email_html": email_html,
        }
        
    except Exception as e:
        logger.error(f"Error sending email to {email}: {str(e)}")
        return {
            "success": False,
            "error": "Failed to send email. Please try again."
        }
