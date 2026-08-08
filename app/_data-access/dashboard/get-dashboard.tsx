import { db } from "@/app/_lib/prisma";
import dayjs from "dayjs";
import "server-only";

export interface DayTotalRevenue {
  day: string;
  totalRevenue: number;
}
interface DashboardDto {
  totalRevenue: number;
  todayRevenue: number;
  totalSales: number;
  totalStock: number;
  totalProducts: number;
  totalLast14DaysRevenue: DayTotalRevenue[];
}

export const getDashboard = async (): Promise<DashboardDto> => {
  // pega o dia
  const today = dayjs().endOf("day").toDate();

  const last14Days = [13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0].map(
    (day) => {
      return dayjs(today).subtract(day, "day");
    },
  );

  const totalLast14DaysRevenue: DayTotalRevenue[] = [];

  for (const day of last14Days) {
    const dayTotalRevenue = await db.$queryRawUnsafe<
      { totalRevenue: number }[]
    >(
      // pega a soma da quantidade * preço unitario
      `SELECT SUM("unitPrice" * "quantity") as "totalRevenue" FROM "SaleProduct" WHERE "createdAt" >= $1 AND "createdAt" <= $2`,
      // com o filtro, do começo do dia ate o final do dia
      day.startOf("day").toDate(),
      day.endOf("day").toDate(),
    );
    // pega o day total revenue e coloca na lista
    totalLast14DaysRevenue.push({
      day: day.format("DD/MM"),
      totalRevenue: dayTotalRevenue[0].totalRevenue,
    });
  }

  // receita total: todos os produtos vendidos
  const totalRevenueQuery = `
  SELECT SUM ("unitPrice" * "quantity") as "totalRevenue" from "SaleProduct"`;
  // receita diaria: todos os produtos vendidos no dia
  const todayRevenueQuery = `
  SELECT SUM ("unitPrice" * "quantity") as "todayRevenue" from "SaleProduct" WHERE "createdAt" >=$1 AND "createdAt" <=$2`;

  const startOfDay = new Date(new Date().setHours(0, 0, 0, 0));
  const endOfDay = new Date(new Date().setHours(23, 59, 59, 999));

  const totalRevenuePromise = db.$queryRawUnsafe<
    {
      totalRevenue: number;
    }[]
  >(totalRevenueQuery);

  const todayRevenuePromise = db.$queryRawUnsafe<{ todayRevenue: number }[]>(
    todayRevenueQuery,
    startOfDay,
    endOfDay,
  );

  const totalSalesPromise = db.sale.count();
  const totalStockPromise = db.product.aggregate({
    _sum: {
      stock: true,
    },
  });
  const totalProductsPromise = db.product.count();

  const [totalRevenue, todayRevenue, totalSales, totalStock, totalProducts] =
    await Promise.all([
      totalRevenuePromise,
      todayRevenuePromise,
      totalSalesPromise,
      totalStockPromise,
      totalProductsPromise,
    ]);

  return {
    totalRevenue: totalRevenue[0].totalRevenue,
    todayRevenue: todayRevenue[0].todayRevenue,
    totalSales,
    totalStock: Number(totalStock._sum.stock),
    totalProducts,
    totalLast14DaysRevenue,
  };
};
