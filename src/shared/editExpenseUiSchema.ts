import { z } from 'zod';

export const editExpenseUiSchema = z.object({
  categoryId: z.string(),

  amountText: z
    .string()
    .min(1, 'שדה חובה')
    .refine(v => !isNaN(Number(v)), 'חייב להיות מספר')
    .refine(v => Number(v) > 0, 'חייב להיות גדול מאפס'),

  paymentMethod: z.string().min(1, 'חובה לבחור אמצעי תשלום'),

  noteText: z.string().max(200, 'עד 200 תווים').optional(),
});

export type EditExpenseUiDraft = z.infer<typeof editExpenseUiSchema>;
