'use client';

import React, { useState, useEffect, useRef } from 'react';
import Footer from '../components/Footer';

interface FileRecord {
  name: string;
  type: 'PDF' | 'Image';
  date: string;
  status: 'Verified' | 'Pending';
}

interface EmployeeSidebarProps {
  contentHeight?: number;
}

const ITEMS_PER_PAGE = 5;

const filesData: FileRecord[] = [
  { name: 'SSS.pdf', type: 'PDF', date: '2025-07-02', status: 'Verified' },
  { name: 'PhilHealth.jpg', type: 'Image', date: '2025-07-01', status: 'Pending' },
  { name: 'PagIbig.pdf', type: 'PDF', date: '2025-06-30', status: 'Verified' },
  { name: 'TIN.jpg', type: 'Image', date: '2025-06-29', status: 'Pending' },
  { name: 'Passport.pdf', type: 'PDF', date: '2025-06-28', status: 'Verified' },
  { name: 'NBI.pdf', type: 'PDF', date: '2025-06-27', status: 'Verified' },
  { name: 'BarangayClearance.jpg', type: 'Image', date: '2025-06-26', status: 'Pending' },
];

export default function MyDocumentsPage() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState<number | undefined>(undefined);

  const filteredFiles = filesData.filter(file =>
    file.name.toLowerCase().includes(search.toLowerCase()) ||
    file.type.toLowerCase().includes(search.toLowerCase()) ||
    file.status.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredFiles.length / ITEMS_PER_PAGE);
  const paginatedFiles = filteredFiles.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  useEffect(() => {
    if ((page - 1) * ITEMS_PER_PAGE >= filteredFiles.length) {
      setPage(1);
    }
  }, [search, filteredFiles.length]);

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.offsetHeight);
    }
  }, [paginatedFiles.length, search, page]);

  const employee = {
    name: 'Juan Dela Cruz',
    position: 'HR Officer',
    department: 'Human Resources',
    employeeId: 'EMP-00123',
    email: 'juan.delacruz@moresco2.com',
    contact: '+63 912 345 6789',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#42d392] to-[#35495e]">
      {/* NavBar */}
      <nav className="w-full bg-white/90 shadow flex items-center justify-between px-8 py-4 mb-2">
        <div className="text-2xl font-extrabold text-[#35495e] tracking-wide">HRIS ACCESS</div>
        <ul className="flex gap-6 text-[#35495e] font-medium">
          {[
            { label: 'Dashboard', path: '/dashboard' },
            { label: 'My Documents', path: '/mydocuments' },
            { label: 'Profile', path: '/profile' },
            { label: 'Logout', path: '/logout' },
          ].map(({ label, path }) => (
            <li key={label}>
              <a href={path} className="hover:text-[#42d392] transition">{label}</a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Main Content */}
      <main className="flex-1 flex flex-col md:flex-row items-start justify-center gap-4 sm:m-4 px-2 md:px-0">
        {/* Sidebar */}
        <aside
          className="bg-white/95 rounded-xl shadow-lg p-6 w-full md:w-72 mb-6 md:mb-0 flex-shrink-0 flex flex-col items-center"
          style={contentHeight ? { minHeight: contentHeight } : {}}
        >
          <div className="flex flex-col items-center">
            <img
              src={employee.avatar}
              alt={employee.name}
              className="w-28 h-28 rounded-full mb-4 border-4 border-[#42d392] shadow object-cover"
            />
            <h3 className="text-xl font-bold text-[#35495e] mb-1">{employee.name}</h3>
            <div className="text-[#42b883] font-medium mb-2">{employee.position}</div>
            <div className="text-sm text-gray-500 mb-4">{employee.department}</div>
          </div>
          <div className="border-t pt-4 mt-4 space-y-2 text-sm w-full">
            <div><strong className="text-[#35495e]">Employee ID:</strong> {employee.employeeId}</div>
            <div><strong className="text-[#35495e]">Email:</strong> {employee.email}</div>
            <div><strong className="text-[#35495e]">Contact:</strong> {employee.contact}</div>
          </div>
          <nav className="mt-6 w-full">
            <ul className="space-y-2">
              {[
                { label: 'Profile', path: '/profile' },
                { label: 'My Documents', path: '/mydocuments' },
                { label: 'Settings', path: '/settings' },
              ].map(({ label, path }) => (
                <li key={label}>
                  <a href={path} className="block px-3 py-2 rounded hover:bg-[#42d392]/10 text-[#35495e] font-medium transition">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Documents Table */}
        <div ref={contentRef} className="w-full max-w-4xl bg-white/95 rounded-xl p-8 flex flex-col mb-6 md:mb-0">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-2">
            <h2 className="text-2xl font-bold text-[#35495e]">My Uploaded Documents</h2>
            <input
              type="text"
              value={search}
              onChange={e => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Search documents..."
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#42d392] focus:border-[#42d392] w-full md:w-72"
            />
          </div>

          <div className="overflow-x-auto">
  <table className="min-w-full text-sm border-collapse rounded-xl overflow-hidden shadow-md">
    <thead className="bg-gray-50 text-[#35495e] uppercase tracking-wider text-xs font-semibold border-b">
      <tr>
        <th className="px-6 py-3 text-left">File Name</th>
        <th className="px-6 py-3">Type</th>
        <th className="px-6 py-3">Uploaded</th>
        <th className="px-6 py-3">Status</th>
        <th className="px-6 py-3">Action</th>
      </tr>
    </thead>
    <tbody className="divide-y divide-gray-200">
      {paginatedFiles.length > 0 ? (
        paginatedFiles.map((file, index) => (
          <tr
            key={index}
            className="hover:bg-[#42d392]/10 transition-colors duration-150"
          >
            <td className="px-6 py-3 font-medium text-[#35495e]">{file.name}</td>
            <td className="px-6 py-3 text-center">{file.type}</td>
            <td className="px-6 py-3 text-center">{file.date}</td>
            <td className="px-6 py-3 text-center">
              <span
                className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
                  file.status === 'Verified'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-yellow-100 text-yellow-700'
                }`}
              >
                {file.status}
              </span>
            </td>
            <td className="px-6 py-3 text-center">
              <button
                type="button"
                className="text-[#42b883] hover:underline font-medium transition"
              >
                Download
              </button>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td
            colSpan={5}
            className="px-6 py-6 text-center text-gray-400 italic"
          >
            No documents found.
          </td>
        </tr>
      )}
    </tbody>
  </table>
</div>


          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-6">
              <button
                onClick={() => setPage(prev => prev - 1)}
                disabled={page === 1}
                className="px-3 py-1 rounded bg-gray-200 text-gray-600 hover:bg-gray-300 disabled:opacity-50"
              >
                Prev
              </button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setPage(i + 1)}
                  className={`px-3 py-1 rounded ${page === i + 1 ? 'bg-[#42d392] text-white' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'}`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => setPage(prev => prev + 1)}
                disabled={page === totalPages}
                className="px-3 py-1 rounded bg-gray-200 text-gray-600 hover:bg-gray-300 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </main>
      {/* Footer */}
      <Footer />
    </div>
  );
}
