import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/UseAuth.jsx';

const MainLayout = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { path: '/home', label: 'Home', icon: '🏠' },
    { path: '/profile', label: 'Profile', icon: '👤' },
    { path: '/orders', label: 'Orders', icon: '📦' },
    { path: '/community', label: 'Community', icon: '💬' },
    { path: '/safety-mode', label: 'Safety', icon: '🛡️' },
    { path: '/support', label: 'Support', icon: '❓' }
  ];

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-shestyled-cream via-shestyled-beige to-white">
      {/* Top Navbar */}
      <header className="bg-white/90 backdrop-blur-md shadow-lg border-b border-shestyled-cream/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-12 h-12 bg-gradient-to-br from-shestyled-terracotta to-shestyled-pink rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-all">
                <span className="text-2xl font-bold text-white">S</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-shestyled-chocolate group-hover:text-shestyled-pink transition-colors">SheStyled</h1>
                <p className="text-sm text-shestyled-brown">Style • Safety • Community</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-semibold transition-all relative group ${
                    location.pathname === item.path
                      ? 'bg-gradient-to-r from-shestyled-pink to-purple-500 text-white shadow-lg'
                      : 'text-shestyled-brown hover:bg-shestyled-cream/50 hover:text-shestyled-chocolate'
                  }`}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span>{item.label}</span>
                  {location.pathname === item.path && (
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rounded-full shadow-md" />
                  )}
                </Link>
              ))}
            </nav>

            {/* Right side actions */}
            <div className="flex items-center space-x-4">
              {user ? (
                <>
                  <span className="hidden md:inline text-shestyled-brown font-semibold">
                    Hi, {user.displayName?.split(' ')[0] || 'There'}!
                  </span>
                  <button
                    onClick={handleLogout}
                    className="bg-shestyled-terracotta hover:bg-shestyled-chocolate text-white px-6 py-2 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-2 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {/* Mobile Bottom Nav */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md shadow-2xl border-t border-shestyled-cream/50 z-40">
        <nav className="flex justify-around py-3 px-4">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center p-2 rounded-2xl transition-all group ${
                location.pathname === item.path
                  ? 'text-shestyled-pink shadow-lg bg-gradient-to-r from-shestyled-pink/20 to-purple-500/20'
                  : 'text-gray-600 hover:text-shestyled-chocolate hover:bg-gray-100'
              }`}
            >
              <span className={`text-2xl mb-1 ${location.pathname === item.path ? 'drop-shadow-lg' : ''}`}>
                {item.icon}
              </span>
              <span className="text-xs font-semibold">{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default MainLayout;
