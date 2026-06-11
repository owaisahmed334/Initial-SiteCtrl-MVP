import DashboardSidebar from "@/components/DashboardSidebar";

export default function NewWebsitePage() {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <DashboardSidebar />

      <main className="flex-1 p-6">
        <div className="mx-auto max-w-3xl">
          <div className="mb-8">
            <p className="text-sm font-semibold text-blue-600">SiteCtrl</p>

            <h1 className="mt-2 text-3xl font-black text-slate-900">
              Add Website
            </h1>

            <p className="mt-2 text-slate-600">
              Add a website to start monitoring renewals,
              SSL certificates, uptime and security.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <form className="space-y-5">

              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Website Name
                </label>

                <input
                  type="text"
                  placeholder="DesignsCtrl"
                  className="input w-full"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Website URL
                </label>

                <input
                  type="url"
                  placeholder="https://designsctrl.net"
                  className="input w-full"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Platform
                </label>

                <select className="input w-full">
                  <option>Select Platform</option>
                  <option>WordPress</option>
                  <option>Shopify</option>
                  <option>Next.js</option>
                  <option>Laravel</option>
                  <option>Custom PHP</option>
                  <option>Webflow</option>
                  <option>Wix</option>
                  <option>Other</option>
                </select>
              </div>

              <div className="grid gap-5 md:grid-cols-3">

                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    Domain Expiry
                  </label>

                  <input
                    type="date"
                    className="input w-full"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    Hosting Expiry
                  </label>

                  <input
                    type="date"
                    className="input w-full"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    SSL Expiry
                  </label>

                  <input
                    type="date"
                    className="input w-full"
                  />
                </div>

              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Notes
                </label>

                <textarea
                  rows={4}
                  placeholder="Optional notes..."
                  className="input w-full"
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  className="rounded-xl bg-blue-600 px-6 py-3 font-bold text-white"
                >
                  Save Website
                </button>
              </div>

            </form>
          </div>
        </div>
      </main>
    </div>
  );
}