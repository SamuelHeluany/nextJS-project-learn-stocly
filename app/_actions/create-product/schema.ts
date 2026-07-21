// foi colocado a parte os schemas, pois não podem ser usados em arquivos use server

import z from "zod";

export const createProductSchema = z.object({
  // Nome do produto é uma string, onde deve ter pelomenos 1 caracter, juntamente com o trim para não aceitar espaços em branco, e a mensagem de erro caso não seja preenchido
  name: z
    .string()
    .trim()
    .min(1, { message: "O nome do produto é obrigatório." }),
  // Preço do produto é um número, onde deve ser maior que 0.01, e a mensagem de erro caso não seja preenchido
  price: z.number().min(0.01, { message: "O preço do produto é obrigatório." }),
  // Estoque do produto é um número inteiro, onde deve ser maior ou igual a 0, e a mensagem de erro caso não seja preenchido
  //   o corce converte para number e o positiive garante ser positivo, usado pois ha campos que recebe como string ou outro tipo
  stock: z
    .number()
    .positive({
      message: "Valor do estoque deve ser positiva.",
    })
    .int()
    .min(0, { message: "O estoque do produto é obrigatório." }),
});

export type CreateProductSchema = z.infer<typeof createProductSchema>;
