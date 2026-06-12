"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import DashboardSidebar from "@/components/DashboardSidebar";
import { supabase } from "@/lib/supabase";

export default function NewWebsitePage() {
  const router = useRouter();

  const [websiteName, setWebsiteName] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [platform, setPlatform] = useState("");
  const [domainExpiry, setDomainExpiry] = useState("");
  const [hostingExpiry, setHostingExpiry] = useState("");
  const [sslExpiry, setSslExpiry] = useState("");
  const [notes, setNotes] = useState("");

  const [loading, setLoading] = useState(false);
  const [detecting, setDetecting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleDetectPlatform = async () => {
    if (!websiteUrl) {
      setErrorMsg("Please enter website URL first.");
      return;
    }

    setDetecting(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const response = await fetch("/api/detect-stack", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: websiteUrl }),
      });

      const result = await response.json();

      if (!response.ok) {
        setErrorMsg(result.error || "Platform detection failed.");
        setDetecting(false);
        return;
      }

      const detectedPlatform =
        result.platform === "Custom / Unknown" ? "Other" : result.platform;

      setPlatform(detectedPlatform || "Other");
      setSuccessMsg(`Detected platform: ${detectedPlatform || "Other"}`);
    } catch {
      setErrorMsg("Platform detection failed.");
    }

    setDetecting(false);
  };

  const handleSaveWebsite = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      setErrorMsg("You must be logged in to add a website.");
      setLoading(false);
      return;
    }

    const { data: website, error: websiteError } = await supabase
      .from("websites")
      .insert({
        user_id: user.id,
        website_name: websiteName,
        website_url: websiteUrl,
        platform,
        notes,
        status: "active",
        health_score: 0,
      })
      .select()
      .single();

    if (websiteError || !website) {
      setErrorMsg(websiteError?.message || "Website could not be saved.");
      setLoading(false);
      return;
    }

    const cleanDomainName = websiteUrl
      .replace("https://", "")
      .replace("http://", "")
      .replace("/", "");

    if (domainExpiry) {
      await supabase.from("domains").insert({
        website_id: website.id,
        domain_name: cleanDomainName,
        expiry_date: domainExpiry,
        auto_detect: false,
        status: "active",
      });
    }

    if (hostingExpiry) {
      await supabase.from("hosting").insert({
        website_id: website.id,
        renewal_date: hostingExpiry,
        billing_cycle: "yearly",
        status: "active",
      });
    }

    if (sslExpiry) {
      await supabase.from("ssl_certificates").insert({
        website_id: website.id,
        expiry_date: sslExpiry,
        auto_detect: false,
        status: "active",
      });
    }

    setSuccessMsg("Website saved successfully.");

    setTimeout(() => {
      router.push("/websites");
      router.refresh();
    }, 800);

    setLoading(false);
  };

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
              Add a website to start monitoring renewals, SSL certificates,
              uptime and security.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <form onSubmit={handleSaveWebsite} className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Website Name
                </label>

                <input
                  type="text"
                  placeholder="DesignsCtrl"
                  className="input w-full"
                  value={websiteName}
                  onChange={(e) => setWebsiteName(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Website URL
                </label>

                <div className="flex gap-3">
                  <input
                    type="url"
                    placeholder="https://designsctrl.net"
                    className="input w-full"
                    value={websiteUrl}
                    onChange={(e) => setWebsiteUrl(e.target.value)}
                    required
                  />

                  <button
                    type="button"
                    onClick={handleDetectPlatform}
                    disabled={detecting}
                    className="whitespace-nowrap rounded-xl border border-blue-200 px-4 py-2 text-sm font-bold text-blue-600 hover:bg-blue-50 disabled:opacity-60"
                  >
                    {detecting ? "Detecting..." : "Detect Platform"}
                  </button>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Platform
                </label>

                <select
                  className="input w-full"
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value)}
                  required
                >
                  <option value="">Select Platform</option>
                  <option value="WordPress">WordPress</option>
                  <option value="Shopify">Shopify</option>
                  <option value="Next.js">Next.js</option>
                  <option value="Laravel">Laravel</option>
                  <option value="Custom PHP">Custom PHP</option>
                  <option value="Webflow">Webflow</option>
                  <option value="Wix">Wix</option>
                  <option value="Other">Other</option>
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
                    value={domainExpiry}
                    onChange={(e) => setDomainExpiry(e.target.value)}
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    Hosting Expiry
                  </label>

                  <input
                    type="date"
                    className="input w-full"
                    value={hostingExpiry}
                    onChange={(e) => setHostingExpiry(e.target.value)}
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    SSL Expiry
                  </label>

                  <input
                    type="date"
                    className="input w-full"
                    value={sslExpiry}
                    onChange={(e) => setSslExpiry(e.target.value)}
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
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>

              {errorMsg && (
                <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
                  {errorMsg}
                </div>
              )}

              {successMsg && (
                <div className="rounded-lg bg-green-50 p-3 text-sm text-green-700">
                  {successMsg}
                </div>
              )}

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className="rounded-xl bg-blue-600 px-6 py-3 font-bold text-white disabled:opacity-60"
                >
                  {loading ? "Saving..." : "Save Website"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}