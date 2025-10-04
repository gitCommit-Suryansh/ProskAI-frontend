import React, { useState, useEffect } from 'react';
import { User, Mail, Lock, XCircle, CheckCircle } from 'lucide-react';
import api from "../api/api";
import { setToken } from "../utils/auth";
import { useNavigate } from 'react-router-dom'


// --- CUSTOM COLOR PALETTE ---
const darkSlate = '#1A2C35';
const lightBeige = '#F4F1ED';
const accentBlue = '#4DA5C0';

// FIX: Moved InputField and NotificationBanner outside the main component
// to prevent re-creation on every render, which resolves the focus/typing bug.

const InputField = ({ icon: Icon, name, type, placeholder, value, onChange }) => (
  <div className="flex items-center border border-gray-300 bg-white rounded-lg mb-4 shadow-sm transition-all focus-within:ring-2" style={{ borderColor: darkSlate, focusWithinRingColor: accentBlue }}>
    <div className="p-3 text-gray-500">
      <Icon className="w-5 h-5" />
    </div>
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      // Removed the non-standard 'text-custom-dark' class for compatibility
      className="p-3 w-full rounded-r-lg focus:outline-none placeholder-gray-500" 
      onChange={onChange}
      required
      style={{ color: darkSlate }}
    />
  </div>
);

const NotificationBanner = ({ type, text }) => (
  <div 
    className={`p-4 rounded-lg flex items-center mb-4 ${type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
    style={{
      borderLeft: `5px solid ${type === 'success' ? '#4CAF50' : '#F44336'}`,
    }}
  >
    {type === 'success' ? <CheckCircle className="w-5 h-5 mr-3" /> : <XCircle className="w-5 h-5 mr-3" />}
    <span className="font-medium text-sm">{text}</span>
  </div>
);

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null); // { type: 'success' | 'error', text: string }
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // Clear message after 5 seconds
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      // Mock API call to preserve original logic flow
      const res = await api.post("/auth/signup", form); 
      setToken(res.data.token);
      setMessage({ type: 'success', text: "Signup successful! Redirecting..." });
      navigate("/");
    } catch (err) {
      const errorText = err.response?.data?.message || "Signup failed. Please check your details.";
      setMessage({ type: 'error', text: errorText });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4" style={{ backgroundColor: darkSlate }}>
      
      <form
        onSubmit={handleSubmit}
        className="shadow-2xl rounded-xl p-8 w-full max-w-md"
        style={{ backgroundColor: lightBeige }}
      >
        <h2 className="text-3xl font-extrabold mb-6 text-center" style={{ color: darkSlate }}>
          Join ProskAI
        </h2>

        {message && <NotificationBanner type={message.type} text={message.text} />}

        <InputField
          icon={User}
          name="name"
          type="text"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
        />

        <InputField
          icon={Mail}
          name="email"
          type="email"
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
        />

        <InputField
          icon={Lock}
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />

        <button
          type="submit"
          disabled={loading}
          className="text-white py-3 w-full rounded-lg font-bold transition-transform transform hover:scale-[1.01] shadow-md disabled:opacity-50"
          style={{ backgroundColor: accentBlue }}
        >
          {loading ? 'Signing Up...' : 'Create Account'}
        </button>
        
        <p className="text-center mt-6 text-gray-600 text-sm">
            Already have an account? <a href="#" className="font-semibold" style={{ color: accentBlue }}>Log In</a>
        </p>
        
      </form>
    </div>
  );
}
