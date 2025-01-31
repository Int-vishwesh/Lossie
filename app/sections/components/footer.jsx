
import Link from 'next/link';
//icons
import { Instagram, Linkedin, Github, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#2d232e] flex flex-col bg-center ">
      <div className='flex justify-between max-sm:flex-col'>
        <div className=' ml-10 mt-5 max-sm:w-96 justify-center flex flex-col'>
          <h1 className='text-[#dd7230] text-xl font-sans '>Lossie</h1>
          <hr />
          <p className='text-gray-300'>"get yout things always by your side"</p>
          <br />
          <p className='-mt-2'>idk which city, near whatever mark, <br />
            Patna, India <br /> pin- 801103</p>
          <br />
          <div className='flex mb-3 gap-5'>
            <Link href={''} className='hover:text-white duration-1000'> privacy policy</Link>
            <Link href={''} className='hover:text-white duration-1000'> source code</Link>
            <Link href={''} className='hover:text-white duration-1000'> know more</Link>
          </div>
        </div>
        <div className=' mt-16 mr-16 max-sm:mt-2 max-sm:ml-44 mb-3 '>
          <p className='ml-1.5 '>follow us on :</p>
          <div className='flex justify-evenly w-36 '>
            <Link href={'https://www.linkedin.com/in/vishwesh-aryan-608691236/'} className='hover:text-white text-xl'><Linkedin /></Link>
            <Link href={''} className='hover:text-white text-xl'><Instagram /></Link>
            <Link href={''} className='hover:text-white text-xl'><Mail /></Link>
            <Link href={''} className='hover:text-white text-xl'><Github /></Link>
          </div>
        </div>
      </div>
      <p className='text-center bg-slate-900 text-gray-300 '>Lossie &copy;Copyright 2022</p>
    </footer>
  )
}

export default Footer
