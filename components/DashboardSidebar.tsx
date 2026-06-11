"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

const menuItems = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Websites", href: "/websites" },
  { label: "Renewals", href: "/renewals" },
  { label: "Reports", href: "/reports" },
  { label: "Alerts", href: "/alerts" },
  { label: "Settings", href: "/settings" },
];

export default function DashboardSidebar() {
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  return (
    <aside className="min-h-screen w-72 border-r border-slate-200 bg-white p-6">
      <Link href="/dashboard" className="block">
        <h2 className="text-2xl font-black text-slate-900">
          SiteCtrl
        </h2>

        <p className="mt-1 text-xs text-slate-500">
          Control, Monitor & Protect
        </p>
      </Link>

      <nav className="mt-10 space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="block rounded-xl px-4 py-3 text-sm font-semibold text-slate-600 hover:bg-blue-50 hover:text-blue-600"
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="mt-10 rounded-2xl bg-slate-50 p-4">
        <p className="text-sm font-bold text-slate-900">
          MVP Progress
        </p>

        <p className="mt-1 text-xs text-slate-500">
          Phase 3 Authentication
        </p>
      </div>

      <button
        onClick={handleLogout}
        className="mt-6 w-full rounded-xl border border-red-200 px-4 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50"
      >
        Logout
      </button>
    </aside>
  );
}