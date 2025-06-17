'use client';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    window.location.href = '/login'; // Or use router.push('/login') if you prefer
  };

  return (
    <nav className="flex justify-between items-center px-6 py-4 sticky top-0 z-50 shadow-md" style={{ backgroundColor: '#a0d9dc' }}>
      <div className="text-2xl font-bold text-[#31373f]">RentEasy</div>

      <ul className="hidden md:flex gap-6 items-center text-sm font-medium text-[#31373f]">
        <li className="cursor-pointer hover:text-[#2b6971] transition">Home</li>
        <li><a href="/requests" className="hover:text-[#2b6971] transition">Requests</a></li>
        <li className="cursor-pointer hover:text-[#2b6971] transition">Chat Now</li>
        <li className="cursor-pointer hover:text-[#2b6971] transition">Profile ▾</li>
        {!isLoggedIn ? (
          <>
            <li>
              <a href="/signup" className="px-4 py-2 border border-[#31373f] rounded hover:bg-[#31373f] hover:text-white transition">Sign Up</a>
            </li>
            <li>
              <a href="/login" className="px-4 py-2 bg-[#31373f] text-white rounded hover:bg-[#30363e] transition">Login</a>
            </li>
          </>
        ) : (
          <li>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
            >
              Logout
            </button>
          </li>
        )}
      </ul>

      {/* Mobile menu */}
      <div className="md:hidden">
        <button onClick={toggleMenu}>
          <svg className="w-6 h-6 text-[#31373f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {isOpen && (
        <ul className="absolute top-16 left-0 w-full bg-[#a0d9dc] shadow-md flex flex-col items-center gap-4 py-6 md:hidden text-[#31373f]">
          <li onClick={toggleMenu} className="cursor-pointer hover:text-[#2b6971] transition">Home</li>
          <li onClick={toggleMenu} className="cursor-pointer hover:text-[#2b6971] transition">Requests</li>
          <li onClick={toggleMenu} className="cursor-pointer hover:text-[#2b6971] transition">Chat Now</li>
          <li onClick={toggleMenu} className="cursor-pointer hover:text-[#2b6971] transition">Profile ▾</li>
          {!isLoggedIn ? (
            <>
              <li>
                <a href="/signup" className="px-4 py-2 border border-[#31373f] rounded hover:bg-[#31373f] hover:text-white block" onClick={toggleMenu}>Sign Up</a>
              </li>
              <li>
                <a href="/login" className="px-4 py-2 bg-[#31373f] text-white rounded hover:bg-[#30363e] block" onClick={toggleMenu}>Login</a>
              </li>
            </>
          ) : (
            <li>
              <button
                onClick={() => {
                  handleLogout();
                  toggleMenu();
                }}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
              >
                Logout
              </button>
            </li>
          )}
        </ul>
      )}
    </nav>
  );
}
