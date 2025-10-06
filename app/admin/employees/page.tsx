'use client';
import React, { useState } from "react";
import { Sidebar } from "../components/sidebar";
import Footer from "../../components/Footer";

const employees = [
  { name: "Juan Dela Cruz", email: "juan.delacruz@example.com", position: "HR Officer", status: "Active" },
  { name: "Maria Santos", email: "maria.santos@example.com", position: "Payroll Specialist", status: "Active" },
  { name: "Pedro Reyes", email: "pedro.reyes@example.com", position: "Recruiter", status: "Inactive" },
  { name: "Ana Lopez", email: "ana.lopez@example.com", position: "HR Assistant", status: "Active" },
  { name: "Carlos Ramos", email: "carlos.ramos@example.com", position: "HR Manager", status: "Active" },
  { name: "Liza Cruz", email: "liza.cruz@example.com", position: "HR Clerk", status: "Inactive" },
  { name: "Mark Lim", email: "mark.lim@example.com", position: "HR Officer", status: "Active" },
  { name: "Jenny Navarro", email: "jenny.navarro@example.com", position: "Benefits Coordinator", status: "Active" },
  { name: "Samuel Tan", email: "samuel.tan@example.com", position: "HR Analyst", status: "Inactive" },
  { name: "Patricia Gomez", email: "patricia.gomez@example.com", position: "Training Specialist", status: "Active" },
  { name: "Albert Sy", email: "albert.sy@example.com", position: "HR Generalist", status: "Active" },
  { name: "Nina Gutierrez", email: "nina.gutierrez@example.com", position: "Compensation Analyst", status: "Active" },
  { name: "Joel Manalo", email: "joel.manalo@example.com", position: "Recruitment Lead", status: "Inactive" },
  { name: "Karla De Leon", email: "karla.deleon@example.com", position: "HR Intern", status: "Active" },
  { name: "Ronald Pascual", email: "ronald.pascual@example.com", position: "Labor Relations Officer", status: "Active" },
  { name: "Elaine Cheng", email: "elaine.cheng@example.com", position: "HR Business Partner", status: "Active" },
  { name: "Victor Del Rosario", email: "victor.delrosario@example.com", position: "Organizational Development Manager", status: "Inactive" },
  { name: "Frances Lim", email: "frances.lim@example.com", position: "Onboarding Specialist", status: "Active" },
  { name: "Danica Reyes", email: "danica.reyes@example.com", position: "HR Coordinator", status: "Active" },
  { name: "Michael Go", email: "michael.go@example.com", position: "HR Systems Analyst", status: "Inactive" }
];

const ITEMS_PER_PAGE = 10;

const stats = [
  {
    label: "Total Employees",
    value: employees.length,
    icon: "👥",
    color: "bg-blue-100"
  },
  {
    label: "Active",
    value: employees.filter(e => e.status === "Active").length,
    icon: "✅",
    color: "bg-green-100"
  },
  {
    label: "Inactive",
    value: employees.filter(e => e.status === "Inactive").length,
    icon: "❌",
    color: "bg-red-100"
  },
  {
    label: "Positions",
    value: [...new Set(employees.map(e => e.position))].length,
    icon: "🏷️",
    color: "bg-yellow-100"
  }
];

export default function UsersPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newEmployee, setNewEmployee] = useState({
    name: "",
    email: "",
    position: "",
    status: "Active"
  });
  const [employeeList, setEmployeeList] = useState(employees);

  const filtered = employeeList.filter(
    (emp) =>
      emp.name.toLowerCase().includes(search.toLowerCase()) ||
      emp.email.toLowerCase().includes(search.toLowerCase()) ||
      emp.position.toLowerCase().includes(search.toLowerCase()) ||
      emp.status.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  function handleAddEmployee(e: React.FormEvent) {
    e.preventDefault();
    setEmployeeList([{ ...newEmployee }, ...employeeList]);
    setShowAddModal(false);
    setNewEmployee({ name: "", email: "", position: "", status: "Active" });
    setPage(1);
  }

  return (
    <div className="flex min-h-screen font-sans bg-[#f8f9fa]">
      <Sidebar />
      <div className="flex flex-col flex-1 min-h-screen">
        <main className="flex-1 p-8">
          <div className="max-w-6xl mx-auto">
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
            {/* Header and Search */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
              <h1 className="text-3xl font-bold">Employee List</h1>
              <div className="flex gap-2 w-full md:w-auto">
                <input
                  type="text"
                  placeholder="Search employees..."
                  className="border border-gray-300 rounded px-3 py-2 w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1);
                  }}
                />
                <button
                  className="px-4 py-2 rounded bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition"
                  onClick={() => setShowAddModal(true)}
                >
                  + Add Employee
                </button>
              </div>
            </div>
            {/* Table */}
            <div className="overflow-x-auto rounded-xl shadow">
              <table className="min-w-full border rounded-xl overflow-hidden text-sm bg-white">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 text-left">Name</th>
                    <th className="px-4 py-2 text-left">Email</th>
                    <th className="px-4 py-2 text-left">Position</th>
                    <th className="px-4 py-2 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {paginated.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-4 py-6 text-center text-gray-400">
                        No employees found.
                      </td>
                    </tr>
                  ) : (
                    paginated.map((emp, idx) => (
                      <tr key={idx} className="border-t hover:bg-blue-50 transition">
                        <td className="px-4 py-2 font-medium">{emp.name}</td>
                        <td className="px-4 py-2">{emp.email}</td>
                        <td className="px-4 py-2">{emp.position}</td>
                        <td className={`px-4 py-2 font-semibold ${emp.status === "Active" ? "text-green-600" : "text-red-600"}`}>
                          <span className={`inline-block w-2 h-2 rounded-full mr-2 ${emp.status === "Active" ? "bg-green-400" : "bg-red-400"}`}></span>
                          {emp.status}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            {/* Pagination */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-center mt-4 gap-2">
              <span className="text-sm text-gray-500">
                Showing {(page - 1) * ITEMS_PER_PAGE + 1}
                {" - "}
                {Math.min(page * ITEMS_PER_PAGE, filtered.length)}
                {" of "}
                {filtered.length} employees
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
          {/* Add Employee Modal */}
          {showAddModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
              <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md relative">
                <button
                  className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl"
                  onClick={() => setShowAddModal(false)}
                  aria-label="Close"
                >
                  &times;
                </button>
                <h2 className="text-2xl font-bold mb-4 text-[#22223b]">Add New Employee</h2>
                <form onSubmit={handleAddEmployee} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Name</label>
                    <input
                      type="text"
                      className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
                      value={newEmployee.name}
                      onChange={e => setNewEmployee({ ...newEmployee, name: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input
                      type="email"
                      className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
                      value={newEmployee.email}
                      onChange={e => setNewEmployee({ ...newEmployee, email: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Position</label>
                    <input
                      type="text"
                      className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
                      value={newEmployee.position}
                      onChange={e => setNewEmployee({ ...newEmployee, position: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Status</label>
                    <select
                      className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
                      value={newEmployee.status}
                      onChange={e => setNewEmployee({ ...newEmployee, status: e.target.value })}
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
                  >
                    Add Employee
                  </button>
                </form>
              </div>
            </div>
          )}
        </main>
        <Footer />
      </div>
    </div>
  );
}