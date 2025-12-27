const BACKEND_URL = import.meta.env.VITE_REACT_APP_BACKEND_URL || process.env.REACT_APP_BACKEND_URL;

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
  const response = await fetch(`${BACKEND_URL}/api/send-sms`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'Failed to send SMS');
  }
  
  return response.json();
};

export const sendEmail = async (data: EmailData) => {
  const response = await fetch(`${BACKEND_URL}/api/send-email`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'Failed to send email');
  }
  
  return response.json();
};
