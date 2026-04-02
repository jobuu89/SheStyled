import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center p-8">
      <Link 
        to="/safety-mode"
        className="block w-80 h-80 bg-gradient-to-br from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 rounded-3xl shadow-2xl hover:shadow-3xl flex flex-col items-center justify-center text-white group transition-all duration-300 hover:scale-105"
      >
        <div className="text-8xl mb-8 group-hover:animate-bounce">📍</div>
        <div className="text-3xl font-bold">Share Location</div>
      </Link>
    </div>
  );
};

export default Dashboard;

