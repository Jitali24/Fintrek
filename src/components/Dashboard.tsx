import { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import { Expense, ExpenseCategory } from '../types';
import toast from 'react-hot-toast';

interface DashboardProps {
  expenses: Expense[];
  setExpenses: React.Dispatch<React.SetStateAction<Expense[]>>;
  theme: string;
}

const themeColors = {
  dark: {
    card: 'bg-gray-800',
    border: 'border-gray-700',
    hover: 'hover:bg-gray-700',
  },
  darker: {
    card: 'bg-gray-900',
    border: 'border-gray-800',
    hover: 'hover:bg-gray-800',
  },
  ocean: {
    card: 'bg-blue-800',
    border: 'border-blue-700',
    hover: 'hover:bg-blue-700',
  },
  purple: {
    card: 'bg-purple-800',
    border: 'border-purple-700',
    hover: 'hover:bg-purple-700',
  },
  emerald: {
    card: 'bg-emerald-800',
    border: 'border-emerald-700',
    hover: 'hover:bg-emerald-700',
  },
  sunset: {
    card: 'bg-red-800',
    border: 'border-red-700',
    hover: 'hover:bg-red-700',
  },
};

export default function Dashboard({ expenses, setExpenses, theme }: DashboardProps) {
  const [showAddExpense, setShowAddExpense] = useState(false);
  const [newExpense, setNewExpense] = useState({
    amount: '',
    description: '',
    category: '',
    date: new Date().toISOString().split('T')[0],
  });

  const colors = themeColors[theme as keyof typeof themeColors];
  const cardClasses = `${colors.card} rounded-xl shadow-lg backdrop-blur-lg border ${colors.border}`;

  const handleAddExpense = () => {
    if (!newExpense.amount || !newExpense.description || !newExpense.category) {
      toast.error('Please fill in all fields');
      return;
    }

    const expense: Expense = {
      id: Date.now().toString(),
      amount: parseFloat(newExpense.amount),
      description: newExpense.description,
      category: newExpense.category as ExpenseCategory,
      date: newExpense.date,
    };

    setExpenses(prev => [expense, ...prev]);
    setNewExpense({
      amount: '',
      description: '',
      category: '',
      date: new Date().toISOString().split('T')[0],
    });
    setShowAddExpense(false);
    toast.success('Expense added successfully!');
  };

  const categories: ExpenseCategory[] = [
    'Food & Dining',
    'Transportation',
    'Shopping',
    'Entertainment',
    'Bills & Utilities',
    'Health',
    'Travel',
    'Education',
    'Other',
  ];

  const getRecentExpenses = () => {
    return expenses.slice(0, 5);
  };

  const getTotalExpenses = () => {
    return expenses.reduce((total, expense) => total + expense.amount, 0);
  };

  const getExpensesByCategory = () => {
    return expenses.reduce((acc, expense) => {
      const category = expense.category as ExpenseCategory;
      acc[category] = (acc[category] || 0) + expense.amount;
      return acc;
    }, {} as Record<ExpenseCategory, number>);
  };

  return (
    <div className="space-y-6">
      {/* Quick Add Expense */}
      <div className={cardClasses}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Quick Add Expense</h2>
            <button
              onClick={() => setShowAddExpense(!showAddExpense)}
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              <PlusCircle className="w-6 h-6" />
            </button>
          </div>
          {showAddExpense && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="number"
                  placeholder="Amount"
                  value={newExpense.amount}
                  onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400"
                />
                <input
                  type="text"
                  placeholder="Description"
                  value={newExpense.description}
                  onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400"
                />
                <select
                  value={newExpense.category}
                  onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                >
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                <input
                  type="date"
                  value={newExpense.date}
                  onChange={(e) => setNewExpense({ ...newExpense, date: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                />
              </div>
              <button
                onClick={handleAddExpense}
                className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                Add Expense
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className={cardClasses}>
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-400 mb-2">Total Expenses</h3>
            <p className="text-3xl font-bold text-white">${getTotalExpenses().toFixed(2)}</p>
          </div>
        </div>
        <div className={cardClasses}>
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-400 mb-2">Recent Transactions</h3>
            <p className="text-3xl font-bold text-white">{expenses.length}</p>
          </div>
        </div>
        <div className={cardClasses}>
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-400 mb-2">Categories</h3>
            <p className="text-3xl font-bold text-white">{Object.keys(getExpensesByCategory()).length}</p>
          </div>
        </div>
      </div>

      {/* Recent Expenses */}
      <div className={cardClasses}>
        <div className="p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Recent Expenses</h3>
          <div className="space-y-4">
            {getRecentExpenses().map((expense) => (
              <div
                key={expense.id}
                className="flex items-center justify-between p-4 rounded-lg bg-gray-700"
              >
                <div>
                  <p className="text-white font-medium">{expense.description}</p>
                  <p className="text-sm text-gray-400">{expense.category}</p>
                </div>
                <div className="text-right">
                  <p className="text-white font-medium">${expense.amount.toFixed(2)}</p>
                  <p className="text-sm text-gray-400">{new Date(expense.date).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
            {expenses.length === 0 && (
              <p className="text-gray-400 text-center">No expenses yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
