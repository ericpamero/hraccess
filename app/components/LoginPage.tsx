"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Footer from "./Footer";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (res.ok) {
        router.push("/dashboard");
      } else {
        setError(data.message || "Invalid credentials");
      }
    } catch (err) {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen h-screen bg-gradient-to-b from-[#42d392] to-[#35495e]">
      <main className="flex flex-1 items-center justify-center">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-center px-4 md:px-8 max-w-3xl">
          <div className="flex-1 flex flex-col items-center mb-10 md:mb-0 min-w-[550px]">
            <h1 className="text-5xl font-extrabold text-white mb-4 drop-shadow-lg w-full text-center">
              HRIS ACCESS
            </h1>
            <p className="text-xl text-white font-medium drop-shadow-md text-center max-w-md">
              Connect with your team and manage HR tasks efficiently with HRIS
              ACCESS.
            </p>
          </div>
          <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-2xl min-w-[550px]">
            {error && (
              <div className="mb-4 text-sm text-red-600 bg-red-100 px-4 py-2 rounded">
                {error}
              </div>
            )}

            <div className="mb-4">
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1 block w-full px-4 py-3 border rounded-md shadow-sm focus:ring-[#42d392] focus:border-[#42d392] border-gray-300 text-lg"
                placeholder="Username"
                autoComplete="username"
              />
            </div>

            <div className="mb-4">
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-4 py-3 border rounded-md shadow-sm focus:ring-[#42d392] focus:border-[#42d392] border-gray-300 text-lg"
                placeholder="Password"
                autoComplete="current-password"
              />
            </div>

            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full bg-[#42d392] hover:bg-[#35495e] text-white py-3 rounded-md font-bold text-lg transition duration-200 shadow"
            >
              {loading ? "Logging in..." : "Log In"}
            </button>

            <div className="text-center my-4">
              <a
                href="#"
                className="text-[#42b883] hover:underline text-sm font-medium"
              >
                Forgotten password?
              </a>
            </div>

            <hr className="my-4" />

            <button className="w-full bg-[#35495e] hover:bg-[#42d392] text-white py-3 rounded-md font-bold text-lg transition duration-200">
              Create New Account
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
