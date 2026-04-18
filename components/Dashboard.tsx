"use client";
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import type { CategoryData, TrendData } from '@/services/expense.service';

interface DashboardProps {
  categories: CategoryData[];
  trends: TrendData[];
  summary: number;
}

export default function Dashboard({ categories, trends, summary }: DashboardProps) {
  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <div className="bg-white p-6 rounded-lg shadow-md flex flex-col justify-center">
        <h2 className="text-xl font-bold text-gray-700">Total Spent This Month</h2>
        <p className="text-5xl font-black text-gray-900 mt-4">${summary.toFixed(2)}</p>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md h-64">
        <h2 className="text-lg font-bold mb-2 text-gray-700">Category Breakdown</h2>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={categories} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={60} label>
              {categories.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value: number) => `$${value.toFixed(2)}`} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md h-72 md:col-span-2">
        <h2 className="text-lg font-bold mb-4 text-gray-700">30-Day Trend</h2>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={trends}>
            <XAxis dataKey="date" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip formatter={(value: number) => `$${value.toFixed(2)}`} />
            <Line type="monotone" dataKey="total" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
