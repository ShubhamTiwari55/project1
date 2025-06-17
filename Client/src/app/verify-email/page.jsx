'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get('token');
  const [status, setStatus] = useState('Verifying...');

  useEffect(() => {
    if (!token) {
      setStatus('Invalid or missing token.');
      return;
    }

    const verify = async () => {
      try {
        const res = await fetch('http://localhost:4000/api/auth/verify-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token }),
        });

        if (!res.ok) throw new Error('Verification failed');

        setStatus('✅ Email verified successfully!');
        setTimeout(() => router.push('/login'), 2000);
      } catch (error) {
        setStatus('❌ Email verification failed.');
      }
    };

    verify();
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#e6ffff] px-6">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-full max-w-md text-center">
        <h2 className="text-2xl font-bold mb-4 text-[#31373f]">Email Verification</h2>
        <p className="text-lg">{status}</p>
      </div>
    </div>
  );
}
