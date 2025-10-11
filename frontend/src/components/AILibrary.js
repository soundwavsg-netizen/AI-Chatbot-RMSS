import React, { useState } from 'react';

const AILibrary = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const conversationPatterns = {
    contextMemory: {
      title: "Context Memory System",
      description: "Proven patterns for maintaining conversation flow",
      examples: [
        {
          scenario: "Subject → Location Flow",
          correct: `User: "J1 math"
AI: "Which location interests you for J1 Math?"  
User: "Marine Parade"
AI: "📊 J1 Math at Marine Parade: $401.12/month..."`,
          wrong: `User: "J1 math"
AI: "Which location interests you?"
User: "Marine Parade" 
AI: "Which subject interests you at Marine Parade?" ❌`
        }
      ]
    },
    noInfoDumping: {
      title: "Progressive Disclosure",
      description: "Prevent information overload with smart clarification",
      examples: [
        {
          scenario: "Location Inquiry",
          correct: `User: "Classes at Marine Parade?"
AI: "Which level interests you? 📚 Primary (P2-P6), 🏫 Secondary (S1-S4), 🎓 JC (J1-J2)"`,
          wrong: `User: "Classes at Marine Parade?"
AI: "Here are all classes: P3 Math $277.95, P3 Science $277.95, P4 Math..." ❌`
        }
      ]
    },
    smartFormatting: {
      title: "Professional Response Formatting",
      description: "Mobile-optimized responses with emojis and structure",
      examples: [
        {
          scenario: "Pricing Response",
          correct: `📊 P6 Mathematics:
💰 Fee: $357.52/month
📅 Schedule: 2 lessons × 1.5 hours/week  
👨‍🏫 Tutors: Mr David Lim (Marine Parade)
📍 Locations: Available at all 5 centers

Would you like details on a specific location? 😊`,
          wrong: `P6 Mathematics costs $357.52 per month for 2 lessons per week of 1.5 hours each taught by Mr David Lim at Marine Parade and other locations. ❌`
        }
      ]
    }
  };

  const industryTemplates = {
    education: {
      title: "Education Industry Template",
      client: "RMSS (Proven Success)",
      patterns: [
        "Level-based inquiry flow (P1-P6, S1-S4, JC1-JC2)",
        "Subject-specific pricing and schedules", 
        "Tutor assignments by location",
        "Holiday and fee settlement information",
        "Enrollment and trial lesson processes"
      ],
      pricing: {
        setup: "$8,000-12,000",
        monthly: "$800-1,200",
        features: "AI training, PDF integration, context memory, mobile UI"
      }
    },
    healthcare: {
      title: "Healthcare Industry Template",
      client: "Ready for M Supplies",
      patterns: [
        "Product category classification (Devices, Pharmaceuticals, PPE)",
        "Inventory availability checking",
        "Order process and minimum quantities",
        "Compliance and certification information",
        "Technical support and troubleshooting"
      ],
      pricing: {
        setup: "$6,000-10,000", 
        monthly: "$600-1,000",
        features: "Product database, order tracking, compliance alerts"
      }
    },
    retail: {
      title: "Retail Industry Template",
      client: "Available for Fashion/Electronics",
      patterns: [
        "Product search and filtering",
        "Price comparison and promotions",
        "Stock availability and shipping",
        "Return and warranty policies", 
        "Size/specification guidance"
      ],
      pricing: {
        setup: "$5,000-8,000",
        monthly: "$500-800", 
        features: "Inventory integration, order tracking, customer support"
      }
    },
    professional: {
      title: "Professional Services Template", 
      client: "Available for Law/Accounting/Consulting",
      patterns: [
        "Service category identification",
        "Consultation booking and scheduling",
        "Document requirement checklists",
        "Fee structures and billing information",
        "Case status and progress updates"
      ],
      pricing: {
        setup: "$7,000-12,000",
        monthly: "$700-1,200",
        features: "Appointment booking, document management, client portal"
      }
    }
  };

  const TabButton = ({ id, title, active, onClick }) => (
    <button
      onClick={() => onClick(id)}
      className={`px-6 py-3 font-medium text-sm rounded-lg transition duration-200 ${
        active 
          ? 'bg-blue-600 text-white shadow-md' 
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      }`}
    >
      {title}
    </button>
  );

  const PatternCard = ({ pattern, title }) => (
    <div className="bg-white rounded-lg border-2 border-gray-200 p-6 mb-6">
      <h4 className="text-xl font-bold text-gray-900 mb-3">{pattern.title}</h4>
      <p className="text-gray-600 mb-4">{pattern.description}</p>
      
      {pattern.examples.map((example, index) => (
        <div key={index} className="mb-4">
          <h5 className="font-semibold text-gray-800 mb-2">Scenario: {example.scenario}</h5>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
              <h6 className="font-medium text-green-800 mb-2">✅ Correct Approach:</h6>
              <pre className="text-sm text-green-700 whitespace-pre-wrap font-mono">
                {example.correct}
              </pre>
            </div>
            
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
              <h6 className="font-medium text-red-800 mb-2">❌ Wrong Approach:</h6>
              <pre className="text-sm text-red-700 whitespace-pre-wrap font-mono">
                {example.wrong}
              </pre>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-md border-b-4 border-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-3xl font-bold text-purple-600">CCC Digital AI Library</h1>
                <p className="text-sm text-gray-800 font-medium">Reusable AI Training Patterns & Industry Templates</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <a href="/" className="text-purple-600 hover:text-purple-700 px-3 py-2 text-sm font-medium">
                ← Back to Main
              </a>
              <a href="/widgets/rmss" className="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700">
                RMSS Demo
              </a>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            AI Training <span className="text-purple-600">Knowledge Base</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-4xl mx-auto">
            Proven conversation patterns, industry templates, and AI training frameworks 
            developed from successful client implementations. Never rebuild the same solutions twice.
          </p>
          
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 max-w-3xl mx-auto text-left">
            <h3 className="font-bold text-yellow-800 mb-2">🎯 Framework Success Story</h3>
            <p className="text-yellow-700">
              <strong>RMSS Implementation:</strong> Solved context memory, information dumping, 
              and conversation flexibility issues. All patterns documented and reusable for future clients, 
              reducing development time by 60-70%.
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          <TabButton 
            id="overview" 
            title="📊 Overview" 
            active={activeTab === 'overview'} 
            onClick={setActiveTab} 
          />
          <TabButton 
            id="patterns" 
            title="🧠 Conversation Patterns" 
            active={activeTab === 'patterns'} 
            onClick={setActiveTab} 
          />
          <TabButton 
            id="industries" 
            title="🏢 Industry Templates" 
            active={activeTab === 'industries'} 
            onClick={setActiveTab} 
          />
          <TabButton 
            id="pricing" 
            title="💰 Pricing Strategy" 
            active={activeTab === 'pricing'} 
            onClick={setActiveTab} 
          />
          <TabButton 
            id="deployment" 
            title="🚀 Deployment Guide" 
            active={activeTab === 'deployment'} 
            onClick={setActiveTab} 
          />
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div>
            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">AI Training Framework Overview</h3>
              
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="text-5xl mb-4">🧠</div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">Proven Patterns</h4>
                  <p className="text-gray-600">Context memory, progressive disclosure, smart formatting - all tested and working with RMSS</p>
                </div>
                
                <div className="text-center">
                  <div className="text-5xl mb-4">🏢</div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">Industry Templates</h4>
                  <p className="text-gray-600">Ready-to-use frameworks for Education, Healthcare, Retail, Professional Services</p>
                </div>
                
                <div className="text-center">
                  <div className="text-5xl mb-4">⚡</div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">60-70% Faster</h4>
                  <p className="text-gray-600">Reduce development time per client from 75-115 hours to 20-35 hours</p>
                </div>
              </div>
            </div>

            {/* Success Metrics */}
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg p-8 mb-8">
              <h3 className="text-2xl font-bold mb-4">RMSS Implementation Success</h3>
              <div className="grid md:grid-cols-4 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold">✅ 100%</div>
                  <div className="text-green-100">Context Memory Fixed</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">🚫 0%</div>
                  <div className="text-green-100">Information Dumping</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">📚 100%</div>
                  <div className="text-green-100">PDF Data Accuracy</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">💬 24/7</div>
                  <div className="text-green-100">Availability</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Conversation Patterns Tab */}
        {activeTab === 'patterns' && (
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Proven Conversation Patterns</h3>
            <p className="text-gray-600 mb-8">
              These patterns were developed and refined through the RMSS implementation. 
              They solve common AI chatbot issues and can be reused across all client projects.
            </p>

            {Object.entries(conversationPatterns).map(([key, pattern]) => (
              <PatternCard key={key} pattern={pattern} />
            ))}

            {/* Additional Patterns */}
            <div className="bg-white rounded-lg border-2 border-gray-200 p-6 mb-6">
              <h4 className="text-xl font-bold text-gray-900 mb-3">Authentication Flow Patterns</h4>
              <p className="text-gray-600 mb-4">Secure user verification and personal data access</p>
              
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded mb-4">
                <h5 className="font-medium text-blue-800 mb-2">Web Authentication:</h5>
                <pre className="text-sm text-blue-700 whitespace-pre-wrap">
{`Student ID + Password → JWT Session → Personal Data Access
Session expires in 30 minutes for security`}
                </pre>
              </div>

              <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
                <h5 className="font-medium text-green-800 mb-2">WhatsApp Authentication:</h5>
                <pre className="text-sm text-green-700 whitespace-pre-wrap">
{`Student ID + Phone → OTP Verification → Secure Session
OTP expires in 5 minutes, max 3 attempts`}
                </pre>
              </div>
            </div>
          </div>
        )}

        {/* Industry Templates Tab */}
        {activeTab === 'industries' && (
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Industry-Specific Templates</h3>
            <p className="text-gray-600 mb-8">
              Ready-to-deploy frameworks customized for different industries. 
              Each template includes proven conversation patterns plus industry-specific features.
            </p>

            <div className="grid gap-8">
              {Object.entries(industryTemplates).map(([key, template]) => (
                <div key={key} className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-purple-500">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="text-xl font-bold text-gray-900">{template.title}</h4>
                      <p className="text-purple-600 font-medium">{template.client}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-500">Setup: {template.pricing.setup}</div>
                      <div className="text-sm text-gray-500">Monthly: {template.pricing.monthly}</div>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h5 className="font-semibold text-gray-800 mb-3">Conversation Patterns:</h5>
                      <ul className="space-y-2">
                        {template.patterns.map((pattern, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-purple-500 mt-1">•</span>
                            <span className="text-gray-700 text-sm">{pattern}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h5 className="font-semibold text-gray-800 mb-3">Technical Features:</h5>
                      <div className="text-sm text-gray-700">
                        {template.pricing.features}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Pricing Strategy Tab */}
        {activeTab === 'pricing' && (
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Pricing Strategy Framework</h3>
            
            {/* Service Packages */}
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="bg-white rounded-lg shadow-lg p-6 border-t-4 border-green-500">
                <h4 className="text-xl font-bold text-green-600 mb-4">🔰 BASIC WIDGET</h4>
                <div className="space-y-3 mb-6">
                  <div>Static FAQ responses</div>
                  <div>Basic embedding</div>
                  <div>Standard UI design</div>
                  <div>Email support</div>
                </div>
                <div className="border-t pt-4">
                  <div className="text-2xl font-bold text-gray-900">$3K-5K</div>
                  <div className="text-gray-500">setup</div>
                  <div className="text-xl font-bold text-gray-900 mt-2">$300-500</div>
                  <div className="text-gray-500">monthly</div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 border-t-4 border-blue-500 ring-2 ring-blue-200">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="text-xl font-bold text-blue-600">📚 INTERMEDIATE</h4>
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium">MOST POPULAR</span>
                </div>
                <div className="space-y-3 mb-6">
                  <div>AI-powered responses (GPT-4o)</div>
                  <div>Context-aware conversations</div>
                  <div>PDF/file knowledge base</div>
                  <div>Custom branding</div>
                  <div>Mobile-responsive</div>
                  <div>Priority support</div>
                </div>
                <div className="border-t pt-4">
                  <div className="text-2xl font-bold text-gray-900">$8K-12K</div>
                  <div className="text-gray-500">setup</div>
                  <div className="text-xl font-bold text-gray-900 mt-2">$800-1,200</div>
                  <div className="text-gray-500">monthly</div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 border-t-4 border-purple-500">
                <h4 className="text-xl font-bold text-purple-600 mb-4">🔐 ADVANCED</h4>
                <div className="space-y-3 mb-6">
                  <div>Everything in Intermediate +</div>
                  <div>User authentication</div>
                  <div>Database integration</div>
                  <div>Personal information access</div>
                  <div>Security & audit logging</div>
                  <div>Admin dashboard</div>
                  <div>24/7 support</div>
                </div>
                <div className="border-t pt-4">
                  <div className="text-2xl font-bold text-gray-900">$12K-18K</div>
                  <div className="text-gray-500">setup</div>
                  <div className="text-xl font-bold text-gray-900 mt-2">$1,200-2,000</div>
                  <div className="text-gray-500">monthly</div>
                </div>
              </div>
            </div>

            {/* WhatsApp Pricing */}
            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <h4 className="text-2xl font-bold text-gray-900 mb-6">📱 WhatsApp Integration Add-Ons</h4>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="border rounded-lg p-6">
                  <h5 className="text-xl font-bold text-green-600 mb-4">💬 Basic WhatsApp (Baileys)</h5>
                  <ul className="space-y-2 mb-4">
                    <li>• Unofficial WhatsApp integration</li>
                    <li>• Same AI as web widget</li>
                    <li>• Basic message handling</li>
                    <li>• Cost-effective solution</li>
                  </ul>
                  <div className="border-t pt-4">
                    <div className="text-xl font-bold">+$2K-4K setup</div>
                    <div className="text-lg font-bold">+$300-500/month</div>
                  </div>
                </div>

                <div className="border rounded-lg p-6">
                  <h5 className="text-xl font-bold text-blue-600 mb-4">🏢 Advanced WhatsApp (Business API)</h5>
                  <ul className="space-y-2 mb-4">
                    <li>• Official WhatsApp Business API</li>
                    <li>• OTP verification</li>
                    <li>• Rich media, templates</li>
                    <li>• Push notifications</li>
                    <li>• Enterprise features</li>
                  </ul>
                  <div className="border-t pt-4">
                    <div className="text-xl font-bold">+$4K-8K setup</div>
                    <div className="text-lg font-bold">+$500-1,000/month</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Management Services */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h4 className="text-2xl font-bold text-gray-900 mb-6">🛠️ Management & Support Services</h4>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="border rounded-lg p-4">
                  <h5 className="font-bold text-gray-800 mb-3">Basic Support</h5>
                  <div className="text-2xl font-bold text-green-600 mb-2">$200-400</div>
                  <div className="text-sm text-gray-500 mb-4">per month</div>
                  <ul className="text-sm space-y-1">
                    <li>• Content updates</li>
                    <li>• Bug fixes</li>
                    <li>• Basic monitoring</li>
                    <li>• Email support</li>
                  </ul>
                </div>

                <div className="border-2 border-blue-200 rounded-lg p-4">
                  <h5 className="font-bold text-blue-600 mb-3">Professional</h5>
                  <div className="text-2xl font-bold text-blue-600 mb-2">$500-800</div>
                  <div className="text-sm text-gray-500 mb-4">per month</div>
                  <ul className="text-sm space-y-1">
                    <li>• Everything in Basic +</li>
                    <li>• Priority support (4hr)</li>
                    <li>• Monthly reports</li>
                    <li>• Feature requests</li>
                    <li>• Phone support</li>
                  </ul>
                </div>

                <div className="border rounded-lg p-4">
                  <h5 className="font-bold text-purple-600 mb-3">Enterprise</h5>
                  <div className="text-2xl font-bold text-purple-600 mb-2">$800-1,500</div>
                  <div className="text-sm text-gray-500 mb-4">per month</div>
                  <ul className="text-sm space-y-1">
                    <li>• Everything in Professional +</li>
                    <li>• Dedicated account manager</li>
                    <li>• Custom development</li>
                    <li>• 24/7 emergency support</li>
                    <li>• Quarterly reviews</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Conversation Patterns Tab */}
        {activeTab === 'patterns' && (
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Reusable Conversation Patterns</h3>
            <p className="text-gray-600 mb-8">
              These patterns were developed and tested with RMSS. They solve the most common 
              AI chatbot issues and can be applied to any industry with minor customization.
            </p>

            {Object.entries(conversationPatterns).map(([key, pattern]) => (
              <PatternCard key={key} pattern={pattern} />
            ))}

            {/* Code Template */}
            <div className="bg-gray-900 text-gray-100 rounded-lg p-6 overflow-x-auto">
              <h4 className="text-lg font-bold mb-4 text-gray-100">🔧 Reusable System Message Template</h4>
              <pre className="text-sm">
{`# Base conversation rules (proven with RMSS)
BASE_CONVERSATION_RULES = """
CRITICAL CONVERSATION GUIDELINES:

1. PROGRESSIVE DISCLOSURE - Never dump information:
   - Generic questions → Ask for specifics  
   - "Tell me about X location" → "Which service interests you at X?"
   - Only provide detailed info when user specifies BOTH category AND location

2. CONTEXT MEMORY - Remember conversation flow:
   - If user answers your question, provide what they asked for
   - Track subject + location combinations
   - Never ask the same question twice

3. SMART FORMATTING:
   - Use emojis as visual separators
   - Line breaks between information types
   - Mobile-friendly short paragraphs
"""

# Industry-specific customization  
def create_system_message(client_name, industry, client_data):
    return f"""
    You are an AI assistant for {client_name}.
    
    {BASE_CONVERSATION_RULES}
    {INDUSTRY_RULES[industry]}
    {client_data}
    """
`}
              </pre>
            </div>
          </div>
        )}

        {/* Industry Templates Tab */}
        {activeTab === 'industries' && (
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Industry Templates</h3>
            
            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg mb-8">
              <h4 className="font-bold text-blue-800 mb-2">🎓 Education Template (RMSS Proven)</h4>
              <p className="text-blue-700 mb-4">
                Fully developed and tested with RMSS. Ready for immediate deployment to other tuition centers.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-semibold mb-2">Conversation Patterns:</h5>
                  <ul className="text-sm space-y-1">
                    <li>• Level-based inquiry flow (P1-P6, S1-S4, JC)</li>
                    <li>• Subject-specific pricing queries</li>
                    <li>• Location and schedule coordination</li>
                    <li>• Tutor assignment information</li>
                    <li>• Holiday and fee settlement calendars</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-semibold mb-2">Technical Features:</h5>
                  <ul className="text-sm space-y-1">
                    <li>• PDF data extraction and integration</li>
                    <li>• Student authentication and personal data</li>
                    <li>• Context memory across conversation</li>
                    <li>• Mobile-optimized responses</li>
                    <li>• WhatsApp Business API ready</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Other Industry Templates */}
            {Object.entries(industryTemplates).slice(1).map(([key, template]) => (
              <div key={key} className="bg-white rounded-lg shadow-lg p-6 mb-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="text-xl font-bold text-gray-900">{template.title}</h4>
                    <p className="text-gray-600">{template.client}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-blue-600">{template.pricing.setup}</div>
                    <div className="text-sm text-gray-500">{template.pricing.monthly}/month</div>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-semibold text-gray-800 mb-3">Ready Patterns:</h5>
                    <ul className="space-y-2">
                      {template.patterns.map((pattern, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <span className="text-blue-500 mt-1">•</span>
                          <span className="text-gray-700">{pattern}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-800 mb-3">Includes:</h5>
                    <div className="text-sm text-gray-700">{template.pricing.features}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Deployment Guide Tab */}
        {activeTab === 'deployment' && (
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Deployment Architecture</h3>
            
            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <h4 className="text-xl font-bold text-gray-900 mb-4">🌐 Multi-Client Domain Structure</h4>
              
              <div className="bg-gray-100 rounded-lg p-6 mb-6">
                <pre className="text-sm text-gray-800">
{`cccdigital.sg/                     (Your main business website - UNCHANGED)
cccdigital.sg/about/               (Your existing pages - UNCHANGED)  
cccdigital.sg/services/            (Your existing pages - UNCHANGED)

cccdigital.sg/widgets/             (Widget service showcase)
cccdigital.sg/widgets/rmss/        (RMSS chatbot)
cccdigital.sg/widgets/msupplies/   (M Supplies chatbot)  
cccdigital.sg/widgets/ace/         (Ace Learning chatbot)
cccdigital.sg/widgets/demo/        (Demo for prospects)`}
                </pre>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h5 className="font-bold text-gray-800 mb-3">✅ Benefits:</h5>
                  <ul className="space-y-2 text-sm">
                    <li>• No additional domain costs</li>
                    <li>• Professional widget service branding</li>
                    <li>• Easy to add new clients</li>
                    <li>• SEO benefits for widget keywords</li>
                    <li>• Complete isolation between clients</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-bold text-gray-800 mb-3">🛡️ Isolation:</h5>
                  <ul className="space-y-2 text-sm">
                    <li>• Separate databases per client</li>
                    <li>• Independent deployment pipelines</li>
                    <li>• Client-specific configurations</li>
                    <li>• Zero cross-contamination</li>
                    <li>• Independent updates and maintenance</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Cost Structure */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h4 className="text-xl font-bold text-gray-900 mb-6">💰 Hosting Cost Structure</h4>
              
              <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded">
                <h5 className="font-bold text-green-800 mb-2">Fixed Hosting Cost: 50 Credits/Month</h5>
                <p className="text-green-700 mb-4">
                  Emergent charges per application, not per page or usage. Your hosting cost stays 
                  the same regardless of number of clients or traffic volume.
                </p>
                
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div className="bg-white p-3 rounded">
                    <div className="font-bold">Current Cost</div>
                    <div>50 credits/month</div>
                  </div>
                  <div className="bg-white p-3 rounded">
                    <div className="font-bold">With 5 Clients</div>
                    <div>50 credits/month</div>
                  </div>
                  <div className="bg-white p-3 rounded">
                    <div className="font-bold">With 20 Clients</div>
                    <div>50 credits/month</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AILibrary;