"use client";
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  }

  return (
    <div className={`flex justify-between transition-colors duration-300 ${isOpen ? "bg-white" : "bg-transparent"} `}>
      <div className='ml-1 z-10 flex flex-col'>
        <Link href={'/landing'}>
          <Image src={"/logo.png"} alt="lossie logo" width={110} height={20} className='max-sm:h-9 max-sm:w-20 -mt-1'/> 
        </Link>
        <div className='flex gap-1 -mt-3 max-sm:-mt-2 ml-[18px] max-sm:ml-[12px]'>
          <h1 className='text-[#2d132e] text-[14.5px] font-sans max-sm:text-[12px] leading-none'>AI</h1>
          <h1 className='text-[#2d132e] text-[14.5px] font-sans max-sm:text-[12px] leading-none'>lost & found tracker</h1>
        </div>
      </div>

      <div className={`flex flex-col`}>
        <button onClick={toggleMenu} className='text-[#2d132e] md:hidden ml-auto m-2'>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <nav className={`m-1 flex ${isOpen ? "flex-col transition-all duration-300" : "max-sm:hidden"} max-sm:border-black `}>
          <Link href='/feed' className='text-[#2d132e] text-[19px] font-semibold font-sans mx-2 px-2 py-1 hover:text-[#dd7230] m-1 max-sm:text-[15px] max-sm:mx-1 max-sm:text-right'>Feed</Link>
          <Link href='/about' className='text-[#2d132e] text-[19px] font-semibold font-sans mx-2 px-2 py-1 hover:text-[#dd7230] m-1 max-sm:text-[15px] max-sm:mx-1 max-sm:text-right'>About</Link>
          <Link href='/dashboard' className='text-[#dd7230] text-[19px] font-semibold font-sans border-[#2d132e] border-[2px] hover:bg-[#dd7230] hover:text-[#ffffff] px-2 mb-3 m-1 mr-2 max-sm:text-[15px] max-sm:mx-1 max-sm:px-1.5 max-sm:py-0 max-sm:text-right transition-colors rounded-md'>Dashboard</Link>
        </nav>
      </div>
      
    </div>
  )
};

export default Navbar;