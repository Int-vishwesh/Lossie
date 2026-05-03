import Image from 'next/image';
import Link from 'next/link';
import mainHero from '../public/main.png';
import step1Image from '../public/step1.png';
import step2Image from '../public/step2.png';
import step3Image from '../public/step3.png';
import step4Image from '../public/step4.png';

// Data for the "How It Works" section.
const featureSteps = [
  {
    title: "Report",
    description: "Describe your lost item and upload a photo, or do the same for an item you found.",
    image: step1Image
  },
  {
    title: "Auto-matching",
    description: "Let our AI model search and match your item against the database of found items.",
    image: step2Image
  },
  {
    title: "Get Notified",
    description: "Receive a notification when a potential match is found. Contact, meet, and get your things back.",
    image: step3Image
  },
  {
    title: "Manual Browsing",
    description: "You always have the option to browse the listings yourself if you prefer a hands-on approach.",
    image: step4Image
  }
];

export default function LandingPage() {
  return (
    <div className="overflow-x-hidden">
      <section className="px-6 sm:px-12 py-12 lg:py-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          <div className="space-y-6 text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl text-[#2d132e] font-bold leading-tight">
              Lost Something? <br /> Found Something? <br />
              <span className="text-[#dd7230]">Let’s Reconnect!</span>
            </h1>
            <p className="text-base sm:text-lg text-slate-700 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Lossie is an AI-powered lost and found tracker that helps you find lost items or return found items quickly and effortlessly, with our AI image recognition and captioning, reducing the time and stress of searching manually.
            </p>
            <div className="pt-4">
              <Link 
                href="/login" 
                className="inline-block border-2 border-[#2d132e] rounded-full px-8 py-3 bg-[#2d132e] text-white font-sans font-semibold hover:bg-[#dd7230] hover:text-[#2d132e] hover:border-[#dd7230] transition-all duration-300 transform hover:scale-105 text-sm sm:text-base">
                Get Started
              </Link>
            </div>
          </div>
          <div className='flex justify-center lg:justify-end mt-8 lg:mt-0'>
            <Image
              src={mainHero}
              alt="Illustration of people connecting over lost and found items"
              width={600}
              height={600}
              priority 
              className="object-contain w-full max-w-md lg:max-w-full"
            />
          </div>
        </div>
      </section>

      {/* Section 2: How It Works */}
      <section className="bg-orange-100 py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 sm:px-12">
          <h2 className="text-3xl sm:text-4xl text-[#2d132e] font-bold text-center mb-16 lg:mb-24">
            How It Works?
          </h2>
          <div className="space-y-20 lg:space-y-32 max-w-5xl mx-auto">
            {featureSteps.map((step, index) => (
              <div 
                key={step.title} 
                className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center"
              >
                <div className={`space-y-4 text-center md:text-left ${index % 2 !== 0 ? 'md:order-last md:pl-12' : 'md:pr-12'}`}>
                  <h3 className="text-2xl sm:text-3xl text-[#dd7230] font-bold">{step.title}</h3>
                  <p className="text-base sm:text-lg text-slate-600 leading-relaxed">{step.description}</p>
                </div>
                <div className="flex justify-center">
                  <Image
                    src={step.image}
                    alt={`${step.title} illustration`}
                    width={400}
                    height={400}
                    className="object-contain rounded-lg w-3/4 md:w-full drop-shadow-md"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Motive */}
      <section className="max-w-7xl mx-auto px-6 sm:px-12 py-20 lg:py-32 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl text-[#2d132e] font-bold mb-8">
            Our Motive
          </h2>
          <p className="text-base sm:text-lg text-slate-700 mb-12 leading-relaxed">
            Initially designed for a campus environment where students often misplace belongings like ID cards, gadgets, and books, Lossie provides a high-probability platform for recovery. Our goal is to expand this sense of community and efficiency anywhere, powered by your support and our automation.
          </p>
          <div className="inline-block text-left p-8 sm:p-10 rounded-2xl bg-[#2d132e]/5 border border-[#2d132e]/10 shadow-sm">
            <h3 className="text-xl sm:text-2xl text-[#2d132e] font-bold mb-6">What makes us special:</h3>
            <ul className="space-y-4">
              <li className="flex items-center text-base sm:text-lg text-[#dd7230] font-semibold">
                <span className="mr-4 text-2xl">✔️</span> AI-driven Matching
              </li>
              <li className="flex items-center text-base sm:text-lg text-[#dd7230] font-semibold">
                <span className="mr-4 text-2xl">✔️</span> Community Powered
              </li>
              <li className="flex items-center text-base sm:text-lg text-[#dd7230] font-semibold">
                <span className="mr-4 text-2xl">✔️</span> Time-efficient
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}