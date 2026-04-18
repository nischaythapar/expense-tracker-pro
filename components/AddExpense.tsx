"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddExpense() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    const form = new FormData(e.currentTarget);
    const payload = {
      amount: form.get('amount'),
      category: form.get('category'),
      note: form.get('note'),
    };

    try {
      const res = await fetch('/api/expenses', {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: { 'Content-Type': 'application/json' }
      });
      
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to add expense');
      }

      e.currentTarget.reset();
      router.refresh(); 
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      <h2 className="text-xl font-bold mb-4">Add Expense</h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-700 border border-red-200 rounded">
          {error}
        </div>
      )}

      <form onSubmit={submit} className="flex flex-col md:flex-row gap-4">
        <input name="amount" type="number" step="0.01" required placeholder="Amount" className="border p-2 rounded w-full md:w-1/4" />
        <select name="category" required className="border p-2 rounded w-full md:w-1/4">
          <option value="FOOD">Food</option>
          <option value="SHELTER">Shelter</option>
          <option value="TOOLS">Tools</option>
          <option value="OTHER">Other</option>
        </select>
        <input name="note" type="text" placeholder="Note (Optional)" className="border p-2 rounded w-full md:w-2/4" />
        <button disabled={loading} className="bg-blue-600 text-white px-6 py-2 rounded font-bold hover:bg-blue-700 disabled:opacity-50 transition-colors">
          {loading ? 'Saving...' : 'Add'}
        </button>
      </form>
    </div>
  );
}
