'use client';
import React, { useState } from "react";
import { Sidebar } from "../components/sidebar";
import Footer from "../../components/Footer";

const uploads = [
  { name: "SSS.pdf", type: "PDF", uploadedBy: "juan.delacruz@example.com", date: "2025-07-02", status: "Verified" },
  { name: "PhilHealth.jpg", type: "Image", uploadedBy: "maria.santos@example.com", date: "2025-07-01", status: "Pending" },
  { name: "PagIbig.pdf", type: "PDF", uploadedBy: "pedro.reyes@example.com", date: "2025-06-30", status: "Verified" },
  { name: "TIN.jpg", type: "Image", uploadedBy: "ana.lopez@example.com", date: "2025-06-29", status: "Pending" },
  { name: "Passport.pdf", type: "PDF", uploadedBy: "carlos.ramos@example.com", date: "2025-06-28", status: "Verified" },
  { name: "NBI.pdf", type: "PDF", uploadedBy: "liza.cruz@example.com", date: "2025-06-27", status: "Verified" },
  { name: "BarangayClearance.jpg", type: "Image", uploadedBy: "mark.lim@example.com", date: "2025-06-26", status: "Pending" },
  { name: "VotersID.pdf", type: "PDF", uploadedBy: "jenny.navarro@example.com", date: "2025-06-25", status: "Verified" },
  { name: "BirthCertificate.jpg", type: "Image", uploadedBy: "samuel.tan@example.com", date: "2025-06-24", status: "Pending" },
  { name: "MarriageCert.pdf", type: "PDF", uploadedBy: "patricia.gomez@example.com", date: "2025-06-23", status: "Verified" },
  { name: "PoliceClearance.pdf", type: "PDF", uploadedBy: "albert.sy@example.com", date: "2025-06-22", status: "Verified" },
  { name: "Diploma.jpg", type: "Image", uploadedBy: "nina.gutierrez@example.com", date: "2025-06-21", status: "Pending" },
];

const ITEMS_PER_PAGE = 10;

export default function FilesPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const filtered = uploads.filter(
    (file) =>
      file.name.toLowerCase().includes(search.toLowerCase()) ||
      file.type.toLowerCase().includes(search.toLowerCase()) ||
      file.uploadedBy.toLowerCase().includes(search.toLowerCase()) ||
      file.status.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  // Premium-style stats
  const stats = [
    {
      label: "Total Uploads",
      value: uploads.length,
      icon: "📁",
      color: "bg-gradient-to-r from-blue-400 to-blue-600 text-white"
    },
    {
      label: "Verified",
      value: uploads.filter(u => u.status === "Verified").length,
      icon: "✅",
      color: "bg-gradient-to-r from-green-400 to-green-600 text-white"
    },
    {
      label: "Pending",
      value: uploads.filter(u => u.status === "Pending").length,
      icon: "⏳",
      color: "bg-gradient-to-r from-yellow-400 to-yellow-600 text-white"
    },
    {
      label: "Unique Uploaders",
      value: new Set(uploads.map(u => u.uploadedBy)).size,
      icon: "🧑‍💻",
      color: "bg-gradient-to-r from-purple-400 to-purple-600 text-white"
    }
  ];

  return (
    <div className="flex min-h-screen font-sans bg-gradient-to-br from-[#e0e7ff] via-[#f8fafc] to-[#f0fdfa]">
      <Sidebar />
      <div className="flex flex-col flex-1 min-h-screen">
        <main className="flex-1 p-8">
          <div className="max-w-6xl mx-auto">
            {/* Premium Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, idx) => (
                <div
                  key={idx}
                  className={`flex items-center gap-4 p-5 rounded-2xl shadow-lg ${stat.color} bg-opacity-90 border border-white/30`}
                  style={{ boxShadow: "0 4px 24px 0 rgba(80, 112, 255, 0.10)" }}
                >
                  <span className="text-3xl drop-shadow">{stat.icon}</span>
                  <div>
                    <div className="text-2xl font-bold drop-shadow">{stat.value}</div>
                    <div className="text-sm opacity-90">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
            {/* Header and Search */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
              <h1 className="text-3xl font-bold text-[#22223b]">All Uploaded Documents</h1>
              <input
                type="text"
                placeholder="Search uploads..."
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
                    <th className="px-4 py-3 text-left font-semibold text-[#22223b]">File Name</th>
                    <th className="px-4 py-3 text-left font-semibold text-[#22223b]">Type</th>
                    <th className="px-4 py-3 text-left font-semibold text-[#22223b]">Uploaded By</th>
                    <th className="px-4 py-3 text-left font-semibold text-[#22223b]">Date</th>
                    <th className="px-4 py-3 text-left font-semibold text-[#22223b]">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {paginated.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-4 py-8 text-center text-gray-400">
                        No uploads found.
                      </td>
                    </tr>
                  ) : (
                    paginated.map((file, idx) => (
                      <tr key={idx} className="border-t hover:bg-blue-50 transition">
                        <td className="px-4 py-3 font-medium">{file.name}</td>
                        <td className="px-4 py-3">{file.type}</td>
                        <td className="px-4 py-3">{file.uploadedBy}</td>
                        <td className="px-4 py-3">{file.date}</td>
                        <td className="px-4 py-3 font-semibold">
                          <span className={`inline-block w-2 h-2 rounded-full mr-2 ${file.status === "Verified" ? "bg-green-400" : "bg-yellow-400"}`}></span>
                          <span className={file.status === "Verified" ? "text-green-700" : "text-yellow-700"}>
                            {file.status}
                          </span>
                        </td>
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
                {filtered.length} uploads
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