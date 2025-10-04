import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MenuIcon, Settings } from "lucide-react";
import { Route } from "next";
import LinkItem from "./LinkItem";
import { usePathname } from "next/navigation";

interface NavbarSheetProps {
  className?: string;
  RoutesData: { label: string; href: Route; icon: typeof MenuIcon }[];
}

const NavbarSheet: React.FC<NavbarSheetProps> = ({ className, RoutesData }) => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className={clsx(className)} asChild>
        <Button variant="outline" size="icon">
          <MenuIcon className="size-6" size={25} />
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <div className="grid flex-1 auto-rows-min gap-2 px-4">
          {RoutesData.map((linkItem) => (
            <LinkItem
              key={linkItem.label}
              href={linkItem.href}
              text={linkItem.label}
              Icon={linkItem.icon}
            />
          ))}
        </div>
        <SheetFooter>
          <div>
            <LinkItem href="/settings" Icon={Settings} text="Settings" />
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default NavbarSheet;
