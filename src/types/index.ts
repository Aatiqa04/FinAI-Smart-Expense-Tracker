export type Category =
  | 'Food'
  | 'Transport'
  | 'Rent'
  | 'Utilities'
  | 'Entertainment'
  | 'Shopping'
  | 'Healthcare'
  | 'Income'
  | 'Other';

export interface Expense {
  id: string;
  amount: number;
  date: string;
  category: Category;
  description: string;
  type: 'expense' | 'income';
}

export interface AIInsight {
  summary: string;
  predictions: string;
  suggestions: string[];
  healthScore: number;
}

export interface MonthlyReport {
  month: string;
  totalSpent: number;
  totalEarned: number;
  topCategory: Category;
  aiAnalysis: string;
}
