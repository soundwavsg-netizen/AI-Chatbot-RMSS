#!/usr/bin/env python3
"""
RMSS AI Chatbot Context Memory Testing Suite
Tests the critical context memory system for conversation flows
"""

import requests
import json
import uuid
import time
from typing import Dict, Any, List

# Backend URL from frontend/.env
BACKEND_URL = "https://tutor-assist-3.preview.emergentagent.com/api"

class ContextMemoryTester:
    def __init__(self):
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

    def send_chat_message(self, message: str, session_id: str) -> Dict[str, Any]:
        """Send a chat message to the API"""
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

    def test_j1_j2_math_context(self):
        """Test J1/J2 Math context memory flows"""
        session_id = str(uuid.uuid4())
        
        # Test J1 Math → Marine Parade flow
        print("Testing J1 Math → Marine Parade context flow...")
        
        # Step 1: Ask about J1 math
        response1 = self.send_chat_message("J1 math", session_id)
        if "error" in response1:
            self.log_test("J1 Math Context - Step 1", False, f"API Error: {response1['error']}")
            return False
            
        ai_response1 = response1.get("response", "").lower()
        
        # Should ask for location
        if "which location" in ai_response1 or "location" in ai_response1:
            self.log_test("J1 Math Context - Step 1", True, "AI correctly asked for location")
        else:
            self.log_test("J1 Math Context - Step 1", False, f"AI did not ask for location: {ai_response1[:200]}...")
            return False
            
        time.sleep(1)
        
        # Step 2: Reply with Marine Parade
        response2 = self.send_chat_message("Marine Parade", session_id)
        if "error" in response2:
            self.log_test("J1 Math Context - Step 2", False, f"API Error: {response2['error']}")
            return False
            
        ai_response2 = response2.get("response", "").lower()
        
        # Should provide J1 Math details for Marine Parade (NOT ask what subject)
        if "which subject" in ai_response2 or "what subject" in ai_response2:
            self.log_test("J1 Math Context - Step 2", False, "AI incorrectly asked about subject after context was established")
            return False
        elif "$401.12" in ai_response2 and "j1 math" in ai_response2:
            self.log_test("J1 Math Context - Step 2", True, "AI correctly provided J1 Math details for Marine Parade")
        else:
            self.log_test("J1 Math Context - Step 2", False, f"AI did not provide J1 Math info for Marine Parade: {ai_response2[:200]}...")
            return False
            
        time.sleep(2)
        
        # Test J2 Math → Bishan flow
        print("Testing J2 Math → Bishan context flow...")
        session_id2 = str(uuid.uuid4())
        
        # Step 1: Ask about J2 math
        response3 = self.send_chat_message("J2 math", session_id2)
        if "error" in response3:
            self.log_test("J2 Math Context - Step 1", False, f"API Error: {response3['error']}")
            return False
            
        ai_response3 = response3.get("response", "").lower()
        
        # Should ask for location
        if "which location" in ai_response3 or "location" in ai_response3:
            self.log_test("J2 Math Context - Step 1", True, "AI correctly asked for location")
        else:
            self.log_test("J2 Math Context - Step 1", False, f"AI did not ask for location: {ai_response3[:200]}...")
            return False
            
        time.sleep(1)
        
        # Step 2: Reply with Bishan
        response4 = self.send_chat_message("Bishan", session_id2)
        if "error" in response4:
            self.log_test("J2 Math Context - Step 2", False, f"API Error: {response4['error']}")
            return False
            
        ai_response4 = response4.get("response", "").lower()
        
        # Should provide J2 Math details for Bishan (NOT ask what subject)
        if "which subject" in ai_response4 or "what subject" in ai_response4:
            self.log_test("J2 Math Context - Step 2", False, "AI incorrectly asked about subject after context was established")
            return False
        elif "$444.72" in ai_response4 and "j2 math" in ai_response4:
            self.log_test("J2 Math Context - Step 2", True, "AI correctly provided J2 Math details for Bishan")
            return True
        else:
            self.log_test("J2 Math Context - Step 2", False, f"AI did not provide J2 Math info for Bishan: {ai_response4[:200]}...")
            return False

    def test_primary_math_context(self):
        """Test Primary Math context memory flows"""
        session_id = str(uuid.uuid4())
        
        # Test P6 Math → Punggol flow
        print("Testing P6 Math → Punggol context flow...")
        
        # Step 1: Ask about P6 math
        response1 = self.send_chat_message("P6 math", session_id)
        if "error" in response1:
            self.log_test("P6 Math Context - Step 1", False, f"API Error: {response1['error']}")
            return False
            
        ai_response1 = response1.get("response", "").lower()
        
        # Should ask for location
        if "which location" in ai_response1 or "location" in ai_response1:
            self.log_test("P6 Math Context - Step 1", True, "AI correctly asked for location")
        else:
            self.log_test("P6 Math Context - Step 1", False, f"AI did not ask for location: {ai_response1[:200]}...")
            return False
            
        time.sleep(1)
        
        # Step 2: Reply with Punggol
        response2 = self.send_chat_message("Punggol", session_id)
        if "error" in response2:
            self.log_test("P6 Math Context - Step 2", False, f"API Error: {response2['error']}")
            return False
            
        ai_response2 = response2.get("response", "").lower()
        
        # Should provide P6 Math details for Punggol
        if "which subject" in ai_response2 or "what subject" in ai_response2:
            self.log_test("P6 Math Context - Step 2", False, "AI incorrectly asked about subject after context was established")
            return False
        elif "$357.52" in ai_response2 and ("p6" in ai_response2 or "primary 6" in ai_response2):
            self.log_test("P6 Math Context - Step 2", True, "AI correctly provided P6 Math details for Punggol")
        else:
            self.log_test("P6 Math Context - Step 2", False, f"AI did not provide P6 Math info for Punggol: {ai_response2[:200]}...")
            return False
            
        time.sleep(2)
        
        # Test P5 Math → Jurong flow
        print("Testing P5 Math → Jurong context flow...")
        session_id2 = str(uuid.uuid4())
        
        # Step 1: Ask about P5 math
        response3 = self.send_chat_message("P5 math", session_id2)
        if "error" in response3:
            self.log_test("P5 Math Context - Step 1", False, f"API Error: {response3['error']}")
            return False
            
        ai_response3 = response3.get("response", "").lower()
        
        # Should ask for location
        if "which location" in ai_response3 or "location" in ai_response3:
            self.log_test("P5 Math Context - Step 1", True, "AI correctly asked for location")
        else:
            self.log_test("P5 Math Context - Step 1", False, f"AI did not ask for location: {ai_response3[:200]}...")
            return False
            
        time.sleep(1)
        
        # Step 2: Reply with Jurong
        response4 = self.send_chat_message("Jurong", session_id2)
        if "error" in response4:
            self.log_test("P5 Math Context - Step 2", False, f"API Error: {response4['error']}")
            return False
            
        ai_response4 = response4.get("response", "").lower()
        
        # Should provide P5 Math details for Jurong
        if "which subject" in ai_response4 or "what subject" in ai_response4:
            self.log_test("P5 Math Context - Step 2", False, "AI incorrectly asked about subject after context was established")
            return False
        elif "$346.62" in ai_response4 and ("p5" in ai_response4 or "primary 5" in ai_response4):
            self.log_test("P5 Math Context - Step 2", True, "AI correctly provided P5 Math details for Jurong")
            return True
        else:
            self.log_test("P5 Math Context - Step 2", False, f"AI did not provide P5 Math info for Jurong: {ai_response4[:200]}...")
            return False

    def test_secondary_math_context(self):
        """Test Secondary Math context memory flows"""
        session_id = str(uuid.uuid4())
        
        # Test S3 Math → Marine Parade flow
        print("Testing S3 Math → Marine Parade context flow...")
        
        # Step 1: Ask about S3 math
        response1 = self.send_chat_message("S3 math", session_id)
        if "error" in response1:
            self.log_test("S3 Math Context - Step 1", False, f"API Error: {response1['error']}")
            return False
            
        ai_response1 = response1.get("response", "").lower()
        
        # Should ask for location or clarify EMath/AMath
        if "which location" in ai_response1 or "location" in ai_response1 or "emath" in ai_response1 or "amath" in ai_response1:
            self.log_test("S3 Math Context - Step 1", True, "AI correctly asked for location or math type clarification")
        else:
            self.log_test("S3 Math Context - Step 1", False, f"AI did not ask for location or math type: {ai_response1[:200]}...")
            return False
            
        time.sleep(1)
        
        # Step 2: Reply with Marine Parade
        response2 = self.send_chat_message("Marine Parade", session_id)
        if "error" in response2:
            self.log_test("S3 Math Context - Step 2", False, f"API Error: {response2['error']}")
            return False
            
        ai_response2 = response2.get("response", "").lower()
        
        # Should provide S3 math options for Marine Parade
        if ("emath" in ai_response2 or "amath" in ai_response2) and ("$343.35" in ai_response2 or "$397.85" in ai_response2):
            self.log_test("S3 Math Context - Step 2", True, "AI correctly provided S3 math options for Marine Parade")
        else:
            self.log_test("S3 Math Context - Step 2", False, f"AI did not provide S3 math options for Marine Parade: {ai_response2[:200]}...")
            return False
            
        time.sleep(2)
        
        # Test S4 EMath → Kovan flow
        print("Testing S4 EMath → Kovan context flow...")
        session_id2 = str(uuid.uuid4())
        
        # Step 1: Ask about S4 EMath
        response3 = self.send_chat_message("S4 EMath", session_id2)
        if "error" in response3:
            self.log_test("S4 EMath Context - Step 1", False, f"API Error: {response3['error']}")
            return False
            
        ai_response3 = response3.get("response", "").lower()
        
        # Should ask for location
        if "which location" in ai_response3 or "location" in ai_response3:
            self.log_test("S4 EMath Context - Step 1", True, "AI correctly asked for location")
        else:
            self.log_test("S4 EMath Context - Step 1", False, f"AI did not ask for location: {ai_response3[:200]}...")
            return False
            
        time.sleep(1)
        
        # Step 2: Reply with Kovan
        response4 = self.send_chat_message("Kovan", session_id2)
        if "error" in response4:
            self.log_test("S4 EMath Context - Step 2", False, f"API Error: {response4['error']}")
            return False
            
        ai_response4 = response4.get("response", "").lower()
        
        # Should provide S4 EMath details for Kovan
        if "which subject" in ai_response4 or "what subject" in ai_response4:
            self.log_test("S4 EMath Context - Step 2", False, "AI incorrectly asked about subject after context was established")
            return False
        elif "$408.75" in ai_response4 and ("s4" in ai_response4 or "secondary 4" in ai_response4) and "emath" in ai_response4:
            self.log_test("S4 EMath Context - Step 2", True, "AI correctly provided S4 EMath details for Kovan")
            return True
        else:
            self.log_test("S4 EMath Context - Step 2", False, f"AI did not provide S4 EMath info for Kovan: {ai_response4[:200]}...")
            return False

    def test_location_first_context(self):
        """Test location-first context memory flows"""
        session_id = str(uuid.uuid4())
        
        # Test Marine Parade → J1 Math flow
        print("Testing Marine Parade → J1 Math context flow...")
        
        # Step 1: Ask about classes at Marine Parade
        response1 = self.send_chat_message("Classes at Marine Parade", session_id)
        if "error" in response1:
            self.log_test("Location-First Context - Step 1", False, f"API Error: {response1['error']}")
            return False
            
        ai_response1 = response1.get("response", "").lower()
        
        # Should ask which subject/level
        if "which subject" in ai_response1 or "which level" in ai_response1 or "what subject" in ai_response1:
            self.log_test("Location-First Context - Step 1", True, "AI correctly asked for subject/level")
        else:
            self.log_test("Location-First Context - Step 1", False, f"AI did not ask for subject/level: {ai_response1[:200]}...")
            return False
            
        time.sleep(1)
        
        # Step 2: Reply with J1 Math
        response2 = self.send_chat_message("J1 Math", session_id)
        if "error" in response2:
            self.log_test("Location-First Context - Step 2", False, f"API Error: {response2['error']}")
            return False
            
        ai_response2 = response2.get("response", "").lower()
        
        # Should provide J1 Math details for Marine Parade
        if "which location" in ai_response2:
            self.log_test("Location-First Context - Step 2", False, "AI incorrectly asked about location after context was established")
            return False
        elif "$401.12" in ai_response2 and "j1 math" in ai_response2 and "marine parade" in ai_response2:
            self.log_test("Location-First Context - Step 2", True, "AI correctly provided J1 Math details for Marine Parade")
        else:
            self.log_test("Location-First Context - Step 2", False, f"AI did not provide J1 Math info for Marine Parade: {ai_response2[:200]}...")
            return False
            
        time.sleep(2)
        
        # Test Bishan → P6 Science flow
        print("Testing Bishan → P6 Science context flow...")
        session_id2 = str(uuid.uuid4())
        
        # Step 1: Ask about what's at Bishan
        response3 = self.send_chat_message("What's at Bishan", session_id2)
        if "error" in response3:
            self.log_test("Location-First Context - Step 3", False, f"API Error: {response3['error']}")
            return False
            
        ai_response3 = response3.get("response", "").lower()
        
        # Should ask which subject/level
        if "which subject" in ai_response3 or "which level" in ai_response3 or "what subject" in ai_response3:
            self.log_test("Location-First Context - Step 3", True, "AI correctly asked for subject/level")
        else:
            self.log_test("Location-First Context - Step 3", False, f"AI did not ask for subject/level: {ai_response3[:200]}...")
            return False
            
        time.sleep(1)
        
        # Step 2: Reply with P6 Science
        response4 = self.send_chat_message("P6 Science", session_id2)
        if "error" in response4:
            self.log_test("Location-First Context - Step 4", False, f"API Error: {response4['error']}")
            return False
            
        ai_response4 = response4.get("response", "").lower()
        
        # Should provide P6 Science details for Bishan
        if "which location" in ai_response4:
            self.log_test("Location-First Context - Step 4", False, "AI incorrectly asked about location after context was established")
            return False
        elif "$313.92" in ai_response4 and ("p6" in ai_response4 or "primary 6" in ai_response4) and "science" in ai_response4:
            self.log_test("Location-First Context - Step 4", True, "AI correctly provided P6 Science details for Bishan")
            return True
        else:
            self.log_test("Location-First Context - Step 4", False, f"AI did not provide P6 Science info for Bishan: {ai_response4[:200]}...")
            return False

    def test_response_formatting_with_context(self):
        """Test that context responses have proper formatting with emojis and line breaks"""
        session_id = str(uuid.uuid4())
        
        # Test formatted response after context flow
        response1 = self.send_chat_message("P6 math", session_id)
        if "error" in response1:
            self.log_test("Context Response Formatting - Step 1", False, f"API Error: {response1['error']}")
            return False
            
        time.sleep(1)
        
        response2 = self.send_chat_message("Marine Parade", session_id)
        if "error" in response2:
            self.log_test("Context Response Formatting - Step 2", False, f"API Error: {response2['error']}")
            return False
            
        ai_response = response2.get("response", "")
        
        # Check for proper formatting
        has_emojis = any(emoji in ai_response for emoji in ["📊", "💰", "📅", "👨‍🏫", "🎓", "📚"])
        has_line_breaks = "\n" in ai_response
        no_raw_newlines = "\\n" not in ai_response
        
        if has_emojis and has_line_breaks and no_raw_newlines:
            self.log_test("Context Response Formatting", True, "Response has proper formatting with emojis and line breaks")
            return True
        else:
            self.log_test("Context Response Formatting", False, f"Response formatting issues - Emojis: {has_emojis}, Line breaks: {has_line_breaks}, No raw \\n: {no_raw_newlines}")
            return False

    def run_all_context_tests(self):
        """Run all context memory tests and provide summary"""
        print("🧠 Starting RMSS AI Chatbot Context Memory Tests")
        print("=" * 70)
        
        # Run all context memory tests
        self.test_j1_j2_math_context()
        self.test_primary_math_context()
        self.test_secondary_math_context()
        self.test_location_first_context()
        self.test_response_formatting_with_context()
        
        # Summary
        print("=" * 70)
        print("📊 CONTEXT MEMORY TEST SUMMARY")
        print("=" * 70)
        
        passed_tests = [test for test in self.test_results if test["passed"]]
        failed_tests = [test for test in self.test_results if not test["passed"]]
        
        print(f"✅ PASSED: {len(passed_tests)}")
        print(f"❌ FAILED: {len(failed_tests)}")
        print(f"📈 SUCCESS RATE: {len(passed_tests)}/{len(self.test_results)} ({len(passed_tests)/len(self.test_results)*100:.1f}%)")
        
        if failed_tests:
            print("\n🔍 FAILED TESTS DETAILS:")
            for test in failed_tests:
                print(f"   ❌ {test['test']}: {test['details']}")
        
        return len(failed_tests) == 0

if __name__ == "__main__":
    tester = ContextMemoryTester()
    success = tester.run_all_context_tests()
    
    if success:
        print("\n🎉 ALL CONTEXT MEMORY TESTS PASSED! Context memory system is working correctly.")
    else:
        print("\n⚠️  SOME CONTEXT MEMORY TESTS FAILED. Check details above.")