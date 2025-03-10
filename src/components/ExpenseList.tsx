import { Trash2 } from 'lucide-react';
import type { Expense } from '../types';

interface ExpenseListProps {
  expenses: Expense[];
  onDeleteExpense: (id: string) => void;
  currency: string;
  theme: 'dark' | 'darker' | 'ocean' | 'purple' | 'emerald' | 'sunset';
}

const themeColors = {
  dark: {
    item: 'bg-gray-700/50',
    border: 'border-gray-600',
    hover: 'hover:bg-gray-600/50',
  },
  darker: {
    item: 'bg-gray-800/50',
    border: 'border-gray-700',
    hover: 'hover:bg-gray-700/50',
  },
  ocean: {
    item: 'bg-blue-700/50',
    border: 'border-blue-600',
    hover: 'hover:bg-blue-600/50',
  },
  purple: {
    item: 'bg-purple-700/50',
    border: 'border-purple-600',
    hover: 'hover:bg-purple-600/50',
  },
  emerald: {
    item: 'bg-emerald-700/50',
    border: 'border-emerald-600',
    hover: 'hover:bg-emerald-600/50',
  },
  sunset: {
    item: 'bg-red-700/50',
    border: 'border-red-600',
    hover: 'hover:bg-red-600/50',
  },
};

export function ExpenseList({ expenses, onDeleteExpense, currency, theme }: ExpenseListProps) {
  const colors = themeColors[theme];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  };

  if (expenses.length === 0) {
    return (
      <div className="text-center py-8 text-gray-400">
        No expenses recorded yet.
      </div>
    );
  }

  return (
    <div className="space-y-4 max-h-[400px] overflow-y-auto">
      {expenses.map((expense) => (
        <div
          key={expense.id}
          className={`flex items-center justify-between p-4 ${colors.item} rounded-lg border ${colors.border} ${colors.hover} transition-colors`}
        >
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-medium text-white truncate">
              {expense.description}
            </h3>
            <div className="mt-1 flex items-center gap-2 text-xs text-gray-300">
              <span>{expense.category}</span>
              <span>•</span>
              <span>{new Date(expense.date).toLocaleDateString()}</span>
            </div>
          </div>
          <div className="flex items-center gap-4 ml-4">
            <span className="text-sm font-medium text-white">
              {formatCurrency(expense.amount)}
            </span>
            <button
              onClick={() => onDeleteExpense(expense.id)}
              className="p-1 text-gray-400 hover:text-red-400 transition-colors"
              title="Delete expense"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}