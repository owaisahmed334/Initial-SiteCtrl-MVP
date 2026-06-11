import DashboardSidebar from "@/components/DashboardSidebar";

export default function WebsiteDetailsPage() {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <DashboardSidebar />

      <main className="flex-1 p-6">
        <div className="mx-auto max-w-7xl">

          <div className="mb-8">
            <p className="text-sm font-semibold text-blue-600">
              Website Overview
            </p>

            <h1 className="mt-2 text-3xl font-black text-slate-900">
              DesignsCtrl
            </h1>

            <p className="mt-2 text-slate-600">
              https://designsctrl.net
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-4">

            <div className="rounded-2xl border bg-white p-6 shadow-sm">
              <p className="text-sm text-slate-500">
                Health Score
              </p>

              <h2 className="mt-3 text-4xl font-black text-green-600">
                92%
              </h2>
            </div>

            <div className="rounded-2xl border bg-white p-6 shadow-sm">
              <p className="text-sm text-slate-500">
                SSL Status
              </p>

              <h2 className="mt-3 text-xl font-black text-blue-600">
                Active
              </h2>
            </div>

            <div className="rounded-2xl border bg-white p-6 shadow-sm">
              <p className="text-sm text-slate-500">
                Domain Expiry
              </p>

              <h2 className="mt-3 text-xl font-black">
                15 Aug 2026
              </h2>
            </div>

            <div className="rounded-2xl border bg-white p-6 shadow-sm">
              <p className="text-sm text-slate-500">
                Platform
              </p>

              <h2 className="mt-3 text-xl font-black">
                WordPress
              </h2>
            </div>

          </div>

          <div className="mt-8 rounded-2xl border bg-white p-6 shadow-sm">

            <h2 className="text-xl font-bold">
              Website Information
            </h2>

            <div className="mt-5 grid gap-4 md:grid-cols-2">

              <div>
                <p className="text-sm text-slate-500">
                  Website Name
                </p>

                <p className="font-bold">
                  DesignsCtrl
                </p>
              </div>

              <div>
                <p className="text-sm text-slate-500">
                  Website URL
                </p>

                <p className="font-bold">
                  https://designsctrl.net
                </p>
              </div>

              <div>
                <p className="text-sm text-slate-500">
                  Platform
                </p>

                <p className="font-bold">
                  WordPress
                </p>
              </div>

              <div>
                <p className="text-sm text-slate-500">
                  SSL Status
                </p>

                <p className="font-bold text-green-600">
                  Active
                </p>
              </div>

            </div>

          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">

            <div className="rounded-2xl border bg-white p-6 shadow-sm">
              <h2 className="text-xl font-bold">
                Upcoming Renewals
              </h2>

              <ul className="mt-4 space-y-3">
                <li>Domain Renewal</li>
                <li>Hosting Renewal</li>
                <li>SSL Renewal</li>
              </ul>
            </div>

            <div className="rounded-2xl border bg-white p-6 shadow-sm">
              <h2 className="text-xl font-bold">
                Recent Alerts
              </h2>

              <p className="mt-4 text-slate-500">
                No alerts available.
              </p>
            </div>

          </div>

        </div>
      </main>
    </div>
  );
}