import { useState } from 'react';
import { Search, Filter, Trash2 } from 'lucide-react';
import { Expense } from '../types';

interface ExpensesProps {
  expenses: Expense[];
  setExpenses: React.Dispatch<React.SetStateAction<Expense[]>>;
  theme: string;
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

const categories = [
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

export function Expenses({ expenses, setExpenses, theme }: ExpensesProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState<'date' | 'amount'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const colors = themeColors[theme as keyof typeof themeColors];
  const cardClasses = `${colors.card} rounded-xl shadow-lg backdrop-blur-lg border ${colors.border}`;
  const inputClasses = `w-full px-4 py-2 rounded-lg ${colors.input} ${colors.inputBorder} text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`;

  const filteredExpenses = expenses
    .filter(expense => {
      const matchesSearch = expense.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          expense.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || expense.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === 'date') {
        return sortOrder === 'desc'
          ? new Date(b.date).getTime() - new Date(a.date).getTime()
          : new Date(a.date).getTime() - new Date(b.date).getTime();
      } else {
        return sortOrder === 'desc'
          ? b.amount - a.amount
          : a.amount - b.amount;
      }
    });

  const handleSort = (field: 'date' | 'amount') => {
    if (sortBy === field) {
      setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  const handleDeleteExpense = (id: string) => {
    setExpenses(prev => prev.filter(expense => expense.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Search and Filter Bar */}
      <div className={`${cardClasses} p-6`}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search Input */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search expenses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`${inputClasses} pl-12`}
            />
          </div>

          {/* Category Filter */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Filter className="h-5 w-5 text-gray-400" />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className={`${inputClasses} pl-12`}
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          {/* Sort Buttons */}
          <div className="flex gap-2">
            <button
              onClick={() => handleSort('date')}
              className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
                sortBy === 'date' ? 'bg-blue-600 text-white' : `text-gray-300 ${colors.hover} hover:text-white`
              }`}
            >
              Date {sortBy === 'date' && (sortOrder === 'asc' ? '↑' : '↓')}
            </button>
            <button
              onClick={() => handleSort('amount')}
              className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
                sortBy === 'amount' ? 'bg-blue-600 text-white' : `text-gray-300 ${colors.hover} hover:text-white`
              }`}
            >
              Amount {sortBy === 'amount' && (sortOrder === 'asc' ? '↑' : '↓')}
            </button>
          </div>
        </div>
      </div>

      {/* Expenses List */}
      <div className={`${cardClasses} overflow-hidden`}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b border-gray-700">
                <th className="px-6 py-4 text-sm font-semibold text-gray-300">Date</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-300">Description</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-300">Category</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-300">Amount</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {filteredExpenses.map(expense => (
                <tr
                  key={expense.id}
                  className={`${colors.hover} transition-colors group`}
                >
                  <td className="px-6 py-4 text-sm text-gray-300">
                    {new Date(expense.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-white font-medium">
                    {expense.description}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-300">
                    {expense.category}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-white">
                    ${expense.amount.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <button
                      onClick={() => handleDeleteExpense(expense.id)}
                      className="text-gray-400 hover:text-red-400 transition-colors"
                      title="Delete expense"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredExpenses.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-400">
                    No expenses found matching your criteria
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
