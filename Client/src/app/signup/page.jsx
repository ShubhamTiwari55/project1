'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('http://localhost:4000/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.message || 'Signup failed');
      localStorage.setItem('token', data.token);
      router.push('/');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleSignup = () => {
    window.location.href = 'http://localhost:5000/api/auth/google'; // adjust as per backend
  };

  const handleAppleSignup = () => {
    window.location.href = 'http://localhost:5000/api/auth/apple'; // adjust as per backend
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#e6ffff] px-6">
      <div className="bg-white shadow-xl rounded-lg px-10 pt-10 pb-8 w-full max-w-md transition duration-300">
        <h2 className="text-3xl font-bold mb-6 text-center text-[#31373f]">Create Your Account</h2>

      

        {error && <p className="text-red-600 mb-4 text-center text-sm">{error}</p>}

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-[#31373f] mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#007b7f] transition"
              placeholder="Your Name  "
            />
          </div>

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
            className="w-full bg-[#31373f] hover:bg-[#1f252c] text-white font-medium py-2 rounded-md transition cursor-pointer"
          >
            Sign Up
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
            onClick={handleGoogleSignup}
            className="flex items-center justify-center gap-2 w-full border border-gray-300 py-2 rounded-md hover:bg-gray-100 transition"
          >
            <img src="/assets/google_logo.png" alt="Google" className="w-5 h-5" />
            <span className="text-sm font-medium text-[#31373f]">Sign up with Google</span>
          </button>

          <button
            type="button"
            onClick={handleAppleSignup}
            className="flex items-center justify-center gap-2 w-full border border-gray-300 py-2 rounded-md hover:bg-gray-100 transition"
          >
            <img src="/assets/OIP.jpeg" alt="Apple" className="w-5 h-5" />
            <span className="text-sm font-medium text-[#31373f]">Sign up with Apple</span>
          </button>
        </div>
        <p className="text-sm text-center mt-5 text-[#31373f]">
          Already have an account?{' '}
          <a href="/login" className="text-[#007b7f] font-medium hover:underline">Log in</a>
        </p>
      </div>
    </div>
  );
}
