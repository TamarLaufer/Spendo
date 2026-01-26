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
  'defaultIcon',
] as const;

export const IconKeySchema = z.enum(ICON_KEYS);

export type CategoryIcon = (typeof ICON_KEYS)[number];

export const SubCategoryCreateSchema = z.object({
  subCategoryId: z.string().min(1),
  subCategoryName: z.string().min(1),
  icon: IconKeySchema.nullish().or(z.literal('defaultIcon')),
  order: z.number().int().nonnegative().optional(),
  active: z.boolean().optional(),
});

export const CategoryCreateSchema = z.object({
  householdId: z.string().min(1).optional(),
  categoryName: z.string().trim().min(1, 'נא להזין שם קטגוריה'),
  maxAmount: z.number().nonnegative(),
  icon: IconKeySchema.or(z.literal('defaultIcon')),
  order: z.number().int().nonnegative().optional(),
  active: z.boolean().default(true).optional(),
  createdAt: z.union([z.date(), z.string().datetime()]).optional(),
});
export type CategoryCreateInput = z.infer<typeof CategoryCreateSchema>;

export const CategoryUpdateSchema = CategoryCreateSchema.partial();

export const CategoryRecordSchema = z.object({
  categoryId: z.string(),
  categoryName: z.string(),
  maxAmount: z.number(),
  isExceed: z.boolean(),
});

export type CategoryRecord = z.infer<typeof CategoryRecordSchema>;

export const normalizeName = (value: string) =>
  value.normalize('NFKC').trim().toLowerCase();

export const CategoryFormSchema = z.object({
  categoryName: z.string().min(1, 'נא להזין שם קטגוריה'),
  maxAmount: z
    .string()
    .min(1, 'שדה חובה')
    .refine(v => !isNaN(Number(v)), 'חייב להיות מספר')
    .refine(v => Number(v) >= 0, 'חייב להיות 0 או יותר'),
});

// export const makeCategoryFormSchema = (existingNames: string[]) =>
//   CategoryFormSchema.refine(
//     data =>
//       !existingNames
//         .map(n => n.normalize('NFKC').trim().toLowerCase())
//         .includes(data.categoryName.normalize('NFKC').trim().toLowerCase()),
//     {
//       message: 'קטגוריה בשם זה כבר קיימת',
//       path: ['categoryName'],
//     },
//   );

  
  export type CategoryForm = z.infer<typeof CategoryFormSchema>;