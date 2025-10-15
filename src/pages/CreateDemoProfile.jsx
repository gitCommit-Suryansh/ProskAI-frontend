import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, AlertCircle, CheckCircle } from 'lucide-react';
import api from '../api/api';

const CreateDemoProfile = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleCreateDemo = async () => {
    setLoading(true);
    setMessage('');
    setIsSuccess(false);

    try {
      const response = await api.post('/profiles/createdemoprofile'); // No body needed
      
      if (response.status === 201) {
        setMessage(response.data.message || 'Demo profile created successfully!');
        setIsSuccess(true);
      } else {
        throw new Error(response.data.message || 'An unknown error occurred.');
      }
    } catch (error) {
      console.error('Demo profile creation failed:', error);
      const errorMessage = error.response?.data?.message || error.message || 'A network error occurred.';
      setMessage(errorMessage);
      setIsSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center"
      >
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100">
          <Zap className="h-6 w-6 text-blue-600" />
        </div>
        <h2 className="mt-4 text-2xl font-bold text-gray-900">
          Create a Demo Profile
        </h2>
        <p className="mt-2 text-gray-600">
          Click the button below to instantly generate and save a pre-filled demo profile to your account for testing purposes.
        </p>
        <motion.button
          onClick={handleCreateDemo}
          disabled={loading}
          whileHover={{ scale: loading ? 1 : 1.05 }}
          whileTap={{ scale: loading ? 1 : 0.95 }}
          className="mt-6 w-full inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
              Creating...
            </>
          ) : (
            'Generate Demo Profile'
          )}
        </motion.button>
        
        {message && (
          <div className={`mt-4 p-3 rounded-md flex items-center gap-2 text-sm ${
            isSuccess 
              ? 'bg-green-50 text-green-800' 
              : 'bg-red-50 text-red-800'
          }`}>
            {isSuccess ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
            {message}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default CreateDemoProfile;