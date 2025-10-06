'use client';
import React, { useState } from 'react';
import { Sidebar } from "../components/sidebar";
import Footer from "../../components/Footer";

const logs = [
  { user: "juan.delacruz@example.com", page: "/my-documents", action: "Downloaded SSS.pdf", timestamp: "2025-07-02 14:33" },
  { user: "maria.santos@example.com", page: "/admin/employees", action: "Viewed Employee List", timestamp: "2025-07-02 13:10" },
  { user: "pedro.reyes@example.com", page: "/admin/settings", action: "Changed Password", timestamp: "2025-07-01 09:45" },
  { user: "ana.lopez@example.com", page: "/admin/reports", action: "Exported Payroll Report", timestamp: "2025-06-30 16:22" },
  { user: "carlos.ramos@example.com", page: "/admin/logs", action: "Viewed Logs", timestamp: "2025-06-29 11:05" },
  { user: "liza.cruz@example.com", page: "/my-documents", action: "Uploaded PhilHealth.jpg", timestamp: "2025-06-28 08:30" },
  { user: "mark.lim@example.com", page: "/admin/employees", action: "Edited Employee Info", timestamp: "2025-06-27 15:18" },
  { user: "jenny.navarro@example.com", page: "/admin/reports", action: "Viewed Attendance Report", timestamp: "2025-06-26 10:50" },
  { user: "samuel.tan@example.com", page: "/admin/settings", action: "Updated Notification Settings", timestamp: "2025-06-25 14:12" },
  { user: "patricia.gomez@example.com", page: "/admin/logs", action: "Viewed Logs", timestamp: "2025-06-24 17:40" },
  { user: "albert.sy@example.com", page: "/my-documents", action: "Downloaded NBI.pdf", timestamp: "2025-06-23 12:05" },
  { user: "nina.gutierrez@example.com", page: "/admin/employees", action: "Added New Employee", timestamp: "2025-06-22 09:55" },
];

const ITEMS_PER_PAGE = 10;

export default function LogsPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const filtered = logs.filter(
    (log) =>
      log.user.toLowerCase().includes(search.toLowerCase()) ||
      log.page.toLowerCase().includes(search.toLowerCase()) ||
      log.action.toLowerCase().includes(search.toLowerCase()) ||
      log.timestamp.toLowerCase().includes(search.toLowerCase())
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
          <div className="max-w-6xl mx-auto">
            {/* Header and Search */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
              <h2 className="text-3xl font-bold text-[#22223b]">User Access Logs</h2>
              <input
                type="text"
                placeholder="Search logs..."
                className="border border-gray-300 rounded-lg px-3 py-2 w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-blue-300 shadow-sm"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
              />
            </div>
            {/* Table */}
            <div className="overflow-x-auto rounded-2xl shadow-lg border border-gray-100 bg-white/90">
              <table className="min-w-full text-sm">
                <thead className="bg-gradient-to-r from-blue-50 to-blue-100">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-[#22223b]">User</th>
                    <th className="px-4 py-3 text-left font-semibold text-[#22223b]">Page</th>
                    <th className="px-4 py-3 text-left font-semibold text-[#22223b]">Action</th>
                    <th className="px-4 py-3 text-left font-semibold text-[#22223b]">Timestamp</th>
                  </tr>
                </thead>
                <tbody>
                  {paginated.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-4 py-8 text-center text-gray-400">
                        No logs found.
                      </td>
                    </tr>
                  ) : (
                    paginated.map((log, idx) => (
                      <tr key={idx} className="border-t hover:bg-blue-50 transition">
                        <td className="px-4 py-3 font-medium">{log.user}</td>
                        <td className="px-4 py-3">{log.page}</td>
                        <td className="px-4 py-3">{log.action}</td>
                        <td className="px-4 py-3 text-xs text-gray-500">{log.timestamp}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            {/* Pagination */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-center mt-6 gap-2">
              <span className="text-sm text-gray-500">
                Showing {(page - 1) * ITEMS_PER_PAGE + 1}
                {" - "}
                {Math.min(page * ITEMS_PER_PAGE, filtered.length)}
                {" of "}
                {filtered.length} logs
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