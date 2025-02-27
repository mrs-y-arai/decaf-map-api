import { z } from 'zod';
import { snakeToCamel } from '../utils/snakeToCamel.js';

export const placeSchema = z
  .object({
    id: z.string().uuid().min(1),
    name: z.string().min(1),
    description: z.string().optional(),
    location: z.object({
      type: z.enum(['Point']),
      coordinates: z.tuple([
        z.number().gte(-180).lte(180),
        z.number().gte(-90).lte(90),
      ]),
    }),
    created_at: z.date(),
  })
  .transform(snakeToCamel);

export type PlaceSchema = z.infer<typeof placeSchema>;

export const placeListSchema = z.array(placeSchema);
