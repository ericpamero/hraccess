'use client';

import React, { useState, useMemo } from 'react';
import HRNavbar from '../components/Navbar';
import Footer from '../../components/Footer';

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

const EmployeeTablePage = () => {
  const [query, setQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const filteredEmployees = useMemo(() => {
    return employees.filter(e =>
      e.name.toLowerCase().includes(query.toLowerCase()) ||
      e.email.toLowerCase().includes(query.toLowerCase()) ||
      e.position.toLowerCase().includes(query.toLowerCase()) ||
      e.status.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredEmployees.slice(start, start + pageSize);
  }, [currentPage, filteredEmployees]);

  const totalPages = Math.ceil(filteredEmployees.length / pageSize);

  return (
    <div className="min-h-screen flex flex-col bg-[#f4f6f8]">
      <HRNavbar />

      <main className="flex-1 px-4 md:px-12 py-10">
        <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
            <h1 className="text-2xl font-bold text-[#2d334a]">Employee Directory</h1>
            <input
              type="text"
              placeholder="Search employees..."
              className="w-full md:w-1/3 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-[#42d392] focus:border-[#42d392]"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Name</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Email</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Position</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {paginatedData.map((emp, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{emp.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{emp.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{emp.position}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${emp.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {emp.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-6">
            <span className="text-sm text-gray-600">
              Page {currentPage} of {totalPages}
            </span>
            <div className="space-x-2">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
                className="px-4 py-2 text-sm bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
              >
                Previous
              </button>
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => prev + 1)}
                className="px-4 py-2 text-sm bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default EmployeeTablePage;
