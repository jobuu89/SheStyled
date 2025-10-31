import React, { useState } from 'react';
import { useAuth } from '../hooks/UseAuth.jsx';
import { useNavigate } from 'react-router-dom';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../Components/Firebase.js';

const Dashboard = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLogin, setIsLogin] = useState(true);
  const [displayName, setDisplayName] = useState('');

  const { signIn, signUp, user, logout, loading, error, resetPassword } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isLogin) {
        await signIn(formData.email, formData.password);
        // Success - you can redirect or show success message
        console.log('Login successful!');
        navigate('/');
      } else {
        await signUp(formData.email, formData.password, displayName);
        // Success - you can redirect or show success message
        console.log('Sign up successful!');
        navigate('/');
      }
    } catch (err) {
      // Error is handled in the hook
      console.error('Authentication error:', err);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      // Success - you can redirect or show success message
      console.log('Google sign in successful!');
      navigate('/');
    } catch (err) {
      console.error('Google sign in error:', err);
      alert(getFirebaseErrorMessage(err.code));
    }
  };

  const handleForgotPassword = async () => {
    if (!formData.email) {
      alert('Please enter your email address first.');
      return;
    }

    try {
      await resetPassword(formData.email);
      alert('Password reset email sent! Check your inbox.');
    } catch (err) {
      // Error is handled in the hook
      console.error('Password reset error:', err);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleBrowseProducts = () => {
    navigate('/home');
  };

  const handleViewProfile = () => {
    // Navigate to profile page (you can create this later)
    alert('Profile page coming soon!');
  };

  const handleCheckOrders = () => {
    // Navigate to orders page (you can create this later)
    alert('Orders page coming soon!');
  };

  const handleContactSupport = () => {
    // Navigate to support page (you can create this later)
    alert('Support page coming soon!');
  };

  const getFirebaseErrorMessage = (errorCode) => {
    switch (errorCode) {
      case 'auth/invalid-email':
        return 'Invalid email address.';
      case 'auth/user-disabled':
        return 'This account has been disabled.';
      case 'auth/user-not-found':
        return 'No account found with this email.';
      case 'auth/wrong-password':
        return 'Incorrect password.';
      case 'auth/email-already-in-use':
        return 'An account with this email already exists.';
      case 'auth/weak-password':
        return 'Password should be at least 6 characters.';
      case 'auth/network-request-failed':
        return 'Network error. Please check your connection.';
      case 'auth/too-many-requests':
        return 'Too many attempts. Please try again later.';
      default:
        return 'An error occurred. Please try again.';
    }
  };

  // If user is logged in, show dashboard
  if (user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-shestyled-cream to-shestyled-beige">
        {/* Header */}
        <div className="bg-white shadow-sm border-b border-shestyled-cream">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-shestyled-terracotta rounded-full flex items-center justify-center mr-3">
                  <span className="text-white font-bold text-lg">S</span>
                </div>
                <h1 className="text-2xl font-bold text-shestyled-chocolate">SheStyled</h1>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-shestyled-brown">Welcome, {user.displayName || user.email}!</span>
                <button
                  onClick={handleLogout}
                  className="bg-shestyled-terracotta text-white px-4 py-2 rounded-lg hover:bg-shestyled-chocolate transition-colors"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Welcome Section */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-shestyled-chocolate mb-4">
              Welcome to SheStyled
            </h2>
            <p className="text-xl text-shestyled-brown max-w-2xl mx-auto">
              Discover your perfect style with our curated collection of fashion and accessories.
              Shop with confidence and express your unique personality.
            </p>
          </div>

          {/* Quick Actions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <button
              onClick={handleBrowseProducts}
              className="bg-white rounded-2xl p-6 shadow-lg border border-shestyled-cream hover:shadow-xl transition-all duration-300 hover:scale-105 text-left relative"
            >
              <button
                onClick={(e) => { e.stopPropagation(); window.history.back(); }}
                className="absolute top-2 right-2 bg-shestyled-pink text-white w-8 h-8 rounded-full flex items-center justify-center text-sm hover:bg-pink-600 transition-colors"
                title="Go Back"
              >
                ←
              </button>
              <div className="w-12 h-12 bg-shestyled-beige rounded-full flex items-center justify-center mb-4">
                <span className="text-shestyled-terracotta text-xl">🛍️</span>
              </div>
              <h3 className="text-lg font-semibold text-shestyled-chocolate mb-2">Browse Products</h3>
              <p className="text-shestyled-brown text-sm">Discover our latest collection</p>
            </button>

            <button
              onClick={handleViewProfile}
              className="bg-white rounded-2xl p-6 shadow-lg border border-shestyled-cream hover:shadow-xl transition-all duration-300 hover:scale-105 text-left relative"
            >
              <button
                onClick={(e) => { e.stopPropagation(); window.history.back(); }}
                className="absolute top-2 right-2 bg-shestyled-pink text-white w-8 h-8 rounded-full flex items-center justify-center text-sm hover:bg-pink-600 transition-colors"
                title="Go Back"
              >
                ←
              </button>
              <div className="w-12 h-12 bg-shestyled-beige rounded-full flex items-center justify-center mb-4">
                <span className="text-shestyled-terracotta text-xl">👤</span>
              </div>
              <h3 className="text-lg font-semibold text-shestyled-chocolate mb-2">My Profile</h3>
              <p className="text-shestyled-brown text-sm">Manage your account settings</p>
            </button>

            <button
              onClick={handleCheckOrders}
              className="bg-white rounded-2xl p-6 shadow-lg border border-shestyled-cream hover:shadow-xl transition-all duration-300 hover:scale-105 text-left relative"
            >
              <button
                onClick={(e) => { e.stopPropagation(); window.history.back(); }}
                className="absolute top-2 right-2 bg-shestyled-pink text-white w-8 h-8 rounded-full flex items-center justify-center text-sm hover:bg-pink-600 transition-colors"
                title="Go Back"
              >
                ←
              </button>
              <div className="w-12 h-12 bg-shestyled-beige rounded-full flex items-center justify-center mb-4">
                <span className="text-shestyled-terracotta text-xl">📦</span>
              </div>
              <h3 className="text-lg font-semibold text-shestyled-chocolate mb-2">My Orders</h3>
              <p className="text-shestyled-brown text-sm">Track and manage orders</p>
            </button>

            <button
              onClick={handleContactSupport}
              className="bg-white rounded-2xl p-6 shadow-lg border border-shestyled-cream hover:shadow-xl transition-all duration-300 hover:scale-105 text-left relative"
            >
              <button
                onClick={(e) => { e.stopPropagation(); window.history.back(); }}
                className="absolute top-2 right-2 bg-shestyled-pink text-white w-8 h-8 rounded-full flex items-center justify-center text-sm hover:bg-pink-600 transition-colors"
                title="Go Back"
              >
                ←
              </button>
              <div className="w-12 h-12 bg-shestyled-beige rounded-full flex items-center justify-center mb-4">
                <span className="text-shestyled-terracotta text-xl">💬</span>
              </div>
              <h3 className="text-lg font-semibold text-shestyled-chocolate mb-2">Support</h3>
              <p className="text-shestyled-brown text-sm">Get help and support</p>
            </button>
          </div>

          {/* Featured Categories */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-shestyled-cream">
            <h3 className="text-2xl font-bold text-shestyled-chocolate mb-6 text-center">Featured Categories</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 rounded-lg bg-shestyled-cream/20 hover:bg-shestyled-beige/30 transition-colors cursor-pointer">
                <div className="text-3xl mb-2">👗</div>
                <p className="text-shestyled-chocolate font-medium">Dresses</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-shestyled-cream/20 hover:bg-shestyled-beige/30 transition-colors cursor-pointer">
                <div className="text-3xl mb-2">👠</div>
                <p className="text-shestyled-chocolate font-medium">Shoes</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-shestyled-cream/20 hover:bg-shestyled-beige/30 transition-colors cursor-pointer">
                <div className="text-3xl mb-2">👜</div>
                <p className="text-shestyled-chocolate font-medium">Bags</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-shestyled-cream/20 hover:bg-shestyled-beige/30 transition-colors cursor-pointer">
                <div className="text-3xl mb-2">💍</div>
                <p className="text-shestyled-chocolate font-medium">Accessories</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // If user is not logged in, show login/signup form
  return (
    <div className="min-h-screen bg-gradient-to-br from-shestyled-cream to-shestyled-beige flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-shestyled-terracotta rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl text-white font-bold">S</span>
          </div>
          <h1 className="text-3xl font-bold text-shestyled-chocolate">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h1>
          <p className="text-shestyled-brown mt-2">
            {isLogin ? 'Sign in to your SheStyled account' : 'Join the SheStyled community'}
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-shestyled-cream">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-shestyled-chocolate mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-shestyled-beige rounded-lg focus:ring-2 focus:ring-shestyled-terracotta focus:border-transparent transition-all duration-200 bg-shestyled-cream/20 placeholder-shestyled-brown/40 text-shestyled-chocolate"
                placeholder="Enter your email"
              />
            </div>

            {/* Display Name Field (Sign Up Only) */}
            {!isLogin && (
              <div>
                <label htmlFor="displayName" className="block text-sm font-medium text-shestyled-chocolate mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="displayName"
                  name="displayName"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-shestyled-beige rounded-lg focus:ring-2 focus:ring-shestyled-terracotta focus:border-transparent transition-all duration-200 bg-shestyled-cream/20 placeholder-shestyled-brown/40 text-shestyled-chocolate"
                  placeholder="Enter your full name"
                />
              </div>
            )}

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-shestyled-chocolate mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength={6}
                className="w-full px-4 py-3 border border-shestyled-beige rounded-lg focus:ring-2 focus:ring-shestyled-terracotta focus:border-transparent transition-all duration-200 bg-shestyled-cream/20 placeholder-shestyled-brown/40 text-shestyled-chocolate"
                placeholder={isLogin ? "Enter your password" : "Create a password (min. 6 characters)"}
              />
            </div>

            {/* Remember Me & Forgot Password (Login Only) */}
            {isLogin && (
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="remember"
                    className="w-4 h-4 text-shestyled-terracotta border-shestyled-beige rounded focus:ring-shestyled-terracotta"
                  />
                  <label htmlFor="remember" className="ml-2 text-sm text-shestyled-brown">
                    Remember me
                  </label>
                </div>
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="text-sm text-shestyled-terracotta hover:text-shestyled-chocolate transition-colors"
                >
                  Forgot password?
                </button>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-shestyled-pink text-white py-3 px-4 rounded-lg font-medium hover:bg-pink-600 transition-all duration-200 transform hover:scale-105 focus:ring-2 focus:ring-shestyled-terracotta focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-t-2 border-white border-solid rounded-full animate-spin mr-2"></div>
                  {isLogin ? 'Signing in...' : 'Creating account...'}
                </div>
              ) : (
                isLogin ? 'Sign In' : 'Create Account'
              )}
            </button>
          </form>

          {/* Toggle between Login/Signup */}
          <div className="mt-6 pt-6 border-t border-shestyled-beige">
            <p className="text-center text-sm text-shestyled-brown">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="font-medium text-shestyled-pink hover:text-pink-600 transition-colors"
              >
                {isLogin ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          </div>

          {/* Social Login */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-shestyled-beige"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-shestyled-brown">Or continue with</span>
              </div>
            </div>

            <div className="mt-4">
              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={loading}
                className="w-full inline-flex justify-center items-center py-3 px-4 border border-shestyled-beige rounded-lg shadow-sm bg-white text-sm font-medium text-shestyled-chocolate hover:bg-shestyled-cream transition-colors disabled:opacity-50"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
