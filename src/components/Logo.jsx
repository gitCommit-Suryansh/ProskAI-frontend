import React from 'react';
import { Link } from 'react-router-dom';
import logoImage from '../assets/images/proskLogoTrans.png'; 

const Logo = ({ className }) => {
  return (
    <Link to="/" className={`flex items-center gap-3 focus:outline-none ${className}`}>
      
      {/* 2. Use the imported image in an <img> tag */}
      <img 
        src={logoImage} 
        alt="ProskAI Logo" 
        className="w-10 h-10" 
      />
      
      <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hidden md:block">
        ProskAI
      </h1>
    </Link>
  );
};

export default Logo;