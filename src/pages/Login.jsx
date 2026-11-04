import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Lock, User, Shield, Sparkles, ArrowRight, CheckCircle, TrendingUp } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';
import NotificationToast from '../components/NotificationToast';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [formData, setFormData] = useState({
    customerId: '',
    password: '',
    rememberMe: false
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.customerId || !formData.password) {
      setNotification({
        type: 'error',
        message: 'Please enter both Customer ID and Password'
      });
      return;
    }

    setLoading(true);
    
    try {
      await login(formData.customerId, formData.password);
      setNotification({
        type: 'success',
        message: 'Login successful! Redirecting...'
      });
      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);
    } catch (error) {
      setNotification({
        type: 'error',
        message: error.message || 'Login failed. Please try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-gray-100 via-gray-50 to-gray-100">
      {notification && (
        <NotificationToast
          type={notification.type}
          message={notification.message}
          onClose={() => setNotification(null)}
        />
      )}

      {/* Banking Background Image with Light Gray Overlay */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1554224154-26032ffc0d07?q=80&w=2070&auto=format&fit=crop)',
            filter: 'blur(3px)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-gray-100/95 via-gray-50/95 to-gray-100/95" />
        
        {/* Subtle Gradient Orbs */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-blue-200 to-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-blob" />
        <div className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-r from-purple-200 to-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-blob animation-delay-2000" />
        <div className="absolute bottom-20 left-1/3 w-96 h-96 bg-gradient-to-r from-amber-200 to-orange-300 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-blob animation-delay-4000" />
      </div>

      {/* Content */}
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Side - Branding & Features */}
          <div className="hidden lg:block text-gray-800 space-y-8">
            {/* Logo and Title */}
            <div className="space-y-6 animate-fade-in-left">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 bg-gradient-to-br from-amber-400 via-orange-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-2xl shadow-orange-500/30 backdrop-blur-sm border-4 border-white">
                  <span className="text-white font-black text-4xl">S</span>
                </div>
                <div>
                  <h1 className="text-6xl font-black text-gray-800 drop-shadow-lg">
                    SecureBank
                  </h1>
                  <p className="text-orange-600 text-xl font-semibold mt-1">Banking Made Simple & Secure</p>
                </div>
              </div>
            </div>

            {/* Feature Highlights */}
            <div className="space-y-4">
              <div className="bg-white/70 backdrop-blur-md border-2 border-gray-200 rounded-2xl p-6 hover:bg-white hover:shadow-2xl hover:shadow-blue-200/50 transition-all hover:scale-105">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                    <Shield size={28} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800 mb-1">Bank-Level Security</h3>
                    <p className="text-gray-600 text-sm">256-bit encryption protects your data</p>
                  </div>
                  <CheckCircle className="text-green-500" size={24} />
                </div>
              </div>

              <div className="bg-white/70 backdrop-blur-md border-2 border-gray-200 rounded-2xl p-6 hover:bg-white hover:shadow-2xl hover:shadow-purple-200/50 transition-all hover:scale-105 animation-delay-200">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                    <Sparkles size={28} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800 mb-1">Instant Transactions</h3>
                    <p className="text-gray-600 text-sm">Real-time money transfers 24/7</p>
                  </div>
                  <CheckCircle className="text-green-500" size={24} />
                </div>
              </div>

              <div className="bg-white/70 backdrop-blur-md border-2 border-gray-200 rounded-2xl p-6 hover:bg-white hover:shadow-2xl hover:shadow-amber-200/50 transition-all hover:scale-105 animation-delay-400">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                    <TrendingUp size={28} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800 mb-1">Smart Analytics</h3>
                    <p className="text-gray-600 text-sm">Track your spending with AI insights</p>
                  </div>
                  <CheckCircle className="text-green-500" size={24} />
                </div>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-4">
              <div className="text-center bg-white/70 backdrop-blur-md border-2 border-gray-200 rounded-xl p-4 hover:scale-110 transition-transform hover:bg-white">
                <div className="text-3xl font-black text-orange-600">500K+</div>
                <div className="text-xs text-gray-600 font-semibold mt-1">Active Users</div>
              </div>
              <div className="text-center bg-white/70 backdrop-blur-md border-2 border-gray-200 rounded-xl p-4 hover:scale-110 transition-transform hover:bg-white animation-delay-200">
                <div className="text-3xl font-black text-green-600">99.9%</div>
                <div className="text-xs text-gray-600 font-semibold mt-1">Uptime</div>
              </div>
              <div className="text-center bg-white/70 backdrop-blur-md border-2 border-gray-200 rounded-xl p-4 hover:scale-110 transition-transform hover:bg-white animation-delay-400">
                <div className="text-3xl font-black text-blue-600">24/7</div>
                <div className="text-xs text-gray-600 font-semibold mt-1">Support</div>
              </div>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="w-full max-w-md mx-auto lg:mx-0 animate-fade-in-up">
            {/* Mobile Logo */}
            <div className="lg:hidden text-center mb-8">
              <div className="inline-block w-24 h-24 bg-gradient-to-br from-amber-400 via-orange-500 to-pink-500 rounded-3xl flex items-center justify-center mb-4 shadow-2xl">
                <span className="text-white font-black text-5xl">S</span>
              </div>
              <h1 className="text-5xl font-black text-gray-800 mb-2">SecureBank</h1>
              <p className="text-orange-600 text-lg">Secure Banking Portal</p>
            </div>

            {/* Login Card */}
            <div className="bg-white rounded-3xl shadow-2xl p-8 border-2 border-gray-200">
              <div className="mb-8 bg-gray-50 -mx-8 -mt-8 px-8 pt-8 pb-6 rounded-t-3xl border-b-2 border-gray-200">
                <h2 className="text-3xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                  Welcome Back! 👋
                </h2>
                <p className="text-gray-600 font-medium">Sign in to continue to your account</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Customer ID */}
                <div className="space-y-2">
                  <label className="block text-sm font-bold text-gray-700">
                    Customer ID
                  </label>
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-400 group-focus-within:text-blue-600 transition-colors" size={20} />
                    <input
                      type="text"
                      name="customerId"
                      value={formData.customerId}
                      onChange={handleChange}
                      placeholder="Enter your Customer ID"
                      className="w-full pl-12 pr-4 py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 bg-gray-50 focus:bg-white transition-all text-gray-800 font-semibold hover:border-gray-400"
                      disabled={loading}
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <label className="block text-sm font-bold text-gray-700">
                    Password
                  </label>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-400 group-focus-within:text-purple-600 transition-colors" size={20} />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter your password"
                      className="w-full pl-12 pr-12 py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-100 bg-gray-50 focus:bg-white transition-all text-gray-800 font-semibold hover:border-gray-400"
                      disabled={loading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-purple-400 hover:text-purple-600 transition-colors"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      name="rememberMe"
                      checked={formData.rememberMe}
                      onChange={handleChange}
                      className="w-5 h-5 text-blue-600 border-gray-300 rounded-lg focus:ring-blue-500 cursor-pointer"
                      disabled={loading}
                    />
                    <span className="text-sm font-semibold text-gray-700 group-hover:text-blue-600 transition-colors">Remember me</span>
                  </label>
                  <a href="#" className="text-sm font-bold text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text hover:from-blue-700 hover:to-purple-700">
                    Forgot password?
                  </a>
                </div>

                {/* Login Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white font-black py-5 rounded-xl shadow-xl hover:shadow-2xl hover:shadow-purple-500/50 transform hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3 group"
                >
                  {loading ? (
                    <>
                      <LoadingSpinner size="sm" />
                      <span className="text-lg">Logging in...</span>
                    </>
                  ) : (
                    <>
                      <span className="text-lg">Sign In</span>
                      <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
                    </>
                  )}
                </button>
              </form>

              {/* Demo Credentials */}
              <div className="mt-6 p-5 bg-gray-50 border-2 border-gray-300 rounded-2xl">
                <p className="text-sm font-black text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text mb-3 flex items-center gap-2">
                  <Shield size={18} className="text-blue-600" />
                  Demo Credentials
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between bg-white p-3 rounded-lg shadow-sm border border-gray-200">
                    <span className="font-bold text-gray-700">Customer ID:</span>
                    <span className="font-mono font-black text-blue-600 bg-blue-50 px-3 py-1 rounded-lg border border-blue-200">CUST001</span>
                  </div>
                  <div className="flex items-center justify-between bg-white p-3 rounded-lg shadow-sm border border-gray-200">
                    <span className="font-bold text-gray-700">Password:</span>
                    <span className="font-mono font-black text-purple-600 bg-purple-50 px-3 py-1 rounded-lg border border-purple-200">password123</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <p className="text-center text-gray-600 text-sm mt-6 font-semibold">
              © 2026 SecureBank. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
