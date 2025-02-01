"use client";
import Link from 'next/link';
import {useState} from 'react';
import Navbar from '../components/navbar';
import Searchbar from '../components/searchbar';
import Lost from '../components/lost';
import Found from '../components/found';
import Footer from '../components/footer';

const Homepage = () => {
  const [activeTab, setActiveTab] = useState("lost");

  const handletab = (tab)=> (event) => {
    // Remove tabs
    const tabs = document.querySelectorAll(".tab");
    tabs.forEach(tab => tab.classList.remove("active"));
    
    // clicked tab
    event.target.classList.add("active");
    setActiveTab(tab)
  };

  return (
    <div>
      <Navbar/>
      <Searchbar/>
      
      <div className="flex  gap-2 mt-5 justify-center">
        <button  onClick={handletab("lost")} className="tab active text-xl bg-slate-300 rounded-[99px] px-80 py-1 cursor-pointer max-sm:px-[60px] max-sm:py-1 max-sm:text-[17px] font-sans ">lost feeds</button>
        <button  onClick={handletab("found")} className="tab text-xl bg-slate-300 rounded-[99px] px-80 py-1 cursor-pointer max-sm:px-[60px] max-sm:py-1 max-sm:text-[17px] font-sans ">found feeds</button>
      </div>
      <div className="container mx-auto p-4">
        {activeTab === "lost" && <Lost />}
        {activeTab === "found" && <Found />}
      </div>

      <Footer/>
    </div>
  )
}

export default Homepage
