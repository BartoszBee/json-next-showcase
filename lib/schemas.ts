import { z } from "zod";

export const PostCreateSchema = z.object({
  title: z
    .string()
    .min(3, "Tytuł musi mieć co najmniej 3 znaki")
    .max(120, "Tytuł może mieć maksymalnie 120 znaków"),
  body: z
    .string()
    .min(10, "Treść musi mieć co najmniej 10 znaków")
    .max(5000, "Treść może mieć maksymalnie 5000 znaków"),
  userId: z.coerce.number().int().positive().default(1),
});

export type PostCreateInput = z.infer<typeof PostCreateSchema>;
