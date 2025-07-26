import React, { useState } from 'react';
import { Zap, Star, User, Mail, Lock, UserPlus, Leaf, BarChart3 } from 'lucide-react';

type LoginPageProps = {
  onLogin: (user: { id: string; name: string; email: string }) => void;
  onNavigate: (page: 'reviews') => void;
};

const testimonials = [
  {
    name: "Priya Sharma",
    rating: 5,
    comment: "Reduced my electricity bill by 30% in just 2 months! The AI predictions are incredibly accurate.",
    avatar: "PS"
  },
  {
    name: "Rajesh Kumar",
    rating: 5,
    comment: "Perfect for managing our office electricity costs. The appliance analysis helped us identify major energy drains.",
    avatar: "RK"
  },
  {
    name: "Anjali Patel",
    rating: 4,
    comment: "Great insights and suggestions. The peak hour analysis was eye-opening for our family.",
    avatar: "AP"
  }
];

const LoginPage: React.FC<LoginPageProps> = ({ onLogin, onNavigate }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate authentication
    const user = {
      id: '1',
      name: formData.name || 'John Doe',
      email: formData.email || 'user@example.com'
    };
    onLogin(user);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-green-800 to-blue-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-yellow-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-green-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-40 left-1/3 w-60 h-60 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Floating Icons Animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <Zap className="absolute top-20 left-10 w-6 h-6 text-yellow-400 opacity-30 animate-bounce" style={{ animationDelay: '0s' }} />
        <Leaf className="absolute top-40 right-20 w-8 h-8 text-green-400 opacity-30 animate-bounce" style={{ animationDelay: '2s' }} />
        <BarChart3 className="absolute bottom-40 left-20 w-7 h-7 text-blue-400 opacity-30 animate-bounce" style={{ animationDelay: '4s' }} />
        <Zap className="absolute bottom-20 right-10 w-5 h-5 text-yellow-400 opacity-30 animate-bounce" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center px-6 py-12">
        <div className="max-w-6xl w-full grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column - Branding & Testimonials */}
          <div className="text-white space-y-8">
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-green-400 bg-clip-text text-transparent">
                  Smart Power Optimizer
                </h1>
              </div>
              
              <p className="text-xl text-blue-100 leading-relaxed">
                Analyze, Predict & Save Electricity with AI-Powered Insights
              </p>
              
              <div className="grid grid-cols-3 gap-6 pt-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <BarChart3 className="w-8 h-8 text-white" />
                  </div>
                  <p className="text-sm text-blue-200">Smart Analysis</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Zap className="w-8 h-8 text-white" />
                  </div>
                  <p className="text-sm text-blue-200">Bill Prediction</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Leaf className="w-8 h-8 text-white" />
                  </div>
                  <p className="text-sm text-blue-200">Energy Savings</p>
                </div>
              </div>
            </div>

            {/* Testimonials */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-green-300">What Our Users Say</h3>
              <div className="space-y-4">
                {testimonials.slice(0, 2).map((testimonial, index) => (
                  <div key={index} className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {testimonial.avatar}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="font-medium text-white">{testimonial.name}</span>
                          <div className="flex space-x-1">
                            {[...Array(testimonial.rating)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                        </div>
                        <p className="text-blue-100 text-sm">{testimonial.comment}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button 
                onClick={() => onNavigate('reviews')}
                className="text-green-300 hover:text-green-200 text-sm underline transition-colors"
              >
                View all reviews →
              </button>
            </div>
          </div>

          {/* Right Column - Login Form */}
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold text-white">
                  {isLogin ? 'Welcome Back!' : 'Create Account'}
                </h2>
                <p className="text-blue-200">
                  {isLogin ? 'Sign in to optimize your energy usage' : 'Join thousands saving on electricity bills'}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {!isLogin && (
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-300" />
                    <input
                      type="text"
                      placeholder="Full Name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all"
                    />
                  </div>
                )}
                
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-300" />
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all"
                  />
                </div>
                
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-300" />
                  <input
                    type="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-semibold rounded-xl transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-400 flex items-center justify-center space-x-2"
                >
                  {isLogin ? (
                    <>
                      <User className="w-5 h-5" />
                      <span>Sign In</span>
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-5 h-5" />
                      <span>Create Account</span>
                    </>
                  )}
                </button>
              </form>

              <div className="text-center">
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-green-300 hover:text-green-200 transition-colors"
                >
                  {isLogin ? "Don't have an account? Register here" : "Already have an account? Sign in"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;