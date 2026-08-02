import { ComboboxOption } from "../_components/ui/combobox";

import { getProducts } from "../_data-access/product/get-products";
import CreateSaleButton from "./_components/create-sale-button";

const SalesPage = async () => {
  const products = await getProducts();
  const productOptions: ComboboxOption[] = products.map((product) => ({
    label: product.name,
    value: product.id,
  }));
  return (
    <div className="m-8 w-full space-y-8 rounded-lg bg-white p-8">
      {/* esquerda */}
      <div className="flex w-full items-center justify-between">
        <div className="space-y-1">
          <span className="text-xs font-semibold text-slate-500">
            Gestão de Vendas
          </span>
          <h2 className="text-xl font-semibold">Vendas</h2>
        </div>
        <CreateSaleButton productOptions={productOptions} products={products} />
      </div>
      {/* <DataTable
        columns={productTableColumns}
        // Quando passar algo não suportado, passar por JSON.parse(JSON.stringify(...)) para evitar erros de serialização
        data={JSON.parse(JSON.stringify(products))}
      /> */}
    </div>
  );
};

export default SalesPage;
