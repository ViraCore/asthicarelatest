# SMS & Email Notification System - Implementation Plan

## 🎯 Project Overview

**Objective:** Integrate secure SMS and Email notification system into the Asthi Care Follow-Up page.

**Key Requirements:**
- Send notifications when patients confirm their notification preferences
- Support 3 options: Email Only, Phone Only, or Both
- Use Twilio SMS API for reliable SMS delivery
- Use SendGrid for email notifications
- All API keys secured in backend `.env` file
- Zero secrets exposed to frontend

---

## 🏗️ Architecture Overview

```
┌──────────────────────────────────────────────────────────────┐
│                    FRONTEND (React)                          │
│  FollowUp.tsx - User selects notification preference        │
│  ❌ NO API KEYS OR SECRETS                                   │
└────────────────────────┬─────────────────────────────────────┘
                         │
                         │ HTTPS API Calls
                         │
┌────────────────────────▼─────────────────────────────────────┐
│              BACKEND (FastAPI - Python)                      │
│  server.py - API Endpoints:                                  │
│  • POST /api/send-sms                                        │
│  • POST /api/send-email                                      │
│                                                               │
│  ✅ Environment Variables (.env):                            │
│  • TWILIO_ACCOUNT_SID                                        │
│  • TWILIO_AUTH_TOKEN                                         │
│  • TWILIO_PHONE_NUMBER                                       │
│  • SENDGRID_API_KEY                                          │
│  • SENDGRID_FROM_EMAIL                                       │
│                                                               │
│  Features:                                                    │
│  • Phone/Email validation                                    │
│  • Rate limiting (prevent abuse)                             │
│  • Error handling                                            │
│  • Async SMS/Email sending                                   │
└────────┬─────────────────────────┬─────────────────────────┘
         │                         │
         │                         │
┌────────▼──────────┐     ┌───────▼──────────┐
│   Twilio SMS      │     │    SendGrid      │
│   API (Cloud)     │     │    Email API     │
│                   │     │                  │
└───────────────────┘     └──────────────────┘
         │                         │
         │                         │
         ▼                         ▼
┌──────────────────────────────────────────┐
│         User receives notification       │
│         (SMS and/or Email)               │
└──────────────────────────────────────────┘
```

---

## 📦 Phase 1: Backend Environment & Dependencies Setup

**Estimated Time:** 5-6 credits

### Tasks:

#### 1.1 Add Environment Variables to `backend/.env`

