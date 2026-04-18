"use client";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Expense } from '@prisma/client';

export default function ExpenseList({ expenses }: { expenses: Expense[] }) {
  const router = useRouter();
  const [deleting, setDeleting] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function remove(id: string) {
    setDeleting(id);
    setError(null);

    try {
      const res = await fetch(`/api/expenses/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete expense');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error deleting item');
    } finally {
      setDeleting(null);
    }
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Transaction History</h2>
      
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-200">
              <th className="pb-3 font-semibold text-gray-600">Date</th>
              <th className="pb-3 font-semibold text-gray-600">Category</th>
              <th className="pb-3 font-semibold text-gray-600">Note</th>
              <th className="pb-3 font-semibold text-gray-600">Amount</th>
              <th className="pb-3 font-semibold text-gray-600">Action</th>
            </tr>
          </thead>
          <tbody>
            {expenses.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-8 text-center text-gray-500">No expenses recorded yet.</td>
              </tr>
            ) : (
              expenses.map((exp) => (
                <tr key={exp.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-3 text-gray-700">{new Date(exp.createdAt).toLocaleDateString()}</td>
                  <td className="py-3">
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded font-medium">
                      {exp.category}
                    </span>
                  </td>
                  <td className="py-3 text-gray-600">{exp.note || '-'}</td>
                  <td className="py-3 font-bold text-gray-900">${exp.amount.toFixed(2)}</td>
                  <td className="py-3">
                    <button 
                      onClick={() => remove(exp.id)}
                      disabled={deleting === exp.id}
                      className="text-red-500 hover:text-red-700 text-sm disabled:text-gray-300 transition-colors font-medium"
                    >
                      {deleting === exp.id ? 'Deleting...' : 'Delete'}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
