import React, { useState } from 'react';
import WhatsAppBot from './WhatsAppBot';

const WhatsAppDemo = () => {
  const [showDemo, setShowDemo] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      {/* Header */}
      <header className="bg-white shadow-md border-b-4 border-green-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-3xl font-bold text-green-600">RMSS WhatsApp Bot</h1>
                <p className="text-sm text-gray-800 font-medium">Option 3: WhatsApp Business Integration Demo</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          
          {/* Left Side - Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                WhatsApp Bot for <span className="text-green-600">RMSS</span>
              </h2>
              <p className="text-xl text-gray-600 mb-6">
                Experience how parents in Singapore will interact with RMSS through WhatsApp - the most popular messaging platform in the country.
              </p>
            </div>

            {/* Benefits */}
            <div className="bg-white p-6 rounded-lg border-2 border-green-100">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Key Benefits for RMSS</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-green-600 font-bold">📈</span>
                  <div>
                    <strong>Higher Engagement:</strong> 98% of Singapore parents use WhatsApp daily
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-green-600 font-bold">⚡</span>
                  <div>
                    <strong>Instant Responses:</strong> 24/7 availability for parent inquiries
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-green-600 font-bold">💰</span>
                  <div>
                    <strong>Lower Barriers:</strong> Easier for parents to ask questions vs phone calls
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-green-600 font-bold">🎯</span>
                  <div>
                    <strong>Smart Automation:</strong> Handles pricing, schedules, holidays automatically
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-green-600 font-bold">📊</span>
                  <div>
                    <strong>Better Analytics:</strong> Track inquiries, conversion rates, popular subjects
                  </div>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="bg-white p-6 rounded-lg border-2 border-green-100">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">WhatsApp-Specific Features</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-green-600">✓</span>
                  <span>Message status indicators (sent, delivered, read)</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-green-600">✓</span>
                  <span>Typing indicators for natural conversation flow</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-green-600">✓</span>
                  <span>Quick reply buttons for common questions</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-green-600">✓</span>
                  <span>Rich media support (images, PDFs, locations)</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-green-600">✓</span>
                  <span>Group messaging capabilities</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-green-600">✓</span>
                  <span>Voice message support</span>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Ready to Experience It?</h3>
              <p className="mb-4">Try the interactive demo and see how parents would chat with RMSS about courses, pricing, and schedules.</p>
              <button
                onClick={() => setShowDemo(true)}
                className="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition duration-200"
              >
                🚀 Launch WhatsApp Demo
              </button>
            </div>

            {/* Technical Info */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Implementation Details</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li><strong>Platform:</strong> WhatsApp Business API (official)</li>
                <li><strong>AI Engine:</strong> GPT-4 with complete RMSS knowledge base</li>
                <li><strong>Integration:</strong> Can connect to RMSS CRM and enrollment systems</li>
                <li><strong>Languages:</strong> English and basic Chinese support</li>
                <li><strong>Deployment:</strong> 2-3 weeks implementation time</li>
                <li><strong>Maintenance:</strong> Updates automatically with new pricing/schedules</li>
              </ul>
            </div>
          </div>

          {/* Right Side - Demo */}
          <div className="lg:sticky lg:top-8">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">Interactive Demo</h3>
              <p className="text-gray-600">Experience the WhatsApp bot from a parent's perspective</p>
            </div>

            {showDemo ? (
              <div>
                <WhatsAppBot />
                <div className="mt-4 text-center">
                  <button
                    onClick={() => setShowDemo(false)}
                    className="text-gray-500 hover:text-gray-700 text-sm"
                  >
                    ← Back to Overview
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-lg p-8 text-center">
                <div className="mb-6">
                  <div className="text-6xl mb-4">📱</div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">WhatsApp Interface</h4>
                  <p className="text-gray-600">Click below to see how parents would interact with RMSS through WhatsApp</p>
                </div>
                
                <div className="mb-6">
                  <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4">
                    <div className="flex items-center justify-center gap-2 text-green-700 font-medium">
                      <span>🌟</span>
                      <span>Same AI, WhatsApp Experience</span>
                    </div>
                    <p className="text-sm text-green-600 mt-2">
                      Complete RMSS knowledge: pricing, schedules, holidays, tutors, locations
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setShowDemo(true)}
                  className="w-full bg-green-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-700 transition duration-200"
                >
                  📲 Launch WhatsApp Demo
                </button>

                <div className="mt-4 text-xs text-gray-500">
                  * This is a functional demo with real AI responses
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Section - Comparison */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">
            Why WhatsApp Over Traditional Methods?
          </h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg border-2 border-gray-200">
              <div className="text-center mb-4">
                <div className="text-3xl mb-2">📞</div>
                <h4 className="font-semibold text-gray-800">Phone Calls</h4>
              </div>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Business hours only</li>
                <li>• Phone tag frustration</li>
                <li>• No message history</li>
                <li>• Language barriers</li>
                <li>• Staff availability issues</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg border-2 border-gray-200">
              <div className="text-center mb-4">
                <div className="text-3xl mb-2">💻</div>
                <h4 className="font-semibold text-gray-800">Website Chat</h4>
              </div>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Need to visit website</li>
                <li>• Desktop/laptop required</li>
                <li>• No push notifications</li>
                <li>• Easy to close/forget</li>
                <li>• Limited mobile experience</li>
              </ul>
            </div>

            <div className="bg-green-50 p-6 rounded-lg border-2 border-green-300">
              <div className="text-center mb-4">
                <div className="text-3xl mb-2">💬</div>
                <h4 className="font-semibold text-green-800">WhatsApp Bot</h4>
              </div>
              <ul className="text-sm text-green-700 space-y-2">
                <li>• 24/7 availability ✅</li>
                <li>• Instant responses ✅</li>
                <li>• Message history saved ✅</li>
                <li>• Mobile-first design ✅</li>
                <li>• Push notifications ✅</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatsAppDemo;