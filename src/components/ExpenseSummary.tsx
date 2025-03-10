import { useState } from 'react';
import { CreditCard, TrendingDown, TrendingUp } from 'lucide-react';
import type { Expense } from '../App';

interface ExpenseSummaryProps {
  expenses: Expense[];
  currency: string;
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

export function ExpenseSummary({ expenses, currency, theme }: ExpenseSummaryProps) {
  const colors = themeColors[theme as keyof typeof themeColors];
  const cardClasses = `${colors.card} rounded-xl shadow-lg p-6 backdrop-blur-lg border ${colors.border}`;

  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('month');

  const now = new Date();
  const filteredExpenses = expenses.filter(expense => {
    const expenseDate = new Date(expense.date);
    if (timeRange === 'week') {
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      return expenseDate >= weekAgo;
    } else if (timeRange === 'month') {
      return expenseDate.getMonth() === now.getMonth() && 
             expenseDate.getFullYear() === now.getFullYear();
    } else {
      return expenseDate.getFullYear() === now.getFullYear();
    }
  });

  const totalExpenses = filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  const averageExpense = filteredExpenses.length > 0 
    ? totalExpenses / filteredExpenses.length 
    : 0;

  const categoryTotals = filteredExpenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {} as Record<string, number>);

  const topCategory = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1])[0];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-white">Expense Summary</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setTimeRange('week')}
            className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
              timeRange === 'week'
                ? 'bg-blue-600 text-white'
                : `text-gray-300 ${colors.hover}`
            }`}
          >
            Week
          </button>
          <button
            onClick={() => setTimeRange('month')}
            className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
              timeRange === 'month'
                ? 'bg-blue-600 text-white'
                : `text-gray-300 ${colors.hover}`
            }`}
          >
            Month
          </button>
          <button
            onClick={() => setTimeRange('year')}
            className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
              timeRange === 'year'
                ? 'bg-blue-600 text-white'
                : `text-gray-300 ${colors.hover}`
            }`}
          >
            Year
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className={cardClasses}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-400">Total Expenses</p>
              <p className="text-2xl font-semibold text-white mt-1">
                {formatCurrency(totalExpenses)}
              </p>
            </div>
            <div className="p-3 rounded-full bg-blue-600/20">
              <CreditCard className="w-6 h-6 text-blue-500" />
            </div>
          </div>
        </div>

        <div className={cardClasses}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-400">Average Expense</p>
              <p className="text-2xl font-semibold text-white mt-1">
                {formatCurrency(averageExpense)}
              </p>
            </div>
            <div className="p-3 rounded-full bg-green-600/20">
              <TrendingUp className="w-6 h-6 text-green-500" />
            </div>
          </div>
        </div>

        <div className={cardClasses}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-400">Top Category</p>
              <p className="text-2xl font-semibold text-white mt-1">
                {topCategory ? topCategory[0] : 'N/A'}
              </p>
              {topCategory && (
                <p className="text-sm text-gray-400 mt-1">
                  {formatCurrency(topCategory[1])}
                </p>
              )}
            </div>
            <div className="p-3 rounded-full bg-purple-600/20">
              <TrendingDown className="w-6 h-6 text-purple-500" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}