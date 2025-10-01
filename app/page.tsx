
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
    <div>
      <section className="m-auto px-4 sm:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 text-left">
            <h1 className="text-5xl max-sm:text-3xl text-left text-[#2d132e] font-bold leading-tight">
              Lost Something? <br /> Found Something? <br />
              <span className="text-[#dd7230]">Let’s Reconnect!</span>
            </h1>
            <p className="text-lg text-slate-700 max-w-xl  max-sm:text-[14px] max-sm:w-96 ">
              Lossie is an AI-powered lost and found tracker that helps you find lost items or return found items belongings quckly and effortlessly, with our AI image recognition and captioning, reducing the time and stress of searching manually.
            </p>
            <Link 
              href="/signup" 
              className="inline-block border-2 border-[#2d132e] rounded-full px-8 py-3 bg-[#2d132e] text-white font-sans font-semibold hover:bg-[#dd7230] hover:text-[#2d132e] hover:border-[#dd7230] transition-all duration-300 transform hover:scale-105 max-sm:text-[12px] max-sm:px-6 max-sm:py-2">
              Get Started
            </Link>
          </div>
          <div className='mt-5'>
            <Image
              src={mainHero}
              alt="Illustration of people connecting over lost and found items"
              width={600}
              height={600}
              priority 
              className="object-contain"
            />
          </div>
        </div>
      </section>

      {/* Section 2: How It Works */}
      <section className=" py-20">
        <div className="container mx-auto px-4 sm:px-8">
          <h2 className="text-4xl max-sm:text-xl text-[#2d132e] font-bold text-center mb-16">
            How It Works?
          </h2>
          <div className="space-y-5">
            {featureSteps.map((step, index) => (
              <div 
                key={step.title} 
                className={`grid grid-cols-2 max-sm:grid-cols-1 gap-10 max-sm:w-96 m-auto items-center`}
              >
                <div className={`space-y-3 ${index % 2 !== 0 ? 'md:order-last' : ''}`}>
                  <h3 className="text-3xl max-sm:text-[18px] max-sm:text-center text-[#dd7230] font-bold">{step.title}</h3>
                  <p className="text-lg max-sm:text-[12px] text-slate-600">{step.description}</p>
                </div>
                <div>
                  <Image
                    src={step.image}
                    alt={`${step.title} illustration`}
                    width={500}
                    height={500}
                    className=" max-sm:w-80 m-auto object-contain rounded-lg"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Motive */}
      <section className="container mx-auto px-4 sm:px-8 py-20 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl max-sm:text-xl md:text-5xl text-[#2d132e] font-bold mb-6">
            Our Motive
          </h2>
          <p className="text-lg max-sm:text-[12px] text-slate-700 mb-8">
            Initially designed for a campus environment where students often misplace belongings like ID cards, gadgets, and books, Lossie provides a high-probability platform for recovery. Our goal is to expand this sense of community and efficiency anywhere, powered by your support and our automation.
          </p>
          <div className="inline-block text-left p-6 rounded-lg">
            <h3 className="text-xl max-sm:text-[16px] text-slate-800 font-bold mb-4">What makes us special:</h3>
            <ul className="space-y-2 ">
              <li className="flex items-center text-lg max-sm:text-[15px] text-[#dd7230] font-semibold">
                <span className="mr-2">✔️</span> AI-driven Matching
              </li>
              <li className="flex items-center text-lg max-sm:text-[15px] text-[#dd7230] font-semibold">
                <span className="mr-2">✔️</span> Community Powered
              </li>
              <li className="flex items-center text-lg max-sm:text-[15px] text-[#dd7230] font-semibold">
                <span className="mr-2">✔️</span> Time-efficient
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}