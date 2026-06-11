import Link from "next/link";
import DashboardSidebar from "@/components/DashboardSidebar";

const websites = [
  {
    name: "DesignsCtrl",
    url: "https://designsctrl.net",
    platform: "WordPress",
    health: "92%",
    ssl: "Active",
    status: "Healthy",
  },
  {
    name: "SiteCtrl Demo",
    url: "https://sitectrl.app",
    platform: "Next.js",
    health: "88%",
    ssl: "Active",
    status: "Needs Review",
  },
];

export default function WebsitesPage() {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <DashboardSidebar />

      <main className="flex-1 p-6">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-blue-600">SiteCtrl</p>
              <h1 className="mt-2 text-3xl font-black text-slate-900">
                Websites
              </h1>
              <p className="mt-2 text-slate-600">
                Manage all websites, monitoring status, SSL health and renewal tracking.
              </p>
            </div>

            <Link
              href="/websites/new"
              className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white"
            >
              Add Website
            </Link>
          </div>

          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-100 text-slate-600">
                <tr>
                  <th className="px-6 py-4">Website</th>
                  <th className="px-6 py-4">Platform</th>
                  <th className="px-6 py-4">Health</th>
                  <th className="px-6 py-4">SSL</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-200">
                {websites.map((site) => (
                  <tr key={site.url} className="hover:bg-slate-50">
                    <td className="px-6 py-4">
                      <p className="font-bold text-slate-900">{site.name}</p>
                      <p className="mt-1 text-xs text-slate-500">{site.url}</p>
                    </td>

                    <td className="px-6 py-4 text-slate-600">
                      {site.platform}
                    </td>

                    <td className="px-6 py-4">
                      <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-bold text-green-700">
                        {site.health}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
                        {site.ssl}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700">
                        {site.status}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-right">
                      <Link
                        href="/websites/1"
                        className="font-bold text-blue-600"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-white p-6">
            <p className="font-bold text-slate-900">Next Step</p>
            <p className="mt-1 text-sm text-slate-500">
              This page currently uses demo data. Later it will load websites from Supabase.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}