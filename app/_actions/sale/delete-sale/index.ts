"use server";

import { db } from "@/app/_lib/prisma";
import { revalidatePath } from "next/cache";
import { DeleteSaleSchema, deleteSaleSchema } from "./schema";

export const deleteSale = async ({ id }: DeleteSaleSchema) => {
  deleteSaleSchema.parse({ id });
  await db.$transaction(async (trx) => {
    const sale = await trx.sale.findUnique({
      where: {
        id,
      },
      include: {
        products: true,
      },
    });
    if (!sale) return;
    await trx.sale.delete({
      where: {
        id,
      },
    });
    for (const product of sale.products) {
      await trx.product.update({
        where: {
          id: product.productId,
        },
        data: {
          stock: {
            increment: product.quantity,
          },
        },
      });
    }
  });
  // Aqui ele revalida o layout raiz e todas as paginas que renderizam ele (nesse caso a aplicação inteira) e a Home
  revalidatePath("/", "layout");
};
