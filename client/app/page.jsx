"use client";
import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';

import ToolCard from '../components/ToolCard';
import { motion, AnimatePresence } from 'framer-motion';
import api from '@/utils/api';

const CASE_STUDIES = [
  {
    id: 1,
    title: "Industrial Carbon-Fiber 3D Printer",
    asset: "Industrial Carbon-Fiber 3D Printer (Markforged Onyx Pro)",
    capex: {
      purchase: "6,50,000",
      amc: "50,000",
      facility: "10,000",
      total: "7,10,000"
    },
    opex: {
      acquisition: "0",
      shield: "0",
      prototyping: "1,50,000", // 30-Day
      total: "1,50,000"
    },
    reduction: "78%"
  },
  {
    id: 2,
    title: "Heavy-Duty Hydraulic Power Pack",
    asset: "Heavy-Duty Hydraulic Power Pack -700 Bar Dual-Flow Hydraulic Pump",
    capex: {
      purchase: "3,20,000",
      amc: "15,000", // Transport & Installation
      facility: "0",
      total: "3,35,000"
    },
    opex: {
      acquisition: "0",
      shield: "0",
      prototyping: "27,500", // 5-Day Site Requirement
      total: "27,500"
    },
    reduction: "91.8%"
  },
    {
    id: 3,
    title: "RF Spectrum Analyzer",
    asset: "RF Spectrum Analyzer -R&S FSV3000 Signal Lab",
    capex: {
      purchase: "4,80,000",
      amc: "30,000",
      facility: "5,000",
      total: "5,15,000"
    },
    opex: {
      acquisition: "0",
      shield: "0",
      prototyping: "52,500", // 7-Day Validation
      total: "52,500"
    },
    reduction: "89%"
  }, 
  {
    id: 4,
    title: "Collaborative Robot (Cobot)",
    asset: "Collaborative Robot (Cobot) -Universal Robots UR5e Node",
    capex: {
      purchase: "18,50,000",
      amc: "1,50,000",
      facility: "25,000",
      total: "20,25,000"
    },
    opex: {
      acquisition: "0",
      shield: "0",
      prototyping: "1,50,000", // 10-Day Dev Sprint
      total: "1,50,000"
    },
    reduction: "92%"
  }
];


