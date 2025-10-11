import React, { useState } from 'react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const StudentAuthWidget = ({ onAuthenticated, onClose }) => {
  const [authMode, setAuthMode] = useState('login'); // 'login', 'otp-request', 'otp-verify'
  const [formData, setFormData] = useState({
    studentId: '',
    password: '',
    phone: '',
    otp: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = async () => {
    if (!formData.studentId || !formData.password) {
      setError('Please enter both Student ID and password');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await axios.post(`${API}/demo/login`, {
        student_id: formData.studentId,
        password: formData.password
      });

      if (response.data.success) {
        setMessage(response.data.message);
        onAuthenticated({
          sessionToken: response.data.session_token,
          studentName: response.data.student_name,
          studentId: formData.studentId
        });
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError('Login failed. Please check your credentials.');
    }

    setLoading(false);
  };

  const handleRequestOTP = async () => {
    if (!formData.studentId || !formData.phone) {
      setError('Please enter both Student ID and phone number');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await axios.post(`${API}/demo/whatsapp/request-otp`, {
        student_id: formData.studentId,
        phone: formData.phone
      });

      if (response.data.success) {
        setMessage(response.data.message);
        setAuthMode('otp-verify');
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError('OTP request failed. Please try again.');
    }

    setLoading(false);
  };

  const handleVerifyOTP = async () => {
    if (!formData.otp) {
      setError('Please enter the OTP code');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await axios.post(`${API}/demo/whatsapp/verify-otp`, {
        student_id: formData.studentId,
        otp: formData.otp
      });

      if (response.data.success) {
        setMessage(response.data.message);
        onAuthenticated({
          sessionToken: response.data.session_token,
          studentName: response.data.student_name,
          studentId: formData.studentId
        });
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError('OTP verification failed. Please try again.');
    }

    setLoading(false);
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        padding: '32px',
        width: '100%',
        maxWidth: '400px',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
        margin: '20px'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '24px'
        }}>
          <h2 style={{ 
            margin: 0, 
            color: '#dc2626', 
            fontSize: '24px', 
            fontWeight: 'bold' 
          }}>
            Student Login
          </h2>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '24px',
              cursor: 'pointer',
              color: '#6b7280'
            }}
          >
            ×
          </button>
        </div>

        <div style={{ marginBottom: '16px' }}>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
            <button
              onClick={() => setAuthMode('login')}
              style={{
                flex: 1,
                padding: '8px 16px',
                border: '2px solid #dc2626',
                borderRadius: '8px',
                backgroundColor: authMode === 'login' ? '#dc2626' : 'white',
                color: authMode === 'login' ? 'white' : '#dc2626',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Password Login
            </button>
            <button
              onClick={() => setAuthMode('otp-request')}
              style={{
                flex: 1,
                padding: '8px 16px',
                border: '2px solid #dc2626',
                borderRadius: '8px',
                backgroundColor: authMode.startsWith('otp') ? '#dc2626' : 'white',
                color: authMode.startsWith('otp') ? 'white' : '#dc2626',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              WhatsApp OTP
            </button>
          </div>
        </div>

        {authMode === 'login' && (
          <div>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '8px', 
                fontWeight: '600', 
                color: '#374151' 
              }}>
                Student ID:
              </label>
              <input
                type="text"
                name="studentId"
                value={formData.studentId}
                onChange={handleInputChange}
                placeholder="e.g., ST001"
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '16px',
                  boxSizing: 'border-box'
                }}
              />
            </div>
            <div style={{ marginBottom: '24px' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '8px', 
                fontWeight: '600', 
                color: '#374151' 
              }}>
                Password:
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter password"
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '16px',
                  boxSizing: 'border-box'
                }}
              />
            </div>
            <button
              onClick={handleLogin}
              disabled={loading}
              style={{
                width: '100%',
                padding: '12px',
                backgroundColor: loading ? '#9ca3af' : '#dc2626',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: loading ? 'not-allowed' : 'pointer'
              }}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </div>
        )}

        {authMode === 'otp-request' && (
          <div>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '8px', 
                fontWeight: '600', 
                color: '#374151' 
              }}>
                Student ID:
              </label>
              <input
                type="text"
                name="studentId"
                value={formData.studentId}
                onChange={handleInputChange}
                placeholder="e.g., ST001"
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '16px',
                  boxSizing: 'border-box'
                }}
              />
            </div>
            <div style={{ marginBottom: '24px' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '8px', 
                fontWeight: '600', 
                color: '#374151' 
              }}>
                WhatsApp Number:
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="+65XXXXXXXX"
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '16px',
                  boxSizing: 'border-box'
                }}
              />
            </div>
            <button
              onClick={handleRequestOTP}
              disabled={loading}
              style={{
                width: '100%',
                padding: '12px',
                backgroundColor: loading ? '#9ca3af' : '#25d366',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: loading ? 'not-allowed' : 'pointer'
              }}
            >
              {loading ? 'Sending OTP...' : '📱 Send WhatsApp OTP'}
            </button>
          </div>
        )}

        {authMode === 'otp-verify' && (
          <div>
            <div style={{ marginBottom: '16px', textAlign: 'center' }}>
              <div style={{ color: '#059669', fontWeight: '600', marginBottom: '8px' }}>
                📱 OTP Sent Successfully
              </div>
              <div style={{ fontSize: '14px', color: '#6b7280' }}>
                Check your WhatsApp for a 6-digit code
              </div>
            </div>
            <div style={{ marginBottom: '24px' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '8px', 
                fontWeight: '600', 
                color: '#374151' 
              }}>
                OTP Code:
              </label>
              <input
                type="text"
                name="otp"
                value={formData.otp}
                onChange={handleInputChange}
                placeholder="Enter 6-digit code"
                maxLength={6}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '18px',
                  textAlign: 'center',
                  letterSpacing: '2px',
                  boxSizing: 'border-box'
                }}
              />
            </div>
            <button
              onClick={handleVerifyOTP}
              disabled={loading}
              style={{
                width: '100%',
                padding: '12px',
                backgroundColor: loading ? '#9ca3af' : '#25d366',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: loading ? 'not-allowed' : 'pointer'
              }}
            >
              {loading ? 'Verifying...' : '✅ Verify OTP'}
            </button>
            <button
              onClick={() => setAuthMode('otp-request')}
              style={{
                width: '100%',
                padding: '8px',
                backgroundColor: 'transparent',
                color: '#6b7280',
                border: 'none',
                fontSize: '14px',
                cursor: 'pointer',
                marginTop: '8px'
              }}
            >
              ← Request New OTP
            </button>
          </div>
        )}

        {message && (
          <div style={{
            marginTop: '16px',
            padding: '12px',
            backgroundColor: '#d1fae5',
            color: '#059669',
            borderRadius: '8px',
            fontSize: '14px',
            whiteSpace: 'pre-line'
          }}>
            {message}
          </div>
        )}

        {error && (
          <div style={{
            marginTop: '16px',
            padding: '12px',
            backgroundColor: '#fee2e2',
            color: '#dc2626',
            borderRadius: '8px',
            fontSize: '14px'
          }}>
            {error}
          </div>
        )}

        <div style={{
          marginTop: '24px',
          padding: '16px',
          backgroundColor: '#f3f4f6',
          borderRadius: '8px',
          fontSize: '12px',
          color: '#6b7280'
        }}>
          <strong>Demo Instructions:</strong><br/>
          • Try Student ID: ST001, ST002, or ST003<br/>
          • Demo Password: demo123<br/>
          • Phone numbers shown in demo info<br/>
          • This demonstrates real RMSS integration
        </div>
      </div>
    </div>
  );
};

export default StudentAuthWidget;