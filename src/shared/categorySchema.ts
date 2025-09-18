// src/shared/category.ts
import { z } from 'zod';

// אם יש לך IconKey ספציפיים, שימי כאן את הרשימה לפי assets/icons שלך
export const IconKeySchema = z.enum([
  'market',
  'car',
  'payment',
  'back',
  'cancelX',
]);

export const SubCategoryCreateSchema = z.object({
  subCategoryId: z.string().min(1),
  subCategoryName: z.string().min(1),
  icon: IconKeySchema.nullish(), // string | null | undefined
  order: z.number().int().nonnegative().optional(),
  active: z.boolean().optional(),
});

export const CategoryCreateSchema = z.object({
  // את יכולה להשאיר optional ולהזריק ברירת מחדל ב-service (DEV_HOUSEHOLD_ID)
  householdId: z.string().min(1).optional(),
  categoryName: z.string().trim().min(1, 'נא להזין שם קטגוריה'),
  maxAmount: z.number().nonnegative(),
  icon: IconKeySchema.nullish(),
  order: z.number().int().nonnegative().optional(),
  active: z.boolean().optional(),
  subCategories: z.array(SubCategoryCreateSchema).default([]),

  // אופציונלי: מאפשר לקליינט לשלוח createdAt (בפועל ב-Firestore תשתמשי serverTimestamp)
  createdAt: z.union([z.date(), z.string().datetime()]).optional(),
});
export type CategoryCreateInput = z.infer<typeof CategoryCreateSchema>;

export const CategoryUpdateSchema = CategoryCreateSchema.partial();
export type CategoryUpdatePatch = z.infer<typeof CategoryUpdateSchema>;

// מודל תצוגה ל־UI (כמו שיש לך ב-map)
export const CategoryRecordSchema = z.object({
  categoryId: z.string(),
  categoryName: z.string(),
  maxAmount: z.number(),
  isExceed: z.boolean(),
  icon: IconKeySchema.nullish(),
  subCategories: z.array(
    z.object({
      subCategoryId: z.string(),
      subCategoryName: z.string(),
      icon: IconKeySchema.nullish(),
    }),
  ),
});
export type CategoryRecord = z.infer<typeof CategoryRecordSchema>;
