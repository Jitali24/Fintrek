import { useState } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import type { Expense } from '../App';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface ExpenseChartsProps {
  expenses: Expense[];
  currency: string;
  theme: string;
}

const themeColors = {
  dark: {
    card: 'bg-gray-800',
    border: 'border-gray-700',
    hover: 'hover:bg-gray-700',
    text: 'text-gray-300',
  },
  darker: {
    card: 'bg-gray-900',
    border: 'border-gray-800',
    hover: 'hover:bg-gray-800',
    text: 'text-gray-300',
  },
  ocean: {
    card: 'bg-blue-800',
    border: 'border-blue-700',
    hover: 'hover:bg-blue-700',
    text: 'text-blue-100',
  },
  purple: {
    card: 'bg-purple-800',
    border: 'border-purple-700',
    hover: 'hover:bg-purple-700',
    text: 'text-purple-100',
  },
  emerald: {
    card: 'bg-emerald-800',
    border: 'border-emerald-700',
    hover: 'hover:bg-emerald-700',
    text: 'text-emerald-100',
  },
  sunset: {
    card: 'bg-red-800',
    border: 'border-red-700',
    hover: 'hover:bg-red-700',
    text: 'text-red-100',
  },
};

export function ExpenseCharts({ expenses, currency, theme }: ExpenseChartsProps) {
  const colors = themeColors[theme as keyof typeof themeColors];
  const [chartType, setChartType] = useState<'category' | 'trend'>('category');

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  };

  // Category Chart Data
  const categoryData = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {} as Record<string, number>);

  const categoryChartData = {
    labels: Object.keys(categoryData),
    datasets: [
      {
        label: 'Expenses by Category',
        data: Object.values(categoryData),
        backgroundColor: [
          'rgba(54, 162, 235, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 99, 132, 0.6)',
          'rgba(255, 159, 64, 0.6)',
          'rgba(255, 205, 86, 0.6)',
        ],
        borderColor: [
          'rgb(54, 162, 235)',
          'rgb(75, 192, 192)',
          'rgb(153, 102, 255)',
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
        ],
        borderWidth: 1,
      },
    ],
  };

  // Trend Chart Data
  const trendData = expenses
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .reduce((acc, expense) => {
      const date = new Date(expense.date).toLocaleDateString();
      acc[date] = (acc[date] || 0) + expense.amount;
      return acc;
    }, {} as Record<string, number>);

  const trendChartData = {
    labels: Object.keys(trendData),
    datasets: [
      {
        label: 'Daily Expenses',
        data: Object.values(trendData),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: '#fff',
        },
      },
      title: {
        display: true,
        text: chartType === 'category' ? 'Expenses by Category' : 'Expense Trend',
        color: '#fff',
      },
      tooltip: {
        callbacks: {
          label: function(tooltipItem: { dataset: { label?: string }; parsed: { y: number | null } }) {
            let label = tooltipItem.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (tooltipItem.parsed.y !== null) {
              label += formatCurrency(tooltipItem.parsed.y);
            }
            return label;
          },
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#fff',
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
      },
      y: {
        ticks: {
          color: '#fff',
          callback: function(value: string | number) {
            return formatCurrency(Number(value));
          },
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
      },
    },
  } as const;

  if (expenses.length === 0) {
    return (
      <div className="text-center py-8 text-gray-400">
        No expense data available for charts.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-white">Expense Analysis</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setChartType('category')}
            className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
              chartType === 'category'
                ? 'bg-blue-600 text-white'
                : `text-gray-300 ${colors.hover}`
            }`}
          >
            By Category
          </button>
          <button
            onClick={() => setChartType('trend')}
            className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
              chartType === 'trend'
                ? 'bg-blue-600 text-white'
                : `text-gray-300 ${colors.hover}`
            }`}
          >
            Trend
          </button>
        </div>
      </div>

      <div className={`${colors.card} rounded-xl shadow-lg p-6 backdrop-blur-lg border ${colors.border}`}>
        <div className="h-[400px]">
          {chartType === 'category' ? (
            <Bar data={categoryChartData} options={chartOptions} />
          ) : (
            <Line data={trendChartData} options={chartOptions} />
          )}
        </div>
      </div>
    </div>
  );
}
