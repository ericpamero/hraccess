"use client";

import React, { useState, useRef, useEffect } from "react";
import HRNavbar from "./components/Navbar";
import { usePathname } from "next/navigation";
import Footer from "../components/Footer";
 
const HRPage = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const user = {
    name: "Maria Santos",
    role: "hr", // Could be 'admin', 'finance', etc.
  };


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const stats = [
    { label: "Total Employees", value: 128, icon: "👥", color: "bg-gradient-to-tr from-blue-400 to-blue-600 text-white" },
    { label: "Pending Requests", value: 12, icon: "⏳", color: "bg-gradient-to-tr from-yellow-400 to-yellow-600 text-white" },
    { label: "Active Contracts", value: 98, icon: "📄", color: "bg-gradient-to-tr from-green-400 to-green-600 text-white" },
    { label: "Open Positions", value: 5, icon: "📢", color: "bg-gradient-to-tr from-emerald-400 to-emerald-600 text-white" },
  ];

  const activities = [
    { user: "Maria Santos", action: "Approved leave request", time: "10 mins ago" },
    { user: "Pedro Reyes", action: "Added new employee", time: "30 mins ago" },
    { user: "Ana Lopez", action: "Updated contract", time: "1 hour ago" },
    { user: "Juan Dela Cruz", action: "Posted job opening", time: "2 hours ago" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#e0e7ef] via-[#f8fafc] to-[#c7d2fe]">
      {/* Navbar */}
      <HRNavbar />

      {/* Main Content */}
      <main className="flex-1 px-4 md:px-12 py-10">
        <div className="max-w-6xl mx-auto">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className={`flex flex-col items-center justify-center p-7 rounded-2xl shadow-xl ${stat.color} border-b-4 border-white hover:scale-105 transition-transform`}
              >
                <span className="text-4xl mb-2">{stat.icon}</span>
                <div className="text-3xl font-bold">{stat.value}</div>
                <div className="text-base font-medium mt-1">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Activity & Announcements */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Recent Activity */}
            <section className="md:col-span-2 bg-white/90 rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6 text-[#2d334a]">Recent HR Activity</h2>
              <ul className="divide-y">
                {activities.map((activity, idx) => (
                  <li key={idx} className="py-5 flex items-center gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#4ea8de]/10 flex items-center justify-center text-2xl font-bold text-[#4ea8de]">
                      {activity.user.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div>
                      <div className="font-semibold text-[#4ea8de]">{activity.user}</div>
                      <div className="text-gray-700">{activity.action}</div>
                      <div className="text-xs text-gray-400">{activity.time}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            {/* Announcements */}
            <section className="bg-white/90 rounded-2xl shadow-lg p-8 flex flex-col">
              <h2 className="text-2xl font-bold mb-6 text-[#2d334a]">Announcements</h2>
              <ul className="space-y-4 text-base text-[#2d334a]">
                <li className="bg-[#e0f2fe] rounded-lg px-4 py-3 shadow-sm">New HR policies effective next month.</li>
                <li className="bg-[#fef9c3] rounded-lg px-4 py-3 shadow-sm">Team building event scheduled for July 20.</li>
                <li className="bg-[#d1fae5] rounded-lg px-4 py-3 shadow-sm">Submit leave requests before the 15th.</li>
              </ul>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HRPage;
