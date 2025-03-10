import { useState } from 'react';
import { Mail, Lock, ArrowRight, DollarSign } from 'lucide-react';

interface AuthProps {
  onSignup: (email: string, password: string, name: string) => void;
  onLogin: (email: string, password: string) => void;
  onGoogleLogin: () => void;
  onFacebookLogin: () => void;
  theme: string;
}

const themeColors = {
  dark: {
    card: 'bg-gray-800',
    border: 'border-gray-700',
    hover: 'hover:bg-gray-700',
    input: 'bg-gray-700',
    inputBorder: 'border-gray-600',
    button: 'bg-blue-600 hover:bg-blue-700'
  },
  darker: {
    card: 'bg-gray-900',
    border: 'border-gray-800',
    hover: 'hover:bg-gray-800',
    input: 'bg-gray-800',
    inputBorder: 'border-gray-700',
    button: 'bg-blue-600 hover:bg-blue-700'
  },
  ocean: {
    card: 'bg-blue-900',
    border: 'border-blue-800',
    hover: 'hover:bg-blue-800',
    input: 'bg-blue-800',
    inputBorder: 'border-blue-700',
    button: 'bg-blue-600 hover:bg-blue-700'
  },
  purple: {
    card: 'bg-purple-900',
    border: 'border-purple-800',
    hover: 'hover:bg-purple-800',
    input: 'bg-purple-800',
    inputBorder: 'border-purple-700',
    button: 'bg-purple-600 hover:bg-purple-700'
  },
  emerald: {
    card: 'bg-emerald-900',
    border: 'border-emerald-800',
    hover: 'hover:bg-emerald-800',
    input: 'bg-emerald-800',
    inputBorder: 'border-emerald-700',
    button: 'bg-emerald-600 hover:bg-emerald-700'
  },
  sunset: {
    card: 'bg-red-900',
    border: 'border-red-800',
    hover: 'hover:bg-red-800',
    input: 'bg-red-800',
    inputBorder: 'border-red-700',
    button: 'bg-red-600 hover:bg-red-700'
  },
};

export function Auth({ onSignup, onLogin, onGoogleLogin, onFacebookLogin, theme }: AuthProps) {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const colors = themeColors[theme as keyof typeof themeColors];
  const inputClasses = `w-full px-4 py-3 rounded-lg ${colors.input} ${colors.inputBorder} text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSignup) {
      onSignup(email, password, name);
    } else {
      onLogin(email, password);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-4xl grid md:grid-cols-2 gap-8">
        {/* Left Side - Branding */}
        <div className="hidden md:flex flex-col justify-center space-y-6 p-8">
          <div className="flex items-center justify-center w-20 h-20 bg-blue-600 rounded-2xl shadow-lg">
            <DollarSign className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white">
            Track Your Expenses
          </h1>
          <p className="text-xl text-gray-300">
            Join thousands of users who trust Fintrek to manage their finances efficiently.
          </p>
          <div className="space-y-4 pt-4">
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold">1</span>
              </div>
              <p className="text-gray-300">Track expenses in real-time</p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold">2</span>
              </div>
              <p className="text-gray-300">Visualize spending patterns</p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold">3</span>
              </div>
              <p className="text-gray-300">Set and achieve budget goals</p>
            </div>
          </div>
        </div>

        {/* Right Side - Auth Form */}
        <div className={`${colors.card} rounded-2xl shadow-xl p-8 space-y-8 backdrop-blur-lg border ${colors.border}`}>
          <div>
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">
                {isSignup ? 'Create Account' : 'Welcome Back'}
              </h2>
              <p className="text-gray-400">
                Join thousands of users who trust Fintrek to manage their finances efficiently.
              </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              {isSignup && (
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <input
                      id="name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className={inputClasses}
                      placeholder="John Doe"
                    />
                  </div>
                </div>
              )}
              <div className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`${inputClasses} pl-12`}
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-400 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="password"
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={`${inputClasses} pl-12`}
                      placeholder="Enter your password"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white ${colors.button} hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
              >
                {isSignup ? 'Sign Up' : 'Sign In'}
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-600"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-gray-800 text-gray-400">Or continue with</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={onGoogleLogin}
                  className="w-full inline-flex justify-center py-2 px-4 border border-gray-600 rounded-lg shadow-sm bg-gray-800 text-sm font-medium text-gray-400 hover:bg-gray-700"
                >
                  Google
                </button>
                <button
                  type="button"
                  onClick={onFacebookLogin}
                  className="w-full inline-flex justify-center py-2 px-4 border border-gray-600 rounded-lg shadow-sm bg-gray-800 text-sm font-medium text-gray-400 hover:bg-gray-700"
                >
                  Facebook
                </button>
              </div>
            </div>

            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={() => setIsSignup(!isSignup)}
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                {isSignup
                  ? 'Already have an account? Sign in'
                  : "Don't have an account? Sign up"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
