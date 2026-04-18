import AddExpense from '@/components/AddExpense';
import Dashboard from '@/components/Dashboard';
import ExpenseList from '@/components/ExpenseList';
import { getExpenses, getSummary, getCategories, getTrends } from '@/services/expense.service';

export const dynamic = 'force-dynamic';

export default async function Page() {
  const [expenses, summary, categories, trends] = await Promise.all([
    getExpenses(),
    getSummary(),
    getCategories(),
    getTrends()
  ]);

  return (
    <div className="space-y-8">
      <Dashboard summary={summary} categories={categories} trends={trends} />
      <AddExpense />
      <ExpenseList expenses={expenses} />
    </div>
  );
}
