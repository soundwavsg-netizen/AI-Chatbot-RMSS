# CCC Digital AI Training Library
# Reusable AI training patterns and frameworks for scalable chatbot development

from typing import Dict, Any, Optional
import json

class AITrainingLibrary:
    """
    Central library for all proven AI training patterns and industry templates
    Built from successful RMSS implementation - reusable across all clients
    """
    
    # Base conversation rules proven to work (from RMSS fixes)
    BASE_CONVERSATION_RULES = """
CRITICAL CONVERSATION GUIDELINES (APPLIES TO ALL INDUSTRIES):

1. PROGRESSIVE DISCLOSURE - Never dump all information:
   - Generic questions → Ask for specifics
   - "Tell me about your services" → "Which area interests you most?"
   - "What do you offer?" → "What type of service do you need?"
   - Only provide detailed info when user specifies BOTH category AND location/specifics

2. CONTEXT MEMORY - Always remember conversation flow:
   - If user answers your question, provide what they asked for
   - If user says location after you asked "which location?" → Give info for that location
   - Track subject + location combinations throughout conversation
   - Never ask the same type of question twice in a row

3. SMART CLARIFICATION:
   - Ask 1-2 clarifying questions maximum
   - Offer specific choices, not open-ended questions
   - Guide conversation toward helpful resolution

4. FORMATTING STANDARDS:
   - Use emojis for visual separation
   - Line breaks between different information types  
   - Mobile-friendly formatting with short paragraphs
   - Professional but friendly tone

5. CONVERSATION EXAMPLES - CRITICAL:
✅ CORRECT: Generic question → Ask for clarification with specific options
❌ WRONG: Generic question → Dump all available information
"""

    # Industry-specific patterns
    INDUSTRY_PATTERNS = {
        "education": """
EDUCATION-SPECIFIC CONVERSATION PATTERNS (PROVEN WITH RMSS):

1. PRICING INQUIRIES:
   - Ask for level first (Primary/Secondary/JC)
   - Ask for subject (Math, Science, English, etc.)
   - Ask for location if multiple available
   - Provide pricing with schedule and tutor details

2. SCHEDULE INQUIRIES:
   - Ask for subject + level combination
   - Ask for preferred location
   - Show time slots with tutors
   - Include frequency and duration

3. ENROLLMENT INQUIRIES:
   - Gather: Level, subjects, location preference
   - Explain enrollment process
   - Mention trial lessons
   - Collect contact information

EXAMPLE FLOWS:
User: "P6 Math classes" → AI: "Which location interests you?"
User: "Marine Parade" → AI: "P6 Math at Marine Parade: [specific details]"
""",

        "healthcare": """
HEALTHCARE-SPECIFIC CONVERSATION PATTERNS:

1. PRODUCT INQUIRIES:
   - Ask for category (Devices, Pharmaceuticals, PPE)
   - Ask for specific use case or department
   - Provide compliance information
   - Include availability and certifications

2. ORDER PROCESS:
   - Gather: Category, items, quantity, timeline
   - Explain minimum orders and bulk pricing
   - Collect business credentials
   - Provide delivery options

EXAMPLE FLOWS:
User: "Medical supplies" → AI: "Which category? Devices, Pharmaceuticals, PPE?"
User: "PPE" → AI: "What type? Masks, gloves, gowns, face shields?"
""",

        "retail": """
RETAIL-SPECIFIC CONVERSATION PATTERNS:

1. PRODUCT SEARCH:
   - Ask for category or type
   - Ask for specifications (size, color, features)
   - Provide options with pricing
   - Include shipping and availability

2. ORDER SUPPORT:
   - Gather product requirements
   - Explain ordering and payment
   - Provide tracking for existing orders
   - Handle returns professionally

EXAMPLE FLOWS:
User: "Office furniture" → AI: "What type? Chairs, desks, storage?"
User: "Chairs" → AI: "How many and what's your budget range?"
"""
    }

    # Authentication patterns for personal information access
    AUTHENTICATION_PATTERNS = """
AUTHENTICATION AND PERSONAL DATA PATTERNS:

1. LOGIN DETECTION:
   - Recognize requests for personal information
   - Guide unauthenticated users to login
   - Provide clear authentication options

2. PERSONAL DATA QUERIES:
   - "My fees" → Direct to authenticated fee information
   - "My schedule" → Show personal class/appointment schedule  
   - "My profile" → Display personal account information
   - "My orders" → Show order history and status

3. SESSION MANAGEMENT:
   - Maintain secure sessions with expiration
   - Provide clear login/logout options
   - Handle session timeout gracefully

SECURITY RULES:
- Only show personal data to authenticated users
- Verify session tokens before accessing personal information
- Log all personal data access for audit purposes
"""

    @classmethod
    def generate_system_message(
        cls, 
        client_name: str,
        industry: str,
        client_specific_data: str,
        custom_rules: str = "",
        authentication_enabled: bool = False
    ) -> str:
        """
        Generate complete AI system message using proven patterns
        
        Args:
            client_name: Name of the client (e.g., "Raymond's Math & Science Studio")
            industry: Industry type (education, healthcare, retail, professional)
            client_specific_data: Client's specific information (pricing, services, etc.)
            custom_rules: Any client-specific conversation rules
            authentication_enabled: Whether to include authentication patterns
        
        Returns:
            Complete system message ready for AI training
        """
        
        system_message = f"""You are an AI assistant for {client_name}.

{cls.BASE_CONVERSATION_RULES}

{cls.INDUSTRY_PATTERNS.get(industry, "")}

{client_specific_data}

{custom_rules}"""

        if authentication_enabled:
            system_message += f"\n\n{cls.AUTHENTICATION_PATTERNS}"
            
        return system_message

    @classmethod
    def get_pricing_template(cls, package_type: str, industry: str) -> Dict[str, Any]:
        """Get pricing template for specific package and industry"""
        
        base_pricing = {
            "basic": {
                "setup_fee_range": "$3,000-5,000",
                "monthly_fee_range": "$300-500", 
                "features": [
                    "Static FAQ responses",
                    "Basic conversation flow", 
                    "Simple website embedding",
                    "Standard business hours support"
                ]
            },
            "intermediate": {
                "setup_fee_range": "$8,000-12,000",
                "monthly_fee_range": "$800-1,200",
                "features": [
                    "AI-powered responses (GPT-4o-mini)",
                    "Context-aware conversations",
                    "PDF/file knowledge base integration",
                    "Professional UI with client branding", 
                    "Mobile-responsive design",
                    "Smart conversation flow patterns",
                    "Priority support"
                ]
            },
            "advanced": {
                "setup_fee_range": "$12,000-18,000", 
                "monthly_fee_range": "$1,200-2,000",
                "features": [
                    "Everything in Intermediate +",
                    "Secure user authentication",
                    "Personal information access",
                    "Database integration",
                    "JWT session management",
                    "Audit logging and security",
                    "Admin dashboard",
                    "24/7 support"
                ]
            }
        }
        
        whatsapp_addons = {
            "basic_whatsapp": {
                "setup_fee_additional": "+$2,000-4,000",
                "monthly_fee_additional": "+$300-500",
                "features": [
                    "Baileys WhatsApp integration",
                    "Same AI as web widget",
                    "Basic message handling",
                    "Cost-effective solution"
                ]
            },
            "advanced_whatsapp": {
                "setup_fee_additional": "+$4,000-8,000",
                "monthly_fee_additional": "+$500-1,000", 
                "features": [
                    "Official WhatsApp Business API",
                    "OTP verification system",
                    "Rich media support",
                    "Push notifications",
                    "Message templates",
                    "Analytics and reporting"
                ]
            }
        }
        
        industry_adjustments = {
            "education": {"multiplier": 1.0, "complexity": "High - Multiple levels, subjects, locations"},
            "healthcare": {"multiplier": 0.9, "complexity": "Medium - Product categories, compliance"},
            "retail": {"multiplier": 0.8, "complexity": "Medium - Inventory, orders, shipping"},
            "professional": {"multiplier": 1.1, "complexity": "High - Complex services, consultations"}
        }
        
        return {
            "package": base_pricing.get(package_type, {}),
            "whatsapp_options": whatsapp_addons,
            "industry_info": industry_adjustments.get(industry, {}),
            "management_services": {
                "basic": "$200-400/month",
                "professional": "$500-800/month", 
                "enterprise": "$800-1,500/month"
            }
        }

    @classmethod
    def get_client_template(cls, industry: str) -> Dict[str, str]:
        """Get complete template for specific industry"""
        
        templates = {
            "education": {
                "system_message_base": cls.BASE_CONVERSATION_RULES + cls.INDUSTRY_PATTERNS["education"],
                "sample_data_structure": """
SAMPLE EDUCATION DATA STRUCTURE:

**COURSE LEVELS:**
- Primary (P1-P6): Basic foundational subjects
- Secondary (S1-S4): O-Level preparation  
- Junior College (J1-J2): A-Level preparation

**SUBJECTS BY LEVEL:**
- Primary: Mathematics, Science, English, Chinese
- Secondary: EMath, AMath, Physics, Chemistry, Biology, English, Chinese
- JC: H2 Math, H2 Physics, H2 Chemistry, H1 Economics, H1 General Paper

**PRICING STRUCTURE:** 
- Course Fee + Material Fee + GST = Total Monthly Fee
- Different pricing by level and subject complexity

**LOCATIONS:**
- Multiple centers with different schedules
- Tutor assignments specific to location and subject

**CALENDAR INFORMATION:**
- School holidays and rest weeks
- Fee settlement periods  
- Exam preparation schedules
""",
                "conversation_examples": """
PROVEN EDUCATION CONVERSATION EXAMPLES:

✅ Level Inquiry:
User: "What math classes do you have?"
AI: "Which level? 📚 Primary (P1-P6), 🏫 Secondary (S1-S4), 🎓 JC (J1-J2)"

✅ Specific Subject:  
User: "P6 Math"
AI: "Which location interests you for P6 Math? We have 5 centers available."

✅ Location Follow-up:
User: "Marine Parade" 
AI: "P6 Math at Marine Parade: $357.52/month, 2×1.5hr/week, Tutor: Mr David Lim"

❌ Information Dumping (Never do this):
User: "Math classes"
AI: "P1 Math $200, P2 Math $250, P3 Math $280..." (dumps everything)
"""
            },
            
            "healthcare": {
                "system_message_base": cls.BASE_CONVERSATION_RULES + cls.INDUSTRY_PATTERNS["healthcare"],
                "sample_data_structure": """
SAMPLE HEALTHCARE DATA STRUCTURE:

**PRODUCT CATEGORIES:**
- Medical Devices: Monitors, machines, diagnostic equipment
- Pharmaceuticals: Prescription drugs, OTC medications, supplements  
- PPE: Masks, gloves, gowns, face shields
- Consumables: Syringes, bandages, testing kits

**COMPLIANCE INFORMATION:**
- MOH approval status and numbers
- CE marking and FDA clearance
- Expiration dates and batch tracking
- Storage and handling requirements

**BUSINESS PROCESS:**
- Quote generation for bulk orders
- Delivery scheduling and logistics
- Technical support and training
- Warranty and service agreements
""",
                "conversation_examples": """
HEALTHCARE CONVERSATION EXAMPLES:

✅ Category Inquiry:
User: "What products do you have?"
AI: "Which category? 🏥 Medical Devices, 💊 Pharmaceuticals, 🧤 PPE, 🔬 Lab Supplies"

✅ Specific Product:
User: "PPE"  
AI: "What type of PPE? Surgical masks, examination gloves, isolation gowns, face shields?"

✅ Technical Specs:
User: "Surgical masks"
AI: "What quantity and specifications? We have Level 1, 2, and 3 surgical masks with different filtration rates."
"""
            }
        }
        
        return templates.get(industry, {})

