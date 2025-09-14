import { LucideProps } from "lucide-react";
import { Route } from "next";
import React from "react";
import NavLink from "./NavLink";

interface LinkItemProps {
  Icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  text: string;
  href: Route;
}
const LinkItem: React.FC<LinkItemProps> = ({ Icon, text, href }) => {
  return (
    <NavLink
      href={href}
      className="flex w-full cursor-pointer items-center gap-2 rounded-md p-2 text-sm hover:bg-gray-200/70"
      inactiveClass="text-gray-500"
      activeClass="text-black"
    >
      <Icon className="inline" size={13} />
      <span>{text}</span>
    </NavLink>
  );
};

export default LinkItem;
