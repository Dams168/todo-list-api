import { z, ZodType } from "zod";

export class userValidation {
  static readonly REGISTER: ZodType = z.object({
    name: z.string().min(1).max(100),
    email: z.string().email(),
    password: z.string().min(1).max(255),
  });

  static readonly LOGIN: ZodType = z.object({
    email: z.string().email(),
    password: z.string().min(1).max(255),
  });
}
