"use server";

import { db } from "@/app/_lib/prisma";
import { revalidatePath } from "next/cache";
import { DeleteSaleSchema, deleteSaleSchema } from "./schema";

export const deleteSale = async ({ id }: DeleteSaleSchema) => {
  deleteSaleSchema.parse({ id });
  await db.sale.delete({
    where: {
      id,
    },
  });
  revalidatePath("/sales");
};
