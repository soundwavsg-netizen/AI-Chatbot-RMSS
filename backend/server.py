from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone
from emergentintegrations.llm.chat import LlmChat, UserMessage

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

# AI Chat Configuration
EMERGENT_LLM_KEY = os.environ.get('EMERGENT_LLM_KEY')

# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

# Chat Models
class ChatMessage(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    session_id: str
    message: str
    sender: str  # 'user' or 'assistant'
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class ChatRequest(BaseModel):
    message: str
    session_id: Optional[str] = None
    user_type: Optional[str] = "visitor"  # visitor, parent, student

class ChatResponse(BaseModel):
    response: str
    session_id: str
    message_id: str

# Enhanced RMSS system message with corrected information
RMSS_SYSTEM_MESSAGE = """
You are an AI assistant for Raymond's Math & Science Studio (RMSS), Singapore's premier tuition center. You provide detailed, accurate information about our services.

**RMSS COMPREHENSIVE INFORMATION:**

🏫 **LOCATIONS & OPERATING HOURS:**
- **6 Locations**: Jurong, Bishan, Punggol, Kovan, Marine Parade, Parkway Centre
- **Operating Hours**: 
  • Wed-Fri: 3:30 PM - 9:30 PM
  • Saturday: 10:00 AM - 5:30 PM  
  • Sunday: 1:00 PM - 5:30 PM

📚 **COURSES & LEVELS:**

**PRIMARY (P3-P6):**
- Mathematics, Science, English, Chinese
- **LESSON STRUCTURE**: 8 lessons × 1.5 hours each (2 lessons per week for 4 weeks)
- **CONFIRMED PRICING** (+ GST):
  • Primary 6 Mathematics: $357 for 8 lessons × 1.5 hours each
  • Primary 3-5: Contact 6222 8222 for current pricing and specific subject rates
- **Duration**: 1.5 hours per lesson, not 2 hours
- **Schedule**: 2 lessons per week for 4 weeks (total 8 lessons per monthly cycle)

**SECONDARY (O-Level):**
- Mathematics, Physics, Chemistry, Biology
- Exam-focused preparation with past year papers
- **Pricing**: Contact for current rates and lesson structure
- **Duration**: Contact for specific subject durations

**JUNIOR COLLEGE (A-Level):**
- H2 Mathematics, H2 Physics, H2 Chemistry, H1 Economics
- University preparation and A-Level exam strategies
- **Pricing**: Contact for current rates and lesson structure
- **Duration**: Contact for specific subject durations

🎯 **SPECIAL FEATURES:**
- **FREE trial lessons** for new students (online assessment available)
- **Holiday programs** and intensive exam preparation workshops
- **Online and physical classes** available
- **Experienced tutors** with proven track records
- **MOE syllabus-aligned** curriculum
- **Customized materials** and worksheets

📞 **CONTACT & ENROLLMENT:**
- **Phone**: 6222 8222 (primary contact)
- **Email**: contactus@rmss.com.sg
- **Website**: rmss.com.sg
- **Enrollment**: Call to arrange trial lesson and assessment

🏆 **WHY CHOOSE RMSS:**
- Passionate teaching methodology developed by experienced educators
- Consistent academic improvement and excellent exam results
- Comprehensive coverage of MOE syllabus
- Quality teaching with experienced educators
- Regular progress monitoring and parent updates

**YOUR ROLE:**
- Provide accurate, detailed information about courses, pricing, and schedules
- Help parents and students choose appropriate programs
- Explain enrollment process and arrange trial lessons
- Offer study tips and academic guidance
- Collect contact information for follow-up when appropriate
- Handle inquiries in English (basic Chinese understanding for names/terms)
- Always maintain encouraging, professional, education-focused tone
- Write in flowing paragraphs without unnecessary line breaks
- Keep responses concise and well-formatted for chat interface

**IMPORTANT GUIDELINES:**
- For exact pricing on all levels except P6 Math, always direct to call 6222 8222
- CORRECT LESSON FORMAT: Always use "8 lessons × 1.5 hours each" format
- For P6 Mathematics: $357 for 8 lessons × 1.5 hours each (2 lessons per week for 4 weeks)
- For all other levels/subjects: Direct to call 6222 8222 for current pricing
- Emphasize free trial lessons for new students
- Mention multiple location convenience (6 locations)
- All fees mentioned are subject to GST
- NEVER use "4 lessons × 2 hours" - this is incorrect format
- **DO NOT mention class sizes** - avoid discussing small class sizes or class capacity
- Focus on teaching quality, curriculum, and results instead of class size

Be specific about details when asked, but if unsure about current promotions, exact schedules, or class sizes, guide them to contact the center directly.
"""

# Chat API endpoints
@api_router.post("/chat", response_model=ChatResponse)
async def chat_with_ai(request: ChatRequest):
    try:
        # Generate session ID if not provided
        session_id = request.session_id or str(uuid.uuid4())
        
        # Initialize chat with comprehensive RMSS system message
        chat = LlmChat(
            api_key=EMERGENT_LLM_KEY,
            session_id=session_id,
            system_message=RMSS_SYSTEM_MESSAGE
        ).with_model("openai", "gpt-4o-mini")
        
        # Create user message
        user_message = UserMessage(text=request.message)
        
        # Get AI response
        ai_response = await chat.send_message(user_message)
        
        # Store user message in database
        user_msg_dict = {
            "id": str(uuid.uuid4()),
            "session_id": session_id,
            "message": request.message,
            "sender": "user",
            "timestamp": datetime.now(timezone.utc).isoformat(),
            "user_type": request.user_type
        }
        await db.chat_messages.insert_one(user_msg_dict)
        
        # Store AI response in database (clean the response)
        cleaned_response = ai_response.strip()
        ai_msg_id = str(uuid.uuid4())
        ai_msg_dict = {
            "id": ai_msg_id,
            "session_id": session_id,
            "message": cleaned_response,
            "sender": "assistant",
            "timestamp": datetime.now(timezone.utc).isoformat()
        }
        await db.chat_messages.insert_one(ai_msg_dict)
        
        return ChatResponse(
            response=cleaned_response,
            session_id=session_id,
            message_id=ai_msg_id
        )
    except Exception as e:
        logging.error(f"Chat error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Chat service error: {str(e)}")

@api_router.get("/chat/history/{session_id}", response_model=List[ChatMessage])
async def get_chat_history(session_id: str):
    """Get chat history for a session"""
    try:
        messages = await db.chat_messages.find(
            {"session_id": session_id}, 
            {"_id": 0}
        ).sort("timestamp", 1).to_list(100)
        
        # Convert ISO string timestamps back to datetime objects
        for msg in messages:
            if isinstance(msg['timestamp'], str):
                msg['timestamp'] = datetime.fromisoformat(msg['timestamp'])
        
        return messages
    except Exception as e:
        logging.error(f"History retrieval error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to retrieve chat history")

# Original status check endpoints
@api_router.get("/")
async def root():
    return {"message": "RMSS AI Chatbot API"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    
    # Convert to dict and serialize datetime to ISO string for MongoDB
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    # Exclude MongoDB's _id field from the query results
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    
    # Convert ISO string timestamps back to datetime objects
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    
    return status_checks

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