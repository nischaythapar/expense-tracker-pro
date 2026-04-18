import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { expenseSchema } from '@/lib/validations';
import { ZodError } from 'zod';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validatedData = expenseSchema.parse(body);

    const expense = await prisma.expense.create({
      data: validatedData,
    });

    return NextResponse.json(expense, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: error.errors[0].message }, { status: 400 });
    }
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
