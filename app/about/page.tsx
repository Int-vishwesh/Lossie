import Link from "next/link";
import { Search, Cpu, Bell, Users, ShieldCheck, Zap, ArrowRight } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-orange-100 overflow-x-hidden">

      {/* ── About Header ── */}
      <section className="px-6 sm:px-12 pt-14 pb-16 lg:pt-20 lg:pb-20">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-black text-[#2d132e] mb-3">About Lossie</h1>
          <div className="w-16 h-1 bg-[#dd7230] rounded-full mb-8"></div>

          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 sm:p-10">
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-6">
              <span className="font-bold text-[#2d132e]">Lossie</span> is an AI-powered lost & found management system 
              built for college campuses. It provides a centralized platform where students can report lost or 
              found items, and leverages image recognition to automatically match entries across the database.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-orange-50 border border-orange-100 rounded-xl p-5">
                <h3 className="text-sm font-black text-[#2d132e] uppercase tracking-wider mb-2">What</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  A web platform for reporting, browsing, and auto-matching lost & found items using AI.
                </p>
              </div>
              <div className="bg-orange-50 border border-orange-100 rounded-xl p-5">
                <h3 className="text-sm font-black text-[#2d132e] uppercase tracking-wider mb-2">Why</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Traditional notice boards are slow and inefficient. Lossie reduces recovery time from days to minutes.
                </p>
              </div>
              <div className="bg-orange-50 border border-orange-100 rounded-xl p-5">
                <h3 className="text-sm font-black text-[#2d132e] uppercase tracking-wider mb-2">For Whom</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Students, staff, and campus administrators — anyone who has lost or found an item on campus.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Features Grid ── */}
      <section className="px-6 sm:px-12 pb-20">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-black text-[#2d132e] text-center mb-12">
            How Lossie Helps
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                icon: Search,
                title: "Smart Reporting",
                desc: "Describe and upload a photo of your lost or found item in seconds.",
                color: "bg-blue-50",
                iconColor: "text-blue-600",
                border: "border-blue-100"
              },
              {
                icon: Cpu,
                title: "AI Matching",
                desc: "Our model scans the entire database to find visual and contextual matches automatically.",
                color: "bg-purple-50",
                iconColor: "text-purple-600",
                border: "border-purple-100"
              },
              {
                icon: Bell,
                title: "Instant Alerts",
                desc: "Get notified the moment a potential match is found for your item.",
                color: "bg-orange-50",
                iconColor: "text-orange-600",
                border: "border-orange-100"
              },
              {
                icon: Users,
                title: "Community Driven",
                desc: "A growing network of honest finders and seekers on your campus.",
                color: "bg-green-50",
                iconColor: "text-green-600",
                border: "border-green-100"
              },
              {
                icon: ShieldCheck,
                title: "Secure & Private",
                desc: "Your data stays protected. Contact details are only shared on a confirmed match.",
                color: "bg-slate-50",
                iconColor: "text-slate-600",
                border: "border-slate-100"
              },
              {
                icon: Zap,
                title: "Lightning Fast",
                desc: "What used to take days now takes minutes. Speed is our priority.",
                color: "bg-amber-50",
                iconColor: "text-amber-600",
                border: "border-amber-100"
              }
            ].map((feature) => (
              <div
                key={feature.title}
                className={`${feature.color} border ${feature.border} rounded-2xl p-6 hover:shadow-md transition-all duration-300 hover:-translate-y-1 group`}
              >
                <div className={`w-10 h-10 rounded-xl ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <feature.icon size={20} className={feature.iconColor} />
                </div>
                <h3 className="text-lg font-bold text-[#2d132e] mb-2">{feature.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats Strip ── */}
      <section className="px-6 sm:px-12 pb-20">
        <div className="max-w-5xl mx-auto">
          <div className="bg-[#2d132e] rounded-3xl p-8 sm:p-12 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            {[
              { value: "AI", label: "Powered Matching" },
              { value: "24/7", label: "Always Scanning" },
              { value: "0₹", label: "Completely Free" }
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl sm:text-4xl font-black text-[#dd7230] mb-1">{stat.value}</p>
                <p className="text-sm font-semibold text-white/70 uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Origin Story ── */}
      <section className="px-6 sm:px-12 pb-20">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-5">
              {/* Accent bar */}
              <div className="lg:col-span-2 bg-gradient-to-br from-[#2d132e] to-[#5a2d5e] p-8 sm:p-12 flex flex-col justify-center">
                <h2 className="text-2xl sm:text-3xl font-black text-white mb-4">The Story Behind Lossie</h2>
                <p className="text-white/60 text-sm font-medium">From a campus problem to an AI solution.</p>
              </div>
              {/* Content */}
              <div className="lg:col-span-3 p-8 sm:p-12 flex items-center">
                <div>
                  <p className="text-slate-600 leading-relaxed mb-4">
                    It started with a lost ID card in the first week of college. After days of searching 
                    notice boards and asking around with no luck, we realized there had to be a better way.
                  </p>
                  <p className="text-slate-600 leading-relaxed">
                    We combined our passion for AI and web development to build a platform that does the 
                    searching for you. <span className="font-semibold text-[#2d132e]">Lossie was born out of frustration, 
                    and built with the hope that no student has to go through that experience again.</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA Section ── */}
      <section className="px-6 sm:px-12 pb-24">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-black text-[#2d132e] mb-4">
            Ready to find what you've lost?
          </h2>
          <p className="text-slate-500 mb-8 max-w-lg mx-auto">
            Join the Lossie community and let AI do the hard work of matching and recovering your belongings.
          </p>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 bg-[#2d132e] text-white font-bold px-8 py-3.5 rounded-full hover:bg-[#dd7230] hover:text-[#2d132e] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Get Started <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* ── Developer Section ── */}
      <section className="px-6 sm:px-12 pb-24">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 sm:p-10 flex flex-col sm:flex-row items-center gap-6 sm:gap-10 max-w-2xl mx-auto">
            {/* Avatar */}
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full border-4 border-orange-100 overflow-hidden flex-shrink-0 bg-slate-50 shadow-inner relative">
              <img src="/yapp.png" alt="Vishwesh" className="w-full h-full object-cover" />
            </div>

            {/* Info */}
            <div className="text-center sm:text-left">
              <h3 className="text-xl font-black text-[#2d132e] mb-1">Vishwesh</h3>
              <p className="text-[#dd7230] font-semibold text-sm mb-3">Creator & Developer</p>
              <p className="text-slate-500 text-sm leading-relaxed mb-4">
                B.Tech student passionate about AI and full-stack development. 
                Built Lossie to solve a real campus problem — because no one should 
                have to stress over a lost ID card.
              </p>

              {/* Social Links */}
              <div className="flex items-center justify-center sm:justify-start gap-3">
                <a 
                  href="https://github.com/int-vishwesh" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-full transition-colors"
                >
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                  GitHub
                </a>
                <a 
                  href="https://www.linkedin.com/in/vishwesh" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-full transition-colors"
                >
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
