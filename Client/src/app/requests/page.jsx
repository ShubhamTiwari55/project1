'use client';

import { useState } from 'react';

export default function RequestsPage() {
  const [requests, setRequests] = useState([
    { id: 1, title: 'Looking for a DSLR Camera', description: 'Need a camera for a weekend shoot.' },
    { id: 2, title: 'Require a Tent', description: 'Going camping for 3 days, need a good quality tent.' },
  ]);

  const [form, setForm] = useState({ title: '', description: '' });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    const newRequest = { ...form, id: requests.length + 1 };
    setRequests([newRequest, ...requests]);
    setForm({ title: '', description: '' });
  };

  return (
    <div className="min-h-screen px-6 py-12 bg-[#e6ffff] text-[#31373f]">
      <h1 className="text-4xl font-bold text-center mb-10">Your Rental Requests</h1>

      <form
        onSubmit={handleSubmit}
        className="max-w-2xl mx-auto bg-white shadow-md rounded p-6 mb-12"
      >
        <h2 className="text-2xl font-semibold mb-4">Create a New Request</h2>

        <div className="mb-4">
          <label className="block text-sm mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm mb-1">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded resize-none"
            rows="4"
          ></textarea>
        </div>

        <button
          type="submit"
          className="bg-[#31373f] text-white px-6 py-2 rounded hover:bg-[#1f252c] transition"
        >
          Add Request
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {requests.map(req => (
          <div key={req.id} className="bg-white shadow rounded p-5">
            <h3 className="text-xl font-bold mb-2">{req.title}</h3>
            <p className="text-sm text-[#4a4a4a]">{req.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
