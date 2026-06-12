"use client";

import { use, useEffect, useState } from "react";
import DashboardSidebar from "@/components/DashboardSidebar";
import { supabase } from "@/lib/supabase";

type PageProps = {
  params: Promise<{ id: string }>;
};

type Website = {
  id: string;
  website_name: string;
  website_url: string;
  platform: string | null;
  health_score: number | null;
  status: string | null;
  notes: string | null;
};

type Domain = {
  expiry_date: string | null;
  registrar: string | null;
};

type Hosting = {
  renewal_date: string | null;
  provider: string | null;
};

type SslCertificate = {
  expiry_date: string | null;
  status: string | null;
  issuer: string | null;
};

export default function WebsiteDetailsPage({ params }: PageProps) {
  const { id } = use(params);

  const [website, setWebsite] = useState<Website | null>(null);
  const [domain, setDomain] = useState<Domain | null>(null);
  const [hosting, setHosting] = useState<Hosting | null>(null);
  const [ssl, setSsl] = useState<SslCertificate | null>(null);

  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const fetchWebsiteDetails = async () => {
      setLoading(true);
      setErrorMsg("");

      const { data: websiteData, error: websiteError } = await supabase
        .from("websites")
        .select(
          "id, website_name, website_url, platform, health_score, status, notes"
        )
        .eq("id", id)
        .single();

      if (websiteError || !websiteData) {
        setErrorMsg("Website not found.");
        setLoading(false);
        return;
      }

      setWebsite(websiteData);

      const { data: domainData } = await supabase
        .from("domains")
        .select("expiry_date, registrar")
        .eq("website_id", id)
        .maybeSingle();

      const { data: hostingData } = await supabase
        .from("hosting")
        .select("renewal_date, provider")
        .eq("website_id", id)
        .maybeSingle();

      const { data: sslData } = await supabase
        .from("ssl_certificates")
        .select("expiry_date, status, issuer")
        .eq("website_id", id)
        .maybeSingle();

      setDomain(domainData);
      setHosting(hostingData);
      setSsl(sslData);

      setLoading(false);
    };

    fetchWebsiteDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-screen bg-slate-50">
        <DashboardSidebar />

        <main className="flex-1 p-6">
          <p className="text-slate-600">Loading website details...</p>
        </main>
      </div>
    );
  }

  if (errorMsg || !website) {
    return (
      <div className="flex min-h-screen bg-slate-50">
        <DashboardSidebar />

        <main className="flex-1 p-6">
          <div className="rounded-xl bg-red-50 p-4 text-red-600">
            {errorMsg || "Website not found."}
          </div>
        </main>
      </div>
    );
  }

  const domainExpiry = domain?.expiry_date || "Not added";
  const hostingExpiry = hosting?.renewal_date || "Not added";
  const sslExpiry = ssl?.expiry_date || "Not added";
  const sslStatus = ssl?.status || "Pending";

  return (
    <div className="flex min-h-screen bg-slate-50">
      <DashboardSidebar />

      <main className="flex-1 p-6">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-blue-600">
                Website Overview
              </p>

              <h1 className="mt-2 text-3xl font-black text-slate-900">
                {website.website_name}
              </h1>

              <p className="mt-2 text-slate-600">{website.website_url}</p>
            </div>

            <div className="flex gap-3">
              <a
                href={website.website_url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-bold text-slate-700 hover:bg-white"
              >
                Preview Website
              </a>

              <a
                href={`/websites/${id}/edit`}
                className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white"
              >
                Edit Website
              </a>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-4">
            <div className="rounded-2xl border bg-white p-6 shadow-sm">
              <p className="text-sm text-slate-500">Health Score</p>

              <h2 className="mt-3 text-4xl font-black text-green-600">
                {website.health_score ?? 0}%
              </h2>
            </div>

            <div className="rounded-2xl border bg-white p-6 shadow-sm">
              <p className="text-sm text-slate-500">SSL Status</p>

              <h2 className="mt-3 text-xl font-black text-blue-600">
                {sslStatus}
              </h2>
            </div>

            <div className="rounded-2xl border bg-white p-6 shadow-sm">
              <p className="text-sm text-slate-500">Domain Expiry</p>

              <h2 className="mt-3 text-xl font-black">{domainExpiry}</h2>
            </div>

            <div className="rounded-2xl border bg-white p-6 shadow-sm">
              <p className="text-sm text-slate-500">Platform</p>

              <h2 className="mt-3 text-xl font-black">
                {website.platform || "Not set"}
              </h2>
            </div>
          </div>

          <div className="mt-8 rounded-2xl border bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold">Website Information</h2>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <div>
                <p className="text-sm text-slate-500">Website Name</p>
                <p className="font-bold">{website.website_name}</p>
              </div>

              <div>
                <p className="text-sm text-slate-500">Website URL</p>
                <p className="font-bold">{website.website_url}</p>
              </div>

              <div>
                <p className="text-sm text-slate-500">Platform</p>
                <p className="font-bold">{website.platform || "Not set"}</p>
              </div>

              <div>
                <p className="text-sm text-slate-500">Status</p>
                <p className="font-bold">{website.status || "pending"}</p>
              </div>

              <div>
                <p className="text-sm text-slate-500">Domain Expiry</p>
                <p className="font-bold">{domainExpiry}</p>
              </div>

              <div>
                <p className="text-sm text-slate-500">Hosting Expiry</p>
                <p className="font-bold">{hostingExpiry}</p>
              </div>

              <div>
                <p className="text-sm text-slate-500">SSL Expiry</p>
                <p className="font-bold">{sslExpiry}</p>
              </div>

              <div>
                <p className="text-sm text-slate-500">Notes</p>
                <p className="font-bold">{website.notes || "No notes"}</p>
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border bg-white p-6 shadow-sm">
              <h2 className="text-xl font-bold">Upcoming Renewals</h2>

              <ul className="mt-4 space-y-3 text-slate-700">
                <li>Domain Renewal: {domainExpiry}</li>
                <li>Hosting Renewal: {hostingExpiry}</li>
                <li>SSL Renewal: {sslExpiry}</li>
              </ul>
            </div>

            <div className="rounded-2xl border bg-white p-6 shadow-sm">
              <h2 className="text-xl font-bold">Recent Alerts</h2>
              <p className="mt-4 text-slate-500">No alerts available.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}