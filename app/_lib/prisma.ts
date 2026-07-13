import { PrismaClient } from "@/app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

declare global {
  var cachedPrisma: ReturnType<typeof createPrismaClient>;
}

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });

const createPrismaClient = () => {
  return new PrismaClient({ adapter }).$extends({
    result: {
      product: {
        status: {
          needs: { stock: true },
          compute(product) {
            if (product.stock <= 0) {
              return "OUT_OF_STOCK";
            }

            return "IN_STOCK";
          },
        },
      },
    },
  });
};

let prisma: ReturnType<typeof createPrismaClient>;

if (process.env.NODE_ENV === "production") {
  prisma = createPrismaClient();
} else {
  if (!global.cachedPrisma) {
    global.cachedPrisma = createPrismaClient();
  }

  prisma = global.cachedPrisma;
}

export const db = prisma;
