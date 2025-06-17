'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.message || 'Login failed');
      localStorage.setItem('token', data.token);
      router.push('/');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:5000/api/auth/google'; // adjust this URL to your backend
  };

  const handleAppleLogin = () => {
    window.location.href = 'http://localhost:5000/api/auth/apple'; // adjust this URL to your backend
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#e6ffff] px-6">
      <div className="bg-white shadow-xl rounded-lg px-10 pt-10 pb-8 w-full max-w-md transition duration-300">
        <h2 className="text-3xl font-bold mb-6 text-center text-[#31373f]">Welcome Back</h2>

        {/* Error message */}
        {error && <p className="text-red-600 mb-4 text-center text-sm">{error}</p>}

        {/* Email Login Form */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-[#31373f] mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#007b7f] transition"
              placeholder="you@example.com"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-[#31373f] mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#007b7f] transition"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#31373f] hover:bg-[#1f252c] text-white font-medium py-2 rounded-md transition"
          >
            Log In
          </button>
        </form>
           {/* Divider */}
        <div className="flex items-center mb-6 mt-4">
          <hr className="flex-grow border-t border-gray-300" />
          <span className="px-3 text-sm text-gray-500">or</span>
          <hr className="flex-grow border-t border-gray-300" />
        </div>

         {/* OAuth Buttons */}
        <div className="flex flex-col gap-4 mb-6">
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="flex items-center justify-center gap-2 w-full border border-gray-300 py-2 rounded-md hover:bg-gray-100 transition"
          >
            <img src="/assets/google_logo.png" alt="Google" className="w-5 h-5" />
            <span className="text-sm font-medium text-[#31373f]">Continue with Google</span>
          </button>

          <button
            type="button"
            onClick={handleAppleLogin}
            className="flex items-center justify-center gap-2 w-full border border-gray-300 py-2 rounded-md hover:bg-gray-100 transition"
          >
            <img src="/assets/OIP.jpeg" alt="Apple" className="w-5 h-5" />
            <span className="text-sm font-medium text-[#31373f]">Continue with Apple</span>
          </button>
        </div>

        <p className="text-sm text-center mt-5 text-[#31373f]">
          Don’t have an account?{' '}
          <a href="/signup" className="text-[#007b7f] font-medium hover:underline">Sign up</a>
        </p>
      </div>
    </div>
  );
}
