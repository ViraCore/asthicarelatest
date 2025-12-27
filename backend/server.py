from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List, Dict
import uuid
from datetime import datetime
from utils.sms_service import send_sms
from utils.email_service import send_email


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class StatusCheckCreate(BaseModel):
    client_name: str

# Notification Models
class SMSRequest(BaseModel):
    phone: str
    patient_name: str
    appointment_date: str

class EmailRequest(BaseModel):
    email: str
    patient_name: str
    appointment_date: str

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.dict()
    status_obj = StatusCheck(**status_dict)
    _ = await db.status_checks.insert_one(status_obj.dict())
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find().to_list(1000)
    return [StatusCheck(**status_check) for status_check in status_checks]

# SMS Endpoint
@api_router.post("/send-sms")
async def send_sms_notification(request: SMSRequest) -> Dict:
    """
    Send SMS notification to patient.
    """
    try:
        result = send_sms(
            phone=request.phone,
            patient_name=request.patient_name,
            appointment_date=request.appointment_date
        )
        
        if not result.get("success"):
            raise HTTPException(status_code=400, detail=result.get("error", "Failed to send SMS"))
        
        return result
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error in send_sms_notification endpoint: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

# Email Endpoint
@api_router.post("/send-email")
async def send_email_notification(request: EmailRequest) -> Dict:
    """
    Send email notification to patient.
    """
    try:
        result = send_email(
            email=request.email,
            patient_name=request.patient_name,
            appointment_date=request.appointment_date
        )
        
        if not result.get("success"):
            raise HTTPException(status_code=400, detail=result.get("error", "Failed to send email"))
        
        return result
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error in send_email_notification endpoint: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
