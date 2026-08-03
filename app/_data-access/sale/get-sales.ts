import { db } from "@/app/_lib/prisma";
import "server-only";

export interface SaleDto {
  id: string;
  productNames: string;
  totalProducts: number;
  totalValue: number;
  date: Date;
}

export const getSales = async (): Promise<SaleDto[]> => {
  const sales = await db.sale.findMany({
    include: {
      products: {
        include: {
          product: true,
        },
      },
    },
  });

  return sales.map((sale): SaleDto => ({
    id: sale.id,
    date: sale.date,
    productNames: sale.products
      .map((product) => product.product.name)
      .join(", "),
    totalProducts: sale.products.reduce(
      (acc, product) => acc + product.quantity,
      0,
    ),
    totalValue: sale.products.reduce(
      (acc, product) => acc + product.quantity * Number(product.unitPrice),
      0,
    ),
  }));
};
