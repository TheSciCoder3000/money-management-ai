"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVerticalIcon } from "lucide-react";
import DeleteAccountDialog from "./DeleteAccountDialog";
import { useState } from "react";

interface MenuAccountCardProps {
  account: IAccountDb;
}
const MenuAccountCard: React.FC<MenuAccountCardProps> = ({ account }) => {
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu
      open={open}
      onOpenChange={(state) => {
        console.log(state);
        setOpen(state);
      }}
    >
      <DropdownMenuTrigger
        asChild
        className="menu-btn absolute right-4 cursor-pointer rounded-full p-1.5 hover:bg-gray-100"
      >
        <button>
          <MoreVerticalIcon size={15} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuLabel>Card Options</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem
            onSelect={(e) => {
              e.preventDefault();
            }}
          >
            <DeleteAccountDialog
              closeMenu={() => setOpen(false)}
              id={account.id}
            />
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MenuAccountCard;
