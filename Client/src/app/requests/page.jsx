'use client';

import { useState, useEffect } from 'react';
import { PencilIcon, TrashIcon, CalendarIcon, MapPinIcon } from '@heroicons/react/24/outline';

export default function RequestsPage() {
  const [requests, setRequests] = useState([]);
  const [form, setForm] = useState({
    itemName: '',
    itemCategory: '',
    rentalStart: '',
    rentalEnd: '',
    location: '',
    notes: '',
  });

  const [loading, setLoading] = useState(false);
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  const fetchRequests = async () => {
    if (!token) return;
    try {
      const res = await fetch('http://localhost:4000/api/req/requests/borrower', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setRequests(data?.requests || []);
    } catch (err) {
      console.error('Error fetching requests:', err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('http://localhost:4000/api/req/requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Failed to create request');
      setForm({
        itemName: '',
        itemCategory: '',
        rentalStart: '',
        rentalEnd: '',
        location: '',
        notes: '',
      });
      await fetchRequests();
    } catch (err) {
      alert('Failed to create request');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (requestId) => {
    if (!confirm('Are you sure you want to cancel this request?')) return;
    try {
      await fetch(`http://localhost:4000/api/req/requests/${requestId}/cancel`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      await fetchRequests();
    } catch (err) {
      alert('Failed to cancel request');
    }
  };

  return (
    <div className="px-6 py-8 bg-[#f8fafa] min-h-screen">
      <h1 className="text-2xl font-semibold mb-6 text-[#31373f]">📦 Create a New Rental Request</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-sm border border-gray-200 rounded-xl p-6 grid md:grid-cols-2 gap-4"
      >
        <input
          type="text"
          name="itemName"
          value={form.itemName}
          onChange={handleChange}
          placeholder="Item Name"
          className="border p-3 rounded-lg text-sm"
          required
        />
        <input
          type="text"
          name="itemCategory"
          value={form.itemCategory}
          onChange={handleChange}
          placeholder="Category"
          className="border p-3 rounded-lg text-sm"
          required
        />
        <input
          type="date"
          name="rentalStart"
          value={form.rentalStart}
          onChange={handleChange}
          className="border p-3 rounded-lg text-sm"
          required
        />
        <input
          type="date"
          name="rentalEnd"
          value={form.rentalEnd}
          onChange={handleChange}
          className="border p-3 rounded-lg text-sm"
          required
        />
        <input
          type="text"
          name="location"
          value={form.location}
          onChange={handleChange}
          placeholder="Location"
          className="border p-3 rounded-lg text-sm col-span-2"
          required
        />
        <textarea
          name="notes"
          value={form.notes}
          onChange={handleChange}
          placeholder="Additional notes"
          className="border p-3 rounded-lg text-sm col-span-2"
        />
        <button
          type="submit"
          className="col-span-2 bg-[#31373f] text-white py-2 rounded-lg hover:bg-[#1f252c] transition"
          disabled={loading}
        >
          {loading ? 'Submitting...' : 'Submit Request'}
        </button>
      </form>

      <h2 className="text-xl font-semibold mt-10 mb-4 text-[#31373f]">🗃️ Existing Requests</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {requests.map((req, idx) => (
          <div
            key={req._id}
            className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition"
          >
            <img
              src={`https://source.unsplash.com/400x200/?${req.itemCategory || 'item'},${idx}`}
              alt="Item"
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-[#31373f]">{req.itemName}</h3>
              <p className="text-sm text-[#007b7f] mb-2">Status: {req.status || 'Pending'}</p>
              <div className="text-sm text-gray-600 flex items-center gap-2 mb-1">
                <CalendarIcon className="w-4 h-4" />
                {req.rentalStart} ➜ {req.rentalEnd}
              </div>
              <div className="text-sm text-gray-600 flex items-center gap-2 mb-2">
                <MapPinIcon className="w-4 h-4" />
                {req.location}
              </div>
              <div className="flex justify-between items-center mt-4">
                <button
                  className="flex items-center gap-1 px-3 py-1 text-sm bg-[#8b90c2] text-white rounded hover:bg-[#6d72b5] transition"
                  onClick={() => alert('Edit feature coming soon')}
                >
                  <PencilIcon className="w-4 h-4" />
                  Edit
                </button>
                <button
                  className="flex items-center gap-1 px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition"
                  onClick={() => handleDelete(req._id)}
                >
                  <TrashIcon className="w-4 h-4" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
