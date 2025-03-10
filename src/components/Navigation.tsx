import { Menu, X, Settings as SettingsIcon, LayoutDashboard, FileText, Receipt, User } from 'lucide-react';
import { useState } from 'react';

interface NavigationProps {
  onNavigate: (page: string) => void;
  currentPage: string;
  theme: string;
  isAuthenticated: boolean;
}

const themeColors = {
  dark: {
    nav: 'bg-gray-800',
    border: 'border-gray-700',
    hover: 'hover:bg-gray-700',
  },
  darker: {
    nav: 'bg-gray-900',
    border: 'border-gray-800',
    hover: 'hover:bg-gray-800',
  },
  ocean: {
    nav: 'bg-blue-800',
    border: 'border-blue-700',
    hover: 'hover:bg-blue-700',
  },
  purple: {
    nav: 'bg-purple-800',
    border: 'border-purple-700',
    hover: 'hover:bg-purple-700',
  },
  emerald: {
    nav: 'bg-emerald-800',
    border: 'border-emerald-700',
    hover: 'hover:bg-emerald-700',
  },
  sunset: {
    nav: 'bg-red-800',
    border: 'border-red-700',
    hover: 'hover:bg-red-700',
  },
};

export function Navigation({ onNavigate, currentPage, theme, isAuthenticated }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const colors = themeColors[theme as keyof typeof themeColors];
  const navItemClasses = (page: string) =>
    `px-4 py-2 rounded-lg transition-colors ${currentPage === page ? 'bg-blue-600 text-white' : 'text-gray-300 hover:text-white'} ${colors.hover}`;

  const handleNavigate = (page: string) => {
    onNavigate(page);
    setIsMenuOpen(false);
  };

  return (
    <nav className={`${colors.nav} border-b ${colors.border} sticky top-0 z-40 backdrop-blur-lg bg-opacity-80`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <button
              onClick={() => onNavigate('home')}
              className="flex items-center text-xl font-bold text-white hover:text-blue-400 transition-colors"
              data-component-name="Navigation"
            >
              <img src="/fintrek-logo.svg" alt="Fintrek Logo" className="w-8 h-8 mr-2" />
              Fintrek
            </button>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <button
                  onClick={() => handleNavigate('dashboard')}
                  className={navItemClasses('dashboard')}
                >
                  <span className="flex items-center gap-2">
                    <LayoutDashboard className="w-5 h-5" />
                    Dashboard
                  </span>
                </button>
                <button
                  onClick={() => handleNavigate('expenses')}
                  className={navItemClasses('expenses')}
                >
                  <span className="flex items-center gap-2">
                    <Receipt className="w-5 h-5" />
                    Expenses
                  </span>
                </button>
                <button
                  onClick={() => handleNavigate('reports')}
                  className={navItemClasses('reports')}
                >
                  <span className="flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Reports
                  </span>
                </button>
                <button
                  onClick={() => handleNavigate('settings')}
                  className={navItemClasses('settings')}
                >
                  <span className="flex items-center gap-2">
                    <SettingsIcon className="w-5 h-5" />
                    Settings
                  </span>
                </button>
                <button
                  onClick={() => handleNavigate('profile')}
                  className={navItemClasses('profile')}
                >
                  <span className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Profile
                  </span>
                </button>
              </>
            ) : currentPage !== 'auth' && (
              <button
                onClick={() => handleNavigate('auth')}
                className="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
              >
                Sign In
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-white"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className={`${colors.nav} border-t ${colors.border} px-4 py-2 space-y-1`}>
            {isAuthenticated ? (
              <>
                <button
                  onClick={() => handleNavigate('dashboard')}
                  className={`block w-full text-left ${navItemClasses('dashboard')}`}
                >
                  <span className="flex items-center gap-2">
                    <LayoutDashboard className="w-5 h-5" />
                    Dashboard
                  </span>
                </button>
                <button
                  onClick={() => handleNavigate('expenses')}
                  className={`block w-full text-left ${navItemClasses('expenses')}`}
                >
                  <span className="flex items-center gap-2">
                    <Receipt className="w-5 h-5" />
                    Expenses
                  </span>
                </button>
                <button
                  onClick={() => handleNavigate('reports')}
                  className={`block w-full text-left ${navItemClasses('reports')}`}
                >
                  <span className="flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Reports
                  </span>
                </button>
                <button
                  onClick={() => handleNavigate('settings')}
                  className={`block w-full text-left ${navItemClasses('settings')}`}
                >
                  <span className="flex items-center gap-2">
                    <SettingsIcon className="w-5 h-5" />
                    Settings
                  </span>
                </button>
                <button
                  onClick={() => handleNavigate('profile')}
                  className={`block w-full text-left ${navItemClasses('profile')}`}
                >
                  <span className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Profile
                  </span>
                </button>
              </>
            ) : currentPage !== 'auth' && (
              <button
                onClick={() => handleNavigate('auth')}
                className="w-full px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
