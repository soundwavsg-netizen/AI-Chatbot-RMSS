#!/usr/bin/env python3
"""
RMSS AI Chatbot Backend Testing Suite
Tests the comprehensive 2026 PDF data integration and chat functionality
"""

import requests
import json
import uuid
import time
from typing import Dict, Any, List

# Backend URL from frontend/.env
BACKEND_URL = "https://tutor-assist-3.preview.emergentagent.com/api"

class RMSSChatbotTester:
    def __init__(self):
        self.session_id = str(uuid.uuid4())
        self.test_results = []
        
    def log_test(self, test_name: str, passed: bool, details: str = "", response_data: Any = None):
        """Log test results"""
        result = {
            "test": test_name,
            "passed": passed,
            "details": details,
            "response_data": response_data
        }
        self.test_results.append(result)
        status = "✅ PASS" if passed else "❌ FAIL"
        print(f"{status}: {test_name}")
        if details:
            print(f"   Details: {details}")
        if not passed and response_data:
            print(f"   Response: {response_data}")
        print()

    def send_chat_message(self, message: str, session_id: str = None) -> Dict[str, Any]:
        """Send a chat message to the API"""
        if not session_id:
            session_id = self.session_id
            
        payload = {
            "message": message,
            "session_id": session_id,
            "user_type": "parent"
        }
        
        try:
            response = requests.post(f"{BACKEND_URL}/chat", json=payload, timeout=30)
            response.raise_for_status()
            return response.json()
        except requests.exceptions.RequestException as e:
            return {"error": str(e), "status_code": getattr(e.response, 'status_code', None)}

    def test_basic_connectivity(self):
        """Test basic API connectivity"""
        try:
            response = requests.get(f"{BACKEND_URL}/", timeout=10)
            if response.status_code == 200:
                data = response.json()
                self.log_test("Basic API Connectivity", True, f"API responded: {data.get('message', 'OK')}")
            else:
                self.log_test("Basic API Connectivity", False, f"Status code: {response.status_code}")
        except Exception as e:
            self.log_test("Basic API Connectivity", False, f"Connection error: {str(e)}")

    def test_chat_endpoint_basic(self):
        """Test basic chat functionality"""
        message = "Hello, can you tell me about RMSS?"
        response = self.send_chat_message(message)
        
        if "error" in response:
            self.log_test("Basic Chat Functionality", False, f"API Error: {response['error']}", response)
            return False
            
        required_fields = ["response", "session_id", "message_id"]
        missing_fields = [field for field in required_fields if field not in response]
        
        if missing_fields:
            self.log_test("Basic Chat Functionality", False, f"Missing fields: {missing_fields}", response)
            return False
            
        if not response.get("response"):
            self.log_test("Basic Chat Functionality", False, "Empty response from AI", response)
            return False
            
        self.log_test("Basic Chat Functionality", True, f"AI responded with {len(response['response'])} characters")
        return True

    def test_response_formatting(self):
        """Test that responses don't contain raw \n characters"""
        message = "Tell me about P3 Math classes"
        response = self.send_chat_message(message)
        
        if "error" in response:
            self.log_test("Response Formatting", False, f"API Error: {response['error']}")
            return False
            
        ai_response = response.get("response", "")
        
        # Check for raw \n characters that shouldn't be displayed
        has_raw_newlines = "\\n" in ai_response
        has_raw_returns = "\\r" in ai_response
        
        if has_raw_newlines or has_raw_returns:
            self.log_test("Response Formatting", False, f"Response contains raw newline characters: \\n={has_raw_newlines}, \\r={has_raw_returns}")
            return False
        else:
            self.log_test("Response Formatting", True, "Response properly formatted without raw newline characters")
            return True

    def test_s1_math_pricing(self):
        """Test S1 Math pricing accuracy - should be $370.60/month"""
        message = "What is the pricing for S1 Math?"
        response = self.send_chat_message(message)
        
        if "error" in response:
            self.log_test("S1 Math Pricing", False, f"API Error: {response['error']}")
            return False
            
        ai_response = response.get("response", "").lower()
        
        # Check for correct S1 Math pricing
        if "$370.60" in ai_response or "370.60" in ai_response:
            self.log_test("S1 Math Pricing", True, "Correct S1 Math pricing found: $370.60/month")
            return True
        elif "contact for pricing" in ai_response or "contact us" in ai_response:
            self.log_test("S1 Math Pricing", False, "Still showing old 'contact for pricing' message instead of $370.60")
            return False
        else:
            self.log_test("S1 Math Pricing", False, f"S1 Math pricing not found or incorrect in response: {ai_response[:200]}...")
            return False

    def test_holiday_dates_2026(self):
        """Test 2026 holiday dates accuracy"""
        message = "When is Chinese New Year in 2026?"
        response = self.send_chat_message(message)
        
        if "error" in response:
            self.log_test("2026 Holiday Dates", False, f"API Error: {response['error']}")
            return False
            
        ai_response = response.get("response", "").lower()
        
        # Check for correct CNY date
        if "february 18" in ai_response or "feb 18" in ai_response or "18 february" in ai_response:
            self.log_test("2026 Holiday Dates - CNY", True, "Correct Chinese New Year date: February 18, 2026")
        else:
            self.log_test("2026 Holiday Dates - CNY", False, f"Incorrect or missing CNY date in response: {ai_response[:200]}...")
            return False
            
        # Test Labour Day
        message2 = "When is Labour Day in 2026?"
        response2 = self.send_chat_message(message2)
        
        if "error" not in response2:
            ai_response2 = response2.get("response", "").lower()
            if "april 27" in ai_response2 or "apr 27" in ai_response2 or "27 april" in ai_response2:
                self.log_test("2026 Holiday Dates - Labour Day", True, "Correct Labour Day date: April 27, 2026")
                return True
            else:
                self.log_test("2026 Holiday Dates - Labour Day", False, f"Incorrect Labour Day date: {ai_response2[:200]}...")
                return False
        else:
            self.log_test("2026 Holiday Dates - Labour Day", False, "Failed to get Labour Day response")
            return False

    def test_tutor_assignments(self):
        """Test tutor assignments accuracy"""
        message = "Who teaches S1 Math at Marine Parade?"
        response = self.send_chat_message(message)
        
        if "error" in response:
            self.log_test("Tutor Assignments", False, f"API Error: {response['error']}")
            return False
            
        ai_response = response.get("response", "").lower()
        
        # Check for Mr Sean Yeo (HOD) at Marine Parade for S1 Math
        if "sean yeo" in ai_response:
            self.log_test("Tutor Assignments", True, "Correct tutor found: Mr Sean Yeo for S1 Math at Marine Parade")
            return True
        else:
            self.log_test("Tutor Assignments", False, f"Expected tutor (Sean Yeo) not found in response: {ai_response[:200]}...")
            return False

    def test_comprehensive_pricing_data(self):
        """Test various pricing data from different levels"""
        test_cases = [
            {
                "message": "What is P2 Math pricing?",
                "expected_price": "$261.60",
                "level": "P2 Math"
            },
            {
                "message": "How much is P3 Science?",
                "expected_price": "$277.95",
                "level": "P3 Science"
            },
            {
                "message": "What about S1 Science pricing?",
                "expected_price": "$327.00",
                "level": "S1 Science"
            },
            {
                "message": "J1 Chemistry fees?",
                "expected_price": "$401.12",
                "level": "J1 Chemistry"
            }
        ]
        
        all_passed = True
        for test_case in test_cases:
            response = self.send_chat_message(test_case["message"])
            
            if "error" in response:
                self.log_test(f"Pricing Data - {test_case['level']}", False, f"API Error: {response['error']}")
                all_passed = False
                continue
                
            ai_response = response.get("response", "")
            expected_price = test_case["expected_price"]
            
            if expected_price in ai_response:
                self.log_test(f"Pricing Data - {test_case['level']}", True, f"Correct pricing found: {expected_price}")
            else:
                self.log_test(f"Pricing Data - {test_case['level']}", False, f"Expected {expected_price} not found in response")
                all_passed = False
                
            time.sleep(1)  # Small delay between requests
            
        return all_passed

    def test_context_awareness(self):
        """Test conversation context maintenance"""
        # Start a conversation about a specific topic
        message1 = "Tell me about P4 Math classes"
        response1 = self.send_chat_message(message1)
        
        if "error" in response1:
            self.log_test("Context Awareness", False, f"API Error in first message: {response1['error']}")
            return False
            
        time.sleep(1)
        
        # Follow up with a context-dependent question
        message2 = "What about the pricing?"
        response2 = self.send_chat_message(message2)
        
        if "error" in response2:
            self.log_test("Context Awareness", False, f"API Error in follow-up: {response2['error']}")
            return False
            
        ai_response2 = response2.get("response", "").lower()
        
        # Should respond with P4 Math pricing context
        if "$332.45" in ai_response2 or "332.45" in ai_response2:
            self.log_test("Context Awareness", True, "AI maintained context and provided P4 Math pricing")
            return True
        else:
            self.log_test("Context Awareness", False, f"AI did not maintain P4 Math context in follow-up: {ai_response2[:200]}...")
            return False

    def test_location_specific_queries(self):
        """Test location-specific information"""
        message = "What classes are available at Bishan?"
        response = self.send_chat_message(message)
        
        if "error" in response:
            self.log_test("Location-Specific Queries", False, f"API Error: {response['error']}")
            return False
            
        ai_response = response.get("response", "").lower()
        
        # Check for Bishan-specific tutors mentioned in the system message
        bishan_tutors = ["david lim", "winston loh", "sean yeo", "kai ning"]
        found_tutors = [tutor for tutor in bishan_tutors if tutor in ai_response]
        
        if found_tutors:
            self.log_test("Location-Specific Queries", True, f"Found Bishan tutors: {found_tutors}")
            return True
        else:
            self.log_test("Location-Specific Queries", False, f"No Bishan-specific tutors found in response: {ai_response[:200]}...")
            return False

    def test_fee_settlement_periods(self):
        """Test fee settlement period information"""
        message = "When are the fee settlement periods?"
        response = self.send_chat_message(message)
        
        if "error" in response:
            self.log_test("Fee Settlement Periods", False, f"API Error: {response['error']}")
            return False
            
        ai_response = response.get("response", "").lower()
        
        # Check for settlement period information
        settlement_indicators = ["settlement", "january 26", "february 23", "4th week", "collection"]
        found_indicators = [indicator for indicator in settlement_indicators if indicator in ai_response]
        
        if found_indicators:
            self.log_test("Fee Settlement Periods", True, f"Found settlement period info: {found_indicators}")
            return True
        else:
            self.log_test("Fee Settlement Periods", False, f"No fee settlement information found: {ai_response[:200]}...")
            return False

    def test_context_memory_j2_math_bishan_flow(self):
        """CRITICAL: Test J2 Math → Bishan conversation flow (User's exact issue)"""
        # Create new session for this test
        test_session_id = str(uuid.uuid4())
        
        # Message 1: "J2 math?" → Should ask for location
        message1 = "J2 math?"
        response1 = self.send_chat_message(message1, test_session_id)
        
        if "error" in response1:
            self.log_test("Context Memory - J2 Math → Bishan Flow", False, f"API Error in message 1: {response1['error']}")
            return False
            
        ai_response1 = response1.get("response", "").lower()
        
        # Should ask for location
        location_keywords = ["location", "where", "which location", "interested in"]
        asks_for_location = any(keyword in ai_response1 for keyword in location_keywords)
        
        if not asks_for_location:
            self.log_test("Context Memory - J2 Math → Bishan Flow", False, f"AI didn't ask for location after 'J2 math?': {ai_response1[:200]}...")
            return False
            
        time.sleep(1)
        
        # Message 2: "Bishan" → Should provide J2 Math details for Bishan ($444.72, not ask what subject)
        message2 = "Bishan"
        response2 = self.send_chat_message(message2, test_session_id)
        
        if "error" in response2:
            self.log_test("Context Memory - J2 Math → Bishan Flow", False, f"API Error in message 2: {response2['error']}")
            return False
            
        ai_response2 = response2.get("response", "").lower()
        
        # Critical checks:
        # 1. Should NOT ask "which subject" again
        asks_subject_again = any(phrase in ai_response2 for phrase in ["which subject", "what subject", "which level"])
        
        # 2. Should provide J2 Math pricing ($444.72)
        has_correct_pricing = "$444.72" in response2.get("response", "") or "444.72" in ai_response2
        
        # 3. Should mention J2 Math context
        has_j2_context = any(phrase in ai_response2 for phrase in ["j2 math", "j2 mathematics", "junior college math"])
        
        if asks_subject_again:
            self.log_test("Context Memory - J2 Math → Bishan Flow", False, f"CRITICAL: AI asked 'which subject' again instead of remembering J2 Math context: {ai_response2[:200]}...")
            return False
            
        if not has_correct_pricing:
            self.log_test("Context Memory - J2 Math → Bishan Flow", False, f"CRITICAL: Missing correct J2 Math pricing ($444.72) in response: {ai_response2[:200]}...")
            return False
            
        if not has_j2_context:
            self.log_test("Context Memory - J2 Math → Bishan Flow", False, f"CRITICAL: AI didn't maintain J2 Math context in response: {ai_response2[:200]}...")
            return False
            
        self.log_test("Context Memory - J2 Math → Bishan Flow", True, "✅ Perfect context memory: Asked location → Provided J2 Math details for Bishan with correct pricing $444.72")
        return True

    def test_context_memory_p6_math_punggol_flow(self):
        """CRITICAL: Test P6 Math → Punggol conversation flow"""
        # Create new session for this test
        test_session_id = str(uuid.uuid4())
        
        # Message 1: "P6 math" → Should ask for location
        message1 = "P6 math"
        response1 = self.send_chat_message(message1, test_session_id)
        
        if "error" in response1:
            self.log_test("Context Memory - P6 Math → Punggol Flow", False, f"API Error in message 1: {response1['error']}")
            return False
            
        ai_response1 = response1.get("response", "").lower()
        
        # Should ask for location
        location_keywords = ["location", "where", "which location", "interested in"]
        asks_for_location = any(keyword in ai_response1 for keyword in location_keywords)
        
        if not asks_for_location:
            self.log_test("Context Memory - P6 Math → Punggol Flow", False, f"AI didn't ask for location after 'P6 math': {ai_response1[:200]}...")
            return False
            
        time.sleep(1)
        
        # Message 2: "Punggol" → Should provide P6 Math details for Punggol ($357.52, NOT $346.62)
        message2 = "Punggol"
        response2 = self.send_chat_message(message2, test_session_id)
        
        if "error" in response2:
            self.log_test("Context Memory - P6 Math → Punggol Flow", False, f"API Error in message 2: {response2['error']}")
            return False
            
        ai_response2 = response2.get("response", "").lower()
        
        # Critical checks:
        # 1. Should NOT ask "which subject" again
        asks_subject_again = any(phrase in ai_response2 for phrase in ["which subject", "what subject", "which level"])
        
        # 2. Should provide CORRECT P6 Math pricing ($357.52, NOT P5 pricing $346.62)
        has_correct_pricing = "$357.52" in response2.get("response", "") or "357.52" in ai_response2
        has_wrong_pricing = "$346.62" in response2.get("response", "") or "346.62" in ai_response2
        
        # 3. Should mention P6 Math context
        has_p6_context = any(phrase in ai_response2 for phrase in ["p6 math", "p6 mathematics", "primary 6 math"])
        
        if asks_subject_again:
            self.log_test("Context Memory - P6 Math → Punggol Flow", False, f"CRITICAL: AI asked 'which subject' again instead of remembering P6 Math context: {ai_response2[:200]}...")
            return False
            
        if has_wrong_pricing:
            self.log_test("Context Memory - P6 Math → Punggol Flow", False, f"CRITICAL: AI returned P5 pricing ($346.62) instead of correct P6 pricing ($357.52): {ai_response2[:200]}...")
            return False
            
        if not has_correct_pricing:
            self.log_test("Context Memory - P6 Math → Punggol Flow", False, f"CRITICAL: Missing correct P6 Math pricing ($357.52) in response: {ai_response2[:200]}...")
            return False
            
        if not has_p6_context:
            self.log_test("Context Memory - P6 Math → Punggol Flow", False, f"CRITICAL: AI didn't maintain P6 Math context in response: {ai_response2[:200]}...")
            return False
            
        self.log_test("Context Memory - P6 Math → Punggol Flow", True, "✅ Perfect context memory: Asked location → Provided P6 Math details for Punggol with correct pricing $357.52")
        return True

    def test_context_memory_location_first_flow(self):
        """CRITICAL: Test Location-First Flow (Marine Parade → J1 Math)"""
        # Create new session for this test
        test_session_id = str(uuid.uuid4())
        
        # Message 1: "Classes at Marine Parade" → Should ask which subject/level
        message1 = "Classes at Marine Parade"
        response1 = self.send_chat_message(message1, test_session_id)
        
        if "error" in response1:
            self.log_test("Context Memory - Location-First Flow", False, f"API Error in message 1: {response1['error']}")
            return False
            
        ai_response1 = response1.get("response", "").lower()
        
        # Should ask for subject/level
        subject_keywords = ["which subject", "what subject", "which level", "what level", "subject or level"]
        asks_for_subject = any(keyword in ai_response1 for keyword in subject_keywords)
        
        if not asks_for_subject:
            self.log_test("Context Memory - Location-First Flow", False, f"AI didn't ask for subject/level after 'Classes at Marine Parade': {ai_response1[:200]}...")
            return False
            
        time.sleep(1)
        
        # Message 2: "J1 Math" → Should provide J1 Math details for Marine Parade
        message2 = "J1 Math"
        response2 = self.send_chat_message(message2, test_session_id)
        
        if "error" in response2:
            self.log_test("Context Memory - Location-First Flow", False, f"API Error in message 2: {response2['error']}")
            return False
            
        ai_response2 = response2.get("response", "").lower()
        
        # Critical checks:
        # 1. Should NOT ask "which location" again
        asks_location_again = any(phrase in ai_response2 for phrase in ["which location", "what location", "where"])
        
        # 2. Should provide J1 Math pricing ($401.12)
        has_correct_pricing = "$401.12" in response2.get("response", "") or "401.12" in ai_response2
        
        # 3. Should mention Marine Parade context
        has_location_context = "marine parade" in ai_response2
        
        # 4. Should mention J1 Math context
        has_j1_context = any(phrase in ai_response2 for phrase in ["j1 math", "j1 mathematics", "junior college math"])
        
        if asks_location_again:
            self.log_test("Context Memory - Location-First Flow", False, f"CRITICAL: AI asked 'which location' again instead of remembering Marine Parade context: {ai_response2[:200]}...")
            return False
            
        if not has_correct_pricing:
            self.log_test("Context Memory - Location-First Flow", False, f"CRITICAL: Missing correct J1 Math pricing ($401.12) in response: {ai_response2[:200]}...")
            return False
            
        if not has_location_context:
            self.log_test("Context Memory - Location-First Flow", False, f"CRITICAL: AI didn't maintain Marine Parade context in response: {ai_response2[:200]}...")
            return False
            
        if not has_j1_context:
            self.log_test("Context Memory - Location-First Flow", False, f"CRITICAL: AI didn't understand J1 Math context in response: {ai_response2[:200]}...")
            return False
            
        self.log_test("Context Memory - Location-First Flow", True, "✅ Perfect context memory: Asked subject → Provided J1 Math details for Marine Parade with correct pricing $401.12")
        return True

    def test_response_formatting_comprehensive(self):
        """Test comprehensive response formatting with line breaks and emojis"""
        message = "Tell me about P6 Math at Bishan"
        response = self.send_chat_message(message)
        
        if "error" in response:
            self.log_test("Response Formatting - Comprehensive", False, f"API Error: {response['error']}")
            return False
            
        ai_response = response.get("response", "")
        
        # Check for proper formatting elements
        has_emojis = any(emoji in ai_response for emoji in ["📊", "💰", "📅", "👨‍🏫", "🏫", "📚"])
        has_line_breaks = "\n" in ai_response
        not_single_paragraph = ai_response.count("\n") >= 2  # Multiple line breaks
        
        # Check for structured information
        has_fee_info = "$357.52" in ai_response or "357.52" in ai_response
        has_schedule_info = any(word in ai_response.lower() for word in ["lesson", "hour", "week"])
        
        formatting_score = 0
        if has_emojis:
            formatting_score += 1
        if has_line_breaks:
            formatting_score += 1
        if not_single_paragraph:
            formatting_score += 1
        if has_fee_info:
            formatting_score += 1
        if has_schedule_info:
            formatting_score += 1
            
        if formatting_score >= 4:
            self.log_test("Response Formatting - Comprehensive", True, f"Excellent formatting: emojis={has_emojis}, line_breaks={has_line_breaks}, structured={not_single_paragraph}")
            return True
        else:
            self.log_test("Response Formatting - Comprehensive", False, f"Poor formatting score: {formatting_score}/5 - needs improvement")
            return False

    def test_professional_conversation_flow(self):
        """Test professional conversation flow maintenance"""
        # Create new session for this test
        test_session_id = str(uuid.uuid4())
        
        # Multi-turn conversation to test flow
        conversation = [
            ("Hello, I'm interested in math classes", "greeting"),
            ("P5 level", "level_specification"),
            ("What about Jurong location?", "location_follow_up")
        ]
        
        all_responses_professional = True
        context_maintained = True
        
        for i, (message, stage) in enumerate(conversation):
            response = self.send_chat_message(message, test_session_id)
            
            if "error" in response:
                self.log_test(f"Professional Flow - {stage}", False, f"API Error: {response['error']}")
                all_responses_professional = False
                continue
                
            ai_response = response.get("response", "").lower()
            
            # Check for professional tone
            professional_indicators = ["thank you", "happy to help", "would you like", "can i help", "let me", "i'd be happy"]
            is_professional = any(indicator in ai_response for indicator in professional_indicators)
            
            if not is_professional:
                self.log_test(f"Professional Flow - {stage}", False, f"Response lacks professional tone: {ai_response[:100]}...")
                all_responses_professional = False
                
            # Check context maintenance in later stages
            if stage == "location_follow_up":
                has_p5_context = any(phrase in ai_response for phrase in ["p5", "primary 5"])
                if not has_p5_context:
                    self.log_test(f"Professional Flow - Context Maintenance", False, f"Lost P5 context in location follow-up: {ai_response[:100]}...")
                    context_maintained = False
                    
            time.sleep(1)
            
        if all_responses_professional and context_maintained:
            self.log_test("Professional Conversation Flow", True, "Maintained professional tone and context throughout conversation")
            return True
        else:
            self.log_test("Professional Conversation Flow", False, f"Issues with professional tone or context maintenance")
            return False

    def run_all_tests(self):
        """Run all tests and provide summary"""
        print("🚀 Starting RMSS AI Chatbot Backend Tests - FINAL CONTEXT MEMORY VERIFICATION")
        print("=" * 80)
        
        # Run basic connectivity tests first
        self.test_basic_connectivity()
        self.test_chat_endpoint_basic()
        self.test_response_formatting()
        
        # Run comprehensive data tests
        self.test_s1_math_pricing()
        self.test_holiday_dates_2026()
        self.test_tutor_assignments()
        self.test_comprehensive_pricing_data()
        self.test_fee_settlement_periods()
        
        # CRITICAL CONTEXT MEMORY TESTS - The main focus
        print("\n🎯 CRITICAL CONTEXT MEMORY TESTS - FINAL VERIFICATION")
        print("=" * 80)
        
        self.test_context_memory_j2_math_bishan_flow()
        self.test_context_memory_p6_math_punggol_flow()
        self.test_context_memory_location_first_flow()
        
        # Additional context and formatting tests
        self.test_context_awareness()
        self.test_location_specific_queries()
        self.test_response_formatting_comprehensive()
        self.test_professional_conversation_flow()
        
        # Summary
        print("=" * 80)
        print("📊 FINAL TEST SUMMARY")
        print("=" * 80)
        
        passed_tests = [test for test in self.test_results if test["passed"]]
        failed_tests = [test for test in self.test_results if not test["passed"]]
        
        # Separate critical context memory tests
        context_memory_tests = [test for test in self.test_results if "Context Memory -" in test["test"]]
        context_memory_passed = [test for test in context_memory_tests if test["passed"]]
        context_memory_failed = [test for test in context_memory_tests if not test["passed"]]
        
        print(f"✅ TOTAL PASSED: {len(passed_tests)}")
        print(f"❌ TOTAL FAILED: {len(failed_tests)}")
        print(f"📈 OVERALL SUCCESS RATE: {len(passed_tests)}/{len(self.test_results)} ({len(passed_tests)/len(self.test_results)*100:.1f}%)")
        
        print(f"\n🎯 CRITICAL CONTEXT MEMORY RESULTS:")
        print(f"✅ CONTEXT MEMORY PASSED: {len(context_memory_passed)}")
        print(f"❌ CONTEXT MEMORY FAILED: {len(context_memory_failed)}")
        print(f"📈 CONTEXT MEMORY SUCCESS RATE: {len(context_memory_passed)}/{len(context_memory_tests)} ({len(context_memory_passed)/len(context_memory_tests)*100:.1f}%)")
        
        if failed_tests:
            print("\n🔍 FAILED TESTS DETAILS:")
            for test in failed_tests:
                print(f"   ❌ {test['test']}: {test['details']}")
                
        if context_memory_failed:
            print("\n🚨 CRITICAL CONTEXT MEMORY FAILURES:")
            for test in context_memory_failed:
                print(f"   🚨 {test['test']}: {test['details']}")
        
        # Return True only if ALL context memory tests pass
        context_memory_success = len(context_memory_failed) == 0
        overall_success = len(failed_tests) == 0
        
        return context_memory_success and overall_success

if __name__ == "__main__":
    tester = RMSSChatbotTester()
    success = tester.run_all_tests()
    
    if success:
        print("\n🎉 ALL TESTS PASSED! Backend is working correctly.")
    else:
        print("\n⚠️  SOME TESTS FAILED. Check details above.")