"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (res.ok) {
      router.push("/tool");
    } else {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-brand-bg flex items-center justify-center p-6 text-white font-sans">
      <div className="max-w-md w-full p-10 rounded-2xl border border-white/10 bg-brand-panel shadow-2xl">
        <div className="text-center mb-10">
          <div className="text-3xl font-bold tracking-tight mb-2">Xuanlabs</div>
          <div className="text-gray-400 text-sm">Precision Engineering Tools</div>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Username</label>
            <input
              type="text"
              className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-sm focus:border-brand-accent outline-none transition"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Password</label>
            <input
              type="password"
              className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-sm focus:border-brand-accent outline-none transition"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <div className="text-red-400 text-xs text-center font-medium bg-red-500/10 py-2 rounded-lg">{error}</div>}

          <button
            type="submit"
            className="w-full py-4 rounded-xl bg-brand-accent text-white font-bold hover:bg-blue-600 transition shadow-lg shadow-blue-500/20"
          >
            Authenticate
          </button>
        </form>

        <div className="mt-8 pt-8 border-t border-white/5 text-center text-[10px] text-gray-500 uppercase tracking-wider">
          Authorized Personnel Only · Confidential Data
        </div>
      </div>
    </div>
  );
}
