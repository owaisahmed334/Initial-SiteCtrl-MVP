import Link from "next/link";
import { Activity, Bell, Gauge, ShieldCheck, Clock, Globe2 } from "lucide-react";
import { Navbar } from "@/components/Navbar";

const features = [
  { icon: Globe2, title: "Domain & Hosting Tracker", text: "Track renewals manually or auto-detect where possible." },
  { icon: ShieldCheck, title: "SSL & Security Alerts", text: "Get alerts before SSL expiry and suspicious changes." },
  { icon: Activity, title: "Uptime Monitoring", text: "Know when a website goes down or slows down." },
  { icon: Gauge, title: "PageSpeed Reports", text: "Monthly mobile and desktop performance reports." },
  { icon: Bell, title: "Email Notifications", text: "30, 15, 7 and 1 day reminders for renewals." },
  { icon: Clock, title: "License Manager", text: "Track premium plugin, app and tool subscriptions." },
];

export default function Home() {
  return (
    <main>
      <Navbar />
      <section className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-2">
        <div>
          <p className="mb-4 inline-flex rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">DesignsCtrl presents</p>
          <h1 className="text-5xl font-black leading-tight tracking-tight text-slate-950 md:text-6xl">SiteCtrl</h1>
          <p className="mt-4 text-2xl font-semibold text-slate-700">Control, Monitor & Protect Your Websites.</p>
          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">Track domains, hosting, SSL certificates, plugin licenses, uptime, performance and security alerts from one powerful dashboard.</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/signup" className="btn-primary">Start Free</Link>
            <Link href="/dashboard" className="btn-secondary">View Demo Dashboard</Link>
          </div>
        </div>
        <div className="card p-6">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-xl font-bold">Website Health</h2>
            <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-bold text-green-700">92/100</span>
          </div>
          <div className="space-y-4">
            {["SSL expires in 82 days", "Domain active", "PageSpeed mobile score 89", "No malware alerts", "Hosting renewal in 41 days"].map((item) => (
              <div key={item} className="flex items-center justify-between rounded-xl border border-slate-200 p-4">
                <span className="font-medium text-slate-700">{item}</span><span>✓</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section id="features" className="mx-auto max-w-7xl px-6 py-14">
        <h2 className="text-3xl font-black">Everything your website needs to stay safe and active.</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {features.map(({ icon: Icon, title, text }) => (
            <div className="card p-6" key={title}>
              <Icon className="mb-4 h-8 w-8 text-blue-600" />
              <h3 className="text-lg font-bold">{title}</h3>
              <p className="mt-2 text-slate-600">{text}</p>
            </div>
          ))}
        </div>
      </section>
      <section id="pricing" className="mx-auto max-w-7xl px-6 py-14">
        <h2 className="text-3xl font-black">Simple Pricing</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {[["Starter", "$1/mo", "1 website"],["Pro", "$5/mo", "10 websites"],["Agency", "$19/mo", "Unlimited websites"]].map(p => (
            <div className="card p-6" key={p[0]}><h3 className="text-xl font-black">{p[0]}</h3><p className="mt-4 text-4xl font-black">{p[1]}</p><p className="mt-3 text-slate-600">{p[2]}</p></div>
          ))}
        </div>
      </section>
    </main>
  );
}
