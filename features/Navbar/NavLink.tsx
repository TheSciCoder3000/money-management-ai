"use client";
import clsx from "clsx";
import { Route } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { ReactNode } from "react";

interface NavLinkProps {
  children: ReactNode | ReactNode[];
  href: Route;
  className?: string;
  activeClass?: string;
  inactiveClass?: string;
}
const NavLink: React.FC<NavLinkProps> = ({
  children,
  href,
  className,
  activeClass,
  inactiveClass,
}) => {
  const pathName = usePathname();

  return (
    <Link
      href={href}
      className={clsx(
        className,
        pathName === href ? activeClass : inactiveClass,
      )}
    >
      {children}
    </Link>
  );
};

export default NavLink;
