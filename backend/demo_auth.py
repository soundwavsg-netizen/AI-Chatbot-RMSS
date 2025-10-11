# Mock Authentication System for RMSS Demo
# This demonstrates how student authentication would work with real RMSS database

import uuid
from datetime import datetime, timezone, timedelta
import random
import hashlib

# Mock student database for demo purposes
DEMO_STUDENTS = {
    "ST001": {
        "student_id": "ST001",
        "full_name": "Emily Tan Wei Ling",
        "email": "emily.tan@email.com", 
        "phone": "+6591234567",
        "password_hash": "hashed_password_123",  # In real system, this would be bcrypt hashed
        "enrollments": [
            {
                "course": "P6 Mathematics",
                "location": "Marine Parade", 
                "tutor": "Mr David Lim (DY HOD)",
                "schedule": "Mon 6:00-7:30pm & Fri 7:30-9:00pm",
                "start_date": "2026-01-06"
            },
            {
                "course": "P6 Science",
                "location": "Marine Parade",
                "tutor": "Mr Benjamin Fok",
                "schedule": "Wed 5:30-7:30pm", 
                "start_date": "2026-01-08"
            }
        ],
        "fees": {
            "total_fees": 671.44,  # P6 Math + P6 Science monthly
            "paid_amount": 500.00,
            "outstanding": 171.44,
            "due_date": "2026-01-15",
            "last_payment": "2025-12-15"
        },
        "parent_contact": "+6587654321"
    },
    "ST002": {
        "student_id": "ST002", 
        "full_name": "Ryan Lee Jun Wei",
        "email": "ryan.lee@email.com",
        "phone": "+6598765432",
        "password_hash": "hashed_password_456",
        "enrollments": [
            {
                "course": "S3 AMath",
                "location": "Punggol",
                "tutor": "Mr David Cao (A)",
                "schedule": "Mon 5:00-6:30pm & Sat 12:00-1:30pm", 
                "start_date": "2026-01-06"
            },
            {
                "course": "S3 Chemistry", 
                "location": "Punggol",
                "tutor": "Ms Alvina Tan (B)",
                "schedule": "Fri 7:30-9:30pm",
                "start_date": "2026-01-10"
            }
        ],
        "fees": {
            "total_fees": 741.20,  # S3 AMath + Chemistry monthly
            "paid_amount": 741.20,
            "outstanding": 0.00,
            "due_date": None,
            "last_payment": "2025-12-30"
        },
        "parent_contact": "+6512345678"
    },
    "ST003": {
        "student_id": "ST003",
        "full_name": "Sarah Chua Mei Lin", 
        "email": "sarah.chua@email.com",
        "phone": "+6591111111",
        "password_hash": "hashed_password_789",
        "enrollments": [
            {
                "course": "J2 Mathematics",
                "location": "Bishan",
                "tutor": "Mr Sean Yeo (HOD)",
                "schedule": "Wed 8:30-10:00pm & Sun 3:30-5:00pm",
                "start_date": "2026-01-08" 
            }
        ],
        "fees": {
            "total_fees": 444.72,  # J2 Math monthly
            "paid_amount": 200.00,
            "outstanding": 244.72,
            "due_date": "2026-01-20",
            "last_payment": "2025-12-20"
        },
        "parent_contact": "+6598888888"
    }
}

# Mock OTP storage for demo (in real system, use Redis with expiration)
DEMO_OTP_STORAGE = {}

