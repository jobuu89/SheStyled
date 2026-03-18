import { useState } from 'react';
import { useAuth } from '../hooks/UseAuth.jsx';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../Components/Firebase.js';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '../contexts/AdminContext.jsx';

const Login = () => {
  const { signIn, signUp, loading, error } = useAuth();
  const { loginAsAdmin } = useAdmin();
  const navigate = useNavigate();
  const [loginMode, setLoginMode] = useState('user'); // 'user' or 'admin'
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    displayName: ''
  });

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
      if (loginMode === 'admin') {
        if (loginAsAdmin(formData.email, formData.password)) {
          navigate('/admin');
        } else {
          alert('Invalid admin credentials. Try again.');
        }
      } else {
        if (isLogin) {
          await signIn(formData.email, formData.password);
          navigate('/');
        } else {
          await signUp(formData.email, formData.password, formData.displayName);
          navigate('/');
        }
      }
    } catch (err) {
      console.error('Authentication error:', err);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      navigate('/');
    } catch (err) {
      console.error('Google sign in error:', err);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="py-6 px-8">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-black rounded flex items-center justify-center">
            <span className="text-white font-bold text-sm">S</span>
          </div>
          <span className="text-xl font-semibold text-gray-900">SheStyled</span>
        </div>
      </header>

      <div className="flex-1 flex items-center justify-center px-8 py-12">
        <div className="max-w-sm w-full">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-semibold text-gray-900 mb-2">{isLogin ? 'Log in' : 'Get started'}</h1>
            <p className="text-gray-600">{isLogin ? 'Welcome back! Please select login type.' : 'Create your account to get started.'}</p>
          </div>

          {/* Login Type Buttons */}
          <div className="grid grid-cols-2 gap-3 mb-8">
            <button
              onClick={() => setLoginMode('user')}
              className={`py-4 px-6 rounded-lg font-semibold border-2 transition-all ${
                loginMode === 'user'
                  ? 'bg-blue-600 text-white border-blue-600 shadow-lg'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
              }`}
            >
              👤 User Login
            </button>
            <button
              onClick={() => setLoginMode('admin')}
              className={`py-4 px-6 rounded-lg font-semibold border-2 transition-all ${
                loginMode === 'admin'
                  ? 'bg-purple-600 text-white border-purple-600 shadow-lg'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
              }`}
            >
              👑 Admin Login
            </button>
          </div>

          {/* Social Login (User Only) */}
          {loginMode === 'user' && (
            <>
              <div className="space-y-3 mb-6">
                <button
                  onClick={handleGoogleSignIn}
                  disabled={loading}
                  className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-50 flex items-center justify-center space-x-3"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span>Continue with Google</span>
                </button>
              </div>
              <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">or</span>
                </div>
              </div>
            </>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {loginMode === 'user' && !isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Your name</label>
                <input
                  name="displayName"
                  value={formData.displayName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black"
                  placeholder="Enter your name"
                  required
                />
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black"
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black"
                placeholder="Enter your password"
                required
              />
            </div>
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-md text-sm">
                {error}
              </div>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white py-3 px-4 rounded-lg font-medium hover:bg-gray-800 disabled:opacity-50"
            >
              {loading ? 'Loading...' : (loginMode === 'admin' ? 'Login as Admin' : (isLogin ? 'Log in' : 'Create account'))}
            </button>
          </form>

          {loginMode === 'user' && (
            <div className="mt-6 text-center">
              <p className="text-gray-600 text-sm">
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-black font-medium hover:underline"
                >
                  {isLogin ? 'Sign up' : 'Log in'}
                </button>
              </p>
            </div>
          )}
        </div>
      </div>

      <footer className="py-6 px-8 border-t border-gray-200">
        <p className="text-center text-gray-500 text-sm">© 2024 SheStyled. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Login;

