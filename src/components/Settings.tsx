import { useState } from 'react';
import { Save, RefreshCw } from 'lucide-react';
import toast from 'react-hot-toast';
import type { AppSettings, ExpenseCategory } from '../types';

interface SettingsProps {
  onUpdateSettings: (settings: AppSettings) => void;
  settings: AppSettings;
}

const defaultCategories: ExpenseCategory[] = [
  'Food & Dining',
  'Transportation',
  'Shopping',
  'Entertainment',
  'Bills & Utilities',
  'Health',
  'Travel',
  'Education',
  'Other'
];

const themes = [
  { id: 'dark', name: 'Dark', colors: 'from-gray-900 to-gray-800' },
  { id: 'darker', name: 'Darker', colors: 'from-gray-950 to-gray-900' },
  { id: 'ocean', name: 'Ocean', colors: 'from-blue-900 to-blue-800' },
  { id: 'purple', name: 'Purple', colors: 'from-purple-900 to-purple-800' },
  { id: 'emerald', name: 'Emerald', colors: 'from-emerald-900 to-emerald-800' },
  { id: 'sunset', name: 'Sunset', colors: 'from-orange-900 to-red-800' }
];

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

export function Settings({ onUpdateSettings, settings }: SettingsProps) {
  const [formData, setFormData] = useState<AppSettings>(settings);
  const [newCategory, setNewCategory] = useState('');

  const colors = themeColors[formData.theme];
  const cardClasses = `${colors.card} rounded-xl shadow-lg p-6 backdrop-blur-lg border ${colors.border}`;
  const inputClasses = `mt-1 block w-full rounded-md ${colors.input} ${colors.inputBorder} text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4 py-2.5`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateSettings(formData);
    toast.success('Settings updated successfully!');
  };

  const handleThemeChange = (newTheme: AppSettings['theme']) => {
    const updatedSettings = { ...formData, theme: newTheme };
    setFormData(updatedSettings);
    onUpdateSettings(updatedSettings); // Apply theme change immediately
  };

  const handleAddCategory = () => {
    if (newCategory.trim() && !formData.categories.includes(newCategory.trim() as ExpenseCategory)) {
      const category = newCategory.trim() as ExpenseCategory;
      setFormData(prev => ({
        ...prev,
        categories: [...prev.categories, category]
      }));
      setNewCategory('');
    }
  };

  const handleRemoveCategory = (category: ExpenseCategory) => {
    setFormData(prev => ({
      ...prev,
      categories: prev.categories.filter(c => c !== category)
    }));
  };

  const handleResetCategories = () => {
    setFormData(prev => ({
      ...prev,
      categories: defaultCategories
    }));
    toast.success('Categories reset to default!');
  };

  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Currency Settings */}
        <div className={cardClasses}>
          <h3 className="text-lg font-semibold text-white mb-4">Currency Settings</h3>
          <div className="space-y-4">
            <div>
              <label htmlFor="currency" className="block text-sm font-medium text-gray-300">
                Currency
              </label>
              <select
                id="currency"
                value={formData.currency}
                onChange={(e) => setFormData(prev => ({ ...prev, currency: e.target.value }))}
                className={inputClasses}
              >
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
                <option value="INR">INR (₹)</option>
                <option value="JPY">JPY (¥)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Budget Settings */}
        <div className={cardClasses}>
          <h3 className="text-lg font-semibold text-white mb-4">Budget Settings</h3>
          <div className="space-y-4">
            <div>
              <label htmlFor="monthlyBudget" className="block text-sm font-medium text-gray-300">
                Monthly Budget
              </label>
              <input
                type="number"
                id="monthlyBudget"
                value={formData.monthlyBudget}
                onChange={(e) => setFormData(prev => ({ ...prev, monthlyBudget: Number(e.target.value) }))}
                className={inputClasses}
                min="0"
                step="100"
              />
            </div>
          </div>
        </div>

        {/* Category Management */}
        <div className={cardClasses}>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-white">Category Management</h3>
            <button
              type="button"
              onClick={handleResetCategories}
              className={`inline-flex items-center px-3 py-1 text-sm text-gray-300 hover:text-white ${colors.input} rounded-md border ${colors.inputBorder} ${colors.hover} transition-colors gap-2`}
            >
              <RefreshCw size={14} />
              Reset to Default
            </button>
          </div>
          
          <div className="space-y-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="Add new category"
                className={inputClasses}
              />
              <button
                type="button"
                onClick={handleAddCategory}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
              >
                Add
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {formData.categories.map((category) => (
                <span
                  key={category}
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${colors.input} text-white`}
                >
                  {category}
                  <button
                    type="button"
                    onClick={() => handleRemoveCategory(category)}
                    className="ml-2 text-gray-400 hover:text-gray-300"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Theme Settings */}
        <div className={cardClasses}>
          <h3 className="text-lg font-semibold text-white mb-4">Theme</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {themes.map((theme) => (
              <label
                key={theme.id}
                className={`relative flex flex-col items-center gap-2 p-4 rounded-lg cursor-pointer border-2 transition-all ${
                  formData.theme === theme.id
                    ? 'border-blue-500 bg-blue-500/10'
                    : `${colors.border} ${colors.input}/50 ${colors.hover}`
                }`}
              >
                <div className={`w-full h-12 rounded-md bg-gradient-to-br ${theme.colors}`} />
                <span className="text-sm font-medium text-white">{theme.name}</span>
                <input
                  type="radio"
                  name="theme"
                  value={theme.id}
                  checked={formData.theme === theme.id}
                  onChange={(e) => handleThemeChange(e.target.value as AppSettings['theme'])}
                  className="sr-only"
                />
                {formData.theme === theme.id && (
                  <div className="absolute inset-0 border-2 border-blue-500 rounded-lg pointer-events-none" />
                )}
              </label>
            ))}
          </div>
        </div>

        {/* Notification Settings */}
        <div className={cardClasses}>
          <h3 className="text-lg font-semibold text-white mb-4">Notifications</h3>
          <div className="space-y-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.showNotifications}
                onChange={(e) => setFormData(prev => ({ ...prev, showNotifications: e.target.checked }))}
                className={`rounded ${colors.input} ${colors.inputBorder} text-blue-600 focus:ring-blue-500`}
              />
              <span className="ml-2 text-gray-300">Show notifications for expense updates</span>
            </label>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors gap-2"
          >
            <Save size={16} />
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
