// validar se o ID é um UUID válido com o zod

import z from "zod";

export const deleteProductSchema = z.object({
  id: z.uuid(),
});

export type DeleteProductSchema = z.infer<typeof deleteProductSchema>;
