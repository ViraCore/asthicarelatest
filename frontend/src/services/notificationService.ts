import * as React from "react";
import { toast } from "@/hooks/use-toast";
import { showEmailPreview } from "@/components/ui/emailPreviewModal";

const BACKEND_URL = import.meta.env.REACT_APP_BACKEND_URL || import.meta.env.VITE_REACT_APP_BACKEND_URL;

// Debug: Log backend URL on load
console.log('🔗 Backend URL:', BACKEND_URL);

export interface SMSData {
  phone: string;
  patient_name: string;
  appointment_date: string;
}

export interface EmailData {
  email: string;
  patient_name: string;
  appointment_date: string;
}

export const sendSMS = async (data: SMSData) => {
  console.log('📱 Sending SMS to:', `${BACKEND_URL}/api/send-sms`);
  console.log('📱 SMS Data:', data);
  
  // Generate local SMS preview so popup works without backend
  const localSmsBody = `Asthi Care Appointment Reminder\n\nDear ${data.patient_name},\n\nYour follow-up appointment is scheduled for:\n${data.appointment_date} at 10:00 AM\n\nPlease arrive 10 minutes early. Reply STOP to unsubscribe.\n\n- Asthi Care Team`;
  try {
    const smsNode = React.createElement('pre', { style: { whiteSpace: 'pre-wrap', margin: 0 } }, localSmsBody);
    toast({ title: 'SMS Preview', description: smsNode });
  } catch (err) {
    console.warn('Unable to render local SMS preview in toast:', err);
  }
  
  const response = await fetch(`${BACKEND_URL}/api/send-sms`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  
  console.log('📱 SMS Response Status:', response.status);
  
  if (!response.ok) {
    const error = await response.json();
    console.error('❌ SMS Error:', error);
    throw new Error(error.detail || 'Failed to send SMS');
  }
  
  const result = await response.json();
  console.log('✅ SMS Success:', result);
  // If backend returned the SMS message body, show it in a toast popup
  if (result?.message_body) {
    try {
      const smsNode = React.createElement('pre', { style: { whiteSpace: 'pre-wrap', margin: 0 } }, result.message_body);
      toast({ title: 'SMS Preview', description: smsNode });
    } catch (err) {
      console.warn('Unable to render SMS preview in toast:', err);
    }
  }
  
  return result;
};

export const sendEmail = async (data: EmailData) => {
  console.log('📧 Sending Email to:', `${BACKEND_URL}/api/send-email`);
  console.log('📧 Email Data:', data);

  // Generate local email HTML preview so popup works without backend
  const localEmailHtml = `<!DOCTYPE html><html><body><div style="font-family:Arial,sans-serif;padding:20px;"><h2>Follow-Up Reminder</h2><p>Dear ${data.patient_name},</p><p>Your follow-up appointment is scheduled for tomorrow!</p><div style="background:#fff;padding:15px;border-left:4px solid #4F46E5;margin:16px 0;border-radius:4px;"><h3 style="margin-top:0;">Appointment Details</h3><p><strong>Date:</strong> ${data.appointment_date}</p><p><strong>Time:</strong> 10:00 AM</p><p><strong>Location:</strong> Asthi Care Clinic</p></div><p><strong>Important Reminders:</strong></p><ul><li>Please arrive 10 minutes early for check-in</li><li>Bring any recent medical reports or test results</li><li>Fasting not required</li></ul><p>If you need to reschedule, please contact us at least 24 hours in advance.</p></div></body></html>`;
  try {
    const emailNode = React.createElement('div', { dangerouslySetInnerHTML: { __html: localEmailHtml } });
    toast({ title: 'Email Preview', description: emailNode });
    showEmailPreview(localEmailHtml, 'Email Preview');
  } catch (err) {
    console.warn('Unable to render local email preview in toast:', err);
  }
  
  const response = await fetch(`${BACKEND_URL}/api/send-email`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  
  console.log('📧 Email Response Status:', response.status);
  
  if (!response.ok) {
    const error = await response.json();
    console.error('❌ Email Error:', error);
    throw new Error(error.detail || 'Failed to send email');
  }
  
  const result = await response.json();
  console.log('✅ Email Success:', result);
  
  // If backend returned the generated HTML for the email, show it in a toast popup
  if (result?.email_html) {
    try {
      const emailNode = React.createElement('div', { dangerouslySetInnerHTML: { __html: result.email_html } });
      toast({
        title: 'Email Preview',
        description: emailNode,
      });
      // Also display centered modal preview
      showEmailPreview(result.email_html, 'Email Preview');
    } catch (err) {
      console.warn('Unable to render email preview in toast:', err);
    }
  }
  
  return result;
};
