import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import type { Expense } from '../types';

interface ExpenseFormProps {
  onAddExpense: (expense: Expense) => void;
  categories: string[];
  theme: 'dark' | 'darker' | 'ocean' | 'purple' | 'emerald' | 'sunset';
}

const themeColors = {
  dark: {
    input: 'bg-gray-700 border-gray-600',
    hover: 'hover:bg-gray-700',
    focus: 'focus:border-blue-500 focus:ring-blue-500',
  },
  darker: {
    input: 'bg-gray-800 border-gray-700',
    hover: 'hover:bg-gray-800',
    focus: 'focus:border-blue-600 focus:ring-blue-600',
  },
  ocean: {
    input: 'bg-blue-700 border-blue-600',
    hover: 'hover:bg-blue-700',
    focus: 'focus:border-blue-400 focus:ring-blue-400',
  },
  purple: {
    input: 'bg-purple-700 border-purple-600',
    hover: 'hover:bg-purple-700',
    focus: 'focus:border-purple-400 focus:ring-purple-400',
  },
  emerald: {
    input: 'bg-emerald-700 border-emerald-600',
    hover: 'hover:bg-emerald-700',
    focus: 'focus:border-emerald-400 focus:ring-emerald-400',
  },
  sunset: {
    input: 'bg-red-700 border-red-600',
    hover: 'hover:bg-red-700',
    focus: 'focus:border-orange-400 focus:ring-orange-400',
  },
};

export function ExpenseForm({ onAddExpense, categories, theme }: ExpenseFormProps) {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState(categories[0]);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const colors = themeColors[theme];
  const inputClasses = `mt-1 block w-full rounded-md ${colors.input} text-white shadow-sm ${colors.focus} px-3 py-2 [color-scheme:dark]`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description || !amount || !category || !date) {
      // toast.error('Please fill in all fields');
      return;
    }

    const newExpense: Expense = {
      id: crypto.randomUUID(),
      description,
      amount: parseFloat(amount),
      category,
      date,
    };

    onAddExpense(newExpense);
    // toast.success('Expense added successfully!');

    // Reset form
    setDescription('');
    setAmount('');
    setCategory(categories[0]);
    setDate(new Date().toISOString().split('T')[0]);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-1">
            Description
          </label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={inputClasses}
            placeholder="Enter expense description"
            required
          />
        </div>

        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-300 mb-1">
            Amount ($)
          </label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className={inputClasses}
            placeholder="0.00"
            step="0.01"
            min="0"
            required
          />
        </div>
      </div>

      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-300 mb-1">
          Category
        </label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className={inputClasses}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="date" className="block text-sm font-medium text-gray-300 mb-1">
          Date
        </label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className={inputClasses}
        />
      </div>

      <button
        type="submit"
        className={`w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-medium`}
      >
        <PlusCircle size={20} />
        Add Expense
      </button>
    </form>
  );
}