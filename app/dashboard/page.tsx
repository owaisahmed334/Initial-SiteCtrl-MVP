import DashboardSidebar from "@/components/DashboardSidebar";

const stats = [
  { label: "Total Websites", value: "0", note: "Websites added" },
  { label: "Upcoming Renewals", value: "0", note: "Next 30 days" },
  { label: "SSL Alerts", value: "0", note: "Certificates expiring" },
  { label: "Security Alerts", value: "0", note: "No active scan yet" },
];

export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <DashboardSidebar />
    <main className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <p className="text-sm font-semibold text-blue-600">SiteCtrl</p>
          <h1 className="mt-2 text-3xl font-black text-slate-900">
            Dashboard
          </h1>
          <p className="mt-2 text-slate-600">
            Monitor website health, renewals, SSL, uptime and security from one place.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <p className="text-sm font-medium text-slate-500">
                {item.label}
              </p>
              <h2 className="mt-3 text-4xl font-black text-slate-900">
                {item.value}
              </h2>
              <p className="mt-2 text-sm text-slate-500">{item.note}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900">
                Website Health Overview
              </h2>
              <a
                href="/websites/add"
                className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-bold text-white"
              >
                Add Website
              </a>
            </div>

            <div className="mt-6 rounded-xl border border-dashed border-slate-300 p-8 text-center">
              <h3 className="text-lg font-bold text-slate-900">
                No websites added yet
              </h3>
              <p className="mt-2 text-slate-500">
                Add your first website to start monitoring SSL, renewals, uptime and security.
              </p>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900">
              Recent Alerts
            </h2>

            <div className="mt-6 space-y-4">
              <div className="rounded-xl bg-slate-50 p-4">
                <p className="font-semibold text-slate-800">
                  No active alerts
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  Alerts will appear here after monitoring starts.
                </p>
              </div>
            </div>
          </section>
        </div>

        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">
            Upcoming Tasks
          </h2>

          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="font-bold text-slate-900">Add Website Module</p>
              <p className="mt-1 text-sm text-slate-500">
                Build website form and save flow.
              </p>
            </div>

            <div className="rounded-xl bg-slate-50 p-4">
              <p className="font-bold text-slate-900">Supabase Setup</p>
              <p className="mt-1 text-sm text-slate-500">
                Connect database and authentication.
              </p>
            </div>

            <div className="rounded-xl bg-slate-50 p-4">
              <p className="font-bold text-slate-900">SSL Monitor</p>
              <p className="mt-1 text-sm text-slate-500">
                Add automatic certificate expiry checks.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
    </div>  
  );
}