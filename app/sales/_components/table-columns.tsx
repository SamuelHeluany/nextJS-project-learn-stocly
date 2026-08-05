"use client";

import { SaleDto } from "@/app/_data-access/sale/get-sales";
import { formatCurrency } from "@/app/_helpers/currency";
import { ColumnDef } from "@tanstack/react-table";
import SaleTableDropdownMenu from "./table-dropdown-menu";
import { ProductDto } from "@/app/_data-access/product/get-products";
import { ComboboxOption } from "@/app/_components/ui/combobox";

interface SaleTableColumn extends SaleDto {
  products: ProductDto[];
  productOptions: ComboboxOption[];
}

export const salesTableColumns: ColumnDef<SaleTableColumn>[] = [
  {
    accessorKey: "productNames",
    header: "Produtos",
  },
  {
    accessorKey: "totalProducts",
    header: "Quantidade de Produtos",
  },
  {
    accessorKey: "totalValue",
    header: "Valor Total",
    cell: ({
      row: {
        original: { totalValue },
      },
    }) => formatCurrency(totalValue),
  },
  {
    header: "Data",
    cell: ({
      row: {
        original: { date },
      },
    }) => new Date(date).toLocaleDateString("pt-BR"),
  },
  {
    header: "Ações",
    cell: ({ row: { original: sale } }) => (
      <SaleTableDropdownMenu
        sale={sale}
        products={sale.products}
        productsOptions={sale.productOptions}
      />
    ),
  },
];
