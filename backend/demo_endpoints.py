# Demo API Endpoints for RMSS Student Authentication
# This shows how real RMSS database integration would work

from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from typing import Optional, Dict, Any
import uuid
from datetime import datetime, timezone, timedelta
from demo_auth import DemoAuthService

# Create demo router
demo_router = APIRouter(prefix="/api/demo")

# Request/Response Models
class StudentLoginRequest(BaseModel):
    student_id: str
    password: str

class WhatsAppOTPRequest(BaseModel):
    student_id: str
    phone: str

class OTPVerifyRequest(BaseModel):
    student_id: str
    otp: str

class AuthResponse(BaseModel):
    success: bool
    message: str
    session_token: Optional[str] = None
    student_name: Optional[str] = None

class StudentDataRequest(BaseModel):
    session_token: str
    data_type: str  # 'profile', 'fees', 'schedule'

class StudentDataResponse(BaseModel):
    success: bool
    data: Optional[str] = None
    error: Optional[str] = None

# Mock session storage (in real system, use Redis)
DEMO_SESSIONS = {}

@demo_router.post("/login", response_model=AuthResponse)
async def demo_student_login(request: StudentLoginRequest):
    """Demo student login for web widget"""
    try:
        # Verify student credentials
        student_data = DemoAuthService.verify_student_credentials(
            request.student_id, 
            password=request.password
        )
        
        if not student_data:
            return AuthResponse(
                success=False,
                message="Invalid student ID or password. Please try again."
            )
        
        # Create session token
        session_token, token_data = DemoAuthService.create_session_token(request.student_id)
        DEMO_SESSIONS[session_token] = {
            "student_id": request.student_id,
            "student_data": student_data,
            "created": datetime.now(),
            "expires": datetime.now() + timedelta(minutes=30)
        }
        
        return AuthResponse(
            success=True,
            message=f"Welcome back, {student_data['full_name']}!",
            session_token=session_token,
            student_name=student_data['full_name']
        )
        
    except Exception as e:
        return AuthResponse(
            success=False,
            message="Authentication service temporarily unavailable. Please try again."
        )

@demo_router.post("/whatsapp/request-otp", response_model=AuthResponse)
async def demo_request_otp(request: WhatsAppOTPRequest):
    """Demo OTP request for WhatsApp authentication"""
    try:
        # Verify student ID and phone match
        student_data = DemoAuthService.verify_student_credentials(
            request.student_id,
            phone=request.phone
        )
        
        if not student_data:
            return AuthResponse(
                success=False,
                message="Student ID and phone number do not match our records."
            )
        
        # Generate and "send" OTP
        otp = DemoAuthService.generate_otp(request.student_id)
        
        # In real system, send via WhatsApp Business API
        # await send_whatsapp_otp(request.phone, otp)
        
        return AuthResponse(
            success=True,
            message=f"📱 OTP sent to {request.phone[-4:]} (Demo OTP: {otp})\n\nPlease enter the 6-digit code to access your account."
        )
        
    except Exception as e:
        return AuthResponse(
            success=False,
            message="OTP service temporarily unavailable. Please try again."
        )

@demo_router.post("/whatsapp/verify-otp", response_model=AuthResponse) 
async def demo_verify_otp(request: OTPVerifyRequest):
    """Demo OTP verification for WhatsApp"""
    try:
        # Verify OTP
        is_valid = DemoAuthService.verify_otp(request.student_id, request.otp)
        
        if not is_valid:
            return AuthResponse(
                success=False,
                message="❌ Invalid or expired OTP. Please request a new one."
            )
        
        # Get student data
        student_data = DemoAuthService.get_student_data(request.student_id)
        
        # Create authenticated session
        session_token, token_data = DemoAuthService.create_session_token(request.student_id)
        DEMO_SESSIONS[session_token] = {
            "student_id": request.student_id,
            "student_data": student_data,
            "created": datetime.now(),
            "expires": datetime.now() + timedelta(minutes=30)
        }
        
        return AuthResponse(
            success=True,
            message=f"✅ Welcome, {student_data['full_name']}! You now have access to your personal information.",
            session_token=session_token,
            student_name=student_data['full_name']
        )
        
    except Exception as e:
        return AuthResponse(
            success=False,
            message="Verification service temporarily unavailable. Please try again."
        )

@demo_router.post("/student-data", response_model=StudentDataResponse)
async def demo_get_student_data(request: StudentDataRequest):
    """Demo endpoint for retrieving authenticated student data"""
    try:
        # Verify session token
        session = DEMO_SESSIONS.get(request.session_token)
        if not session:
            return StudentDataResponse(
                success=False,
                error="Session expired. Please login again."
            )
        
        # Check if session expired
        if datetime.now() > session["expires"]:
            del DEMO_SESSIONS[request.session_token]
            return StudentDataResponse(
                success=False,
                error="Session expired. Please login again."
            )
        
        student_data = session["student_data"]
        
        # Route to appropriate data formatter
        if request.data_type == "fees":
            formatted_data = DemoAuthService.format_fees_info(student_data)
        elif request.data_type == "schedule":
            formatted_data = DemoAuthService.format_schedule_info(student_data)
        elif request.data_type == "profile":
            formatted_data = DemoAuthService.format_profile_info(student_data)
        else:
            return StudentDataResponse(
                success=False,
                error="Invalid data type requested."
            )
        
        return StudentDataResponse(
            success=True,
            data=formatted_data
        )
        
    except Exception as e:
        return StudentDataResponse(
            success=False,
            error="Data service temporarily unavailable. Please try again."
        )

@demo_router.get("/demo-info")
async def demo_info():
    """Information about the demo system"""
    return {
        "message": "RMSS Student Database Integration Demo",
        "description": "This demo shows how students can securely access their personal information",
        "demo_students": [
            {"id": "ST001", "name": "Emily Tan (P6 student)", "phone": "+6591234567"},
            {"id": "ST002", "name": "Ryan Lee (S3 student)", "phone": "+6598765432"}, 
            {"id": "ST003", "name": "Sarah Chua (J2 student)", "phone": "+6591111111"}
        ],
        "demo_password": "demo123",
        "features": [
            "Student authentication (password & OTP)",
            "Fee balance checking",
            "Class schedule viewing", 
            "Profile information access",
            "Security audit logging"
        ],
        "note": "This is a demonstration system. Real implementation would use actual RMSS database."
    }