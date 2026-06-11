import Link from "next/link";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-2xl font-black tracking-tight text-slate-950">SiteCtrl</Link>
        <nav className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex">
          <a href="#features">Features</a>
          <a href="#pricing">Pricing</a>
          <Link href="/login">Login</Link>
          <Link href="/signup" className="rounded-xl bg-slate-950 px-4 py-2 text-white">Start Free</Link>
        </nav>
      </div>
    </header>
  );
}
