import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Home from './Pages/Home.jsx';
import SafetyMode from './Pages/SafetyMode.jsx';
import MainLayout from './Components/MainLayout.jsx';
import Login from './Pages/Login.jsx';
import ProtectedRoute from './Components/ProtectedRoute.jsx';
import Dashboard from './Pages/Dashboard.jsx';
import './index.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/home" element={<ProtectedRoute><MainLayout><Home /></MainLayout></ProtectedRoute>} />
        <Route path="/safety-mode" element={<ProtectedRoute><MainLayout><SafetyMode /></MainLayout></ProtectedRoute>} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;