Add the following variables (you'll fill in actual values):

```env
# ============================================
# Twilio SMS Configuration
# ============================================
# Get these from: https://console.twilio.com/
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_twilio_auth_token_here
TWILIO_PHONE_NUMBER=+1234567890  # Your Twilio phone number

# ============================================
# SendGrid Configuration
# ============================================
# Get this from: https://app.sendgrid.com/settings/api_keys
SENDGRID_API_KEY=SG.your_sendgrid_api_key_here
SENDGRID_FROM_EMAIL=noreply@asthicare.com
SENDGRID_FROM_NAME=Asthi Care

# ============================================
# Rate Limiting (Optional - for spam prevention)
# ============================================
SMS_RATE_LIMIT=5  # Max SMS per hour per user
EMAIL_RATE_LIMIT=10  # Max emails per hour per user
```

#### 1.2 Update `backend/requirements.txt`

Add these dependencies:

```txt
twilio==9.0.4           # Twilio Python SDK for SMS
sendgrid==6.11.0        # SendGrid Python SDK
slowapi==0.1.9          # Rate limiting middleware
python-dotenv==1.0.1    # Already present, but ensure it's there
```

#### 1.3 Install Dependencies

```bash
cd /app/backend
pip install -r requirements.txt
```

### Deliverables:
- ✅ `.env` file updated with placeholder variables
- ✅ `requirements.txt` updated
- ✅ Dependencies installed

### Security Checklist:
- [ ] `.env` file is in `.gitignore`
- [ ] No API keys in code
- [ ] All secrets loaded via `os.environ.get()`
- [ ] Twilio credentials secured in backend only

---

## 📱 Phase 2: Backend SMS Endpoint

**Estimated Time:** 5-6 credits

### Tasks:

#### 2.1 Create SMS Utility Functions

Create file: `backend/utils/sms_service.py`

**Functions:**
- `validate_phone_number(phone: str) -> bool`
- `send_sms(phone: str, message: str) -> dict`
- Use Twilio Python SDK for SMS sending
- Error handling and logging

**Twilio Integration:**
```python
from twilio.rest import Client

# Initialize Twilio client
client = Client(account_sid, auth_token)

# Send SMS
message = client.messages.create(
    body="Your message here",
    from_=twilio_phone_number,
    to=recipient_phone_number
)
```

#### 2.2 Add SMS Endpoint to `backend/server.py`

**Endpoint:** `POST /api/send-sms`

**Request Body:**
```json
{
  "phone": "+1234567890",
  "patient_name": "John Doe",
  "appointment_date": "Monday, January 20, 2025"
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "SMS sent successfully",
  "phone": "+1234567890"
}
```

**Response (Error):**
```json
{
  "success": false,
  "error": "Invalid phone number format"
}
```

#### 2.3 Implement Rate Limiting

Use `slowapi` to limit SMS requests:
- Max 5 SMS per hour per unique phone number
- Return 429 status if limit exceeded

#### 2.4 Message Template

```
Asthi Care Appointment Reminder

Dear [Patient Name],

Your follow-up appointment is scheduled for:
[Date] at 10:00 AM

Please arrive 10 minutes early. Reply STOP to unsubscribe.

- Asthi Care Team
```

### Deliverables:
- ✅ `sms_service.py` utility file created
- ✅ `/api/send-sms` endpoint implemented
- ✅ Phone validation logic
- ✅ Rate limiting configured
- ✅ Error handling complete

### Security Checklist:
- [ ] API keys loaded from environment only
- [ ] No hardcoded credentials
- [ ] Rate limiting active
- [ ] Input validation (phone number)
- [ ] Error messages don't expose internals

---

## 📧 Phase 3: Backend Email Endpoint

**Estimated Time:** 5-6 credits

### Tasks:

#### 3.1 Create Email Utility Functions

Create file: `backend/utils/email_service.py`

**Functions:**
- `validate_email(email: str) -> bool`
- `send_email(to_email: str, subject: str, content: str) -> dict`
- Use SendGrid Python SDK
- Error handling and logging

#### 3.2 Add Email Endpoint to `backend/server.py`

**Endpoint:** `POST /api/send-email`

**Request Body:**
```json
{
  "email": "patient@example.com",
  "patient_name": "John Doe",
  "appointment_date": "Monday, January 20, 2025"
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Email sent successfully",
  "email": "patient@example.com"
}
```

**Response (Error):**
```json
{
  "success": false,
  "error": "Invalid email format"
}
```

#### 3.3 Email Template (HTML)

**Subject:** `Asthi Care - Appointment Confirmation`

**HTML Content:**
```html
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #4F46E5; color: white; padding: 20px; text-align: center; }
    .content { padding: 30px; background: #f9fafb; }
    .appointment-box { background: white; padding: 20px; border-left: 4px solid #4F46E5; }
    .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Asthi Care</h1>
    </div>
    <div class="content">
      <h2>Appointment Confirmation</h2>
      <p>Dear [Patient Name],</p>
      <p>Your follow-up appointment has been confirmed!</p>
      
      <div class="appointment-box">
        <h3>Appointment Details</h3>
        <p><strong>Date:</strong> [Date]</p>
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
</html>
```

#### 3.4 Implement Rate Limiting

Use `slowapi` to limit email requests:
- Max 10 emails per hour per email address
- Return 429 status if limit exceeded

### Deliverables:
- ✅ `email_service.py` utility file created
- ✅ `/api/send-email` endpoint implemented
- ✅ Email validation logic
- ✅ HTML email template
- ✅ Rate limiting configured
- ✅ Error handling complete

### Security Checklist:
- [ ] SendGrid API key from environment only
- [ ] No hardcoded credentials
- [ ] Rate limiting active
- [ ] Input validation (email format)
- [ ] SPF/DKIM configured in SendGrid (user responsibility)

---

## 🎨 Phase 4: Frontend Integration

**Estimated Time:** 5-6 credits

### Tasks:

#### 4.1 Create API Service Functions

Create file: `frontend/src/services/notificationService.ts`

```typescript
const BACKEND_URL = import.meta.env.REACT_APP_BACKEND_URL || process.env.REACT_APP_BACKEND_URL;

export const sendSMS = async (data: {
  phone: string;
  patient_name: string;
  appointment_date: string;
}) => {
  const response = await fetch(`${BACKEND_URL}/api/send-sms`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  
  if (!response.ok) {
    throw new Error('Failed to send SMS');
  }
  
  return response.json();
};

export const sendEmail = async (data: {
  email: string;
  patient_name: string;
  appointment_date: string;
}) => {
  const response = await fetch(`${BACKEND_URL}/api/send-email`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  
  if (!response.ok) {
    throw new Error('Failed to send email');
  }
  
  return response.json();
};
```

#### 4.2 Update `handleConfirmPreferences` in `FollowUp.tsx`

**Logic:**
```typescript
const handleConfirmPreferences = async () => {
  if (!notificationPreference) return;
  
  setIsConfirmingPreference(true);
  
  try {
    const appointmentDateFormatted = format(appointmentDate, "EEEE, MMMM d, yyyy");
    
    // Prepare notification data
    const smsData = {
      phone: patientPhone,
      patient_name: patientName,
      appointment_date: appointmentDateFormatted,
    };
    
    const emailData = {
      email: patientEmail,
      patient_name: patientName,
      appointment_date: appointmentDateFormatted,
    };
    
    // Send notifications based on preference
    if (notificationPreference === 'email') {
      await sendEmail(emailData);
    } else if (notificationPreference === 'phone') {
      await sendSMS(smsData);
    } else if (notificationPreference === 'both') {
      // Send both in parallel
      await Promise.all([
        sendEmail(emailData),
        sendSMS(smsData)
      ]);
    }
    
    toast({
      title: "Success!",
      description: text.preferencesSuccess,
      variant: "default",
    });
  } catch (error) {
    toast({
      title: "Error",
      description: "Failed to send notification. Please try again.",
      variant: "destructive",
    });
  } finally {
    setIsConfirmingPreference(false);
  }
};
```

#### 4.3 Update Translations

Add error messages to translations in `FollowUp.tsx`:

```typescript
// English
notificationError: "Failed to send notification. Please try again.",
emailSentSuccess: "Email notification sent successfully!",
smsSentSuccess: "SMS notification sent successfully!",
bothSentSuccess: "Email and SMS notifications sent successfully!",

// Hindi
notificationError: "सूचना भेजने में विफल। कृपया पुनः प्रयास करें।",
emailSentSuccess: "ईमेल सूचना सफलतापूर्वक भेजी गई!",
smsSentSuccess: "SMS सूचना सफलतापूर्वक भेजी गई!",
bothSentSuccess: "ईमेल और SMS सूचनाएं सफलतापूर्वक भेजी गईं!",
```

### Deliverables:
- ✅ `notificationService.ts` created
- ✅ Frontend calls backend API only
- ✅ `handleConfirmPreferences` updated
- ✅ Parallel sending for "both" option
- ✅ Loading states handled
- ✅ Error handling with user-friendly messages
- ✅ Success feedback with toasts

### Security Checklist:
- [ ] ❌ NO API keys in frontend code
- [ ] ❌ NO direct calls to SMS gateway or SendGrid
- [ ] ✅ Only calls to backend `/api/send-sms` and `/api/send-email`
- [ ] ✅ Uses `REACT_APP_BACKEND_URL` environment variable
- [ ] ✅ No sensitive data in frontend state

---

## ✅ Phase 5: Testing & Validation

**Estimated Time:** 5-6 credits

### Tasks:

#### 5.1 Backend Testing (Manual)

**Test SMS Endpoint:**
```bash
curl -X POST http://localhost:8001/api/send-sms \
  -H "Content-Type: application/json" \
  -d '{
    "phone": "+1234567890",
    "patient_name": "Test User",
    "appointment_date": "Monday, January 20, 2025"
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "message": "SMS sent successfully",
  "phone": "+1234567890"
}
```

**Test Email Endpoint:**
```bash
curl -X POST http://localhost:8001/api/send-email \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "patient_name": "Test User",
    "appointment_date": "Monday, January 20, 2025"
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Email sent successfully",
  "email": "test@example.com"
}
```

#### 5.2 Frontend Testing (UI Flow)

**Test Scenarios:**

1. **Email Only:**
   - Select "Email Only" option
   - Click "Confirm Preferences"
   - Verify email received
   - Check success toast appears

2. **Phone Only:**
   - Select "Phone Only" option
   - Click "Confirm Preferences"
   - Verify SMS received on phone
   - Check success toast appears

3. **Both Email and Phone:**
   - Select "Both Email and Phone" option
   - Click "Confirm Preferences"
   - Verify both email AND SMS received
   - Check success toast appears

4. **Error Handling:**
   - Test with invalid phone number
   - Test with invalid email
   - Test with backend down (simulate)
   - Verify error toasts appear

5. **Rate Limiting:**
   - Send multiple SMS rapidly (>5 in 1 hour)
   - Verify rate limit error
   - Send multiple emails rapidly (>10 in 1 hour)
   - Verify rate limit error

#### 5.3 Security Validation

**Checks:**
- [ ] Open browser DevTools → Network tab
- [ ] Confirm preferences and watch network requests
- [ ] Verify NO API keys in request headers
- [ ] Verify NO API keys in request body
- [ ] Verify NO API keys in response
- [ ] Check frontend source code (View Page Source)
- [ ] Confirm NO API keys visible anywhere

**Backend Logs Check:**
```bash
tail -f /var/log/supervisor/backend.*.log | grep -i "api_key\|secret"
```
Should return NOTHING (no API keys in logs)

#### 5.4 Update `test_result.md`

Add testing data:

```yaml
user_problem_statement: "Integrate SMS and Email notifications for follow-up appointment confirmations"

backend:
  - task: "Twilio SMS Integration"
    implemented: true
    working: true  # Update after testing
    file: "backend/server.py, backend/utils/sms_service.py"
    stuck_count: 0
    priority: "high"
    needs_retesting: false
    status_history:
      - working: true
        agent: "main"
        comment: "Twilio SMS endpoint created with rate limiting and validation"
  
  - task: "SendGrid Email Integration"
    implemented: true
    working: true  # Update after testing
    file: "backend/server.py, backend/utils/email_service.py"
    stuck_count: 0
    priority: "high"
    needs_retesting: false
    status_history:
      - working: true
        agent: "main"
        comment: "Email endpoint created with HTML template and rate limiting"

frontend:
  - task: "Notification Service Integration"
    implemented: true
    working: true  # Update after testing
    file: "frontend/src/pages/FollowUp.tsx, frontend/src/services/notificationService.ts"
    stuck_count: 0
    priority: "high"
    needs_retesting: false
    status_history:
      - working: true
        agent: "main"
        comment: "Frontend calls backend API for SMS/email sending"

metadata:
  created_by: "main_agent"
  version: "1.0"
  test_sequence: 1
  run_ui: true

test_plan:
  current_focus:
    - "SMS sending functionality"
    - "Email sending functionality"
    - "Combined (both) sending functionality"
  stuck_tasks: []
  test_all: true
  test_priority: "high_first"

agent_communication:
  - agent: "main"
    message: "Twilio SMS and SendGrid Email notification system implemented. All API keys secured in backend .env. Ready for testing."
```

### Deliverables:
- ✅ Backend endpoints tested with curl
- ✅ Frontend UI tested in browser
- ✅ All 3 notification options work correctly
- ✅ Error handling verified
- ✅ Rate limiting confirmed
- ✅ Security audit passed (no exposed keys)
- ✅ `test_result.md` updated

---

## 📁 Expected File Structure (After Implementation)

```
/app/
├── backend/
│   ├── .env                    # ✅ Contains all API keys (YOU will add values)
│   ├── requirements.txt        # ✅ Updated with new dependencies
│   ├── server.py              # ✅ Contains /api/send-sms & /api/send-email endpoints
│   └── utils/
│       ├── sms_service.py     # ✅ SMS gateway integration logic
│       └── email_service.py   # ✅ SendGrid integration logic
│
├── frontend/
│   ├── .env                   # ✅ Only contains REACT_APP_BACKEND_URL
│   ├── src/
│   │   ├── pages/
│   │   │   └── FollowUp.tsx   # ✅ Updated with notification sending logic
│   │   └── services/
│   │       └── notificationService.ts  # ✅ API service functions
│
├── test_result.md             # ✅ Updated with testing data
└── SMS_EMAIL_NOTIFICATION_PLAN.md  # ✅ This file
```

---

## 🔒 Security Best Practices Summary

### ✅ DO:
1. Store ALL API keys in `backend/.env`
2. Load environment variables using `os.environ.get()`
3. Use backend as API gateway (proxy pattern)
4. Validate all inputs (phone, email)
5. Implement rate limiting
6. Use HTTPS for all API calls
7. Log errors (but NEVER log API keys)
8. Keep `.env` in `.gitignore`

### ❌ DON'T:
1. NEVER put API keys in frontend code
2. NEVER use `import.meta.env` for SMS/Email keys
3. NEVER expose internal errors to users
4. NEVER log sensitive data
5. NEVER commit `.env` to Git
6. NEVER hardcode credentials
7. NEVER allow direct frontend → SMS gateway calls
8. NEVER allow direct frontend → SendGrid calls

---

## 📊 Data Flow Diagram

```
User Action: Click "Confirm Preferences"
                    │
                    ▼
┌─────────────────────────────────────────────┐
│  Frontend: handleConfirmPreferences()       │
│  • Collects: name, email, phone, date       │
│  • Determines preference: email/phone/both  │
└─────────────────┬───────────────────────────┘
                  │
                  ▼
         ┌────────────────────┐
         │   notificationPreference?   │
         └────┬────────┬──────┴────┘
              │        │           │
    ┌─────────┘        │           └─────────┐
    │                  │                     │
    ▼                  ▼                     ▼
┌──────────┐    ┌────────────┐       ┌────────────┐
│  "email" │    │   "phone"  │       │   "both"   │
└────┬─────┘    └─────┬──────┘       └─────┬──────┘
     │                │                     │
     ▼                ▼                     ▼
┌─────────────┐  ┌─────────────┐   ┌──────────────────┐
│ sendEmail() │  │  sendSMS()  │   │ Promise.all([    │
│             │  │             │   │   sendEmail(),   │
│             │  │             │   │   sendSMS()      │
│             │  │             │   │ ])               │
└──────┬──────┘  └──────┬──────┘   └────────┬─────────┘
       │                │                   │
       │                │                   │
       └────────────────┴───────────────────┘
                        │
                        ▼
        ┌───────────────────────────────┐
        │  Backend API (FastAPI)        │
        │  POST /api/send-email         │
        │  POST /api/send-sms           │
        │                               │
        │  • Validates input            │
        │  • Checks rate limit          │
        │  • Loads API keys from .env   │
        └──────────┬────────────────────┘
                   │
          ┌────────┴────────┐
          │                 │
          ▼                 ▼
┌──────────────────┐  ┌──────────────────┐
│  email_service.py│  │  sms_service.py  │
│  • Validates     │  │  • Validates     │
│  • Formats HTML  │  │  • Formats msg   │
│  • Calls SendGrid│  │  • Calls Gateway │
└────────┬─────────┘  └────────┬─────────┘
         │                     │
         ▼                     ▼
┌──────────────────┐  ┌──────────────────┐
│  SendGrid API    │  │   Twilio SMS     │
│  (Email Service) │  │   API (Cloud)    │
└────────┬─────────┘  └────────┬─────────┘
         │                     │
         ▼                     ▼
┌──────────────────────────────────────────┐
│     User receives notification(s)        │
│     ✉️ Email Inbox                       │
│     📱 SMS on Phone                      │
└──────────────────────────────────────────┘
         │
         ▼
┌──────────────────────────────────────────┐
│  Frontend: Success Toast Displayed       │
│  "Your notification preferences have     │
│   been saved successfully!"              │
└──────────────────────────────────────────┘
```

---

## 🎯 API Endpoint Specifications

### 1. Send SMS Endpoint

**URL:** `POST /api/send-sms`

**Request Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "phone": "+1234567890",
  "patient_name": "John Doe",
  "appointment_date": "Monday, January 20, 2025"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "SMS sent successfully",
  "phone": "+1234567890"
}
```

**Error Responses:**

**400 Bad Request:**
```json
{
  "success": false,
  "error": "Invalid phone number format"
}
```

**429 Too Many Requests:**
```json
{
  "success": false,
  "error": "Rate limit exceeded. Please try again later."
}
```

**500 Internal Server Error:**
```json
{
  "success": false,
  "error": "Failed to send SMS. Please try again."
}
```

---

### 2. Send Email Endpoint

**URL:** `POST /api/send-email`

**Request Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "email": "patient@example.com",
  "patient_name": "John Doe",
  "appointment_date": "Monday, January 20, 2025"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Email sent successfully",
  "email": "patient@example.com"
}
```

