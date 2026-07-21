import { productTableColumns } from "./_components/table-columns";
import { DataTable } from "../_components/ui/data-table";
import { getProducts } from "../_data-access/product/get-products";
import AddProductButton from "./_components/create-product-button";

// por padrão a pagina é estatica (apenas renderiza no build), para tornar dinamica, colocar "export const dynamic = 'force-dynamic';" no inicio do arquivo
// export const dynamic = "force-dynamic";

const ProductsPage = async () => {
  const products = await getProducts();

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
        <AddProductButton />
      </div>
      <DataTable
        columns={productTableColumns}
        // Quando passar algo não suportado, passar por JSON.parse(JSON.stringify(...)) para evitar erros de serialização
        data={JSON.parse(JSON.stringify(products))}
      />
    </div>
  );
};

export default ProductsPage;
