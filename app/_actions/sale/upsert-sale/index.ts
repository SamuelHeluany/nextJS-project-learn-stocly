"use server";

import { db } from "@/app/_lib/prisma";
import { upsertSaleSchema, UpsertSaleSchema } from "./schema";
import { revalidatePath } from "next/cache";

export const upsertSale = async (data: UpsertSaleSchema) => {
  upsertSaleSchema.parse(data);
  const isUpdate = Boolean(data.id);
  // transactions permite que todas as operações dentro dela sejam executadas. Se uma falhar, todas as outras operações serão revertidas, garantindo a integridade dos dados. Como o find não é uma operação, não precisa mudar para trx.
  await db.$transaction(async (trx) => {
    if (isUpdate) {
      console.log("Entrou no update");
      const existingSale = await trx.sale.findUnique({
        where: {
          id: data.id,
        },
        include: {
          products: true,
        },
      });
      if (!existingSale) return;

      await trx.sale.delete({
        where: {
          id: data.id,
        },
      });

      for (const product of existingSale?.products) {
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
    }

    // await db.$transaction(async (trx) => {
    //   await trx.sale.delete({
    //     where: {
    //       id: data.id,
    //     },
    //   });
    // });

    const sale = await trx.sale.create({
      data: {
        date: new Date(),
      },
    });
    for (const product of data.products) {
      const productFromDb = await trx.product.findUnique({
        where: {
          id: product.id,
        },
      });
      if (!productFromDb) {
        throw new Error("Produto não encontrado.");
      }
      const productIsOutOfStock = product.quantity > productFromDb.stock;
      if (productIsOutOfStock) {
        throw new Error("Quantidade indisponível no estoque.");
      }
      await trx.saleProduct.create({
        data: {
          saleId: sale.id,
          productId: product.id,
          quantity: product.quantity,
          unitPrice: productFromDb.price,
        },
      });
      await trx.product.update({
        where: {
          id: product.id,
        },
        data: {
          stock: {
            decrement: product.quantity,
          },
        },
      });
    }
  });

  revalidatePath("/products");
  revalidatePath("/sales");
};
