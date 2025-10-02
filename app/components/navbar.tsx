
"use client";
import Link from 'next/link';
import { Menu } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  }

  return (
    <div className={`flex justify-between ${isOpen? "bg-slate-300 duration-300 " : "bg-transparent"} `}>
      <div className='ml-1 z-10 '>
        <Link href={'/landing'}>
        <Image src={"/logo.png"} alt="lossie" width={110} height={20} className='h-14 max-sm:h-10'/> 
        </Link>
        <h1 className='text-[#2d1e30] -mt-[18px] max-sm:-mt-[14.5px] ml-[18px] text-[14.5px] font-sans max-sm:text-[12px] max-sm:ml-[12px]  '>AI</h1>
        <h1 className='text-[#2d1e30] -mt-[22px] max-sm:-mt-[18.5px] ml-[50px] text-[14.5px] font-sans max-sm:text-[12px] max-sm:ml-[35px] '> lost & found tracker</h1>
      </div>
      <div className={`flex flex-col `}>
      <button onClick={toggleMenu} className='text-black md:hidden ml-20 m-2 '>
        <Menu/>
      </button>
      <nav className={`m-1 flex ${isOpen ? "flex-col duration-5000" : "max-sm:hidden"} max-sm:border-black `}>
        <Link href='/homepage' className='text-[#2d132e] text-[19px] font-semibold font-sans mx-2 px-2 py-1 hover:text-[#dd7230] m-1 max-sm:text-[15px] max-sm:mx-1 max-sm:text-right '>home</Link>
        <Link href='/about' className='text-[#2d132e] text-[19px] font-semibold font-sans mx-2 px-2 py-1 hover:text-[#dd7230] m-1 max-sm:text-[15px] max-sm:mx-1 max-sm:text-right '>about</Link>
        <Link href='/dashboard' className='text-[#dd7230] text-[19px] font-semibold font-sans border-[#2d1e30] border-[2px] hover:bg-[#dd7230] hover:text-[#2d123e] px-2 mb-3 m-1 mr-2 max-sm:text-[15px] max-sm:mx-1 max-sm:px-1.5 max-sm:py-0 max-sm:text-right '>Dashboard</Link>
      </nav>
      </div>
    </div>
  )
};

export default Navbar;
