export interface Expense {
  id: string;
  description: string;
  amount: number;
  category: string;
  date: string;
}

export type ExpenseCategory = 
  | 'Food & Dining'
  | 'Transportation'
  | 'Shopping'
  | 'Entertainment'
  | 'Bills & Utilities'
  | 'Health'
  | 'Travel'
  | 'Education'
  | 'Other';

export interface AppSettings {
  currency: string;
  theme: 'dark' | 'darker' | 'ocean' | 'purple' | 'emerald' | 'sunset';
  language: string;
  notifications: boolean;
  categories: ExpenseCategory[];
  monthlyBudget: number;
  showNotifications: boolean;
}