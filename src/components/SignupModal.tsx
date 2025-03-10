import { useState } from 'react';
import { X, User, Mail, Lock, ArrowRight } from 'lucide-react';

interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSignup: (email: string, password: string, name: string) => void;
  onLogin: (email: string, password: string) => void;
  onGoogleLogin: () => void;
  onFacebookLogin: () => void;
  theme: string;
}

const themeColors = {
  dark: {
    bg: 'bg-gray-800',
    border: 'border-gray-700',
    input: 'bg-gray-700',
    inputBorder: 'border-gray-600',
    hover: 'hover:bg-gray-700',
    focus: 'focus:border-gray-500 focus:ring-gray-500'
  },
  darker: {
    bg: 'bg-gray-900',
    border: 'border-gray-800',
    input: 'bg-gray-800',
    inputBorder: 'border-gray-700',
    hover: 'hover:bg-gray-800',
    focus: 'focus:border-gray-600 focus:ring-gray-600'
  },
  ocean: {
    bg: 'bg-blue-800',
    border: 'border-blue-700',
    input: 'bg-blue-700',
    inputBorder: 'border-blue-600',
    hover: 'hover:bg-blue-700',
    focus: 'focus:border-blue-500 focus:ring-blue-500'
  },
  purple: {
    bg: 'bg-purple-800',
    border: 'border-purple-700',
    input: 'bg-purple-700',
    inputBorder: 'border-purple-600',
    hover: 'hover:bg-purple-700',
    focus: 'focus:border-purple-500 focus:ring-purple-500'
  },
  emerald: {
    bg: 'bg-emerald-800',
    border: 'border-emerald-700',
    input: 'bg-emerald-700',
    inputBorder: 'border-emerald-600',
    hover: 'hover:bg-emerald-700',
    focus: 'focus:border-emerald-500 focus:ring-emerald-500'
  },
  sunset: {
    bg: 'bg-red-800',
    border: 'border-red-700',
    input: 'bg-red-700',
    inputBorder: 'border-red-600',
    hover: 'hover:bg-red-700',
    focus: 'focus:border-red-500 focus:ring-red-500'
  }
};

export function SignupModal({ isOpen, onClose, onSignup, onLogin, onGoogleLogin, onFacebookLogin, theme }: SignupModalProps) {
  const [isSignup, setIsSignup] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const colors = themeColors[theme as keyof typeof themeColors];
  const inputClasses = `mt-1 block w-full rounded-lg ${colors.input} ${colors.inputBorder} text-white shadow-sm ${colors.focus} px-4 py-3 pl-10`;

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSignup) {
      if (password !== confirmPassword) {
        alert("Passwords don't match!");
        return;
      }
      onSignup(email, password, name);
    } else {
      onLogin(email, password);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className={`w-full max-w-md ${colors.bg} rounded-3xl shadow-2xl p-8 border ${colors.border} transform transition-all`}>
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">
              {isSignup ? 'Join Fintrek' : 'Welcome Back'}
            </h2>
            <p className="text-gray-400 text-base">
              {isSignup ? 'Create an account to start managing your finances' : 'Sign in to continue tracking'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-700/50 rounded-full"
          >
            <X size={24} />
          </button>
        </div>

        <div className="space-y-4 mb-8">
          <button
            onClick={onGoogleLogin}
            className="w-full px-6 py-3 text-base font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-all flex items-center justify-center space-x-3"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="currentColor" d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"/>
            </svg>
            <span>Continue with Google</span>
          </button>

          <button
            onClick={onFacebookLogin}
            className="w-full px-6 py-3 text-base font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-all flex items-center justify-center space-x-3"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="currentColor" d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96A10 10 0 0 0 22 12.06C22 6.53 17.5 2.04 12 2.04Z"/>
            </svg>
            <span>Continue with Facebook</span>
          </button>
        </div>

        <div className="relative mb-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-600"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className={`px-4 ${colors.bg} text-gray-400`}>Or continue with email</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {isSignup && (
            <div className="relative group">
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                Full Name
              </label>
              <div className={`relative rounded-lg group-hover:ring-2 ring-blue-500 transition-all`}>
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={inputClasses}
                  placeholder="John Doe"
                  required={isSignup}
                />
              </div>
            </div>
          )}

          <div className="relative group">
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
              Email Address
            </label>
            <div className={`relative rounded-lg group-hover:ring-2 ring-blue-500 transition-all`}>
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputClasses}
                placeholder="you@example.com"
                required
              />
            </div>
          </div>

          <div className="relative group">
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
              Password
            </label>
            <div className={`relative rounded-lg group-hover:ring-2 ring-blue-500 transition-all`}>
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={inputClasses}
                placeholder={isSignup ? "Create a strong password" : "Enter your password"}
                required
              />
            </div>
          </div>

          {isSignup && (
            <div className="relative group">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-1">
                Confirm Password
              </label>
              <div className={`relative rounded-lg group-hover:ring-2 ring-blue-500 transition-all`}>
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={inputClasses}
                  placeholder="Confirm your password"
                  required={isSignup}
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-full px-6 py-3.5 text-base font-medium text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all flex items-center justify-center space-x-2 mt-8"
          >
            <span>{isSignup ? 'Create Account' : 'Sign In'}</span>
            <ArrowRight className="h-5 w-5" />
          </button>

          <div className="text-center text-sm text-gray-400 mt-6">
            {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button
              type="button"
              onClick={() => {
                setIsSignup(!isSignup);
                setName('');
                setConfirmPassword('');
              }}
              className="text-blue-400 hover:text-blue-300 transition-colors font-medium"
            >
              {isSignup ? 'Sign In Instead' : 'Create Account'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
