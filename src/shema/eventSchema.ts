import { z } from 'zod'

export const EventSchema = z.object({
  title: z
    .string()
    .min(3, { message: 'Title must be at least 3 characters.' })
    .max(50, { message: 'Title must be at most 50 characters.' }),
  description: z
    .string()
    .min(3, { message: 'Description must be at least 3 characters.' })
    .max(150, { message: 'Description must be at most 150 characters.' }),
  label: z.string(),
  daySelected: z.any(),
  id: z.union([z.string(), z.number()]).optional(),
});

export type IEventSchema = z.infer<typeof EventSchema>

