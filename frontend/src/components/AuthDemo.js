import React, { useState } from 'react';
import StudentAuthWidget from './StudentAuthWidget';
import SimpleChatWidget from './SimpleChatWidget';

const AuthDemo = () => {
  const [showDemo, setShowDemo] = useState(false);
  const [authData, setAuthData] = useState(null);
  
  const handleAuthenticated = (authInfo) => {
    setAuthData(authInfo);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-md border-b-4 border-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-3xl font-bold text-blue-600">RMSS Authentication Demo</h1>
                <p className="text-sm text-gray-800 font-medium">Secure Student Database Integration</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <a href="/" className="text-blue-600 hover:text-blue-700 px-3 py-2 text-sm font-medium">
                ← Back to Main
              </a>
              <a href="/whatsapp" className="bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700">
                WhatsApp Demo
              </a>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Demo Introduction */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Student Authentication <span className="text-blue-600">Demo</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            This demo shows how RMSS students can securely access their personal information like fees, schedules, and enrollment details through the AI chatbot.
          </p>
        </div>

        {/* Security Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white p-6 rounded-lg border-2 border-blue-100 text-center">
            <div className="text-4xl mb-4">🔐</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Secure Authentication</h3>
            <p className="text-gray-600">Password login for web & OTP verification for WhatsApp access</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg border-2 border-blue-100 text-center">
            <div className="text-4xl mb-4">👨‍🎓</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Personal Information</h3>
            <p className="text-gray-600">Access fees, schedules, subjects, and enrollment details</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg border-2 border-blue-100 text-center">
            <div className="text-4xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Audit & Security</h3>
            <p className="text-gray-600">Complete access logs and session management</p>
          </div>
        </div>

        {/* Demo Students Info */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Demo Students Available</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="border rounded-lg p-4">
              <h4 className="font-bold text-blue-600 mb-2">Emily Tan (Primary 6)</h4>
              <div className="text-sm space-y-1">
                <div><strong>ID:</strong> ST001</div>
                <div><strong>Password:</strong> demo123</div>
                <div><strong>Phone:</strong> +6591234567</div>
                <div><strong>Subjects:</strong> P6 Math, P6 Science</div>
                <div><strong>Outstanding:</strong> $171.44</div>
              </div>
            </div>
            
            <div className="border rounded-lg p-4">
              <h4 className="font-bold text-blue-600 mb-2">Ryan Lee (Secondary 3)</h4>
              <div className="text-sm space-y-1">
                <div><strong>ID:</strong> ST002</div>
                <div><strong>Password:</strong> demo123</div>
                <div><strong>Phone:</strong> +6598765432</div>
                <div><strong>Subjects:</strong> S3 AMath, Chemistry</div>
                <div><strong>Outstanding:</strong> $0.00 (Paid)</div>
              </div>
            </div>
            
            <div className="border rounded-lg p-4">
              <h4 className="font-bold text-blue-600 mb-2">Sarah Chua (JC2)</h4>
              <div className="text-sm space-y-1">
                <div><strong>ID:</strong> ST003</div>
                <div><strong>Password:</strong> demo123</div>
                <div><strong>Phone:</strong> +6591111111</div>
                <div><strong>Subjects:</strong> J2 Mathematics</div>
                <div><strong>Outstanding:</strong> $244.72</div>
              </div>
            </div>
          </div>
        </div>

        {/* Demo Interface */}
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Interactive Demo</h3>
          <p className="text-gray-600 mb-6">
            Try logging in as any of the demo students to see how they can access their personal information securely.
          </p>
          
          {!showDemo ? (
            <button
              onClick={() => setShowDemo(true)}
              className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition duration-200"
            >
              🚀 Launch Authentication Demo
            </button>
          ) : (
            <div>
              <div className="flex justify-center mb-4">
                <button
                  onClick={() => setShowDemo(false)}
                  className="text-gray-500 hover:text-gray-700 text-sm"
                >
                  ← Close Demo
                </button>
              </div>
              
              {/* Authentication Demo Interface */}
              <div className="max-w-md mx-auto">
                <StudentAuthWidget 
                  onAuthenticated={handleAuthenticated}
                  onClose={() => setShowDemo(false)}
                />
              </div>
              
              {/* Show authenticated user info */}
              {authData && (
                <div className="mt-8 p-6 bg-green-50 rounded-lg border-2 border-green-200">
                  <h4 className="text-lg font-bold text-green-800 mb-2">
                    ✅ Authentication Successful!
                  </h4>
                  <p className="text-green-700">
                    Welcome, <strong>{authData.studentName}</strong>! 
                    You can now test personal information queries like:
                  </p>
                  <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
                    <div className="bg-white p-3 rounded border">
                      <strong>"Check my fees"</strong><br/>
                      <span className="text-gray-600">View outstanding balance</span>
                    </div>
                    <div className="bg-white p-3 rounded border">
                      <strong>"My schedule"</strong><br/>
                      <span className="text-gray-600">View class times</span>
                    </div>
                    <div className="bg-white p-3 rounded border">
                      <strong>"My profile"</strong><br/>
                      <span className="text-gray-600">View personal details</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Implementation Info */}
        <div className="mt-12 bg-gray-50 rounded-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Implementation Details</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-bold text-gray-800 mb-3">Security Features</h4>
              <ul className="space-y-2 text-gray-600">
                <li>• JWT-based session management</li>
                <li>• OTP verification for WhatsApp</li>
                <li>• Session expiration (30 minutes)</li>
                <li>• Rate limiting protection</li>
                <li>• Audit logging for all access</li>
                <li>• Field-level data encryption</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-gray-800 mb-3">Student Access Control</h4>
              <ul className="space-y-2 text-gray-600">
                <li>• Students can only access their own data</li>
                <li>• Phone number verification for OTP</li>
                <li>• Automatic session timeout</li>
                <li>• Secure password hashing (bcrypt)</li>
                <li>• No sensitive data exposure</li>
                <li>• RMSS maintains full control</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthDemo;