'use client';

import React, { useState } from 'react';
import HRNavbar from '../components/Navbar';
import Footer from '../../components/Footer';

const HRAboutPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState({
    name: 'Maria Santos',
    position: 'HR Manager',
    email: 'maria.santos@hrisaccess.com',
    contact: '+63 912 345 6789',
    department: 'Human Resources',
    employeeId: 'EMP-10293',
    address: 'Cagayan de Oro City, Philippines',
    birthdate: '1990-05-15',
    sss: '34-1234567-8',
    philhealth: '12-345678912-3',
    pagibig: '1234-5678-9123',
    tin: '123-456-789-000',
    avatar: 'https://i.pravatar.cc/300?img=47',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowModal(false);
    // In production, call API to update profile
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f0f2f5]">
      <HRNavbar />

      <main className="flex-1 px-4 md:px-12 py-10">
        <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-md">
          {/* Profile Header */}
          <div className="flex flex-col md:flex-row items-center gap-6 px-8 py-10 border-b">
            <img
              src={user.avatar}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-4 border-white shadow"
            />
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-[#2d334a]">{user.name}</h1>
              <p className="text-gray-600">{user.position}</p>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="bg-[#42d392] hover:bg-[#35495e] text-white px-4 py-2 rounded-lg font-semibold"
            >
              Edit Profile
            </button>
          </div>

          {/* Sections */}
          <div className="px-8 py-8 space-y-8">
            <Section title="Contact Information">
              <Info label="Email" value={user.email} />
              <Info label="Contact Number" value={user.contact} />
              <Info label="Address" value={user.address} />
            </Section>
            <Section title="Employment Information">
              <Info label="Employee ID" value={user.employeeId} />
              <Info label="Position" value={user.position} />
              <Info label="Department" value={user.department} />
            </Section>
            <Section title="Government IDs">
              <Info label="SSS Number" value={user.sss} />
              <Info label="PhilHealth Number" value={user.philhealth} />
              <Info label="Pag-IBIG Number" value={user.pagibig} />
              <Info label="TIN" value={user.tin} />
            </Section>
            <Section title="Personal Details">
              <Info label="Full Name" value={user.name} />
              <Info label="Birthdate" value={user.birthdate} />
            </Section>
          </div>
        </div>
      </main>

      {showModal && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-5xl shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Edit Profile</h3>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input name="name" label="Full Name" value={user.name} onChange={handleChange} />
              <Input name="position" label="Position" value={user.position} onChange={handleChange} />
              <Input name="email" label="Email" value={user.email} onChange={handleChange} />
              <Input name="contact" label="Contact Number" value={user.contact} onChange={handleChange} />
              <Input name="department" label="Department" value={user.department} onChange={handleChange} />
              <Input name="employeeId" label="Employee ID" value={user.employeeId} onChange={handleChange} />
              <Input name="address" label="Address" value={user.address} onChange={handleChange} />
              <Input name="birthdate" label="Birthdate" type="date" value={user.birthdate} onChange={handleChange} />
              <Input name="sss" label="SSS Number" value={user.sss} onChange={handleChange} />
              <Input name="philhealth" label="PhilHealth Number" value={user.philhealth} onChange={handleChange} />
              <Input name="pagibig" label="Pag-IBIG Number" value={user.pagibig} onChange={handleChange} />
              <Input name="tin" label="TIN" value={user.tin} onChange={handleChange} />
              <div className="col-span-2 flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#42d392] text-white rounded-md hover:bg-[#35495e]"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

const Section = ({ title, children }) => (
  <section>
    <h2 className="text-xl font-semibold text-[#35495e] mb-4">{title}</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">{children}</div>
  </section>
);

const Info = ({ label, value }) => (
  <div>
    <label className="text-sm text-gray-500">{label}</label>
    <div className="text-base font-medium text-[#2d334a]">{value}</div>
  </div>
);

const Input = ({ label, name, value, onChange, type = 'text' }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <input
      type={type}
      name={name}
      id={name}
      value={value}
      onChange={onChange}
      className="block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:ring-[#42d392] focus:border-[#42d392]"
    />
  </div>
);

export default HRAboutPage;