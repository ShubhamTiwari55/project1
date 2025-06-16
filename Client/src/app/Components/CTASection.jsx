export default function CTASection() {
  return (
    <section id="start" className="px-10 py-16 flex flex-col md:flex-row justify-between items-center" style={{ backgroundColor: '#2b6971' }}>
      <div className="mb-8 md:mb-0 text-white">
        <h2 className="text-3xl font-bold mb-4">Start Your Renting Journey Today</h2>
        <p className="max-w-md">
          Join RentEasy to easily lend and borrow items in your community. Sign up now to unlock a world of convenient rentals at your fingertips!
        </p>
      </div>
      <div className="flex gap-4">
        <a href="/signup" className="bg-white text-[#31373f] px-6 py-3 rounded font-semibold hover:bg-[#f1f1f1]">Sign Up</a>
        <a href="/login" className="border border-white text-white px-6 py-3 rounded hover:bg-white hover:text-[#31373f] transition">Log In</a>
      </div>
    </section>
  );
}
