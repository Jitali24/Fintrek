import { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { Navigation } from './components/Navigation';
import { LandingHero } from './components/LandingHero';
import Dashboard from './components/Dashboard';
import { Settings } from './components/Settings';
import { Auth } from './components/Auth';
import { Reports } from './components/Reports';
import { Expenses } from './components/Expenses';
import { Profile } from './components/Profile';
import { AppSettings, Expense } from './types';

const defaultSettings: AppSettings = {
  currency: 'USD',
  theme: 'dark',
  language: 'English',
  notifications: true,
  categories: ['Food & Dining', 'Transportation', 'Shopping', 'Entertainment', 'Bills & Utilities', 'Health', 'Travel', 'Education', 'Other'],
  monthlyBudget: 2000,
  showNotifications: true
};

const sampleExpenses: Expense[] = [
  {
    id: '1',
    amount: 45.99,
    description: 'Grocery Shopping',
    category: 'Food & Dining',
    date: '2025-03-10',
  },
  {
    id: '2',
    amount: 25.50,
    description: 'Movie Tickets',
    category: 'Entertainment',
    date: '2025-03-09',
  },
  {
    id: '3',
    amount: 89.99,
    description: 'Electric Bill',
    category: 'Bills & Utilities',
    date: '2025-03-08',
  },
  {
    id: '4',
    amount: 35.00,
    description: 'Bus Pass',
    category: 'Transportation',
    date: '2025-03-07',
  },
  {
    id: '5',
    amount: 129.99,
    description: 'New Running Shoes',
    category: 'Shopping',
    date: '2025-03-06',
  },
  {
    id: '6',
    amount: 75.00,
    description: 'Doctor Visit',
    category: 'Health',
    date: '2025-03-05',
  },
  {
    id: '7',
    amount: 199.99,
    description: 'Online Course',
    category: 'Education',
    date: '2025-03-04',
  },
  {
    id: '8',
    amount: 450.00,
    description: 'Weekend Trip',
    category: 'Travel',
    date: '2025-03-03',
  }
];

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [settings, setSettings] = useState<AppSettings>(() => {
    const savedSettings = localStorage.getItem('settings');
    return savedSettings ? JSON.parse(savedSettings) : defaultSettings;
  });
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('isAuthenticated') === 'true';
  });
  const [expenses, setExpenses] = useState<Expense[]>(() => {
    const savedExpenses = localStorage.getItem('expenses');
    return savedExpenses ? JSON.parse(savedExpenses) : sampleExpenses;
  });

  useEffect(() => {
    localStorage.setItem('settings', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  useEffect(() => {
    localStorage.setItem('isAuthenticated', String(isAuthenticated));
  }, [isAuthenticated]);

  const handleNavigate = (page: string) => {
    if (!isAuthenticated && page !== 'home') {
      setCurrentPage('auth');
      return;
    }
    setCurrentPage(page);
  };

  const handleGetStarted = () => {
    setCurrentPage('auth');
  };

  const handleSignup = (email: string, password: string, name: string) => {
    console.log('Signing up with:', email, password, name);
    setIsAuthenticated(true);
    setCurrentPage('dashboard');
  };

  const handleLogin = (email: string, password: string) => {
    console.log('Logging in with:', email, password);
    setIsAuthenticated(true);
    setCurrentPage('dashboard');
  };

  const handleGoogleLogin = () => {
    console.log('Logging in with Google');
    // Implement Google OAuth login here
    setIsAuthenticated(true);
    setCurrentPage('dashboard');
  };

  const handleFacebookLogin = () => {
    console.log('Logging in with Facebook');
    // Implement Facebook OAuth login here
    setIsAuthenticated(true);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentPage('home');
    localStorage.removeItem('isAuthenticated');
  };

  const handleUpdateSettings = (newSettings: AppSettings) => {
    setSettings(newSettings);
  };

  const getThemeBackground = () => {
    switch (settings.theme) {
      case 'dark':
        return 'bg-gray-900';
      case 'darker':
        return 'bg-black';
      case 'ocean':
        return 'bg-blue-900';
      case 'purple':
        return 'bg-purple-900';
      case 'emerald':
        return 'bg-emerald-900';
      case 'sunset':
        return 'bg-red-900';
    }
  };

  return (
    <div className={`min-h-screen ${getThemeBackground()}`}>
      <Toaster position="top-right" />
      <Navigation
        onNavigate={handleNavigate}
        currentPage={currentPage}
        theme={settings.theme}
        isAuthenticated={isAuthenticated}
      />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentPage === 'home' && (
          <LandingHero onGetStarted={handleGetStarted} />
        )}
        {currentPage === 'auth' && (
          <Auth 
            onLogin={handleLogin} 
            onSignup={handleSignup} 
            onGoogleLogin={handleGoogleLogin}
            onFacebookLogin={handleFacebookLogin}
            theme={settings.theme} 
          />
        )}
        {currentPage === 'dashboard' && isAuthenticated && (
          <Dashboard expenses={expenses} setExpenses={setExpenses} theme={settings.theme} />
        )}
        {currentPage === 'expenses' && isAuthenticated && (
          <Expenses expenses={expenses} setExpenses={setExpenses} theme={settings.theme} />
        )}
        {currentPage === 'reports' && isAuthenticated && (
          <Reports expenses={expenses} theme={settings.theme} />
        )}
        {currentPage === 'profile' && isAuthenticated && (
          <Profile theme={settings.theme} onLogout={handleLogout} />
        )}
        {currentPage === 'settings' && isAuthenticated && (
          <Settings settings={settings} onUpdateSettings={handleUpdateSettings} />
        )}
      </main>
    </div>
  );
}