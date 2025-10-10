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

    def run_all_tests(self):
        """Run all tests and provide summary"""
        print("🚀 Starting RMSS AI Chatbot Backend Tests")
        print("=" * 60)
        
        # Run all tests
        self.test_basic_connectivity()
        self.test_chat_endpoint_basic()
        self.test_response_formatting()
        self.test_s1_math_pricing()
        self.test_holiday_dates_2026()
        self.test_tutor_assignments()
        self.test_comprehensive_pricing_data()
        self.test_context_awareness()
        self.test_location_specific_queries()
        self.test_fee_settlement_periods()
        
        # Summary
        print("=" * 60)
        print("📊 TEST SUMMARY")
        print("=" * 60)
        
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
    tester = RMSSChatbotTester()
    success = tester.run_all_tests()
    
    if success:
        print("\n🎉 ALL TESTS PASSED! Backend is working correctly.")
    else:
        print("\n⚠️  SOME TESTS FAILED. Check details above.")