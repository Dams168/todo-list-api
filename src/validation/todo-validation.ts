import { z, ZodType } from "zod";

export class TodoValidation {
  static readonly CREATE: ZodType = z.object({
    title: z.string().min(1).max(100),
    description: z.string().min(1).max(255),
  });

  static readonly UPDATE: ZodType = z.object({
    id: z.number().int().positive(),
    title: z.string().min(1).max(100).optional(),
    description: z.string().min(1).max(255).optional(),
  });

  static readonly GET: ZodType = z.object({
    id: z.number().int().positive(),
  });
}
