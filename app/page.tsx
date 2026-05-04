"use client";

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Cpu, Upload, Bell, Search, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import FadeIn from './components/fade-in';
import mainHero from '../public/main.png';
import step1Image from '../public/step1.png';
import step2Image from '../public/step2.png';
import step3Image from '../public/step3.png';
import step4Image from '../public/step4.png';

const featureSteps = [
  {
    icon: Upload,
    step: "01",
    title: "Report",
    description: "Describe your lost item and upload a photo, or do the same for an item you found.",
    image: step1Image,
    color: "bg-blue-50",
    iconColor: "text-blue-600",
    border: "border-blue-100"
  },
  {
    icon: Cpu,
    step: "02",
    title: "Auto-matching",
    description: "Let our AI model search and match your item against the database of found items.",
    image: step2Image,
    color: "bg-purple-50",
    iconColor: "text-purple-600",
    border: "border-purple-100"
  },
  {
    icon: Bell,
    step: "03",
    title: "Get Notified",
    description: "Receive a notification when a potential match is found. Contact, meet, and get your things back.",
    image: step3Image,
    color: "bg-green-50",
    iconColor: "text-green-600",
    border: "border-green-100"
  },
  {
    icon: Search,
    step: "04",
    title: "Manual Browsing",
    description: "You always have the option to browse the listings yourself if you prefer a hands-on approach.",
    image: step4Image,
    color: "bg-orange-50",
    iconColor: "text-orange-600",
    border: "border-orange-100"
  }
];

const faqs = [
  {
    q: "Is Lossie free to use?",
    a: "Yes, completely free. Lossie is built for students and campus communities — no charges, no hidden fees."
  },
  {
    q: "How does the AI matching work?",
    a: "When you upload an item with a photo, our AI compares it against all reported items using image recognition and description analysis. If a match is found, both parties are notified instantly."
  },
  {
    q: "Do I need to create an account?",
    a: "Yes, a quick sign-up (or login with GitHub) is required so we can notify you when a match is found and keep your reports secure."
  },
  {
    q: "What if no match is found?",
    a: "Your item stays listed and our AI keeps scanning 24/7. Whenever a new item is reported that could match yours, you'll be notified."
  },
  {
    q: "Can I browse items without reporting?",
    a: "Absolutely! The Feed page lets you manually browse all reported lost and found items on campus anytime."
  }
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <button
      onClick={() => setOpen(!open)}
      className="w-full text-left bg-white border border-slate-100 rounded-xl px-6 py-5 shadow-sm hover:shadow-md transition-all duration-300 group"
    >
      <div className="flex items-center justify-between gap-4">
        <h3 className="font-bold text-[#2d132e] text-sm sm:text-base group-hover:text-[#dd7230] transition-colors">
          {q}
        </h3>
        <ChevronDown
          size={18}
          className={`text-slate-400 flex-shrink-0 transition-transform duration-300 ${open ? "rotate-180 text-[#dd7230]" : ""}`}
        />
      </div>
      <div
        className={`overflow-hidden transition-all duration-300 ${open ? "max-h-40 mt-3" : "max-h-0"}`}
      >
        <p className="text-slate-500 text-sm leading-relaxed">{a}</p>
      </div>
    </button>
  );
}