**Error Responses:**

**400 Bad Request:**
```json
{
  "success": false,
  "error": "Invalid email format"
}
```

**429 Too Many Requests:**
```json
{
  "success": false,
  "error": "Rate limit exceeded. Please try again later."
}
```

**500 Internal Server Error:**
```json
{
  "success": false,
  "error": "Failed to send email. Please try again."
}
```

---

## 🧪 Testing Checklist

### Backend Testing:
- [ ] SMS endpoint responds correctly with valid data
- [ ] Email endpoint responds correctly with valid data
- [ ] Invalid phone number returns 400 error
- [ ] Invalid email returns 400 error
- [ ] Rate limiting triggers after threshold
- [ ] Environment variables load correctly
- [ ] Error handling works for gateway failures
- [ ] Logs don't contain API keys

### Frontend Testing:
- [ ] "Email Only" sends email successfully
- [ ] "Phone Only" sends SMS successfully
- [ ] "Both" sends both email and SMS
- [ ] Success toast appears on successful send
- [ ] Error toast appears on failure
- [ ] Loading state shows during API call
- [ ] Button is disabled during sending
- [ ] Network tab shows NO API keys in requests

### Integration Testing:
- [ ] Patient receives actual email
- [ ] Patient receives actual SMS
- [ ] Email contains correct appointment details
- [ ] SMS contains correct appointment details
- [ ] HTML email renders correctly
- [ ] SMS is delivered within 30 seconds

