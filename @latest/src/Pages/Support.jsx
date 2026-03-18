import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { faqData } from '../constants/mockData.js';

const Support = () => {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState(null);
  const [contactForm, setContactForm] = useState({
    subject: '',
    message: '',
    category: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);

  const categories = ['Order Issue', 'Account Problem', 'Styling Question', 'Return/Refund', 'Other'];

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleContactChange = (e) => {
    setContactForm({
      ...contactForm,
      [e.target.name]: e.target.value
    });
  };

  const submitContact = (e) => {
    e.preventDefault();
    // Mock submission
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setContactForm({ subject: '', message: '', category: '' });
    }, 3000);
  };

  const sendChatMessage = (message) => {
    // Mock chat
    console.log('Chat message:', message);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-shestyled-cream to-shestyled-beige py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center mb-12">
          <button
            onClick={() => navigate(-1)}
            className="bg-white hover:bg-gray-100 text-gray-600 p-3 rounded-xl shadow-md flex items-center mr-6"
          >
            ← Back to Dashboard
          </button>
          <div>
            <h1 className="text-4xl font-bold text-shestyled-chocolate">Help & Support</h1>
            <p className="text-xl text-shestyled-brown mt-2">We're here to help you look fabulous safely</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Quick Actions */}
          <div className="lg:col-span-2 grid md:grid-cols-2 gap-4">
            <div className="bg-white rounded-2xl shadow-xl p-8 text-center hover:shadow-2xl transition-all group">
              <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <span className="text-2xl">📞</span>
              </div>
              <h3 className="text-xl font-bold text-shestyled-chocolate mb-2">Live Chat</h3>
              <p className="text-gray-600 mb-6">Instant help from our team</p>
              <button
                onClick={() => setChatOpen(true)}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
              >
                Start Chat
              </button>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 text-center hover:shadow-2xl transition-all group">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <span className="text-2xl">✉️</span>
              </div>
              <h3 className="text-xl font-bold text-shestyled-chocolate mb-2">Email Support</h3>
              <p className="text-gray-600 mb-6">Detailed assistance</p>
              <a href="mailto:support@shestyled.com" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all inline-block">
                Send Email
              </a>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 text-center hover:shadow-2xl transition-all group">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <span className="text-2xl">📋</span>
              </div>
              <h3 className="text-xl font-bold text-shestyled-chocolate mb-2">FAQ</h3>
              <p className="text-gray-600 mb-6">Find answers quickly</p>
              <button
                onClick={() => document.getElementById('faq').scrollIntoView({ behavior: 'smooth' })}
                className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
              >
                View FAQ
              </button>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 text-center hover:shadow-2xl transition-all group">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <span className="text-2xl">💬</span>
              </div>
              <h3 className="text-xl font-bold text-shestyled-chocolate mb-2">Contact Form</h3>
              <p className="text-gray-600 mb-6">Submit a ticket</p>
              <button
                onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
                className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
              >
                Contact Us
              </button>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div id="faq" className="bg-white rounded-2xl shadow-xl p-12 mb-12">
          <h2 className="text-3xl font-bold text-shestyled-chocolate mb-8 text-center">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqData.map((faq, index) => (
              <div key={index} className="bg-gradient-to-r from-gray-50 to-shestyled-cream rounded-xl p-6 border border-gray-200 hover:shadow-md transition-all cursor-pointer" onClick={() => toggleFaq(index)}>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-shestyled-chocolate text-lg">{faq.question}</h3>
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                    openFaq === index ? 'bg-shestyled-pink text-white' : 'bg-gray-200 text-gray-600'
                  }`}>
                    {openFaq === index ? '−' : '+'}
                  </span>
                </div>
                {openFaq === index && (
                  <p className="text-gray-700 leading-relaxed mt-2 pl-2">{faq.answer}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Contact Form Section */}
        <div id="contact" className="bg-white rounded-2xl shadow-xl p-12">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-shestyled-chocolate mb-8 text-center">Contact Us</h2>
            {!submitted ? (
              <form onSubmit={submitContact} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-shestyled-brown mb-3">Subject</label>
                  <input
                    name="subject"
                    value={contactForm.subject}
                    onChange={handleContactChange}
                    required
                    className="w-full p-4 rounded-xl border-2 border-shestyled-cream focus:border-shestyled-pink focus:ring-4 focus:ring-shestyled-pink/20 bg-shestyled-cream/20 transition-all"
                    placeholder="What's your question about?"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-shestyled-brown mb-3">Category</label>
                  <select
                    name="category"
                    value={contactForm.category}
                    onChange={handleContactChange}
                    required
                    className="w-full p-4 rounded-xl border-2 border-shestyled-cream focus:border-shestyled-pink focus:ring-4 focus:ring-shestyled-pink/20 bg-shestyled-cream/20 transition-all"
                  >
                    <option value="">Select a category</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-shestyled-brown mb-3">Message</label>
                  <textarea
                    name="message"
                    value={contactForm.message}
                    onChange={handleContactChange}
                    required
                    rows="6"
                    className="w-full p-4 rounded-xl border-2 border-shestyled-cream focus:border-shestyled-pink focus:ring-4 focus:ring-shestyled-pink/20 bg-shestyled-cream/20 transition-all resize-vertical"
                    placeholder="Tell us more about your question..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-shestyled-pink hover:bg-pink-600 text-white py-4 px-8 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1"
                >
                  Send Message
                </button>
              </form>
            ) : (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl">✓</span>
                </div>
                <h3 className="text-2xl font-bold text-green-800 mb-4">Message Sent!</h3>
                <p className="text-gray-600 mb-8 max-w-md mx-auto">
                  Thank you for contacting us. We'll respond within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="bg-shestyled-pink hover:bg-pink-600 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
                >
                  Send Another Message
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Chat Widget */}
      {chatOpen && (
        <div className="fixed bottom-6 right-6 w-80 bg-white rounded-2xl shadow-2xl overflow-hidden z-50">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-4 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-3">
                  <span className="text-xl">AI</span>
                </div>
                <div>
                  <h4 className="font-semibold">SheStyled Assistant</h4>
                  <span className="text-sm opacity-90">Online</span>
                </div>
              </div>
              <button
                onClick={() => setChatOpen(false)}
                className="text-white hover:text-white/80 text-xl"
              >
                ×
              </button>
            </div>
          </div>
          <div className="h-80 p-4 overflow-y-auto bg-gradient-to-b from-gray-50 to-white space-y-4">
            <div className="bg-blue-500 text-white p-3 rounded-xl rounded-br-sm max-w-xs">
              Hi! How can I help you today? 🤗
            </div>
          </div>
          <div className="p-4 border-t bg-gradient-to-r from-gray-50 to-white">
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Type your message..."
                className="flex-1 p-3 rounded-xl border-2 border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    sendChatMessage(e.target.value);
                    e.target.value = '';
                  }
                }}
              />
              <button className="w-12 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-xl flex items-center justify-center transition-all shadow-lg">
                ➤
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Support;

