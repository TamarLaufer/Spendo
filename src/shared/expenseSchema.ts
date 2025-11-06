import { z } from 'zod';

/**
 * DTO ליצירה (מהטופס → service).
 * מאפשר גם תאריך מה־UI (Date או ISO string), אבל זה אופציונלי.
 */
export const ExpenseCreateSchema = z.object({
  householdId: z.string().min(1),
  amount: z.number().positive(),
  categoryId: z.string().min(1),
  subCategoryId: z.string().min(1).nullish(), // string | null | undefined
  paymentMethod: z.string().trim().min(1),
  note: z.string().trim().optional(),
  createdAt: z.union([z.date(), z.string().datetime()]).optional(),
});
export type ExpenseCreateInput = z.infer<typeof ExpenseCreateSchema>;

/**
 * DTO לעדכון חלקי (מהמסך → service).
 * כל השדות אופציונליים; createdAt יכול להיות Date/ISO/null.
 */
export const ExpenseUpdateSchema = z.object({
  amount: z.number().positive().optional(),
  categoryId: z.string().min(1).optional(),
  subCategoryId: z.string().min(1).nullish().optional(),
  paymentMethod: z.string().trim().min(1).optional(),
  note: z.string().trim().optional(),
  createdBy: z.string().trim().optional(),
  createdAt: z.union([z.date(), z.null()]).optional(),
});
export type ExpenseUpdatePatch = z.infer<typeof ExpenseUpdateSchema>;

/**
 * מודל תצוגה ל־UI/Store (מה־service החוצה).
 * תמיד מחזיר Date|null (לא Timestamp), ותמיד שדה id.
 */
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
