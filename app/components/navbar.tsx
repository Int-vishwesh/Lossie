"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import Image from 'next/image';

const navLinks = [
  { href: '/feed', label: 'Feed' },
  { href: '/about', label: 'About' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-orange-100/80 backdrop-blur-lg shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="px-4 sm:px-6">
        <div className="flex items-center justify-between h-14 sm:h-16">

          {/* logo */}
          <Link href="/" className="flex flex-col gap-0 group">
            <Image
              src="/logo.png"
              alt="lossie"
              width={90}
              height={18}
              className="sm:w-[100px] transition-transform duration-200 group-hover:scale-[1.03]"
            />
            <span className="text-[11px] sm:text-xs text-[#2d132e]/60 font-medium tracking-wide ml-[14px] -mt-1.5">
              ai lost & found
            </span>
          </Link>

          {/* desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(link => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-semibold px-4 py-2 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'text-[#dd7230] bg-orange-50'
                      : 'text-[#2d132e] hover:text-[#dd7230] hover:bg-orange-50/50'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <Link
              href="/dashboard"
              className={`text-sm font-bold ml-2 px-5 py-2 rounded-lg border-2 transition-all duration-200 ${
                pathname === '/dashboard'
                  ? 'bg-[#2d132e] text-white border-[#2d132e]'
                  : 'border-[#2d132e] text-[#2d132e] hover:bg-[#2d132e] hover:text-white'
              }`}
            >
              Dashboard
            </Link>
          </nav>

          {/* mobile toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-[#2d132e] hover:bg-orange-200/50 transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-60 border-t border-orange-200/50' : 'max-h-0'
        }`}
      >
        <nav className="px-4 py-3 space-y-1 bg-orange-100/95 backdrop-blur-lg">
          {navLinks.map(link => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`block text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors ${
                  isActive
                    ? 'text-[#dd7230] bg-orange-50'
                    : 'text-[#2d132e] hover:bg-orange-50'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            href="/dashboard"
            className={`block text-sm font-bold px-4 py-2.5 rounded-lg border-2 text-center transition-colors ${
              pathname === '/dashboard'
                ? 'bg-[#2d132e] text-white border-[#2d132e]'
                : 'border-[#2d132e] text-[#2d132e] hover:bg-[#2d132e] hover:text-white'
            }`}
          >
            Dashboard
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;