import { z } from "zod";

export const clientSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  number: z.string(),
  address: z.string(),
}).strict();