### Security Testing:
- [ ] No API keys visible in browser DevTools
- [ ] No API keys in JavaScript source files
- [ ] No API keys in network requests
- [ ] Backend logs don't expose secrets
- [ ] `.env` file is in `.gitignore`
- [ ] Git history doesn't contain API keys

---

## 📝 Environment Variables Reference

### Backend `.env` File:

```env
# ============================================
# EXISTING VARIABLES (Already configured)
# ============================================
MONGO_URL=mongodb://mongodb:27017
DB_NAME=your_database_name
CORS_ORIGINS=*

# ============================================
# NEW: Twilio SMS Configuration
# ============================================
# Get these from: https://console.twilio.com/
# Account SID: Found on Twilio Dashboard
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Auth Token: Found on Twilio Dashboard (keep this secret!)
TWILIO_AUTH_TOKEN=your_actual_twilio_auth_token_here

# Your Twilio phone number (must be verified in Twilio)
# Format: +[country_code][phone_number] (e.g., +11234567890)
TWILIO_PHONE_NUMBER=+1234567890

# ============================================
# NEW: SendGrid Email Configuration
# ============================================
# Get this from: https://app.sendgrid.com/settings/api_keys
SENDGRID_API_KEY=SG.your_actual_sendgrid_api_key_here

# The email address that will appear as sender
SENDGRID_FROM_EMAIL=noreply@asthicare.com

# The name that will appear as sender
SENDGRID_FROM_NAME=Asthi Care

# ============================================
# NEW: Rate Limiting Configuration (Optional)
# ============================================
# Maximum number of SMS per hour per phone number
SMS_RATE_LIMIT=5

# Maximum number of emails per hour per email address
EMAIL_RATE_LIMIT=10
```

