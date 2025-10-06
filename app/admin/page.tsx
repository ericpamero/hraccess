'use client';
import React from "react";
import { Sidebar } from "./components/sidebar";
import Footer from "../components/Footer";

export default function AdminDashboard() {
  // Example stats data
  const stats = [
    { label: "Total Employees", value: 128, icon: "👥", color: "bg-blue-100 text-blue-700" },
    { label: "Active Employees", value: 112, icon: "✅", color: "bg-green-100 text-green-700" },
    { label: "Pending Documents", value: 7, icon: "📄", color: "bg-yellow-100 text-yellow-700" },
    { label: "Verified Documents", value: 245, icon: "✔️", color: "bg-emerald-100 text-emerald-700" },
  ];

  // Example recent activity data
  const recentActivities = [
    { user: "Juan Dela Cruz", action: "Uploaded SSS.pdf", time: "2 mins ago" },
    { user: "Maria Santos", action: "Verified PagIbig.pdf", time: "10 mins ago" },
    { user: "Pedro Reyes", action: "Added new employee", time: "30 mins ago" },
    { user: "Ana Lopez", action: "Updated profile", time: "1 hour ago" },
  ];

  // Example quick links
  const quickLinks = [
    { label: "Manage Employees", href: "/admin/employees" },
    { label: "View Files", href: "/admin/files" },
    { label: "User Logs", href: "/admin/userslog" },
    { label: "Settings", href: "/admin/settings" },
  ];

  return (
    <div className="flex min-h-screen font-sans bg-[#f8f9fa]">
      <Sidebar />
      <div className="flex flex-col flex-1 min-h-screen">
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
              <h1 className="text-3xl font-bold">Welcome, Admin!</h1>
              <div className="flex gap-2">
                {quickLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="px-4 py-2 rounded bg-blue-500 text-white font-medium hover:bg-blue-600 transition"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, idx) => (
                <div
                  key={idx}
                  className={`flex items-center gap-4 p-5 rounded-xl shadow ${stat.color} bg-opacity-60`}
                >
                  <span className="text-3xl">{stat.icon}</span>
                  <div>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div className="text-sm">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Activity & Announcements */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Recent Activity */}
              <div className="md:col-span-2 bg-white rounded-xl shadow p-6">
                <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
                <ul className="divide-y">
                  {recentActivities.map((activity, idx) => (
                    <li key={idx} className="py-3 flex justify-between items-center">
                      <div>
                        <span className="font-medium">{activity.user}</span>{" "}
                        <span className="text-gray-600">{activity.action}</span>
                      </div>
                      <span className="text-xs text-gray-400">{activity.time}</span>
                    </li>
                  ))}
                </ul>
              </div>
              {/* Announcements */}
              <div className="bg-white rounded-xl shadow p-6">
                <h2 className="text-xl font-semibold mb-4">Announcements</h2>
                <ul className="space-y-3 text-sm">
                  <li>
                    <span className="font-medium text-blue-600">[System]</span> New HRIS features launching next week!
                  </li>
                  <li>
                    <span className="font-medium text-green-600">[Reminder]</span> Please verify your uploaded documents.
                  </li>
                  <li>
                    <span className="font-medium text-yellow-600">[Notice]</span> Scheduled maintenance on July 10, 2025.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}