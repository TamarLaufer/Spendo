import { z } from 'zod';

export const ICON_KEYS = [
  'market',
  'car',
  'payment',
  'back',
  'cancelX',
  'classes',
  'health',
  'toys',
  'study',
] as const;

export const IconKeySchema = z.enum(ICON_KEYS);

export const SubCategoryCreateSchema = z.object({
  subCategoryId: z.string().min(1),
  subCategoryName: z.string().min(1),
  icon: IconKeySchema.nullish(), // string | null | undefined
  order: z.number().int().nonnegative().optional(),
  active: z.boolean().optional(),
});

export const CategoryCreateSchema = z.object({
  householdId: z.string().min(1).optional(),
  categoryName: z.string().trim().min(1, 'נא להזין שם קטגוריה'),
  maxAmount: z.number().nonnegative(),
  icon: IconKeySchema.nullish(),
  order: z.number().int().nonnegative().optional(),
  active: z.boolean().default(true).optional(),
  createdAt: z.union([z.date(), z.string().datetime()]).optional(),
});
export type CategoryCreateInput = z.infer<typeof CategoryCreateSchema>;

export const CategoryUpdateSchema = CategoryCreateSchema.partial();
export type CategoryUpdatePatch = z.infer<typeof CategoryUpdateSchema>;

export const CategoryRecordSchema = z.object({
  categoryId: z.string(),
  categoryName: z.string(),
  maxAmount: z.number(),
  isExceed: z.boolean(),
});
export type CategoryRecord = z.infer<typeof CategoryRecordSchema>;

export const normalizeName = (value: string) =>
  value.normalize('NFKC').trim().toLowerCase();

/** בסיס הוולידציה: שדות וצורות */
export const CategoryUiDraftBaseSchema = z.object({
  categoryName: z.string().min(1, 'נא להזין שם קטגוריה'),
  maxAmount: z.coerce
    .number()
    .refine(Number.isFinite, { message: 'תקציב חייב להיות מספר תקין' })
    .nonnegative({ message: 'תקציב חייב להיות 0 או יותר' }),
});

/**
 * מפעל סכמות: מחזיר סכמת Zod שמכילה גם בדיקת כפילות שם,
 * לפי רשימת שמות קיימים שמועברת מבחוץ.
 */
export const makeCategoryUiDraftSchema = (existingNames: string[]) =>
  CategoryUiDraftBaseSchema.superRefine((data, ctx) => {
    const requested = normalizeName(data.categoryName);
    const exists = existingNames.map(normalizeName).includes(requested);

    if (exists) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['categoryName'],
        message: 'קטגוריה בשם זה כבר קיימת',
      });
    }
  });

export type CategoryUiDraft = z.infer<typeof CategoryUiDraftBaseSchema>;