class DemoAuthService:
    """Mock authentication service demonstrating RMSS integration"""
    
    @staticmethod
    def verify_student_credentials(student_id: str, password: str = None, phone: str = None):
        """Verify student credentials - multiple verification methods"""
        student = DEMO_STUDENTS.get(student_id.upper())
        if not student:
            return None
            
        # Password verification (for web widget)
        if password:
            # In real system, use bcrypt.checkpw()
            return student if password == "demo123" else None
            
        # Phone verification (for WhatsApp)  
        if phone:
            return student if student["phone"] == phone else None
            
        return None
    
    @staticmethod
    def generate_otp(student_id: str):
        """Generate OTP for WhatsApp verification"""
        otp = f"{random.randint(100000, 999999):06d}"
        # Store with 5-minute expiration
        DEMO_OTP_STORAGE[student_id] = {
            "otp": otp,
            "expires": datetime.now() + timedelta(minutes=5),
            "attempts": 0
        }
        return otp
    
    @staticmethod
    def verify_otp(student_id: str, submitted_otp: str):
        """Verify OTP code"""
        stored_data = DEMO_OTP_STORAGE.get(student_id)
        if not stored_data:
            return False
            
        # Check expiration
        if datetime.now() > stored_data["expires"]:
            del DEMO_OTP_STORAGE[student_id]
            return False
            
        # Check attempts limit
        stored_data["attempts"] += 1
        if stored_data["attempts"] > 3:
            del DEMO_OTP_STORAGE[student_id]
            return False
            
        # Verify OTP
        if stored_data["otp"] == submitted_otp:
            del DEMO_OTP_STORAGE[student_id]  # Remove after successful verification
            return True
            
        return False
    
    @staticmethod
    def create_session_token(student_id: str):
        """Create session token for authenticated access"""
        # In real system, use JWT tokens
        token_data = {
            "student_id": student_id,
            "created": datetime.now().isoformat(),
            "expires": (datetime.now() + timedelta(minutes=30)).isoformat()
        }
        # Simple demo token - real system would use JWT
        token = f"demo_token_{student_id}_{uuid.uuid4().hex[:8]}"
        return token, token_data
    
    @staticmethod 
    def get_student_data(student_id: str):
        """Get comprehensive student data"""
        return DEMO_STUDENTS.get(student_id.upper())
    
    @staticmethod
    def format_fees_info(student_data):
        """Format fees information for chatbot response"""
        fees = student_data["fees"]
        
        if fees["outstanding"] > 0:
            return f"""💰 **Your Fees Information:**

📊 **Current Status:**
• Total Monthly Fees: ${fees['total_fees']:.2f}
• Amount Paid: ${fees['paid_amount']:.2f}
• Outstanding Balance: ${fees['outstanding']:.2f}
• Due Date: {fees['due_date']}

⚠️ **Payment Required:** Please settle your outstanding balance by {fees['due_date']}

💳 **Payment Methods:**
• Bank Transfer: DBS 123-456789-0 (RMSS Pte Ltd)
• Cash: Any RMSS location during office hours
• PayNow: 6222-8222

📞 **Need Help?** Call 6222 8222 for payment assistance"""

        else:
            return f"""💰 **Your Fees Information:**

✅ **Account Status: PAID IN FULL**

📊 **Details:**
• Total Monthly Fees: ${fees['total_fees']:.2f}  
• Last Payment: {fees['last_payment']}
• Next Payment Due: {(datetime.now() + timedelta(days=30)).strftime('%Y-%m-%d')}

😊 Thank you for keeping your payments up to date!"""
    
    @staticmethod
    def format_schedule_info(student_data):
        """Format schedule information for chatbot response"""
        enrollments = student_data["enrollments"]
        
        schedule_text = "📅 **Your Class Schedule:**\n\n"
        
        for enrollment in enrollments:
            schedule_text += f"""📚 **{enrollment['course']}**
📍 Location: {enrollment['location']}
👨‍🏫 Tutor: {enrollment['tutor']}
⏰ Schedule: {enrollment['schedule']}
📆 Started: {enrollment['start_date']}

"""
        
        schedule_text += """📞 **Schedule Changes:**
Need to modify your schedule? Call 6222 8222

🎓 **Free Trial:** Interested in additional subjects? Ask about our free trial lessons!"""

        return schedule_text
    
    @staticmethod
    def format_profile_info(student_data):
        """Format profile information for chatbot response"""
        return f"""👨‍🎓 **Your Profile Information:**

📝 **Student Details:**
• Name: {student_data['full_name']}
• Student ID: {student_data['student_id']}
• Email: {student_data['email']}
• Phone: {student_data['phone']}

📚 **Current Enrollments:** {len(student_data['enrollments'])} subjects
💰 **Outstanding Fees:** ${student_data['fees']['outstanding']:.2f}

📞 **Update Profile:** Call 6222 8222 to update contact details"""