import { db } from "@/app/_lib/prisma";
import { Product } from "@/app/generated/prisma/client";
import "server-only";

export const getProducts = async (): Promise<Product[]> => {
  // chamar o banco de dados para buscar os produtos
  return db.product.findMany({});
};