# Example usage for generating new client systems
class ClientConfigGenerator:
    """Helper class for generating new client configurations"""
    
    @staticmethod
    def create_rmss_config():
        """RMSS configuration - proven working example"""
        return {
            "client_name": "Raymond's Math & Science Studio (RMSS)",
            "industry": "education",
            "authentication_enabled": True,
            "client_data": """
RMSS 2026 CLASS INFORMATION:
[All the extracted PDF data we integrated]
""",
            "custom_rules": """
RMSS SPECIFIC RULES:
- Emphasize free trial lessons for new students
- Mention 5 convenient locations across Singapore
- Highlight experienced tutors with HOD/DY HOD designations
- Always include GST in pricing (final amounts)
"""
        }
    
    @staticmethod  
    def create_msupplies_config():
        """Template for M Supplies medical equipment company"""
        return {
            "client_name": "M Supplies Medical Equipment", 
            "industry": "healthcare",
            "authentication_enabled": True,  # For order tracking
            "client_data": """
M SUPPLIES PRODUCT CATALOG:
[Client provides their product database]
""",
            "custom_rules": """
M SUPPLIES SPECIFIC RULES:
- Always mention MOH approval for regulated products
- Provide bulk pricing for hospital/clinic orders
- Include delivery timelines for urgent medical needs
- Emphasize 24/7 emergency supply availability
"""
        }
    
    @staticmethod
    def generate_system_message(config: Dict[str, Any]) -> str:
        """Generate complete system message from config"""
        return AITrainingLibrary.generate_system_message(
            client_name=config["client_name"],
            industry=config["industry"], 
            client_specific_data=config["client_data"],
            custom_rules=config.get("custom_rules", ""),
            authentication_enabled=config.get("authentication_enabled", False)
        )

