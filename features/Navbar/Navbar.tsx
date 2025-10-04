"use client";

import React from "react";
import Profile from "./Profile";
import { Route } from "next";
import {
  CreditCard,
  Home,
  Settings,
  // Target,
  Wallet,
  WalletCards,
} from "lucide-react";
import LinkItem from "./LinkItem";
import NavbarSheet from "./NavbarSheet";

const RoutesData: { label: string; href: Route; icon: typeof Settings }[] = [
  {
    label: "Dashbord",
    href: "/",
    icon: Home,
  },
  {
    label: "Account",
    href: "/account",
    icon: WalletCards,
  },
  {
    label: "Transactions",
    href: "/transactions",
    icon: CreditCard,
  },
  {
    label: "Budget & Categories",
    href: "/budget",
    icon: Wallet,
  },
  // {
  //   label: "Goals",
  //   href: "/goals",
  //   icon: Target,
  // },
];

function Navbar() {
  return (
    <div className="flex w-full flex-col gap-5 rounded-r-lg bg-white p-3 shadow-sm lg:h-full lg:w-[15rem]">
      <div className="flex gap-10">
        <NavbarSheet RoutesData={RoutesData} className="lg:hidden" />
        <Profile />
      </div>
      <div className="mt-7 hidden flex-1 flex-col justify-between lg:flex">
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
          <LinkItem href="/settings" Icon={Settings} text="Settings" />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
