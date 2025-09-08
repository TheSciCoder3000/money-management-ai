import React from "react";
import Profile from "./Profile";
import { Route } from "next";
import { CreditCard, Home, Settings, Target, Wallet } from "lucide-react";
import LinkItem from "./LinkItem";

const RoutesData: { label: string; href: Route; icon: typeof Settings }[] = [
  {
    label: "Dashbord",
    href: "/",
    icon: Home,
  },
  {
    label: "Transactions",
    href: "/",
    icon: CreditCard,
  },
  {
    label: "Budget",
    href: "/",
    icon: Wallet,
  },
  {
    label: "Goals",
    href: "/",
    icon: Target,
  },
];

function Navbar() {
  return (
    <div className="flex h-full w-[18rem] flex-col gap-5 rounded-r-lg bg-gray-100 p-3">
      <Profile />
      <div className="flex flex-1 flex-col justify-between">
        <div>
          {RoutesData.map((linkItem) => (
            <LinkItem
              key={linkItem.label}
              href={linkItem.href}
              text={linkItem.label}
              Icon={linkItem.icon}
            />
          ))}
        </div>

        <div>
          <LinkItem href="/" Icon={Settings} text="Settings" />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
