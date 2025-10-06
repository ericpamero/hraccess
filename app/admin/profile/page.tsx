'use client';
import React, { useState } from "react";
import { Sidebar } from "../components/sidebar";
import Footer from "../../components/Footer";

export default function ProfilePage() {
  // Example profile data
  const [profile, setProfile] = useState({
    name: "Juan Dela Cruz",
    position: "HR Manager",
    email: "juan.delacruz@email.com",
    phone: "+63 912 345 6789",
    department: "Human Resources",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    joined: "January 15, 2022",
    status: "Active",
  });

  // Example activity
  const activities = [
    { action: "Updated profile information", time: "2 mins ago" },
    { action: "Changed password", time: "1 day ago" },
    { action: "Uploaded PhilHealth.pdf", time: "3 days ago" },
    { action: "Verified SSS.pdf", time: "1 week ago" },
  ];

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Edit profile state
  const [editProfile, setEditProfile] = useState(profile);
  const [editSuccess, setEditSuccess] = useState("");
  const [editError, setEditError] = useState("");

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!oldPassword || !newPassword || !confirmPassword) {
      setError("All fields are required.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("New passwords do not match.");
      return;
    }
    // Simulate success
    setSuccess("Password changed successfully!");
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setTimeout(() => setShowModal(false), 1200);
  };

  const handleEditProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setEditError("");
    setEditSuccess("");
    // Simple validation
    if (
      !editProfile.name ||
      !editProfile.position ||
      !editProfile.email ||
      !editProfile.phone ||
      !editProfile.department
    ) {
      setEditError("All fields are required.");
      return;
    }
    setProfile(editProfile);
    setEditSuccess("Profile updated successfully!");
    setTimeout(() => {
      setShowEditModal(false);
      setEditSuccess("");
    }, 1200);
  };

  return (
    <div className="flex min-h-screen font-sans bg-gradient-to-br from-[#f8fafc] via-[#e0e7ef] to-[#c7d2fe]">
      <Sidebar />
      <div className="flex flex-col flex-1 min-h-screen">
        <main className="flex-1 p-8">
          <div className="max-w-5xl mx-auto">
            {/* Profile Header */}
            <div className="flex flex-col md:flex-row items-center md:items-end gap-8 mb-10">
              <div className="relative">
                <img
                  src={profile.avatar}
                  alt="Profile"
                  className="w-36 h-36 rounded-full border-4 border-white shadow-lg object-cover"
                />
                <span className="absolute bottom-2 right-2 bg-emerald-500 border-2 border-white rounded-full w-5 h-5 flex items-center justify-center">
                  <span className="block w-3 h-3 bg-white rounded-full"></span>
                </span>
              </div>
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-[#22223b] mb-1">{profile.name}</h1>
                <div className="flex flex-wrap gap-3 items-center text-lg text-[#4ea8de] font-medium mb-2">
                  <span>{profile.position}</span>
                  <span className="text-gray-400">|</span>
                  <span>{profile.department}</span>
                  <span className="text-gray-400">|</span>
                  <span className="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded text-xs font-semibold">{profile.status}</span>
                </div>
                <div className="flex flex-wrap gap-6 text-gray-600">
                  <span>
                    <strong>Email:</strong> {profile.email}
                  </span>
                  <span>
                    <strong>Phone:</strong> {profile.phone}
                  </span>
                  <span>
                    <strong>Joined:</strong> {profile.joined}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  className="px-5 py-2 rounded-lg bg-[#4ea8de] text-white font-semibold shadow hover:bg-[#2779bd] transition"
                  onClick={() => {
                    setEditProfile(profile);
                    setShowEditModal(true);
                  }}
                >
                  Edit Profile
                </button>
                <button
                  className="px-5 py-2 rounded-lg bg-white border border-[#4ea8de] text-[#4ea8de] font-semibold shadow hover:bg-[#e0f2fe] transition"
                  onClick={() => setShowModal(true)}
                >
                  Change Password
                </button>
              </div>
            </div>

            {/* Profile Details & Activity */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Profile Details */}
              <div className="md:col-span-2 bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-xl font-semibold mb-6 text-[#22223b]">Profile Details</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <div className="text-gray-500 text-sm">Full Name</div>
                    <div className="font-medium text-lg">{profile.name}</div>
                  </div>
                  <div>
                    <div className="text-gray-500 text-sm">Position</div>
                    <div className="font-medium text-lg">{profile.position}</div>
                  </div>
                  <div>
                    <div className="text-gray-500 text-sm">Department</div>
                    <div className="font-medium text-lg">{profile.department}</div>
                  </div>
                  <div>
                    <div className="text-gray-500 text-sm">Status</div>
                    <div className="font-medium text-lg">
                      <span className="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded text-xs font-semibold">{profile.status}</span>
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-500 text-sm">Email</div>
                    <div className="font-medium text-lg">{profile.email}</div>
                  </div>
                  <div>
                    <div className="text-gray-500 text-sm">Phone</div>
                    <div className="font-medium text-lg">{profile.phone}</div>
                  </div>
                  <div>
                    <div className="text-gray-500 text-sm">Date Joined</div>
                    <div className="font-medium text-lg">{profile.joined}</div>
                  </div>
                </div>
              </div>
              {/* Recent Activity */}
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-xl font-semibold mb-6 text-[#22223b]">Recent Activity</h2>
                <ul className="divide-y">
                  {activities.map((activity, idx) => (
                    <li key={idx} className="py-4 flex flex-col">
                      <span className="text-gray-700">{activity.action}</span>
                      <span className="text-xs text-gray-400">{activity.time}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>

      {/* Change Password Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 relative animate-fade-in">
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-[#4ea8de] text-2xl"
              onClick={() => setShowModal(false)}
              aria-label="Close"
            >
              &times;
            </button>
            <h3 className="text-2xl font-bold mb-2 text-[#22223b]">Change Password</h3>
            <p className="mb-6 text-gray-500 text-sm">For your security, please enter your old password and choose a new one.</p>
            <form onSubmit={handleChangePassword} className="space-y-5">
              <div>
                <label className="block text-gray-600 mb-1 font-medium">Old Password</label>
                <input
                  type="password"
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-[#4ea8de] focus:ring-2 focus:ring-[#4ea8de]/20 outline-none transition"
                  value={oldPassword}
                  onChange={e => setOldPassword(e.target.value)}
                  autoFocus
                  required
                />
              </div>
              <div>
                <label className="block text-gray-600 mb-1 font-medium">New Password</label>
                <input
                  type="password"
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-[#4ea8de] focus:ring-2 focus:ring-[#4ea8de]/20 outline-none transition"
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-600 mb-1 font-medium">Confirm New Password</label>
                <input
                  type="password"
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-[#4ea8de] focus:ring-2 focus:ring-[#4ea8de]/20 outline-none transition"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              {error && <div className="text-red-500 text-sm">{error}</div>}
              {success && <div className="text-emerald-600 text-sm">{success}</div>}
              <button
                type="submit"
                className="w-full py-2 rounded-lg bg-[#4ea8de] text-white font-semibold shadow hover:bg-[#2779bd] transition text-lg mt-2"
              >
                Change Password
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Edit Profile Modal */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-8 relative animate-fade-in">
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-[#4ea8de] text-2xl"
              onClick={() => setShowEditModal(false)}
              aria-label="Close"
            >
              &times;
            </button>
            <h3 className="text-2xl font-bold mb-2 text-[#22223b]">Edit Profile</h3>
            <p className="mb-6 text-gray-500 text-sm">Update your profile information below.</p>
            <form onSubmit={handleEditProfile} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-600 mb-1 font-medium">Full Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-[#4ea8de] focus:ring-2 focus:ring-[#4ea8de]/20 outline-none transition"
                    value={editProfile.name}
                    onChange={e => setEditProfile({ ...editProfile, name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-600 mb-1 font-medium">Position</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-[#4ea8de] focus:ring-2 focus:ring-[#4ea8de]/20 outline-none transition"
                    value={editProfile.position}
                    onChange={e => setEditProfile({ ...editProfile, position: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-600 mb-1 font-medium">Department</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-[#4ea8de] focus:ring-2 focus:ring-[#4ea8de]/20 outline-none transition"
                    value={editProfile.department}
                    onChange={e => setEditProfile({ ...editProfile, department: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-600 mb-1 font-medium">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-[#4ea8de] focus:ring-2 focus:ring-[#4ea8de]/20 outline-none transition"
                    value={editProfile.email}
                    onChange={e => setEditProfile({ ...editProfile, email: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-600 mb-1 font-medium">Phone</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-[#4ea8de] focus:ring-2 focus:ring-[#4ea8de]/20 outline-none transition"
                    value={editProfile.phone}
                    onChange={e => setEditProfile({ ...editProfile, phone: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-600 mb-1 font-medium">Avatar URL</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-[#4ea8de] focus:ring-2 focus:ring-[#4ea8de]/20 outline-none transition"
                    value={editProfile.avatar}
                    onChange={e => setEditProfile({ ...editProfile, avatar: e.target.value })}
                  />
                </div>
              </div>
              {editError && <div className="text-red-500 text-sm">{editError}</div>}
              {editSuccess && <div className="text-emerald-600 text-sm">{editSuccess}</div>}
              <button
                type="submit"
                className="w-full py-2 rounded-lg bg-[#4ea8de] text-white font-semibold shadow hover:bg-[#2779bd] transition text-lg mt-2"
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
