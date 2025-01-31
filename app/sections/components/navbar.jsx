import Link from 'next/link';

const Navbar = () => {
  return (
    <div className='flex justify-between  '>
      <div className='ml-1 '>
        <img src="logo.png" alt="lossie" className='h-14 max-sm:h-10'/> 
        <h1 className='text-[#2d1e30] -mt-[18px] max-sm:-mt-[14.5px] ml-[18px] text-[14.5px] font-sans max-sm:text-[12px] max-sm:ml-[12px]  '>AI</h1>
        <h1 className='text-[#2d1e30] -mt-[22px] max-sm:-mt-[18.5px] ml-[50px] text-[14.5px] font-sans max-sm:text-[12px] max-sm:ml-[35px] '> lost & found tracker</h1>
      </div>

      <nav className='m-1 flex max-sm:flex-col '>
        <Link href='/' className='text-[#2d1232e] text-[19px] font-semibold font-sans mx-2 px-2 py-1 hover:text-[#dd7230] m-1 max-sm:text-[15px] max-sm:mx-1 max-sm:text-right '>home</Link>
        <Link href='/about' className='text-[#2d1232e] text-[19px] font-semibold font-sans mx-2 px-2 py-1 hover:text-[#dd7230] m-1 max-sm:text-[15px] max-sm:mx-1 max-sm:text-right '>about</Link>
        <Link href='/dashboard' className='text-[#dd7230] text-[19px] font-semibold font-sans border-[#2d1e30] border-[2px] hover:bg-[#dd7230] hover:text-[#2d123e] px-2 mb-3 m-1 mr-2 max-sm:text-[15px] max-sm:mx-1 max-sm:px-1.5 max-sm:py-0 max-sm:text-right '>Dashboard</Link>

      </nav>
    </div>
  )
};

export default Navbar;
