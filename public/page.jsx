import Navbar from '../components/navbar';
import Footer from '../components/footer';
import Link from 'next/link';

const Landing = () => {
  return (
    <>
      <Navbar />

      <main className=''>
        <div className='flex'>
          <div className='mt-32 ml-16 max-sm:ml-8 '>
            <h1 className='text-7xl text-[#2d132e] max-sm:text-4xl '>
              Lost Something? <br /> Found Something? <br />
              <span className='text-[#dd7230] font-semibold '>Let’s Reconnect ! </span>
            </h1>
            <p className='text-[17px] w-[750px] font-sans max-sm:text-[13px] max-sm:w-[370px] '>
              Lossie is an AI-powered lost and found tracker that helps you find lost items or return found items belongings quckly and effortlessly, with our AI image recognition and captioning,  reducing the time and stress of searching manually.
            </p>
            <br />
            <Link href={'/sign'} className='border-2 border-[#2d132e] rounded-[99px] px-5 py-2 ml-2 bg-[#2d132e] text-white font-sans hover:bg-[#dd7230] hover:text-[#2d132e] hover:border-[#dd7230] font-semibold duration-1000 max-sm:text-[14px] max-sm:px-4 max-sm:py-1.5 '>Get Started</Link>
          </div>
          <img src="main2.png" className="w-[550px] mt-24 object-contain max-sm:w-[330px] max-sm:mt-96 max-sm:-ml-[325px]" />
        </div>


        <div className='mt-44 ml-14 max-sm:ml-5'>
          <p className='text-5xl font-sans text-[#2d132e] font-bold ml-20 max-sm:text-3xl max-sm:ml-5'>
            How It Works ?
          </p>
          <div className='flex items-center justify-around'>
            <img src="step1.png" className='w-[500px] -ml-24 max-sm:w-[260px] max-sm:mt-2 max-sm:ml-0' />
            <p className='w-96 mr-1 text-slate-700 font-serif text-[17px] max-sm:text-[13px]'><span className='text-3xl text-[#dd7230] font-sans font-bold max-sm:text-2xl '>Report</span><br />
              describe your lost item and upload a photo or if found something</p>
          </div>
          <div className='flex items-center justify-around'>
            <p className='w-96 mr-0 text-slate-700 font-serif text-[17px] max-sm:text-[13px]'><span className='text-3xl text-[#dd7230] font-sans font-bold max-sm:text-2xl '>Auto-matching</span><br />
              let our AI model search and match it for you from the found item</p>
            <img src="step2.png" className='w-[500px] -ml-24 max-sm:w-[260px] max-sm:mt-2 max-sm:ml-0' />
          </div>
          <div className='flex items-center justify-around'>
            <img src="step3.png" className='w-[450px] -ml-24 max-sm:w-[240px] max-sm:mt-2 max-sm:ml-0' />
            <p className='w-96 mr-2 text-slate-700 font-serif text-[17px] max-sm:text-[13px]'><span className='text-3xl text-[#dd7230] font-sans font-bold max-sm:text-2xl '>Get Notified</span><br />
              and finally contact, meet and get your things back to you</p>
          </div>
          <div className='flex items-center justify-around'>
            <p className='w-96 mr-0 text-slate-700 font-serif text-[17px] max-sm:text-[13px]'><span className='text-3xl text-[#dd7230] font-sans font-bold max-sm:text-2xl '>Manual Browsing</span><br />
              you also, have an option to browse them, if it takes time. we dont abstract these</p>
            <img src="step4.png" className='w-[450px] -ml-24 max-sm:w-[240px] max-sm:mt-2 max-sm:ml-0' />
          </div>
        </div>
        <div className=' m-20 max-sm:m-10'>
          <p className='text-5xl text-center text-[#2d132e] font-sans font-bold max-sm:text-3xl'>Motive Behind this ?</p>
          <br />
          <p className='text-slate-700 text-center text-[18px] w-auto max-sm:text-[14px]'>for now, it is made thinking of a campus, where its most likely that students lost their belongings like ID card, gadgets, books, etc. so here is the platform where u can get your lost item with more probability. But it can be useful anywhere with community support and our automacy</p>
          
          <br />
          <ul className='text-xl text-slate-700 ml-10 max-sm:text-[18px] max-sm:ml-5'>
            what makes us special :
            <li className='text-[#dd7230] ml-10 text-xl list-disc font-sans max-sm:text-[17px]'>AI driven</li>
            <li className='text-[#dd7230] ml-10 text-xl list-disc font-sans max-sm:text-[17px]'>Community driven</li>
            <li className='text-[#dd7230] ml-10 text-xl list-disc font-sans max-sm:text-[17px]'>Time-efficient</li>
          </ul>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default Landing
