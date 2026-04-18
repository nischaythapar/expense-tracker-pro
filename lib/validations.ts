import { z } from 'zod';

export const expenseSchema = z.object({
  amount: z.coerce.number().positive("Amount must be greater than 0"),
  category: z.enum(["FOOD", "SHELTER", "TOOLS", "OTHER"], {
    errorMap: () => ({ message: "Invalid category selected" })
  }),
  note: z.string().max(255, "Note is too long").optional(),
});

export type ExpenseInput = z.infer<typeof expenseSchema>;
