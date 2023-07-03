import { z } from "zod";

export const zUser = z.object({
  email: z.string(),
  name: z.string(),
  password: z.string(),
});

export const zLogin = z.object({
  email: z.string(),
  password: z.string(),
});

export type User = z.infer<typeof zUser>;