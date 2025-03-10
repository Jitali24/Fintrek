export interface Expense {
  id: string;
  amount: number;
  description: string;
  category: string;
  date: string;
}

export interface AppSettings {
  currency: string;
  theme: 'dark' | 'darker' | 'ocean' | 'purple' | 'emerald' | 'sunset';
  language: string;
  notifications: boolean;
}
