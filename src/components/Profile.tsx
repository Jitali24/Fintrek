import { useState } from 'react';
import { User, Mail, Phone, MapPin, RefreshCw, Edit2, LogOut } from 'lucide-react';
import toast from 'react-hot-toast';

interface ProfileProps {
  theme: string;
  onLogout: () => void;
}

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  location: string;
  avatar: string;
  currency: string;
  language: string;
  notifications: boolean;
}

const themeColors = {
  dark: {
    card: 'bg-gray-800',
    border: 'border-gray-700',
    hover: 'hover:bg-gray-700',
    input: 'bg-gray-700',
    inputBorder: 'border-gray-600',
  },
  darker: {
    card: 'bg-gray-900',
    border: 'border-gray-800',
    hover: 'hover:bg-gray-800',
    input: 'bg-gray-800',
    inputBorder: 'border-gray-700',
  },
  ocean: {
    card: 'bg-blue-800',
    border: 'border-blue-700',
    hover: 'hover:bg-blue-700',
    input: 'bg-blue-700',
    inputBorder: 'border-blue-600',
  },
  purple: {
    card: 'bg-purple-800',
    border: 'border-purple-700',
    hover: 'hover:bg-purple-700',
    input: 'bg-purple-700',
    inputBorder: 'border-purple-600',
  },
  emerald: {
    card: 'bg-emerald-800',
    border: 'border-emerald-700',
    hover: 'hover:bg-emerald-700',
    input: 'bg-emerald-700',
    inputBorder: 'border-emerald-600',
  },
  sunset: {
    card: 'bg-red-800',
    border: 'border-red-700',
    hover: 'hover:bg-red-700',
    input: 'bg-red-700',
    inputBorder: 'border-red-600',
  },
};

export function Profile({ theme, onLogout }: ProfileProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<UserProfile>(() => {
    const savedProfile = localStorage.getItem('userProfile');
    return savedProfile ? JSON.parse(savedProfile) : {
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+1 (555) 123-4567',
      location: 'New York, USA',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
      currency: 'USD',
      language: 'English',
      notifications: true,
    };
  });

  const colors = themeColors[theme as keyof typeof themeColors];
  const cardClasses = `${colors.card} rounded-xl shadow-lg backdrop-blur-lg border ${colors.border}`;
  const inputClasses = `w-full px-4 py-2 rounded-lg ${colors.input} ${colors.inputBorder} text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`;

  const handleSave = () => {
    localStorage.setItem('userProfile', JSON.stringify(profile));
    setIsEditing(false);
    toast.success('Profile updated successfully!');
  };

  const handleAvatarChange = () => {
    // Generate a new avatar using DiceBear API
    const newAvatar = `https://api.dicebear.com/7.x/avataaars/svg?seed=${Math.random()}`;
    setProfile(prev => ({ ...prev, avatar: newAvatar }));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Profile Header */}
      <div className={cardClasses}>
        <div className="p-6">
          <div className="flex items-start justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Profile Settings</h2>
            <button
              onClick={() => isEditing ? handleSave() : setIsEditing(true)}
              className="px-4 py-2 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              {isEditing ? 'Save Changes' : (
                <>
                  <Edit2 className="w-4 h-4" />
                  Edit Profile
                </>
              )}
            </button>
          </div>

          <div className="flex flex-col md:flex-row gap-8">
            {/* Avatar Section */}
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <img
                  src={profile.avatar}
                  alt="Profile"
                  className="w-32 h-32 rounded-full bg-gray-700"
                />
                {isEditing && (
                  <button
                    onClick={handleAvatarChange}
                    className="absolute bottom-0 right-0 p-2 bg-blue-600 rounded-full hover:bg-blue-700 transition-colors"
                  >
                    <RefreshCw className="w-5 h-5 text-white" />
                  </button>
                )}
              </div>
              <h3 className="text-lg font-medium text-white">{profile.name}</h3>
              <button
                onClick={onLogout}
                className="flex items-center gap-2 px-4 py-2 text-sm text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors mt-2"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>

            {/* Profile Info */}
            <div className="flex-1 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  <User className="w-4 h-4 inline mr-2" />
                  Full Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                    className={inputClasses}
                  />
                ) : (
                  <p className="text-white">{profile.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  <Mail className="w-4 h-4 inline mr-2" />
                  Email
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                    className={inputClasses}
                  />
                ) : (
                  <p className="text-white">{profile.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  <Phone className="w-4 h-4 inline mr-2" />
                  Phone
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={profile.phone}
                    onChange={(e) => setProfile(prev => ({ ...prev, phone: e.target.value }))}
                    className={inputClasses}
                  />
                ) : (
                  <p className="text-white">{profile.phone}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  <MapPin className="w-4 h-4 inline mr-2" />
                  Location
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profile.location}
                    onChange={(e) => setProfile(prev => ({ ...prev, location: e.target.value }))}
                    className={inputClasses}
                  />
                ) : (
                  <p className="text-white">{profile.location}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Preferences */}
      <div className={cardClasses}>
        <div className="p-6">
          <h3 className="text-xl font-semibold text-white mb-6">Preferences</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Currency
              </label>
              {isEditing ? (
                <select
                  value={profile.currency}
                  onChange={(e) => setProfile(prev => ({ ...prev, currency: e.target.value }))}
                  className={inputClasses}
                >
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="GBP">GBP (£)</option>
                  <option value="INR">INR (₹)</option>
                  <option value="JPY">JPY (¥)</option>
                </select>
              ) : (
                <p className="text-white">{profile.currency}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Language
              </label>
              {isEditing ? (
                <select
                  value={profile.language}
                  onChange={(e) => setProfile(prev => ({ ...prev, language: e.target.value }))}
                  className={inputClasses}
                >
                  <option value="English">English</option>
                  <option value="Spanish">Spanish</option>
                  <option value="French">French</option>
                  <option value="German">German</option>
                  <option value="Japanese">Japanese</option>
                </select>
              ) : (
                <p className="text-white">{profile.language}</p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={profile.notifications}
                  onChange={(e) => isEditing && setProfile(prev => ({ ...prev, notifications: e.target.checked }))}
                  disabled={!isEditing}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
                <span className="text-gray-400">Enable email notifications</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
