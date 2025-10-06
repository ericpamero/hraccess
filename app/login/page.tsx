'use client';

import { useState } from 'react';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setMessage('');

    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    if (data.success) {
      setMessage(`Welcome, ${data.users.Username}!`);
    } else {
      setMessage(data.message || 'Login failed.');
    }
  }

  return (
<div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-emerald-50 to-emerald-100">
  <form
    onSubmit={handleLogin}
    className="flex flex-col gap-4 px-10 py-8 border border-gray-200 rounded-2xl bg-white shadow-lg w-full max-w-md transition-all duration-300 hover:shadow-xl"
  >
    {/* Header */}
    <p className="text-4xl font-bold font-serif text-center text-emerald-700 tracking-wide">
      HR ACCESS
    </p>

    <h1 className="text-lg font-semibold text-gray-700 text-center pt-3">
      Log in to your account
    </h1>

    {/* Username */}
    <div className="flex flex-col">
      <label className="text-gray-600 text-sm font-medium pb-1">Username</label>
      <input
        type="text"
        placeholder="Enter your username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 rounded-lg p-2 text-sm transition-all duration-200"
      />
    </div>

    {/* Password */}
    <div className="flex flex-col">
      <label className="text-gray-600 text-sm font-medium pb-1">Password</label>
      <input
        type="password"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 rounded-lg p-2 text-sm transition-all duration-200"
      />
    </div>

    {/* Keep Me Logged In */}
    <div className="flex items-center justify-between pt-2">
      <label className="flex items-center gap-2 text-sm text-gray-700">
        <input
          type="checkbox"
        //   checked={keepLoggedIn}
        //   onChange={(e) => setKeepLoggedIn(e.target.checked)}
          className="accent-emerald-600 w-4 h-4"
        />
        Keep me logged in
      </label>

      <a href="#" className="text-emerald-600 text-sm hover:underline">
        Forgot password?
      </a>
    </div>

    {/* Login Button */}
    <button
      type="submit"
      className="bg-emerald-600 text-white font-medium py-2 rounded-lg mt-4 hover:bg-emerald-700 transition-colors duration-200 shadow-sm hover:shadow-md"
    >
      Sign In
    </button>

    {/* Message */}
    {message && (
      <p
        className={`mt-3 text-center text-sm ${
          message.includes("success") ? "text-emerald-600" : "text-red-500"
        }`}
      >
        {message}
      </p>
    )}
  </form>

  {/* Footer */}
  <p className="text-gray-500 text-xs mt-6">
    © {new Date().getFullYear()} HR Access. All rights reserved.
  </p>
</div>

  );
}
