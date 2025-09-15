import { z } from 'zod';

export const ExpenseCreateSchema = z.object({
  amount: z.number().positive(),
  categoryId: z.string().min(1),
  subCategoryId: z.string().min(1).nullable(),
  paymentMethod: z.string().min(1),
  note: z.string().optional(),
});

export const ExpensePayloadSchema = z.object({
  amount: z.number().positive(),
  categoryId: z.string().min(1),
  subCategoryId: z.string().min(1).nullable(),
  paymentMethod: z.string().min(1),
  createdAt: z.string().datetime(),
  note: z.string().optional(),
});
export type ExpenseCreateInput = z.infer<typeof ExpenseCreateSchema>;

export const ExpenseRecordSchema = z.object({
  id: z.string(),
  householdId: z.string(),
  amount: z.number(),
  categoryId: z.string(),
  subCategoryId: z.string().nullable(),
  paymentMethod: z.string(),
  createdAt: z.date().nullable(),
  createdBy: z.string().optional(),
  note: z.string().optional(),
});
export type ExpenseRecord = z.infer<typeof ExpenseRecordSchema>;

export type ExpensePayload = z.infer<typeof ExpensePayloadSchema>;
export type ExpensePayloadInput = z.input<typeof ExpensePayloadSchema>; // Before validation
export type ExpensePayloadOutput = z.output<typeof ExpensePayloadSchema>;
