import { z } from 'zod';

export const ExpensePayloadSchema = z.object({
  amount: z.number().positive(),
  categoryId: z.string().min(1),
  subCategoryId: z.string().min(1).nullable(),
  paymentMethod: z.string().min(1),
  createdAt: z.string().datetime(),
  note: z.string().optional(),
});

export type ExpensePayload = z.infer<typeof ExpensePayloadSchema>;
export type ExpensePayloadInput = z.input<typeof ExpensePayloadSchema>; // Before validation
export type ExpensePayloadOutput = z.output<typeof ExpensePayloadSchema>;
export type Expense = ExpensePayload & { id: string };
