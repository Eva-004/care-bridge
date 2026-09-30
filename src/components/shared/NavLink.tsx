"use client"
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

interface  NavLinkProps{
 href: string,
 children: React.ReactNode,
  className?: string;
}

const NavLink = ({href, children,className = "" }:NavLinkProps) => {
    const pathName = usePathname();
    const isActive = href === pathName;
    return (
       <Link href={href} className={`${className} ${isActive ? "text-[#E36414]  font-bold" : ""}`}>
        {children}
       </Link>
    );
};

export default NavLink;