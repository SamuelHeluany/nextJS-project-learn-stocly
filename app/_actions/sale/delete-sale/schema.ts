import z from "zod";

export const deleteSaleSchema = z.object({
  id: z.uuid(),
});

export type DeleteSaleSchema = z.infer<typeof deleteSaleSchema>;
