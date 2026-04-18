import prisma from '@/lib/prisma';
import { Expense } from '@prisma/client';

export type CategoryData = { name: string; value: number };
export type TrendData = { date: string; total: number };

export async function getExpenses(): Promise<Expense[]> {
  return prisma.expense.findMany({
    orderBy: { createdAt: 'desc' },
  });
}

export async function getSummary(): Promise<number> {
  const now = new Date();
  const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const total = await prisma.expense.aggregate({
    _sum: { amount: true },
    where: { createdAt: { gte: firstDayOfMonth } },
  });

  return total._sum.amount || 0;
}

export async function getCategories(): Promise<CategoryData[]> {
  const categories = await prisma.expense.groupBy({
    by: ['category'],
    _sum: { amount: true },
  });

  return categories.map((c) => ({
    name: c.category,
    value: c._sum.amount || 0,
  }));
}

export async function getTrends(): Promise<TrendData[]> {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  type RawTrend = { date: Date; total: number | bigint };

  const trends = await prisma.$queryRaw<RawTrend[]>`
    SELECT DATE("createdAt") as date, SUM(amount) as total
    FROM "Expense"
    WHERE "createdAt" >= ${thirtyDaysAgo}
    GROUP BY DATE("createdAt")
    ORDER BY date ASC
  `;

  return trends.map((t) => ({
    date: new Date(t.date).toLocaleDateString(),
    total: Number(t.total),
  }));
}
