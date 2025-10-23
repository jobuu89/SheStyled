import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Home from './Pages/Home.jsx';
import SafetyMode from './Pages/SafetyMode.jsx';
import MainLayout from './Components/MainLayout.jsx';
import './index.css';

const App = () => {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        <Route path="/" element={<MainLayout><Home /></MainLayout>} />
        <Route path="/safety-mode" element={<MainLayout><SafetyMode /></MainLayout>} />
      </Routes>
    </Router>
  );
};

export default App;

