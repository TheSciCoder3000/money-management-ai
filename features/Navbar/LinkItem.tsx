import { LucideProps } from "lucide-react";
import { Route } from "next";
import Link from "next/link";
import React from "react";

interface LinkItemProps {
  Icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  text: string;
  href: Route;
}
const LinkItem: React.FC<LinkItemProps> = ({ Icon, text, href }) => {
  return (
    <Link
      href={href}
      className="flex w-full cursor-pointer items-center gap-2 rounded-md p-2 hover:bg-gray-200/70"
    >
      <Icon className="inline" size={15} />
      <span>{text}</span>
    </Link>
  );
};

export default LinkItem;
