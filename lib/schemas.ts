import { z } from "zod";

// create
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

// update

export const PostUpdateSchema = PostCreateSchema.extend({
  id: z.coerce.number().int().positive()
});

export const IdSchema = z.object({
  id: z.coerce.number().int().positive()
});


export type PostCreateInput = z.infer<typeof PostCreateSchema>;
export type PostUpdateInput = z.infer<typeof PostUpdateSchema>;
