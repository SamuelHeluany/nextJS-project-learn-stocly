import { db } from "@/app/_lib/prisma";
import { Product } from "@/app/generated/prisma/client";
import "server-only";

export interface ProductDto extends Product {
  status: "IN_STOCK" | "OUT_OF_STOCK";
}

export const getProducts = async (): Promise<ProductDto[]> => {
  // chamar o banco de dados para buscar os produtos
  const products = await db.product.findMany({});
  // mapear os produtos para o DTO com o status
  return products.map((product) => ({
    ...product,
    status: product.stock <= 0 ? "OUT_OF_STOCK" : "IN_STOCK",
  }));
};
