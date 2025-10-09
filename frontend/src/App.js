import React, { useState, useEffect } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ChatWidget from "./components/ChatWidget";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// RMSS Demo Homepage Component with Red/Black/White theme
const RMSSHomepage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-red-50">
      {/* Header */}
      <header className="bg-white shadow-md border-b-4 border-red-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-3xl font-bold text-red-600">RMSS</h1>
                <p className="text-sm text-gray-800 font-medium">Raymond's Math & Science Studio</p>
              </div>
            </div>
            <nav className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <a href="#" className="text-red-600 hover:text-red-700 px-3 py-2 text-sm font-medium border-b-2 border-red-600">Home</a>
                <a href="#" className="text-gray-800 hover:text-red-700 px-3 py-2 text-sm font-medium hover:border-b-2 hover:border-red-600">About Us</a>
                <a href="#" className="text-gray-800 hover:text-red-700 px-3 py-2 text-sm font-medium hover:border-b-2 hover:border-red-600">Courses</a>
                <a href="#" className="text-gray-800 hover:text-red-700 px-3 py-2 text-sm font-medium hover:border-b-2 hover:border-red-600">Locations</a>
                <a href="#" className="text-gray-800 hover:text-red-700 px-3 py-2 text-sm font-medium hover:border-b-2 hover:border-red-600">Contact</a>
                <button className="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700 border-2 border-red-600">
                  Student Login
                </button>
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-white to-red-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Excelling in <span className="text-red-600">Math & Science</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto">
              Premier tuition center in Singapore specializing in Mathematics, Science, and Economics from Primary to Junior College levels.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-red-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-red-700 transition duration-300 border-2 border-red-600">
                Enroll Now
              </button>
              <button className="border-2 border-red-600 text-red-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-red-50 transition duration-300">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose <span className="text-red-600">RMSS</span>?
            </h2>
            <p className="text-lg text-gray-600">
              Discover what makes us Singapore's trusted tuition center
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-lg bg-gradient-to-br from-red-50 to-white border-2 border-red-100 hover:border-red-300 transition duration-300">
              <div className="bg-red-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Expert Teachers</h3>
              <p className="text-gray-600">Passionate educators with proven track records in academic excellence</p>
            </div>
            
            <div className="text-center p-6 rounded-lg bg-gradient-to-br from-gray-50 to-white border-2 border-gray-100 hover:border-red-300 transition duration-300">
              <div className="bg-gray-800 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Small Class Sizes</h3>
              <p className="text-gray-600">Personalized attention with optimal student-to-teacher ratios</p>
            </div>
            
            <div className="text-center p-6 rounded-lg bg-gradient-to-br from-red-50 to-white border-2 border-red-100 hover:border-red-300 transition duration-300">
              <div className="bg-red-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Proven Results</h3>
              <p className="text-gray-600">Consistent academic improvement and excellent examination results</p>
            </div>
          </div>
        </div>
      </section>

      {/* Course Levels & Pricing Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Course <span className="text-red-600">Levels & Subjects</span>
            </h2>
            <p className="text-lg text-gray-600">
              Comprehensive coverage from Primary to Junior College
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg border-2 border-red-100 hover:border-red-300 transition duration-300">
              <h3 className="text-xl font-semibold text-red-600 mb-4">Primary (P3-P6)</h3>
              <ul className="space-y-2 text-gray-700 mb-4">
                <li>• Mathematics</li>
                <li>• Science</li>
                <li>• English</li>
                <li>• Chinese</li>
              </ul>
              <div className="text-sm text-gray-600 bg-red-50 p-3 rounded">
                <strong>Sample Pricing:</strong><br />
                P3: $267 for 4×2hr lessons<br />
                P6: $303 for 4×2hr lessons<br />
                <em>(+GST)</em>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg border-2 border-gray-200 hover:border-red-300 transition duration-300">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Secondary (O-Level)</h3>
              <ul className="space-y-2 text-gray-700 mb-4">
                <li>• Mathematics</li>
                <li>• Physics</li>
                <li>• Chemistry</li>
                <li>• Biology</li>
              </ul>
              <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
                <strong>Contact for pricing:</strong><br />
                Call 6222 8222<br />
                <em>Competitive rates available</em>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg border-2 border-gray-200 hover:border-red-300 transition duration-300">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Junior College (A-Level)</h3>
              <ul className="space-y-2 text-gray-700 mb-4">
                <li>• H2 Mathematics</li>
                <li>• H2 Physics</li>
                <li>• H2 Chemistry</li>
                <li>• H1 Economics</li>
              </ul>
              <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
                <strong>Contact for pricing:</strong><br />
                Call 6222 8222<br />
                <em>Premium JC preparation</em>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Locations & Schedule Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our <span className="text-red-600">Locations & Schedule</span>
            </h2>
            <p className="text-lg text-gray-600">
              Conveniently located across Singapore
            </p>
          </div>
          
          <div className="grid md:grid-cols-5 gap-6 mb-8">
            {['Jurong', 'Bishan', 'Punggol', 'Kovan', 'Marine Parade'].map((location) => (
              <div key={location} className="text-center p-4 bg-red-50 rounded-lg border-2 border-red-100 hover:border-red-300 transition duration-300">
                <h3 className="text-lg font-semibold text-red-600 mb-2">{location}</h3>
                <p className="text-gray-600 text-sm">Full curriculum available</p>
              </div>
            ))}
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg border-2 border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">Operating Hours</h3>
            <div className="grid md:grid-cols-3 gap-4 text-center">
              <div>
                <strong className="text-red-600">Wednesday - Friday</strong><br>
                <span className="text-gray-700">3:30 PM - 9:30 PM</span>
              </div>
              <div>
                <strong className="text-red-600">Saturday</strong><br>
                <span className="text-gray-700">10:00 AM - 5:30 PM</span>
              </div>
              <div>
                <strong className="text-red-600">Sunday</strong><br>
                <span className="text-gray-700">1:00 PM - 5:30 PM</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-red-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Excel in Your Studies?
          </h2>
          <p className="text-xl mb-8">
            Contact us today for enrollment or inquiries • Free trial lessons available!
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              <span className="text-lg font-semibold">6222 8222</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              <span className="text-lg">contactus@rmss.com.sg</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">
            © 2024 Raymond's Math & Science Studio. All rights reserved.
          </p>
          <p className="text-sm text-gray-500 mt-2">
            This is a demo website showcasing AI chatbot integration capabilities.
          </p>
        </div>
      </footer>

      {/* Chat Widget */}
      <ChatWidget />
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RMSSHomepage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;