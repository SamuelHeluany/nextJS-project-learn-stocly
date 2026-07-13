import { db } from "@/app/_lib/prisma";
import { PlusIcon } from "lucide-react";
import { Button } from "../_components/ui/button";
import { productTableColumns } from "./_components/table-columns";
import { DataTable } from "../_components/ui/data-table";

const ProductsPage = async () => {
  // chamar o banco de dados para buscar os produtos
  const products = await db.product.findMany({});
  return (
    <div className="m-8 w-full space-y-8 rounded-lg bg-white p-8">
      {/* esquerda */}
      <div className="flex w-full items-center justify-between">
        <div className="space-y-1">
          <span className="text-xs font-semibold text-slate-500">
            Gestão de Produtos
          </span>
          <h2 className="text-xl font-semibold">Produtos</h2>
        </div>
        <Button className="gap-2">
          <PlusIcon size={20} />
          Novo Produto
        </Button>
      </div>
      <DataTable columns={productTableColumns} data={products} />
    </div>
  );
};

export default ProductsPage;
