import { z } from 'zod';

export const selectSchema = z.object({
  value: z.string(),
  label: z.string(),
  data: z.any().optional(),
});
