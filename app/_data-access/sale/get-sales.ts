import { db } from "@/app/_lib/prisma";
import { SaleProduct } from "@/app/generated/prisma/client";
import "server-only";

interface SaleProductDto {
  productId: string;
  quantity: number;
  unityPrice: number;
  productName: string;
}

export interface SaleDto {
  id: string;
  productNames: string;
  totalProducts: number;
  totalValue: number;
  date: Date;
  saleProducts: SaleProductDto[];
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

  return sales.map((sale) => ({
    id: sale.id,
    date: sale.date,
    productNames: sale.products
      .map((saleProduct) => saleProduct.product.name)
      .join(" , "),
    totalProducts: sale.products.reduce(
      (acc, saleProduct) => acc + saleProduct.quantity,
      0,
    ),
    totalValue: sale.products.reduce(
      (acc, saleProduct) =>
        acc + saleProduct.quantity * Number(saleProduct.unitPrice),
      0,
    ),
    saleProducts: sale.products.map((saleProduct): SaleProductDto => ({
      productId: saleProduct.productId,
      quantity: saleProduct.quantity,
      unityPrice: Number(saleProduct.unitPrice),
      productName: saleProduct.product.name,
    })),
  }));
};
