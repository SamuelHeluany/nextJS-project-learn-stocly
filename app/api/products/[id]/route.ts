import { db } from "@/app/_lib/prisma";
import { NextRequest } from "next/server";

// GET DE PRODUTOS POR ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("teste");
  const productsId = params.id;
  const product = await db.product.findUnique({
    where: {
      id: productsId,
    },
  });
  if (!product) {
    return Response.json({ message: "Product not found" }, { status: 404 });
  }
  return Response.json(product, {
    status: 200,
  });
}

// DELETE DO PRODUTO POR ID
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } },
) {
  await db.product.delete({
    where: {
      id: params.id,
    },
  });
  return Response.json({}, { status: 200 });
}
