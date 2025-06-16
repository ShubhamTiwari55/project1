export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="px-10 py-16" style={{ backgroundColor: '#ccffff' }}>
      <h2 className="text-3xl font-bold text-center mb-10 text-[#31373f]">How It Works</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        {[
          {
            step: '1',
            title: 'Sign Up',
            desc: 'Create your free account to start exploring available items or listing your own.'
          },
          {
            step: '2',
            title: 'Request or List',
            desc: 'Browse items listed by others or upload what you want to lend to the community.'
          },
          {
            step: '3',
            title: 'Connect & Rent',
            desc: 'Use chat to finalize rental details, and enjoy the ease of item exchange.'
          },
        ].map(({ step, title, desc }) => (
          <div key={step} className="bg-[#2b6971] p-6 rounded shadow">
            <div className="w-12 h-12 mx-auto bg-[#ffffff] text-[#2b6971] rounded-full flex items-center justify-center text-lg font-bold mb-4">
              {step}
            </div>
            <h3 className="text-xl font-semibold text-[#ffffff] mb-2">{title}</h3>
            <p className="text-sm text-[#ffffff]">{desc}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 text-center">
        <a href="#start" className="inline-block bg-[#31373f] text-white px-6 py-3 rounded hover:bg-[#30363e] transition">Join Now</a>
      </div>
    </section>
  );
}
