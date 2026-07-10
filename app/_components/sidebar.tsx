"use client";
// useClient usado para conseguir usar o pathName (que é para deixar o button da pagina que está active) do next/navigation

// importação do lucide-react para os ícones
import { LayoutGridIcon, PackageIcon, ShoppingBasketIcon } from "lucide-react";
import SidebarButton from "./sidebar-button";

const Sidebar = () => {
  return (
    <div className="p w-64 bg-white">
      {/*Image */}
      <div className="px-8 py-6">
        <h1 className="text-2xl font-bold">STOCKLY</h1>
      </div>
      {/* Buttons */}
      <div className="flex flex-col gap-2 p-2">
        <SidebarButton href="/">
          <LayoutGridIcon size={20} />
          Dashboard
        </SidebarButton>

        <SidebarButton href="/products">
          <PackageIcon size={20} />
          Products
        </SidebarButton>

        <SidebarButton href="/sales">
          <LayoutGridIcon size={20} />
          Sales
        </SidebarButton>
      </div>
    </div>
  );
};

export default Sidebar;
