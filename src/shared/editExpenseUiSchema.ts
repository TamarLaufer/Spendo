import { z } from 'zod';

export const editExpenseUiSchema = z.object({
  categoryId: z.string(),

  amountText: z
    .string()
    .min(1, 'שדה חובה')
    .refine(v => !isNaN(Number(v)), 'חייב להיות מספר')
    .refine(v => Number(v) > 0, 'חייב להיות גדול מאפס'),

  paymentMethodId: z.string().min(1),

  noteText: z.string().max(200, 'עד 200 תווים').optional(),
});

export type EditExpenseUiDraft = z.infer<typeof editExpenseUiSchema>;