### Frontend `.env` File:

```env
# ============================================
# EXISTING VARIABLE (Already configured)
# ============================================
REACT_APP_BACKEND_URL=http://your-backend-url.com

# ❌ DO NOT ADD ANY SMS OR EMAIL API KEYS HERE
# ❌ Frontend .env should ONLY contain REACT_APP_BACKEND_URL
```

---

## 🚀 Ready to Start?

When you're ready to begin implementation:

1. **Phase 1:** Say "Start Phase 1" - Setup environment & dependencies
2. **Phase 2:** Say "Start Phase 2" - Implement SMS endpoint
3. **Phase 3:** Say "Start Phase 3" - Implement Email endpoint
4. **Phase 4:** Say "Start Phase 4" - Frontend integration
5. **Phase 5:** Say "Start Phase 5" - Testing & validation

---

## 📞 Support Resources

### Twilio Setup Guide:

#### Step 1: Create Twilio Account
1. Go to https://www.twilio.com/try-twilio
2. Sign up for a free trial account
3. Verify your email and phone number

#### Step 2: Get Your Credentials
1. Login to https://console.twilio.com/
2. Find your **Account SID** and **Auth Token** on the dashboard
3. Copy these values - you'll add them to `.env`

#### Step 3: Get a Twilio Phone Number
1. In the console, go to **Phone Numbers** > **Manage** > **Buy a number**
2. For trial accounts: You get 1 free phone number
3. Select a number with SMS capability
4. Note: Trial accounts can only send SMS to verified phone numbers

