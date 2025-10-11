import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import StudentAuthWidget from './StudentAuthWidget';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const SimpleChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const [authData, setAuthData] = useState(null); // For authenticated student
  const [showAuth, setShowAuth] = useState(false);
  const messagesEndRef = useRef(null);

  // Initial welcome message
  useEffect(() => {
    if (isOpen && !sessionId) {
      setSessionId(Date.now().toString());
      const welcomeMessage = authData 
        ? `Hi ${authData.studentName}! I can help you with your personal information like fees, schedules, and general RMSS inquiries. How can I assist you today?`
        : 'Hi! I am RMSS AI Assistant. I can help you with course information, enrollment inquiries, study tips, and more. How can I assist you today?';
        
      setMessages([{
        id: 'welcome',
        text: welcomeMessage,
        sender: 'bot',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    }
  }, [isOpen, sessionId, authData]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const cleanText = (text) => {
    if (!text || typeof text !== 'string') return '';
    // Only clean excessive whitespace, preserve intentional line breaks
    return text
      .replace(/\r\n/g, '\n')
      .replace(/\r/g, '\n')
      .trim();
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMsg = {
      id: Date.now().toString(),
      text: cleanText(inputMessage),
      sender: 'user',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const requestData = {
        message: cleanText(inputMessage),
        session_id: sessionId,
        user_type: authData ? 'student' : 'visitor'
      };
      
      // Add auth token if authenticated
      if (authData) {
        requestData.auth_token = authData.sessionToken;
      }
      
      const response = await axios.post(`${API}/chat`, requestData);

      const botMsg = {
        id: response.data.message_id || Date.now().toString(),
        text: cleanText(response.data.response || 'Sorry, I encountered an issue.'),
        sender: 'bot',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
      console.error('Chat error:', error);
      const errorMsg = {
        id: 'error-' + Date.now(),
        text: 'Sorry, I encountered an issue. Please try again or contact us at 6222 8222.',
        sender: 'bot',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const quickReplies = authData ? [
    "Check my fees",
    "My class schedule", 
    "Update my profile",
    "General course info"
  ] : [
    "What courses do you offer?",
    "Primary school pricing?",
    "Location and schedule?",
    "How to enroll?"
  ];

  const handleAuthenticated = (authInfo) => {
    setAuthData(authInfo);
    setShowAuth(false);
    setMessages([{
      id: 'auth-success',
      text: `Welcome back, ${authInfo.studentName}! I can now help you with your personal information. What would you like to know?`,
      sender: 'bot',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }]);
  };

  const handleLogout = () => {
    setAuthData(null);
    setMessages([{
      id: 'logout',
      text: 'You have been logged out. I can still help with general RMSS information. How can I assist you?',
      sender: 'bot', 
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }]);
  };

  return (
    <>
      {/* Chat Widget */}
      {isOpen && (
        <div style={{
          position: 'fixed',
          bottom: '80px',
          right: '24px',
          width: '384px',
          height: '500px',
          backgroundColor: 'white',
          borderRadius: '8px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          border: '1px solid #e5e7eb',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 50
        }}>
          {/* Header */}
          <div style={{
            background: 'linear-gradient(to right, #dc2626, #374151)',
            color: 'white',
            padding: '16px',
            borderRadius: '8px 8px 0 0',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '40px',
                height: '40px',
                backgroundColor: 'rgba(255,255,255,0.2)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px',
                fontWeight: 'bold'
              }}>
                AI
              </div>
              <div>
                <div style={{ fontWeight: '600' }}>RMSS Assistant</div>
                <div style={{ fontSize: '12px', color: 'rgba(252,165,165,1)' }}>
                  {authData ? `Logged in: ${authData.studentName}` : 'Always here to help'}
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              {authData && (
                <button
                  onClick={handleLogout}
                  style={{
                    color: 'rgba(255,255,255,0.8)',
                    background: 'none',
                    border: 'none',
                    padding: '4px 8px',
                    cursor: 'pointer',
                    borderRadius: '4px',
                    fontSize: '12px'
                  }}
                  onMouseOver={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.2)'}
                  onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
                >
                  Logout
                </button>
              )}
              {!authData && (
                <button
                  onClick={() => setShowAuth(true)}
                  style={{
                    color: 'rgba(255,255,255,0.8)',
                    background: 'none',
                    border: 'none', 
                    padding: '4px 8px',
                    cursor: 'pointer',
                    borderRadius: '4px',
                    fontSize: '12px'
                  }}
                  onMouseOver={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.2)'}
                  onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
                >
                  Student Login
                </button>
              )}
            <button
              onClick={toggleChat}
              style={{
                color: 'rgba(255,255,255,0.8)',
                background: 'none',
                border: 'none',
                padding: '4px',
                cursor: 'pointer',
                borderRadius: '4px'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.2)'}
              onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div style={{
            flex: 1,
            overflowY: 'auto',
            padding: '16px',
            backgroundColor: '#f9fafb'
          }}>
            {messages.map((msg, index) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                  marginBottom: '16px'
                }}
              >
                <div style={{
                  maxWidth: '80%',
                  padding: '12px',
                  borderRadius: '8px',
                  backgroundColor: msg.sender === 'user' ? '#dc2626' : 'white',
                  color: msg.sender === 'user' ? 'white' : '#1f2937',
                  border: msg.sender === 'bot' ? '1px solid #e5e7eb' : 'none',
                  borderBottomRightRadius: msg.sender === 'user' ? '4px' : '8px',
                  borderBottomLeftRadius: msg.sender === 'bot' ? '4px' : '8px'
                }}>
                  <div style={{
                    fontSize: '14px',
                    lineHeight: '1.4',
                    marginBottom: '4px',
                    wordWrap: 'break-word',
                    whiteSpace: 'pre-line'
                  }}>
                    {msg.text}
                  </div>
                  <div style={{
                    fontSize: '12px',
                    color: msg.sender === 'user' ? 'rgba(252,165,165,1)' : '#6b7280'
                  }}>
                    {msg.time}
                  </div>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '16px' }}>
                <div style={{
                  backgroundColor: '#f3f4f6',
                  borderRadius: '8px',
                  padding: '12px'
                }}>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    <div style={{
                      width: '8px',
                      height: '8px',
                      backgroundColor: '#9ca3af',
                      borderRadius: '50%',
                      animation: 'bounce 1.4s infinite'
                    }}></div>
                    <div style={{
                      width: '8px',
                      height: '8px',
                      backgroundColor: '#9ca3af',
                      borderRadius: '50%',
                      animation: 'bounce 1.4s infinite 0.2s'
                    }}></div>
                    <div style={{
                      width: '8px',
                      height: '8px',
                      backgroundColor: '#9ca3af',
                      borderRadius: '50%',
                      animation: 'bounce 1.4s infinite 0.4s'
                    }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Replies */}
          {messages.length <= 1 && !isLoading && (
            <div style={{ padding: '12px', borderTop: '1px solid #e5e7eb', backgroundColor: 'white' }}>
              <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '8px' }}>Quick questions:</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {quickReplies.map((reply, index) => (
                  <button
                    key={index}
                    onClick={() => setInputMessage(reply)}
                    style={{
                      backgroundColor: '#f3f4f6',
                      color: '#374151',
                      padding: '4px 12px',
                      borderRadius: '16px',
                      fontSize: '12px',
                      border: 'none',
                      cursor: 'pointer'
                    }}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#e5e7eb'}
                    onMouseOut={(e) => e.target.style.backgroundColor = '#f3f4f6'}
                  >
                    {reply}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div style={{ padding: '16px', borderTop: '1px solid #e5e7eb', backgroundColor: 'white', borderRadius: '0 0 8px 8px' }}>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                style={{
                  flex: 1,
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  padding: '8px 12px',
                  fontSize: '14px',
                  outline: 'none'
                }}
                onFocus={(e) => e.target.style.borderColor = '#dc2626'}
                onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                disabled={isLoading}
              />
              <button
                onClick={handleSendMessage}
                disabled={isLoading || !inputMessage.trim()}
                style={{
                  backgroundColor: '#dc2626',
                  color: 'white',
                  padding: '8px 16px',
                  borderRadius: '8px',
                  fontSize: '14px',
                  border: 'none',
                  cursor: isLoading || !inputMessage.trim() ? 'not-allowed' : 'pointer',
                  opacity: isLoading || !inputMessage.trim() ? 0.5 : 1
                }}
                onMouseOver={(e) => {
                  if (!isLoading && inputMessage.trim()) {
                    e.target.style.backgroundColor = '#b91c1c';
                  }
                }}
                onMouseOut={(e) => e.target.style.backgroundColor = '#dc2626'}
              >
                {isLoading ? '...' : '→'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Chat Button */}
      <button
        onClick={toggleChat}
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          width: '56px',
          height: '56px',
          background: 'linear-gradient(to right, #dc2626, #374151)',
          color: 'white',
          borderRadius: '50%',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '24px',
          zIndex: 40
        }}
        onMouseOver={(e) => e.target.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1)'}
        onMouseOut={(e) => e.target.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)'}
      >
        {isOpen ? '✕' : '💬'}
      </button>

      {/* Student Authentication Modal */}
      {showAuth && (
        <StudentAuthWidget 
          onAuthenticated={handleAuthenticated}
          onClose={() => setShowAuth(false)}
        />
      )}
    </>
  );
};

export default SimpleChatWidget;