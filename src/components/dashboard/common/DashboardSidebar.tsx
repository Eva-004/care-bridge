
"use client";

import { useState } from "react";
import NavLink from "@/components/shared/NavLink";

interface Permission {
  href: string;
  label: string;
}

interface DashboardSidebarProps {
  permissions: Permission[];
}

export default function DashboardSidebar({
  permissions,
}: DashboardSidebarProps) {
  const [open, setOpen] = useState(false);

  const NavList = (
    <nav className="flex flex-col gap-1">
      {permissions.map((item) => (
        <NavLink
          key={item.href}
          href={item.href}
          onClick={() => setOpen(false)}
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-white transition-all duration-200 hover:bg-[#F8F9FA] hover:text-[#E36414]"
        >
          {item.label}
        </NavLink>
      ))}
    </nav>
  );

  return (
    <>
      <div className="hidden min-h-screen w-60 border-r border-[#0F4C5C]/10 bg-[#0F4C5C] md:flex">
        <div className="w-full p-3">
          <div className="mb-6 flex items-center gap-3 px-1">
            <h1 className="text-2xl font-bold text-white">
              CareBridge
            </h1>
          </div>

          {NavList}
        </div>
      </div>
    </>
  );
}