#### Step 4: Verify Test Phone Numbers (Trial Account)
1. Go to **Phone Numbers** > **Manage** > **Verified Caller IDs**
2. Add phone numbers you want to test with
3. Verify them via SMS code

**Twilio Free Trial Includes:**
- $15 USD trial credit
- 1 free phone number
- Can send SMS to verified numbers only
- Upgrade to paid plan to send to any number

### Twilio Resources:
- **Sign Up (Free Trial):** https://www.twilio.com/try-twilio
- **Console Dashboard:** https://console.twilio.com/
- **API Documentation:** https://www.twilio.com/docs/sms
- **Python SDK:** https://www.twilio.com/docs/libraries/python
- **Pricing:** https://www.twilio.com/sms/pricing
- **Free Trial Info:** https://www.twilio.com/docs/usage/tutorials/how-to-use-your-free-trial-account

### SendGrid Resources:
- **API Documentation:** https://docs.sendgrid.com/api-reference
- **Python SDK:** https://github.com/sendgrid/sendgrid-python
- **Email Templates:** https://mc.sendgrid.com/dynamic-templates

### FastAPI Resources:
- **Environment Variables:** https://fastapi.tiangolo.com/advanced/settings/
- **Background Tasks:** https://fastapi.tiangolo.com/tutorial/background-tasks/
- **Rate Limiting:** https://github.com/laurentS/slowapi

---

## ✅ Pre-Implementation Checklist

Before starting Phase 1, ensure you have:

- [ ] Twilio account created (free trial available)
- [ ] Twilio phone number purchased/verified
- [ ] Twilio Account SID and Auth Token ready
- [ ] SendGrid account created
- [ ] SendGrid API key generated (with "Mail Send" permissions)
- [ ] SendGrid sender email verified
- [ ] This implementation plan reviewed
- [ ] Backend and frontend servers running
- [ ] Git repository ready (`.gitignore` configured)

---

## 🎉 Expected Final Result

After completing all 5 phases:

1. User fills check-in form (name, email, phone)
2. User enters dashboard
3. User sees next appointment (7 days from now)
4. User selects notification preference:
   - Email Only
   - Phone Only
   - Both Email and Phone
5. User clicks "Confirm Preferences" button
6. System sends notification via selected channel(s)
7. User receives:
   - Professional email with appointment details (if email selected)
   - SMS with appointment reminder (if phone selected)
   - Both (if both selected)
8. Success toast appears: "Your notification preferences have been saved successfully!"

**All done securely with ZERO API keys exposed to frontend! 🔒**

---

*Last Updated: January 2025*
*Version: 1.0*
