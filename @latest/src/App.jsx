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
import Profile from './Pages/Profile.jsx';
import Orders from './Pages/Orders.jsx';
import Support from './Pages/Support.jsx';
import Community from './Pages/Community.jsx';
import OutfitRecommendation from './Pages/OutfitRecommendation.jsx';
import Products from './Pages/Products.jsx';
import Cart from './Pages/Cart.jsx';
import Admin from './Pages/Admin.jsx';
import ShareViewer from './Pages/ShareViewer.jsx';
import './index.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/safety-mode" element={<SafetyMode />} />
        <Route path="/share/:sessionId" element={<ShareViewer />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/products" element={<ProtectedRoute><MainLayout><Products /></MainLayout></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute><MainLayout><Dashboard /></MainLayout></ProtectedRoute>} />
        <Route path="/home" element={<ProtectedRoute><MainLayout><Home /></MainLayout></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><MainLayout><Profile /></MainLayout></ProtectedRoute>} />
        <Route path="/orders" element={<ProtectedRoute><MainLayout><Orders /></MainLayout></ProtectedRoute>} />
        <Route path="/support" element={<ProtectedRoute><MainLayout><Support /></MainLayout></ProtectedRoute>} />
        <Route path="/community" element={<ProtectedRoute><MainLayout><Community /></MainLayout></ProtectedRoute>} />
        <Route path="/recommend" element={<ProtectedRoute><MainLayout><OutfitRecommendation /></MainLayout></ProtectedRoute>} />
        <Route path="/cart" element={<ProtectedRoute><MainLayout><Cart /></MainLayout></ProtectedRoute>} />
      </Routes>
    </Router>
  );
};

export default App;