export default function LandingPage() {
  return (
    <div className="overflow-x-hidden">

      <section className="px-6 sm:px-12 pt-8 pb-16 lg:pt-16 lg:pb-28 mt-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          <div className="space-y-6 text-center lg:text-left">

            <FadeIn delay={100}>
              <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] text-[#2d132e] font-black leading-[1.1] tracking-tight">
                Lost Something?{" "}
                <br className="hidden sm:block" />
                <span className="text-[#dd7230]">We&apos;ll Find It.</span>
              </h1>
            </FadeIn>

            <FadeIn delay={200}>
              <p className="text-slate-500 text-base sm:text-lg max-w-lg mx-auto lg:mx-0 leading-relaxed">
                Report lost or found items, and let our AI instantly scan and match them across the entire campus network. Recovery made effortless.
              </p>
            </FadeIn>

            <FadeIn delay={300}>
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2 justify-center lg:justify-start">
                <Link
                  href="/login"
                  className="inline-flex items-center gap-2 bg-[#2d132e] text-white font-bold px-7 py-3 rounded-full hover:bg-[#dd7230] hover:text-[#2d132e] transition-all duration-300 transform hover:scale-105 shadow-lg text-sm sm:text-base"
                >
                  Get Started <ArrowRight size={16} />
                </Link>
                <Link
                  href="/feed"
                  className="inline-flex items-center gap-2 text-[#2d132e] font-semibold px-7 py-3 rounded-full border-2 border-[#2d132e]/15 hover:border-[#dd7230] hover:text-[#dd7230] transition-all duration-300 text-sm sm:text-base"
                >
                  Browse Feed
                </Link>
              </div>
            </FadeIn>

            <FadeIn delay={400}>
              <div className="flex items-center gap-4 pt-4 justify-center lg:justify-start">
                <div className="flex -space-x-2">
                  {[1,2,3,4].map(i => (
                    <div key={i} className={`w-8 h-8 rounded-full border-2 border-orange-100 bg-gradient-to-br ${
                      i === 1 ? 'from-blue-400 to-blue-600' :
                      i === 2 ? 'from-green-400 to-green-600' :
                      i === 3 ? 'from-purple-400 to-purple-600' :
                      'from-orange-400 to-orange-600'
                    }`}></div>
                  ))}
                </div>
                <p className="text-xs text-slate-400 font-medium">
                  Trusted by <span className="text-[#2d132e] font-bold">campus students</span>
                </p>
              </div>
            </FadeIn>
          </div>

          {/* Right: Hero Image */}
          <FadeIn delay={200} className="flex justify-center lg:justify-end">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-[#dd7230]/10 to-[#2d132e]/5 rounded-[3rem] blur-2xl -z-10"></div>
              <Image
                src={mainHero}
                alt="Illustration of people connecting over lost and found items"
                width={520}
                height={520}
                priority
                className="object-contain w-full max-w-md lg:max-w-[520px] drop-shadow-xl"
              />
            </div>
          </FadeIn>

        </div>
      </section>

      <FadeIn>
        <section className="px-6 sm:px-12 pb-16">
          <div className="max-w-4xl mx-auto">
            <hr className="border-black mt-20 mb-1" />
            <div className="rounded-2xl p-6 sm:p-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {[
                { val: "AI", label: "Powered Matching" },
                { val: "< 1min", label: "To Report" },
                { val: "24/7", label: "Auto Scanning" },
                { val: "Free", label: "For Everyone" }
              ].map(item => (
                <div key={item.label}>
                  <p className="text-xl sm:text-2xl font-black text-[#dd7230]">{item.val}</p>
                  <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400 mt-1">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </FadeIn>

      {/* HOW IT WORKS  */}
      <section className="px-6 sm:px-12 py-20 lg:py-28">
        <div className="max-w-6xl mx-auto">
          
          <FadeIn>
            <div className="text-center mb-16 lg:mb-20">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#dd7230] mb-3">Simple Process</p>
              <h2 className="text-3xl sm:text-4xl font-black text-[#2d132e]">
                How It Works
              </h2>
            </div>
          </FadeIn>

          <div className="space-y-16 lg:space-y-24">
            {featureSteps.map((step, index) => (
              <FadeIn key={step.title} delay={index * 80}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 items-center">
                  <div className={`space-y-4 text-center md:text-left ${index % 2 !== 0 ? 'md:order-last' : ''}`}>
                    <div className="flex items-center gap-3 justify-center md:justify-start">
                      <div className={`w-10 h-10 rounded-xl ${step.color} border ${step.border} flex items-center justify-center`}>
                        <step.icon size={18} className={step.iconColor} />
                      </div>
                      <span className="text-xs font-black text-slate-300 tracking-wider">STEP {step.step}</span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-black text-[#2d132e]">{step.title}</h3>
                    <p className="text-slate-500 text-base sm:text-lg leading-relaxed max-w-md mx-auto md:mx-0">
                      {step.description}
                    </p>
                  </div>

                  {/* Image Side */}
                  <div className={`flex justify-center ${index % 2 !== 0 ? 'md:justify-start' : 'md:justify-end'}`}>
                    <div className="relative">
                      <div className={`absolute -inset-3 ${step.color} rounded-3xl -z-10 opacity-50`}></div>
                      <Image
                        src={step.image}
                        alt={`${step.title} illustration`}
                        width={380}
                        height={380}
                        className="object-contain rounded-2xl w-full max-w-[320px] sm:max-w-[380px] drop-shadow-md"
                      />
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

        </div>
      </section>

      {/* WHY LOSSIE — FEATURES */}
      <FadeIn>
        <section className="px-6 sm:px-12 pb-20 lg:pb-28">
          <div className="max-w-6xl mx-auto">
            
            <div className="bg-[#2d132e] rounded-3xl p-8 sm:p-12 lg:p-16 overflow-hidden relative">
              <div className="absolute top-0 right-0 w-72 h-72 bg-[#dd7230]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              
              <div className="relative z-10">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#dd7230] mb-3">Why Lossie</p>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white mb-4 max-w-xl">
                  Built to solve a real campus problem
                </h2>
                <p className="text-white/50 max-w-2xl mb-10 leading-relaxed">
                  Students lose ID cards, gadgets, and books every day. Traditional notice boards are slow 
                  and unreliable. Lossie brings AI automation and community power together for fast recovery.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { 
                      emoji: "🤖", 
                      title: "AI-Driven Matching", 
                      desc: "Image recognition scans and compares items automatically across the database." 
                    },
                    { 
                      emoji: "👥", 
                      title: "Community Powered", 
                      desc: "A growing network of honest finders and seekers working together." 
                    },
                    { 
                      emoji: "⚡", 
                      title: "Time Efficient", 
                      desc: "What took days of searching now takes minutes with smart automation." 
                    }
                  ].map(item => (
                    <div key={item.title} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors duration-300 hover:-translate-y-1 hover:shadow-lg">
                      <span className="text-2xl mb-3 block">{item.emoji}</span>
                      <h3 className="text-white font-bold mb-2">{item.title}</h3>
                      <p className="text-white/40 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </section>
      </FadeIn>

      {/* FAQ SECTION */}
      <section className="px-6 sm:px-12 pb-20 lg:pb-28">
        <div className="max-w-3xl mx-auto">
          
          <FadeIn>
            <div className="text-center mb-12">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#dd7230] mb-3">Got Questions?</p>
              <h2 className="text-3xl sm:text-4xl font-black text-[#2d132e]">
                Frequently Asked
              </h2>
            </div>
          </FadeIn>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <FadeIn key={faq.q} delay={i * 60}>
                <FAQItem q={faq.q} a={faq.a} />
              </FadeIn>
            ))}
          </div>

        </div>
      </section>

      {/* CTA SECTION */}
      <FadeIn>
        <section className="px-6 sm:px-12 pb-20">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-black text-[#2d132e] mb-4">
              Ready to get started?
            </h2>
            <p className="text-slate-500 mb-8 max-w-lg mx-auto leading-relaxed">
              Join Lossie and let AI handle the hard work. Report an item in under a minute and let the matching begin.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-3 justify-center">
              <Link
                href="/login"
                className="inline-flex items-center gap-2 bg-[#dd7230] text-white font-bold px-8 py-3.5 rounded-full hover:bg-[#2d132e] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-sm sm:text-base"
              >
                Report an Item <ArrowRight size={16} />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-[#2d132e] font-semibold px-8 py-3.5 rounded-full border-2 border-[#2d132e]/15 hover:border-[#2d132e] transition-all duration-300 text-sm sm:text-base"
              >
                Learn More
              </Link>
            </div>
          </div>
        </section>
      </FadeIn>

    </div>
  );
}