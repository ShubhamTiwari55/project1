export default function HeroSection() {
  return (
    <section className="flex flex-col md:flex-row items-center px-10 py-16" style={{ backgroundColor: '#CCF5F5' }}>
      <div className="md:w-1/2 mb-8 md:mb-0">
        <h1 className="text-5xl font-bold mb-6 text-[#31373f]">
          Discover a New Way <br /> to Rent Easily
        </h1>
        <p className="text-base mb-6 leading-relaxed text-[#30363e]">
          RentEasy connects borrowers and lenders in a seamless platform, making it
          easier than ever to find and share items. Experience convenience, trust, and
          community all in one place.
        </p>
        <div className="flex gap-4">
          <a href="#features" className="bg-[#31373f] text-white px-6 py-3 rounded hover:bg-[#30363e]">Get Started</a>
          <a href="#how-it-works" className="border border-[#31373f] px-6 py-3 rounded text-[#31373f] hover:bg-[#31373f] hover:text-white">Learn More</a>
        </div>
      </div>
      <div className="md:w-1/2 flex justify-center">
         <img
          src="/assets/rent-hero.jpg"
          alt="People renting and lending items"
          className="w-[500px] h-[300px] object-cover rounded"
        />
      </div>
    </section>
  );
}
