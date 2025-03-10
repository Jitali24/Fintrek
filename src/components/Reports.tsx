import { useState } from 'react';
import { Calendar, Download } from 'lucide-react';
import { Expense } from '../types';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

interface ReportsProps {
  expenses: Expense[];
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

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658', '#ff7300'];

export function Reports({ expenses, theme }: ReportsProps) {
  const [dateRange, setDateRange] = useState<'week' | 'month' | 'year'>('month');
  const colors = themeColors[theme as keyof typeof themeColors];
  const cardClasses = `${colors.card} rounded-xl shadow-lg p-6 backdrop-blur-lg border ${colors.border}`;
  const buttonClasses = `px-4 py-2 rounded-lg transition-colors text-gray-300 ${colors.hover} hover:text-white`;
  const activeButtonClasses = `px-4 py-2 rounded-lg bg-blue-600 text-white`;

  const filterExpensesByDate = (range: 'week' | 'month' | 'year') => {
    const now = new Date();
    const cutoff = new Date();

    switch (range) {
      case 'week':
        cutoff.setDate(now.getDate() - 7);
        break;
      case 'month':
        cutoff.setMonth(now.getMonth() - 1);
        break;
      case 'year':
        cutoff.setFullYear(now.getFullYear() - 1);
        break;
    }

    return expenses.filter(expense => new Date(expense.date) >= cutoff);
  };

  const filteredExpenses = filterExpensesByDate(dateRange);

  const getCategoryData = () => {
    const categoryTotals = filteredExpenses.reduce((acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(categoryTotals).map(([name, value]) => ({
      name,
      value: Number(value.toFixed(2))
    }));
  };

  const getDailyData = () => {
    const dailyTotals = filteredExpenses.reduce((acc, expense) => {
      const date = expense.date;
      acc[date] = (acc[date] || 0) + expense.amount;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(dailyTotals)
      .sort((a, b) => new Date(a[0]).getTime() - new Date(b[0]).getTime())
      .map(([date, amount]) => ({
        date,
        amount: Number(amount.toFixed(2))
      }));
  };

  const handleExportCSV = () => {
    const headers = ['Date', 'Description', 'Category', 'Amount'];
    const csvContent = [
      headers.join(','),
      ...filteredExpenses.map(expense => 
        [
          expense.date,
          `"${expense.description}"`,
          expense.category,
          expense.amount
        ].join(',')
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `expense_report_${dateRange}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Date Range Selector */}
      <div className={cardClasses}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-gray-400" />
            <h2 className="text-lg font-semibold text-white">Time Period</h2>
          </div>
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-2 px-4 py-2 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </button>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setDateRange('week')}
            className={dateRange === 'week' ? activeButtonClasses : buttonClasses}
          >
            Past Week
          </button>
          <button
            onClick={() => setDateRange('month')}
            className={dateRange === 'month' ? activeButtonClasses : buttonClasses}
          >
            Past Month
          </button>
          <button
            onClick={() => setDateRange('year')}
            className={dateRange === 'year' ? activeButtonClasses : buttonClasses}
          >
            Past Year
          </button>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Distribution */}
        <div className={cardClasses}>
          <h2 className="text-lg font-semibold text-white mb-4">Expense by Category</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={getCategoryData()}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {getCategoryData().map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Daily Expenses Trend */}
        <div className={cardClasses}>
          <h2 className="text-lg font-semibold text-white mb-4">Daily Expenses Trend</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={getDailyData()}>
                <XAxis dataKey="date" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{ backgroundColor: colors.card, border: 'none' }}
                  labelStyle={{ color: '#fff' }}
                />
                <Line type="monotone" dataKey="amount" stroke="#0088FE" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Comparison */}
        <div className={cardClasses}>
          <h2 className="text-lg font-semibold text-white mb-4">Category Comparison</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={getCategoryData()}>
                <XAxis dataKey="name" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{ backgroundColor: colors.card, border: 'none' }}
                  labelStyle={{ color: '#fff' }}
                />
                <Bar dataKey="value" fill="#0088FE">
                  {getCategoryData().map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Detailed Statistics */}
      <div className={cardClasses}>
        <h2 className="text-lg font-semibold text-white mb-4">Detailed Statistics</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-lg bg-opacity-50 bg-blue-600">
            <p className="text-sm text-gray-300">Total Transactions</p>
            <p className="text-2xl font-semibold text-white">{filteredExpenses.length}</p>
          </div>
          <div className="p-4 rounded-lg bg-opacity-50 bg-green-600">
            <p className="text-sm text-gray-300">Average Transaction</p>
            <p className="text-2xl font-semibold text-white">
              ${(filteredExpenses.reduce((acc, exp) => acc + exp.amount, 0) / filteredExpenses.length || 0).toFixed(2)}
            </p>
          </div>
          <div className="p-4 rounded-lg bg-opacity-50 bg-purple-600">
            <p className="text-sm text-gray-300">Highest Expense</p>
            <p className="text-2xl font-semibold text-white">
              ${Math.max(...filteredExpenses.map(exp => exp.amount), 0).toFixed(2)}
            </p>
          </div>
          <div className="p-4 rounded-lg bg-opacity-50 bg-orange-600">
            <p className="text-sm text-gray-300">Most Common Category</p>
            <p className="text-2xl font-semibold text-white">
              {filteredExpenses.length > 0
                ? Object.entries(
                    filteredExpenses.reduce((acc, exp) => {
                      acc[exp.category] = (acc[exp.category] || 0) + 1;
                      return acc;
                    }, {} as Record<string, number>)
                  ).sort((a, b) => b[1] - a[1])[0][0]
                : 'N/A'}
            </p>
          </div>
        </div>
      </div>

      {/* Expense List */}
      <div className={cardClasses}>
        <h2 className="text-lg font-semibold text-white mb-4">Expense List</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-gray-400 border-b border-gray-700">
                <th className="text-left py-2">Date</th>
                <th className="text-left py-2">Description</th>
                <th className="text-left py-2">Category</th>
                <th className="text-right py-2">Amount</th>
              </tr>
            </thead>
            <tbody>
              {filteredExpenses.map((expense) => (
                <tr key={expense.id} className="border-b border-gray-700">
                  <td className="py-2 text-gray-300">{expense.date}</td>
                  <td className="py-2 text-gray-300">{expense.description}</td>
                  <td className="py-2 text-gray-300">{expense.category}</td>
                  <td className="py-2 text-gray-300 text-right">${expense.amount.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
