"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import DashboardSidebar from "@/components/DashboardSidebar";
import { supabase } from "@/lib/supabase";

type Website = {
  id: string;
  website_name: string;
  website_url: string;
  platform: string | null;
  health_score: number | null;
  status: string | null;
};

export default function WebsitesPage() {
  const [websites, setWebsites] = useState<Website[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteLoadingId, setDeleteLoadingId] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const fetchWebsites = async () => {
    setLoading(true);
    setErrorMsg("");

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      setErrorMsg("Please login to view your websites.");
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from("websites")
      .select("id, website_name, website_url, platform, health_score, status")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      setErrorMsg(error.message);
      setLoading(false);
      return;
    }

    setWebsites(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchWebsites();
  }, []);

  const handleDeleteWebsite = async (websiteId: string, websiteName: string) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${websiteName}"? This will also remove its domain, hosting, SSL, licenses and alerts records.`
    );

    if (!confirmed) return;

    setDeleteLoadingId(websiteId);
    setErrorMsg("");
    setSuccessMsg("");

    const { error } = await supabase
      .from("websites")
      .delete()
      .eq("id", websiteId);

    if (error) {
      setErrorMsg(error.message);
      setDeleteLoadingId(null);
      return;
    }

    setWebsites((current) => current.filter((site) => site.id !== websiteId));
    setSuccessMsg("Website deleted successfully.");
    setDeleteLoadingId(null);
  };

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
                Manage all websites, monitoring status, SSL health and renewal
                tracking.
              </p>
            </div>

            <Link
              href="/websites/new"
              className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white"
            >
              Add Website
            </Link>
          </div>

          {errorMsg && (
            <div className="mb-5 rounded-lg bg-red-50 p-4 text-sm text-red-600">
              {errorMsg}
            </div>
          )}

          {successMsg && (
            <div className="mb-5 rounded-lg bg-green-50 p-4 text-sm text-green-700">
              {successMsg}
            </div>
          )}

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
                {loading && (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-8 text-center text-slate-500"
                    >
                      Loading websites...
                    </td>
                  </tr>
                )}

                {!loading && websites.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center">
                      <p className="font-bold text-slate-900">
                        No websites added yet
                      </p>
                      <p className="mt-1 text-sm text-slate-500">
                        Add your first website to start monitoring.
                      </p>
                    </td>
                  </tr>
                )}

                {!loading &&
                  websites.map((site) => (
                    <tr key={site.id} className="hover:bg-slate-50">
                      <td className="px-6 py-4">
                        <p className="font-bold text-slate-900">
                          {site.website_name}
                        </p>
                        <p className="mt-1 text-xs text-slate-500">
                          {site.website_url}
                        </p>
                      </td>

                      <td className="px-6 py-4 text-slate-600">
                        {site.platform || "Not set"}
                      </td>

                      <td className="px-6 py-4">
                        <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-bold text-green-700">
                          {site.health_score ?? 0}%
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
                          Pending
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700">
                          {site.status || "pending"}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-3">
                          <Link
                            href={`/websites/${site.id}`}
                            className="font-bold text-blue-600"
                          >
                            View
                          </Link>

                          <Link
                            href={`/websites/${site.id}/edit`}
                            className="font-bold text-slate-700"
                          >
                            Edit
                          </Link>

                          <button
                            type="button"
                            onClick={() =>
                              handleDeleteWebsite(site.id, site.website_name)
                            }
                            disabled={deleteLoadingId === site.id}
                            className="font-bold text-red-600 disabled:opacity-50"
                          >
                            {deleteLoadingId === site.id
                              ? "Deleting..."
                              : "Delete"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-white p-6">
            <p className="font-bold text-slate-900">Note:</p>
            <p className="mt-1 text-sm text-slate-500">
              This page now loads websites from Supabase for the logged-in user.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}