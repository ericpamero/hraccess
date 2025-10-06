'use client';
import React, { useState } from "react";
import { Sidebar } from "../components/sidebar";
import Footer from "../../components/Footer";

const settings = [
  { name: "Account Management", description: "Manage admin and user accounts, roles, and permissions.", updated: "2025-07-01", status: "Active" },
  { name: "System Preferences", description: "Configure system-wide preferences and defaults.", updated: "2025-06-28", status: "Active" },
  { name: "Notification Settings", description: "Set up email and in-app notifications.", updated: "2025-06-25", status: "Active" },
  { name: "Audit Logs", description: "View and export system activity logs.", updated: "2025-06-20", status: "Active" },
  { name: "Backup & Restore", description: "Manage data backup and restoration options.", updated: "2025-06-15", status: "Inactive" },
  { name: "Theme Customization", description: "Change the look and feel of the admin dashboard.", updated: "2025-06-10", status: "Active" },
  { name: "API Access", description: "Manage API keys and integrations.", updated: "2025-06-05", status: "Inactive" },
  { name: "Security Settings", description: "Configure password policies and 2FA.", updated: "2025-06-01", status: "Active" },
  { name: "Document Templates", description: "Edit and manage document templates.", updated: "2025-05-28", status: "Active" },
  { name: "Legal & Compliance", description: "Review compliance and legal documents.", updated: "2025-05-20", status: "Active" },
  { name: "Data Retention", description: "Set data retention and deletion policies.", updated: "2025-05-15", status: "Inactive" },
  { name: "Language & Region", description: "Set default language and regional settings.", updated: "2025-05-10", status: "Active" },
];

const ITEMS_PER_PAGE = 10;

export default function SettingsPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const filtered = settings.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase()) ||
      item.status.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  return (
    <div className="flex min-h-screen font-sans bg-gradient-to-br from-[#e0e7ff] via-[#f8fafc] to-[#f0fdfa]">
      <Sidebar />
      <div className="flex flex-col flex-1 min-h-screen">
        <main className="flex-1 p-8">
          <div className="max-w-3xl mx-auto bg-white/90 rounded-2xl p-8 shadow-xl border border-blue-100">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
              <div>
                <h1 className="text-3xl font-bold text-[#22223b]">Admin Settings</h1>
                <p className="text-gray-500 mt-1 text-sm">Manage system configuration and preferences</p>
              </div>
              <input
                type="text"
                placeholder="Search settings..."
                className="border border-gray-300 rounded-lg px-3 py-2 w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-blue-300 shadow-sm"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
              />
            </div>
            <div className="space-y-6">
              {paginated.length === 0 ? (
                <div className="text-center text-gray-400 py-12">No settings found.</div>
              ) : (
                paginated.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col md:flex-row md:items-center md:justify-between bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-100 rounded-xl p-5 shadow-sm hover:shadow-lg transition"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-semibold text-[#22223b]">{item.name}</span>
                        <span className={`text-xs px-2 py-1 rounded ${item.status === "Active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                          {item.status}
                        </span>
                      </div>
                      <div className="text-gray-600 mt-1">{item.description}</div>
                    </div>
                    <div className="mt-3 md:mt-0 text-xs text-gray-400">
                      Last updated: <span className="font-medium text-gray-600">{item.updated}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
            {/* Pagination */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-center mt-8 gap-2">
              <span className="text-sm text-gray-500">
                Showing {(page - 1) * ITEMS_PER_PAGE + 1}
                {" - "}
                {Math.min(page * ITEMS_PER_PAGE, filtered.length)}
                {" of "}
                {filtered.length} settings
              </span>
              <div className="flex gap-2">
                <button
                  className="px-3 py-1 rounded border bg-white hover:bg-gray-100 disabled:opacity-50"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                >
                  Prev
                </button>
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    className={`px-3 py-1 rounded border ${page === i + 1 ? "bg-blue-500 text-white" : "bg-white hover:bg-gray-100"}`}
                    onClick={() => setPage(i + 1)}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  className="px-3 py-1 rounded border bg-white hover:bg-gray-100 disabled:opacity-50"
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages || totalPages === 0}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