# Pricing calculator based on market research
class PricingCalculator:
    """Calculate pricing for different client configurations"""
    
    BASE_RATES = {
        "basic": {"setup": (3000, 5000), "monthly": (300, 500)},
        "intermediate": {"setup": (8000, 12000), "monthly": (800, 1200)}, 
        "advanced": {"setup": (12000, 18000), "monthly": (1200, 2000)}
    }
    
    INDUSTRY_MULTIPLIERS = {
        "education": 1.0,    # Standard rate (proven with RMSS)
        "healthcare": 0.9,   # Slightly lower - less complex data
        "retail": 0.8,       # Lower - simpler patterns
        "professional": 1.1  # Higher - complex service structures
    }
    
    WHATSAPP_ADDONS = {
        "baileys": {"setup": (2000, 4000), "monthly": (300, 500)},
        "business_api": {"setup": (4000, 8000), "monthly": (500, 1000)}
    }
    
    @classmethod
    def calculate_pricing(
        cls, 
        package_type: str, 
        industry: str,
        whatsapp_type: Optional[str] = None,
        custom_complexity: float = 1.0
    ) -> Dict[str, str]:
        """Calculate pricing for specific client configuration"""
        
        base = cls.BASE_RATES[package_type]
        multiplier = cls.INDUSTRY_MULTIPLIERS.get(industry, 1.0) * custom_complexity
        
        setup_min = int(base["setup"][0] * multiplier)
        setup_max = int(base["setup"][1] * multiplier) 
        monthly_min = int(base["monthly"][0] * multiplier)
        monthly_max = int(base["monthly"][1] * multiplier)
        
        pricing = {
            "setup_fee": f"${setup_min:,}-{setup_max:,}",
            "monthly_fee": f"${monthly_min}-{monthly_max}",
            "package_type": package_type.title(),
            "industry": industry.title()
        }
        
        if whatsapp_type:
            wa_addon = cls.WHATSAPP_ADDONS[whatsapp_type]
            pricing["whatsapp_setup_additional"] = f"+${wa_addon['setup'][0]:,}-{wa_addon['setup'][1]:,}"
            pricing["whatsapp_monthly_additional"] = f"+${wa_addon['monthly'][0]}-{wa_addon['monthly'][1]}"
            
        return pricing

# Usage examples
if __name__ == "__main__":
    # Example: Generate RMSS system message
    rmss_config = ClientConfigGenerator.create_rmss_config()
    rmss_system_message = ClientConfigGenerator.generate_system_message(rmss_config)
    
    # Example: Generate M Supplies system message  
    msupplies_config = ClientConfigGenerator.create_msupplies_config()
    msupplies_system_message = ClientConfigGenerator.generate_system_message(msupplies_config)
    
    # Example: Calculate pricing for education client with advanced features
    education_pricing = PricingCalculator.calculate_pricing(
        package_type="advanced",
        industry="education", 
        whatsapp_type="business_api"
    )
    
    print("RMSS System Message Length:", len(rmss_system_message))
    print("M Supplies System Message Length:", len(msupplies_system_message))
    print("Education Advanced Pricing:", education_pricing)