import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const WhatsAppBot = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Initialize with welcome message
  useEffect(() => {
    const newSessionId = 'whatsapp-' + Date.now().toString();
    setSessionId(newSessionId);
    
    setTimeout(() => {
      setMessages([{
        id: 'welcome',
        text: '👋 Hello! I\'m RMSS AI Assistant.\n\nI can help you with:\n🎓 Course information & pricing\n📅 Class schedules & holidays\n📍 Location details\n💰 Fee payments & enrollment\n\nHow can I assist you today?',
        sender: 'bot',
        timestamp: new Date(),
        status: 'delivered'
      }]);
    }, 1000);
  }, []);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const cleanText = (text) => {
    if (!text || typeof text !== 'string') return '';
    return text
      .replace(/\\n/g, ' ')
      .replace(/\n/g, ' ')
      .replace(/\r\n/g, ' ')
      .replace(/\r/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMsg = {
      id: Date.now().toString(),
      text: inputMessage.trim(),
      sender: 'user',
      timestamp: new Date(),
      status: 'sent'
    };

    setMessages(prev => [...prev, userMsg]);
    setInputMessage('');
    setIsLoading(true);
    setIsTyping(true);

    // Simulate WhatsApp "message delivered" after a short delay
    setTimeout(() => {
      setMessages(prev => prev.map(msg => 
        msg.id === userMsg.id ? { ...msg, status: 'delivered' } : msg
      ));
    }, 500);

    try {
      // Simulate typing delay (realistic WhatsApp experience)
      await new Promise(resolve => setTimeout(resolve, 1500));

      const response = await axios.post(`${API}/chat`, {
        message: inputMessage.trim(),
        session_id: sessionId,
        user_type: 'whatsapp_parent'
      });

      const botMsg = {
        id: response.data.message_id || Date.now().toString(),
        text: cleanText(response.data.response || 'Sorry, I encountered an issue. Please try again or contact us at 6222 8222.'),
        sender: 'bot',
        timestamp: new Date(),
        status: 'delivered'
      };

      setMessages(prev => [...prev, botMsg]);

      // Mark user message as "read" when bot responds
      setTimeout(() => {
        setMessages(prev => prev.map(msg => 
          msg.id === userMsg.id ? { ...msg, status: 'read' } : msg
        ));
      }, 800);

    } catch (error) {
      console.error('WhatsApp Bot error:', error);
      const errorMsg = {
        id: 'error-' + Date.now(),
        text: 'Sorry, I encountered an issue. Please try again or contact us at 6222 8222.',
        sender: 'bot',
        timestamp: new Date(),
        status: 'delivered'
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickReplies = [
    "What courses do you offer? 🎓",
    "P6 Math pricing? 💰", 
    "Class locations? 📍",
    "Holiday schedule? 📅"
  ];

  const handleQuickReply = (message) => {
    setInputMessage(message);
    setTimeout(() => handleSendMessage(), 100);
  };

  // WhatsApp-style message status icons
  const getStatusIcon = (status) => {
    switch (status) {
      case 'sent':
        return '✓';
      case 'delivered':
        return '✓✓';
      case 'read':
        return <span style={{ color: '#4FC3F7' }}>✓✓</span>;
      default:
        return '';
    }
  };

  return (
    <div style={{
      maxWidth: '400px',
      margin: '0 auto',
      backgroundColor: '#e5ddd5',
      minHeight: '600px',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      position: 'relative',
      borderRadius: '8px',
      overflow: 'hidden',
      boxShadow: '0 4px 20px rgba(0,0,0,0.15)'
    }}>
      
      {/* WhatsApp Header */}
      <div style={{
        backgroundColor: '#075e54',
        color: 'white',
        padding: '12px 16px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
      }}>
        <div style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          backgroundColor: '#25d366',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '18px',
          fontWeight: 'bold'
        }}>
          🎓
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '16px', fontWeight: '500' }}>RMSS Singapore</div>
          <div style={{ fontSize: '13px', opacity: 0.8 }}>
            {isTyping ? 'typing...' : 'online'}
          </div>
        </div>
        <div style={{ display: 'flex', gap: '16px', fontSize: '20px' }}>
          <span>📞</span>
          <span>📹</span>
          <span>⋮</span>
        </div>
      </div>

      {/* Messages Container */}
      <div style={{
        flex: 1,
        padding: '8px',
        overflowY: 'auto',
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4d4d8' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        minHeight: '400px'
      }}>
        
        {/* Date Header */}
        <div style={{
          textAlign: 'center',
          margin: '16px 0',
          fontSize: '12px',
          color: '#667781'
        }}>
          <div style={{
            backgroundColor: 'rgba(255,255,255,0.8)',
            padding: '4px 12px',
            borderRadius: '12px',
            display: 'inline-block'
          }}>
            Today
          </div>
        </div>

        {/* Messages */}
        {messages.map((msg, index) => (
          <div
            key={msg.id}
            style={{
              display: 'flex',
              justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start',
              marginBottom: '8px'
            }}
          >
            <div style={{
              maxWidth: '80%',
              backgroundColor: msg.sender === 'user' ? '#dcf8c6' : 'white',
              padding: '8px 12px',
              borderRadius: '8px',
              borderBottomRightRadius: msg.sender === 'user' ? '2px' : '8px',
              borderBottomLeftRadius: msg.sender === 'bot' ? '2px' : '8px',
              boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
              position: 'relative'
            }}>
              <div style={{
                fontSize: '14px',
                lineHeight: '1.4',
                marginBottom: '4px',
                whiteSpace: 'pre-wrap',
                wordWrap: 'break-word',
                color: '#303030'
              }}>
                {msg.text}
              </div>
              <div style={{
                fontSize: '11px',
                color: '#667781',
                textAlign: 'right',
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center',
                gap: '4px'
              }}>
                <span>{formatTime(msg.timestamp)}</span>
                {msg.sender === 'user' && (
                  <span style={{ fontSize: '12px' }}>
                    {getStatusIcon(msg.status)}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
        
        {/* Typing Indicator */}
        {isTyping && (
          <div style={{
            display: 'flex',
            justifyContent: 'flex-start',
            marginBottom: '8px'
          }}>
            <div style={{
              backgroundColor: 'white',
              padding: '12px 16px',
              borderRadius: '8px',
              borderBottomLeftRadius: '2px',
              boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}>
              <div style={{
                width: '6px',
                height: '6px',
                backgroundColor: '#667781',
                borderRadius: '50%',
                animation: 'bounce 1.4s infinite'
              }} />
              <div style={{
                width: '6px',
                height: '6px',
                backgroundColor: '#667781',
                borderRadius: '50%',
                animation: 'bounce 1.4s infinite 0.2s'
              }} />
              <div style={{
                width: '6px',
                height: '6px',
                backgroundColor: '#667781',
                borderRadius: '50%',
                animation: 'bounce 1.4s infinite 0.4s'
              }} />
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Replies (show initially) */}
      {messages.length <= 1 && !isLoading && (
        <div style={{ 
          padding: '8px 12px',
          backgroundColor: '#f0f0f0',
          borderTop: '1px solid #e0e0e0'
        }}>
          <div style={{ 
            fontSize: '12px', 
            color: '#667781', 
            marginBottom: '8px',
            textAlign: 'center'
          }}>
            Quick questions:
          </div>
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column',
            gap: '6px'
          }}>
            {quickReplies.map((reply, index) => (
              <button
                key={index}
                onClick={() => handleQuickReply(reply)}
                style={{
                  backgroundColor: 'white',
                  border: '1px solid #e0e0e0',
                  borderRadius: '16px',
                  padding: '8px 12px',
                  fontSize: '13px',
                  cursor: 'pointer',
                  color: '#075e54',
                  textAlign: 'left'
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#f8f9fa'}
                onMouseOut={(e) => e.target.style.backgroundColor = 'white'}
              >
                {reply}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div style={{
        padding: '8px',
        backgroundColor: '#f0f0f0',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      }}>
        <button style={{
          backgroundColor: 'transparent',
          border: 'none',
          fontSize: '20px',
          color: '#667781',
          cursor: 'pointer',
          padding: '4px'
        }}>
          😊
        </button>
        
        <div style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          backgroundColor: 'white',
          borderRadius: '20px',
          padding: '8px 12px',
          border: '1px solid #e0e0e0'
        }}>
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message"
            style={{
              flex: 1,
              border: 'none',
              outline: 'none',
              fontSize: '14px',
              fontFamily: 'inherit'
            }}
            disabled={isLoading}
          />
          <button style={{
            backgroundColor: 'transparent',
            border: 'none',
            fontSize: '16px',
            color: '#667781',
            cursor: 'pointer',
            padding: '0 4px'
          }}>
            📎
          </button>
        </div>

        <button
          onClick={handleSendMessage}
          disabled={isLoading || !inputMessage.trim()}
          style={{
            backgroundColor: '#25d366',
            border: 'none',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: isLoading || !inputMessage.trim() ? 'not-allowed' : 'pointer',
            opacity: isLoading || !inputMessage.trim() ? 0.5 : 1,
            color: 'white',
            fontSize: '16px'
          }}
        >
          {isLoading ? '⏳' : '➤'}
        </button>
      </div>

      {/* CSS for animations */}
      <style jsx>{`
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-6px);
          }
          60% {
            transform: translateY(-3px);
          }
        }
      `}</style>
    </div>
  );
};

export default WhatsAppBot;