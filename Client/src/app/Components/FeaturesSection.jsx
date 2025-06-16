import { ChatBubbleOvalLeftEllipsisIcon, StarIcon, ClipboardDocumentCheckIcon } from '@heroicons/react/24/solid';

export default function FeaturesSection() {
  const features = [
    {
      title: 'Request Items Effortlessly',
      desc: 'Easily create and manage your rental requests.',
      icon: ClipboardDocumentCheckIcon,
    },
    {
      title: 'Connect with Others via Chat',
      desc: 'Communicate directly with lenders and borrowers.',
      icon: ChatBubbleOvalLeftEllipsisIcon,
    },
    {
      title: 'Rate and Review Your Experience',
      desc: 'Share feedback and build trust within the community.',
      icon: StarIcon,
    },
  ];

  return (
    <section id="features" className="px-10 py-16 text-center" style={{ backgroundColor: '#e6ffff' }}>
      <p className="text-sm uppercase mb-2 text-[#31373f]">Discover</p>
      <h2 className="text-3xl font-bold mb-6 text-[#31373f]">Explore Our Key Features for Renting</h2>
      <p className="max-w-2xl mx-auto mb-10 text-[#31373f]">
        RentEasy simplifies the process of borrowing and lending items. Our platform connects users
        seamlessly through innovative features designed for convenience.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className="p-6 rounded shadow-lg"
            style={{ backgroundColor: '#2b6971' }}
          >
            <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center rounded-full bg-white">
              <feature.icon className="w-7 h-7 text-[#2b6971]" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-white">{feature.title}</h3>
            <p className="text-sm text-[#f0fdfa]">{feature.desc}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 flex justify-center gap-4">
        <a
          href="#how-it-works"
          className="border border-[#31373f] text-[#31373f] px-6 py-3 rounded cursor-pointer hover:bg-[#31373f] hover:text-white transition"
        >
          Learn More
        </a>
        <a
          href="#start"
          className="bg-[#31373f] text-white px-6 py-3 rounded cursor-pointer hover:bg-[#30363e] transition"
        >
          Get Started
        </a>
      </div>
    </section>
  );
}
