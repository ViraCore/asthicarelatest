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
  return result;
};

export const sendEmail = async (data: EmailData) => {
  console.log('📧 Sending Email to:', `${BACKEND_URL}/api/send-email`);
  console.log('📧 Email Data:', data);
  
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
  return result;
};
