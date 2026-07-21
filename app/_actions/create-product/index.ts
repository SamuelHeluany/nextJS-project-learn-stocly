// usar o use server para ser tratados como server side e sempre usar com funções que vão ser utilizadas
"use server";

import { db } from "@/app/_lib/prisma";
import { revalidatePath } from "next/cache";
import { createProductSchema, CreateProductSchema } from "./schema";

// função que passa os inputs que quer receber
export const createProducts = async (data: CreateProductSchema) => {
  createProductSchema.parse(data);
  // chama o create e passa os campos do produto para criar o produto
  await db.product.create({
    data,
  });
  //   informa pro next para recarregar a pagina quando for adicionado um produto
  revalidatePath("/products");
};
