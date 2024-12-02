import {
  Calendar,
  Home,
  Inbox,
  Search,
  Settings,
  Info,
  Newspaper,
  LucideIcon,
  List,
  Table,
  MousePointer2,
} from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/shared/uiShadcn/sheet";
import { SidebarMenuButton, SidebarMenuItem } from "@/shared/uiShadcn/sidebar";
import { TypographyP } from "@/shared/uiShadcn/typography";
import { Description } from "@radix-ui/react-dialog";

type Item = {
  title: string;
  url: string;
  icon: LucideIcon;
};

// Menu items.
const Menu: Item[] = [
  {
    title: "Про нас",
    url: "/#about",
    icon: Info,
  },
  {
    title: "Каталог товарів",
    url: "/products",
    icon: List,
  },
  {
    title: "Таблиця ОПТ",
    url: "/table",
    icon: Table,
  },
  {
    title: "Наші магазини",
    url: "/#footer",
    icon: MousePointer2,
  },
  {
    title: "Політика ПО",
    url: "/privacypolicy",
    icon: Newspaper,
  },
];

export function AppSheet({
  open,
  toggleFn,
}: {
  open: boolean;
  toggleFn: () => void;
}) {
  return (
    <Sheet open={open} onOpenChange={() => toggleFn()}>
      <SheetContent className="">
        <SheetHeader className="mb-6">
          <SheetTitle>Все Всім</SheetTitle>
          <Description className="">Навігація магазину</Description>
        </SheetHeader>
        <div className="flex flex-col gap-2">
          {Menu.map((item) => (
            <div key={item.title} className="">
              <a
                href={item.url}
                className="flex flex-row items-center gap-2"
                onClick={() => toggleFn()}
              >
                <item.icon />
                <TypographyP className=" underline">{item.title}</TypographyP>
              </a>
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