export default function LandingPage() {

  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [visibleCount, setVisibleCount] = useState(8);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

 const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0); // For slide direction logic

  const nextSlide = () => {
    setDirection(1);
    setCurrent((prev) => (prev === CASE_STUDIES.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrent((prev) => (prev === 0 ? CASE_STUDIES.length - 1 : prev - 1));
  };

  const data = CASE_STUDIES[current];

  // Animation variants
  const variants = {
    enter: (direction) => ({ x: direction > 0 ? 500 : -500, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (direction) => ({ x: direction < 0 ? 500 : -500, opacity: 0 }),
  };


  // Observer for Infinite Scroll
  const observer = useRef();
  const lastItemRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prev => prev + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, [loading, hasMore]);

// Inside your LandingPage component
    useEffect(() => {
  const fetchTools = async () => {
    try {
      const res = await api.get('/parts/all');
      
      // 🚀 Sort by most recent date (descending) before setting state
      const broadcastOrder = res.data.sort((a, b) => 
        new Date(b.createdAt) - new Date(a.createdAt)
      );
     
      setItems(broadcastOrder); 
    } catch (err) {
      console.error("❌ Network Sync Error:", err);
    }
  };
  fetchTools();
    }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-gray-700 selection:text-white">
{/* 2. Hero Section */}
    <main className="relative flex flex-col items-center justify-center pt-20 pb-14 px-6 text-center overflow-hidden ">
      
      {/* Background Image Wrapper */}
      <div 
        className="absolute inset-0 z-0 opacity-80"
        style={{
          backgroundImage: "url('/images/bg-image.webp')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          //filter: 'grayscale(100%)' // Keeps it in your signature grey aesthetic
        }}
      />
      
      {/* Dark Overlay to ensure text pops */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#0a0a0a] via-transparent to-[#0a0a0a]" />

      {/* Content - Set z-index to stay above the background */}
      <div className="relative z-10 flex flex-col items-center">
        <div className="inline-block px-3 py-1 mb-6 border border-gray-800 rounded-full text-[10px] uppercase tracking-[0.3em] text-gray-300 animate-fade-in bg-[#0a0a0a]/50 backdrop-blur-sm">
          Engineering Quick-Commerce
        </div>
        {/* PRECISION ON DEMAND */  }
        <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-8 leading-tight max-w-5xl">
          High-Spec Engineering Tools,  <span className="text-blue-600 italic font-serif"> Delivered in Minutes.</span>
        </h1>
        
        <p className="max-w-xl text-gray-400 text-sm md:text-base leading-relaxed tracking-wide mb-12">
          Join 600+ MSMEs and Startups saving 70% on prototyping CapEx through Torqfix's reliable rental subscriptions and local node network.
        </p>
        {/*Torqfix connects ~400 Agile MSMEs and 260+ Deep Tech Startups with a hyper-local network of 40+ Verified Inventory Nodes. Experience a 70% reduction in prototyping CapEx through our reliable rental subscription models, with professional tools delivered in under 45–70 minutes.*/}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/discovery" className="bg-white !text-[#0a0a0a] text-black text-xs font-bold uppercase tracking-widest px-10 py-5 hover:bg-gray-200 transition">
            Explore Inventory
          </Link>
          <Link href="/register" className="bg-transparent border border-gray-800 text-white text-xs font-bold uppercase tracking-widest px-10 py-5 hover:bg-blue-600 transition">
            Register as Vendor
          </Link>
        </div>
      </div>
    </main>

     {/* Target Audience Links (Item 10) */}
        <div className="flex flex-wrap justify-center gap-2 py-20 border-b border-gray-900 bg-[#0a0a0a]">
          {[
            { name: 'Startups Kickstart', slug: 'startups' },
            { name: 'MSME', slug: 'essentials' },
            { name: 'Engineers', slug: 'engineers' },
            { name: 'Vendors', slug: 'vendors' }
          ].map((link) => (
            <Link 
              key={link.slug} 
              href={`/category/${link.slug}`}
              className="group border border-gray-800 px-12 py-6 transition-all duration-300 ease-in-out hover:bg-white hover:border-white"
            >
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-gray-500 transition-colors duration-300 group-hover:text-black">
                {link.name}
              </span>
            </Link>
          ))}
        </div>

          {/* Demand Verification Section */}
      <section className="py-24 border-b border-gray-900 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-center md:text-left">
            
            {/* Pivot 1: Market Size */}
            <div className="space-y-4 border-l border-gray-800 pl-8 transition-all duration-500 hover:border-blue-600 group">
              <h3 className="text-4xl font-black italic text-white group-hover:text-blue-500">600+</h3>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] leading-relaxed">
                Agile MSMEs & Deep Tech <br/> Startups in Noida Corridor
              </p>
            </div>

            {/* Pivot 2: Economic Impact */}
            <div className="space-y-4 border-l border-gray-800 pl-8 transition-all duration-500 hover:border-blue-600 group">
              <h3 className="text-4xl font-black italic text-white group-hover:text-blue-500">70% </h3>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] leading-relaxed">
                Reduction in Initial <br/> CapEx for Prototyping 
              </p>
            </div>

            {/* Pivot 3: Network Density */}
            <div className="space-y-4 border-l border-gray-800 pl-8 transition-all duration-500 hover:border-blue-600 group">
              <h3 className="text-4xl font-black italic text-white group-hover:text-blue-500">40+</h3>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] leading-relaxed">
                Hyper-Local Verified <br/> Inventory Nodes 
              </p>
            </div>

            {/* Pivot 4: Fulfillment Velocity */}
            <div className="space-y-4 border-l border-gray-800 pl-8 transition-all duration-500 hover:border-blue-600 group">
              <h3 className="text-4xl font-black italic text-blue-600 group-hover:text-white">45-70 min</h3>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] leading-relaxed">
                Average P2P Tool <br/> Delivery Time
              </p>
            </div>

          </div>
        </div>
      </section>

        {/* About Section (Item 9) */}
        <section className="p-20 grid grid-cols-1 md:grid-cols-2 gap-20 items-center border-t border-gray-900/50">
          <div className="space-y-10">
            <div className="space-y-6">
              <span className="text-blue-600 font-bold tracking-widest text-sm uppercase mb-2 block">For Every CTO / MD</span>
              <h2 className="text-4xl font-black uppercase italic leading-tight">
                Book a subscription <br/> <span className="text-white">for </span><span className="text-blue-600">precision assets</span>
              </h2>
              <p className="text-gray-400 text-sm leading-relaxed max-w-md">
                Precision Assets for Prototyping, Testing, Manufacturing, Calibration, and Maintenance. TorqFix is the infrastructure for Noida’s <span className="text-white font-bold">600+ hardware innovators</span>. We bridge the CAPEX gap by transforming idle industrial assets into a hyper-local, subscription-based supply chain.
              </p>
              
              {/* Existing Feature Stats */}
              <div className="flex gap-10">
                <div>
                  <p className="text-white font-bold text-xl tracking-tighter">Low-Cost</p>
                  <p className="text-gray-500 text-[9px] uppercase font-black tracking-widest">Subscription Model</p>
                </div>
                <div>
                  <p className="text-white font-bold text-xl tracking-tighter">Fast Access</p>
                  <p className="text-gray-500 text-[9px] uppercase font-black tracking-widest">Hyper-local Supply Chain</p>
                </div>
              </div>
            </div>

            {/* --- NEW STRATEGIC LINKS --- */}
            <div className="grid grid-cols-1 gap-4 pt-6 border-t border-gray-900">
              <p className="text-[10px] font-black text-blue-500 uppercase tracking-[0.3em] mb-2">Network Intelligence</p>
              <div className="flex flex-wrap gap-4">
                <Link href="/about/ecosystem" className="group">
                  <span className="text-[11px] font-black uppercase italic tracking-tighter border-b border-gray-800 group-hover:border-blue-600 group-hover:text-blue-500 transition-all pb-1">
                    01 Ecosystem Audit →
                  </span>
                </Link>
                <Link href="/about/opportunity" className="group">
                  <span className="text-[11px] font-black uppercase italic tracking-tighter border-b border-gray-800 group-hover:border-blue-600 group-hover:text-blue-500 transition-all pb-1">
                    02 Market Potential →
                  </span>
                </Link>
                <Link href="/about/challenges" className="group">
                  <span className="text-[11px] font-black uppercase italic tracking-tighter border-b border-gray-800 group-hover:border-blue-600 group-hover:text-blue-500 transition-all pb-1">
                    03 Risk & AI Audit →
                  </span>
                </Link>
              </div>
            </div>
          </div>

          {/* Image Section */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-gray-900 rounded-2xl blur opacity-10 group-hover:opacity-30 transition duration-1000"></div>
            <div className="relative bg-[#111111] aspect-video border border-gray-900 flex items-center justify-center overflow-hidden rounded-2xl">
              <img 
                src="/images/process-flow1.webp" 
                alt="TorqFix Process Flow" 
                className="object-cover w-full h-full  hover:grayscale-0 transition-all duration-700"
              />
             {/*<div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-sm border border-gray-800 px-3 py-1">
                <p className="text-[8px] text-blue-500 font-black uppercase tracking-widest animate-pulse">SF</p>
              </div>*/}
            </div>
          </div>
        </section>


        {/* Example Slides*/}
        <section className="py-24 bg-[#0a0a0a] border-b border-gray-900 overflow-hidden">
          <div className="max-w-5xl mx-auto px-10">
            
            {/* Header Section */}
            <header className="mb-16 flex justify-between items-end">
              <div>
                <h2 className="text-2xl font-black uppercase italic text-white tracking-tighter">The Economic Blueprint</h2>
                <p className="text-gray-400 text-[10px] tracking-[0.4em] uppercase mt-2">Case Study: {data.asset}</p>
              </div>
              
              <div className="flex gap-4">
                <button onClick={prevSlide} className="p-4 border border-gray-800 hover:bg-white hover:text-black transition text-white">←</button>
                <button onClick={nextSlide} className="p-4 border border-gray-800 hover:bg-white hover:text-black transition text-white">→</button>
              </div>
            </header>


        {/* Animated Container */}
          <div className="relative min-h-[450px]">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                  key={data.id}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-[1px] bg-gray-800 border border-gray-800 absolute w-full"
                >
                  
                  {/* TRADITIONAL OWNERSHIP (CapEx) */}
                  <div className="bg-[#0d0d0d] p-12">
                    <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] mb-10">Traditional Ownership (CapEx)</h4>
                    <ul className="space-y-6">
                      <li className="flex justify-between border-b border-gray-900 pb-2">
                        <span className="text-[10px] text-gray-400 uppercase">Purchase Cost</span>
                        <span className="text-xs font-mono text-white">₹{data.capex.purchase}</span>
                      </li>
                      <li className="flex justify-between border-b border-gray-900 pb-2">
                        <span className="text-[10px] text-gray-400 uppercase">AMC & Setup</span>
                        <span className="text-xs font-mono text-white">₹{data.capex.amc}</span>
                      </li>
                      <li className="flex justify-between border-b border-gray-900 pb-2">
                        <span className="text-[10px] text-gray-400 uppercase">Facility Overhead</span>
                        <span className="text-xs font-mono text-white">₹{data.capex.facility}</span>
                      </li>
                      <li className="flex justify-between pt-6">
                        <span className="text-xs font-black uppercase italic text-red-500 underline decoration-red-900 underline-offset-8">CapEx Outflow</span>
                        <span className="text-xl font-black text-white tracking-tighter">₹{data.capex.total}</span>
                      </li>
                    </ul>
                  </div>

                  {/* TORQFIX ACCESS (OpEx) */}
                  <div className="bg-[#111111] p-12 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-3 bg-blue-600 text-white text-[8px] font-black uppercase tracking-tighter shadow-lg">
                      {data.reduction} REDUCTION
                    </div>
                    
                    <h4 className="text-[10px] font-black text-blue-500 uppercase tracking-[0.3em] mb-10">TorqFix Access (OpEx)</h4>
                    <ul className="space-y-6">
                      <li className="flex justify-between border-b border-gray-800 pb-2">
                        <span className="text-[10px] text-gray-400 uppercase">Acquisition Cost</span>
                        <span className="text-xs font-mono text-white">₹{data.opex.acquisition}</span>
                      </li>
                      <li className="flex justify-between border-b border-gray-800 pb-2">
                        <span className="text-[10px] text-gray-400 uppercase">Maintenance Shield</span>
                        <span className="text-xs font-mono text-white">₹{data.opex.shield}</span>
                      </li>
                      <li className="flex justify-between border-b border-gray-800 pb-2">
                        <span className="text-[10px] text-gray-400 uppercase">
                          {data.id === 4 ? '10-day Site Requirement' : '30-day Prototyping Access '}
                        </span>
                        <span className="text-xs font-mono text-white">₹{data.opex.prototyping}</span>
                      </li>
                      <li className="flex justify-between pt-6">
                        <span className="text-xs font-black uppercase italic text-green-500 underline decoration-green-900 underline-offset-8">OpEx Outflow</span>
                        <span className="text-xl font-black text-white tracking-tighter">₹{data.opex.total}</span>
                      </li>
                    </ul>
                  </div>

                </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-12 text-center">
            <p className="text-[9px] font-black text-gray-600 uppercase tracking-[0.5em]">
              Optimization Model V1.0 • Data verified for Noida Industrial Corridor 2026
            </p>
          </div>
        </div>
      </section>


      {/* 5. Process Flow Section */}
            {/* 7. The TorqFix Process Workflow */}
      <section className="py-24 bg-[#0d0d0d] border-b border-gray-900">
        <div className="max-w-7xl mx-auto px-10">
          <header className="mb-20 text-center">
            <h2 className="text-3xl font-black uppercase italic tracking-tighter text-blue-600">The Procurement Pipeline</h2>
            <p className="text-gray-500 text-[10px] tracking-[0.5em] uppercase mt-3">From Requirement to site-delivery in 7 critical steps</p>
          </header>

          {/* Staggered Timeline Flow */}
          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-7 gap-6 text-center lg:text-left relative">
            
            {/* Desktop connecting line */}
            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gray-600 z-0 hidden lg:block" />

            {[
              { step: '01', title: 'Gap Identification', desc: 'Startup defines critical engineering asset gap for development.' },
              { step: '02', title: 'Geospatial Scan', desc: 'Scan local P2P nodes via interactive intelligence map (20KM).' },
              { step: '03', title: 'Secured funds', desc: 'Initiate transaction. Execute UPI Escrow fund blocking.' },
              { step: '04', title: 'Rapid Dispatch', desc: 'Quick-Commerce logic activates. Fulfilled by P2P/In-House node.' },
              { step: '05', title: 'AI-Audit Verification', desc: 'SSIM AI-engine documents asset condition during handover.' },
              { step: '06', title: 'Active Sprint', desc: 'Execute prototyping with zero CapEx depreciation overhead.' },
              { step: '07', title: 'On-Boarding return', desc: 'Post-use AI-damage check and instant fund settlement.' }
            ].map((item, index) => (
              <div key={item.step} className={`relative z-10 p-6 bg-[#111111] border border-gray-900 group ${index % 2 !== 0 ? 'lg:mt-16' : ''}`}>
                
                {/* Circular Indicator */}
                <div className="h-4 w-4 rounded-full bg-gray-900 border-4 border-[#0d0d0d] absolute -top-2 left-1/2 lg:left-6 -translate-x-1/2 lg:translate-x-0 group-hover:bg-blue-600 group-hover:border-blue-900 transition-colors duration-500"/>
                
                <div className="space-y-4">
                  <span className="text-5xl font-black text-white italic opacity-10 group-hover:opacity-100 group-hover:text-blue-500 transition-all duration-700">
                    {item.step}
                  </span>
                  <h4 className="text-[11px] font-bold text-gray-100 uppercase tracking-widest leading-snug h-8">
                    {item.title}
                  </h4>
                  <p className="text-[9px] text-gray-500 uppercase tracking-widest leading-relaxed">
                    {item.desc}
                  </p>
                </div>
                
                {/* Aesthetic "Site Data" line */}
                <p className="text-[7px] font-mono text-gray-600 uppercase tracking-tighter mt-6 group-hover:text-gray-700">
                  Node_{index+1}.Noida_Zone.active
                </p>
              </div>
            ))}
          </div>

          <div className="mt-20 text-center">
            <div className="flex items-center gap-3 justify-center">
              <div className="h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
              <p className="text-[10px] font-black text-gray-600 uppercase tracking-[0.4em]">Optimized Supply-Chain Active</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Status Grid (Glassmorphism) */}
      <section className="max-w-7xl mx-auto px-10 pb-20">
        {/* 🚀 ADDED SECTION HEADING */}
          <header className="mb-12">
              <h2 className="text-3xl font-black uppercase italic tracking-tighter text-white">
                Operational Categories
              </h2>
          </header>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
          {/* Example for AUTOMOTIVE - Line 49 approx */}
          <Link href="/category/automotive" className="p-12 bg-[#111111] border border-gray-900 group hover:border-blue-600 transition duration-500">
            <span className="text-gray-600 text-xs font-mono">01/</span>
             <h3 className="text-xl font-bold mt-4 mb-2 tracking-tight">IOT</h3>
            <p className="text-gray-500 text-xs leading-loose">Critical machines required for IOT & smart device manufacturing.</p>  
          </Link>

          {/* Repeat this pattern for Robotics, Tool Sharing, etc. */}
          <Link href="/category/robotics" className="p-12 bg-[#111111] border border-gray-900 group hover:border-blue-600 transition duration-500">
            <span className="text-gray-600 text-xs font-mono">02/</span>
            <h3 className="text-xl font-bold mt-4 mb-2 tracking-tight">ROBOTICS</h3>
            <p className="text-gray-500 text-xs leading-loose">Certified spare parts for automation hardware.</p>
          </Link>
          {/* TOOL SHARING Card */}
          <Link href="/category/mechanical" className="p-12 bg-[#111111] border border-gray-900 group hover:border-blue-600 transition duration-500">
            <span className="text-gray-600 text-xs font-mono">03/</span>
            <h3 className="text-xl font-bold mt-4 mb-2 tracking-tight">DRONE TECHNOLOGY</h3>
            <p className="text-gray-500 text-xs leading-loose">On-demand access to specialized drone engineering equipment.</p>
          </Link>

           {/* ELECTRONICS Card */}
          <Link href="/category/electronics" className="p-12 bg-[#111111] border border-gray-900 group hover:border-blue-600 transition duration-500">
            <span className="text-gray-600 text-xs font-mono">04/</span>
            <h3 className="text-xl font-bold mt-4 mb-2 tracking-tight">ELECTRONICS</h3>
            <p className="text-gray-500 text-xs leading-loose">Critical electronics testing and SMT (Surface Mount Technology) components.</p>
          </Link>

          {/* ELECTRICAL Card */}
          <Link href="/category/electrical" className="p-12 bg-[#111111] border border-gray-900 group hover:border-blue-600 transition duration-500">
            <span className="text-gray-600 text-xs font-mono">04/</span>
            <h3 className="text-xl font-bold mt-4 mb-2 tracking-tight">ELECTRICAL</h3>
            <p className="text-gray-500 text-xs leading-loose">Critical electrical components, spares for all applications.</p>
          </Link>

          {/* MECHANICAL Card */}
          <Link href="/category/mechanical" className="p-12 bg-[#111111] border border-gray-900 group hover:border-blue-600 transition duration-500">
            <span className="text-gray-600 text-xs font-mono">05/</span>
            <h3 className="text-xl font-bold mt-4 mb-2 tracking-tight">MECHANICAL</h3>
            <p className="text-gray-500 text-xs leading-loose">Crucial mechanical parts, spares for all applications.</p>
          </Link>

          {/* PLUMBING Card */}
          <Link href="/category/plumbing" className="p-12 bg-[#111111] border border-gray-900 group hover:border-blue-600 transition duration-500">
            <span className="text-gray-600 text-xs font-mono">06/</span>
           <h3 className="text-xl font-bold mt-4 mb-2 tracking-tight">AUTOMOTIVE / EV</h3>
            <p className="text-gray-500 text-xs leading-loose">Precision testing components for SUVs and EVs.</p>
          </Link>
        </div>
      </section>
      

     
      {/* 4. Live Global Feed */}
      <section className="max-w-7xl mx-auto px-10 pb-32">
          <header className="mb-12 flex justify-between items-end">
            <div>
              <h2 className="text-3xl text-blue-600 font-black uppercase italic">Live Network Feed</h2>
              <p className="text-gray-500 text-[10px] tracking-widest uppercase mt-2">
                Aggregating all nodes within the network
              </p>
            </div>
            <div className="text-right">
              <span className="text-green-500 font-mono text-xs animate-pulse">● BROADCASTING LIVE</span>
            </div>
          </header>

          {/* 🚀 Grid now slices items to visibleCount */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {items.slice(0, visibleCount).map((item, index) => (
              <ToolCard key={`${item.id}-${index}`} item={item} />
            ))}
          </div>

          {/* 🚀 Load More Button */}
          {visibleCount < items.length && (
            <div className="mt-20 flex justify-center">
              <button 
                onClick={() => setVisibleCount(prev => prev + 8)}
                className="group relative px-12 py-5 border border-gray-800 bg-transparent overflow-hidden transition-all hover:border-blue-600"
              >
                <div className="absolute inset-0 w-0 bg-blue-600 transition-all duration-[400ms] ease-out group-hover:w-full"></div>
                <span className="relative text-[10px] font-black uppercase tracking-[0.4em] text-white group-hover:text-white">
                  View More
                </span>
              </button>
            </div>
          )}

          {loading && (
            <div className="flex justify-center mt-20">
              <div className="w-10 h-0.5 bg-gray-800 relative overflow-hidden">
                <div className="absolute inset-0 bg-white animate-loading-bar"></div>
              </div>
            </div>
          )}
      </section>

      {/* Footer */}
      <footer className="bg-[#0a0a0a] border-t border-gray-900 pt-20 pb-10">
          <div className="max-w-7xl mx-auto px-10">
            
            {/* Upper Footer: Strategic Alignment */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
              
              {/* Brand Essence */}
              <div className="col-span-1 md:col-span-2 space-y-6">
                <h2 className="text-2xl font-black uppercase italic tracking-tighter text-white">TorqFix</h2>
                <p className="text-gray-500 text-[11px] leading-relaxed max-w-md uppercase tracking-wider">
                  The quick-commerce infrastructure for hardware innovators. 
                  Bridging the CapEx gap for 600+ MSMEs and Startups through 
                  a first-of-its-kind hyper-local rental model. Delivered in under 45 minutes.
                </p>
                <div className="flex items-center gap-4 pt-2">
                  <div className="h-[1px] w-12 bg-blue-600"></div>
                  <span className="text-[9px] font-black text-blue-500 uppercase tracking-[0.4em]">First-to-Market Solution</span>
                </div>
              </div>

              {/* Network Directory */}
              <div className="space-y-6">
                <h4 className="text-[10px] font-black text-white uppercase tracking-[0.3em]">Network Directory</h4>
                <ul className="space-y-3">
                  <li><Link href="/discovery" className="text-[10px] text-gray-600 hover:text-blue-500 uppercase tracking-widest transition">Inventory Scan</Link></li>
                  <li><Link href="/about/ecosystem" className="text-[10px] text-gray-600 hover:text-blue-500 uppercase tracking-widest transition">Ecosystem Audit</Link></li>
                  <li><Link href="/vendor/register" className="text-[10px] text-gray-600 hover:text-blue-500 uppercase tracking-widest transition">Node Partnership</Link></li>
                  <li><Link href="/category/startups" className="text-[10px] text-gray-600 hover:text-blue-500 uppercase tracking-widest transition">Startup Kickstart</Link></li>
                </ul>
              </div>

              {/* Infrastructure Status */}
              <div className="space-y-6">
                <h4 className="text-[10px] font-black text-white uppercase tracking-[0.3em]">System Status</h4>
                <div className="space-y-4">
                  <div className="bg-[#111111] p-4 border border-gray-900">
                    <p className="text-[8px] text-gray-600 uppercase mb-1">Active Nodes</p>
                    <p className="text-xs font-mono text-white">42 VERIFIED</p>
                  </div>
                  <div className="bg-[#111111] p-4 border border-gray-900">
                    <p className="text-[8px] text-gray-600 uppercase mb-1">Avg Delivery time</p>
                    <p className="text-xs font-mono text-blue-500">65 MINS</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Footer: Compliance & Identity */}
            <div className="pt-10 border-t border-gray-900 flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex items-center gap-6">
                <p className="text-[9px] uppercase tracking-[0.3em] text-gray-500">© 2026 TorqFix Engineering Solutions</p>
                <span className="text-gray-900 hidden md:block">|</span>
                <p className="text-[9px] uppercase tracking-[0.3em] text-gray-500 font-bold">Noida Industrial Corridor HQ</p>
              </div>

              <div className="flex gap-8">
                <Link href="/terms" className="text-[9px] text-gray-800 hover:text-gray-500 uppercase tracking-[0.2em] transition">SLA Terms</Link>
                <Link href="/privacy" className="text-[9px] text-gray-800 hover:text-gray-500 uppercase tracking-[0.2em] transition">Data Encryption</Link>
                <Link href="/support" className="text-[9px] text-gray-800 hover:text-gray-500 uppercase tracking-[0.2em] transition">Support Node</Link>
              </div>
            </div>
            
            {/* Final Aesthetic Trace */}
            <div className="mt-10 text-center opacity-20">
              <p className="text-[7px] font-mono text-gray-800 tracking-widest uppercase">
                System_Identity: TORQFIX_V1.04 • Protocol: PERN_STACK • Node_Location: 28.5355° N, 77.3910° E
              </p>
            </div>
          </div>
        </footer>
    </div>
  );
}