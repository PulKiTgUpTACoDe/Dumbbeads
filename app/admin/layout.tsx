"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FolderOpen, LogOut, Menu, X } from "lucide-react";
import { signOut } from "next-auth/react";
import { useState } from "react";

interface AdminLayoutProps {
  children: ReactNode;
}

const navigation = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Collections", href: "/admin/collections", icon: FolderOpen },
];

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Don't show layout on login page
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/admin/login" });
  };

  return (
    <div className="min-h-screen bg-neutral-950">
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-neutral-900 border-b border-neutral-800 p-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-white">Dumbbeads Admin</h1>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="text-neutral-400 hover:text-white"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-neutral-900 border-r border-neutral-800 transform transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-neutral-800">
            <h1 className="text-2xl font-bold text-white">Dumbbeads</h1>
            <p className="text-sm text-neutral-400 mt-1">Admin Dashboard</p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "text-neutral-400 hover:bg-neutral-800 hover:text-white"
                  }`}
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-neutral-800">
            <button
              onClick={handleSignOut}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-neutral-400 hover:bg-neutral-800 hover:text-white transition-colors w-full"
            >
              <LogOut size={20} />
              <span className="font-medium">Sign Out</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Main content */}
      <main className="lg:pl-64 pt-16 lg:pt-0">
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}
