"use client"
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

interface  NavLinkProps{
 href: string,
 children: React.ReactNode,
  className?: string,
  onClick?: () => void;
}

const NavLink = ({href, children,className = "",onClick, }:NavLinkProps) => {
    const pathName = usePathname();
    const isActive = href === pathName;
    return (
       <Link href={href} onClick={onClick} className={`${className} ${isActive ? "text-[#E36414]  font-bold" : ""}`}>
        {children}
       </Link>
    );
};

export default NavLink;