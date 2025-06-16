export default function Footer() {
  return (
    <footer className="px-10 py-8 text-white" style={{ backgroundColor: '#31373f' }}>
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
        <div>
          <h3 className="text-xl font-bold mb-2">RentEasy</h3>
          <p className="text-sm max-w-xs">
            Empowering communities through smart and secure item rentals. Discover a better way to share today.
          </p>
        </div>

        <div className="flex gap-8 text-sm">
          <a href="#features" className="hover:underline">Features</a>
          <a href="#how-it-works" className="hover:underline">How It Works</a>
          <a href="#start" className="hover:underline">Get Started</a>
          <a href="/login" className="hover:underline">Login</a>
          <a href="/signup" className="hover:underline">Sign Up</a>
        </div>
      </div>

      <div className="border-t border-[#50575f] mt-6 pt-4 text-sm text-center text-[#cbd5e1]">
        © {new Date().getFullYear()} RentEasy. All rights reserved.
      </div>
    </footer>
  );
}
