import Link from "next/link";
// importação do botão do shadcn/ui
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";

interface SiderbarButtonProps {
  children: React.ReactNode;
  href: string;
}

const SidebarButton = ({ href, children }: SiderbarButtonProps) => {
  const pathName = usePathname();
  return (
    //  asChild = colocar a estilização do button no href que é a tag <a>
    <Button
      variant={pathName === `${href}` ? "secondary" : "ghost"}
      className="justify-start gap-2"
      asChild
    >
      <Link href={href}>{children}</Link>
    </Button>
  );
};

export default SidebarButton;
