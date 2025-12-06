"use client"

import React, { useEffect, useState, useRef } from 'react';
import {
  BookAIcon,
  GraduationCapIcon,
  ImageIcon,
  LayoutDashboardIcon,
  LayoutIcon,
  PanelsTopLeftIcon,
  SearchIcon,
  ServerIcon,
  ZapIcon,
  ArrowRightIcon,
} from "lucide-react";
import { HexBackground } from './HexBackground';
import { Button } from '@/components/ui/button';


// Placeholder for the main hero image
const gettingStarted = "/notebook1.png"; // High res placeholder

const Link: React.FC<{ href: string; className?: string; children: React.ReactNode }> = ({ href, className, children }) => (
  <a href={href} className={className}>
    {children}
  </a>
);

// --- Scroll Animation Component ---
const FadeIn: React.FC<{ children: React.ReactNode; delay?: number; className?: string }> = ({ children, delay = 0, className = "" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Only animate once
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default function LandingPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="relative w-full overflow-hidden min-h-screen flex flex-col bg-transparent text-white selection:bg-green-500/30">
      {/* Background Layer */}
      <HexBackground />

      {/* Hero Section */}
      <main className="relative z-10 max-w-[1400px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-24">
        
        {/* Hero Card */}
        <div className="bg-transparent md:bg-[#0a0a0a]/40 backdrop-blur-xl border-0 md:border md:border-white/10 rounded-[2.5rem] md:p-12 lg:p-16 relative md:shadow-2xl overflow-visible">
           
          {/* Main Layout: Column on all screens, centered */}
          <div className="flex flex-col gap-16 items-center text-center">
            
            {/* Text Content */}
            <div className={`w-full max-w-4xl mx-auto space-y-8 flex flex-col items-center transition-all duration-1000 transform ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-green-500/20 bg-green-500/10 backdrop-blur-md text-xs font-mono text-green-400 shadow-[0_0_15px_-3px_rgba(16,185,129,0.2)]">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                v2.0 is now live
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1]">
                <span className="block animate-fade-up" style={{ animationDelay: '0.1s' }}>Next-Generation</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-100 to-green-400 bg-[length:200%_auto] animate-text-shimmer block mt-2 pb-2">
                   Analytics & BI Platform
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-400 text-pretty leading-relaxed max-w-2xl mx-auto animate-fade-up" style={{ animationDelay: '0.2s' }}>
                Adeloop empowers technical and non-technical users to make data-driven decisions. 
                Move from raw data to actionable insights with our high-performance engine.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 animate-fade-up" style={{ animationDelay: '0.3s' }}>
                <Link
                  href="/docs/adeloop"
                  className="inline-flex h-14 items-center justify-center rounded-full bg-green-500 px-10 text-base font-semibold text-black shadow-[0_0_20px_-5px_rgba(16,185,129,0.4)] transition-all hover:scale-105 hover:bg-green-400 hover:shadow-[0_0_30px_-5px_rgba(16,185,129,0.6)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-green-500"
                >
                  View Documentation
                </Link>
                <Link
                  href="mailto:adeleddarai29@gmail.com"
                  className="inline-flex h-14 items-center justify-center rounded-full border border-white/20 bg-white/5 px-10 text-base font-medium text-white shadow-sm transition-all hover:bg-white/10 hover:border-white/30 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white"
                >
                  Contact Sales
                </Link>
              </div>
            </div>

            {/* Hero Image / Graphic */}
            <div className={`w-full max-w-6xl relative group perspective-1000 transition-all duration-1000 delay-200 transform ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              
              {/* Glow Effect behind image */}
              <div className="absolute -inset-4 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-[2rem] blur-3xl opacity-40 group-hover:opacity-60 transition duration-1000 group-hover:duration-200"></div>
              
              {/* Border Beam Container - NEW IMPLEMENTATION */}
              <div className="relative p-[2px] rounded-2xl overflow-hidden bg-transparent shadow-2xl">
                
                {/* Rotating Conic Gradient Layer */}
                <div 
                  className="absolute inset-[-50%] animate-spin-slow"
                  style={{
                    background: 'conic-gradient(transparent 60deg, #10b981 180deg, transparent 300deg)',
                  }}
                />

                {/* Inner Image Container (Masks the spinner center) */}
                <div className="relative rounded-[14px] bg-[#0a0a0a] overflow-hidden">
                    <img
                      src={gettingStarted}
                      alt="Adeloop Dashboard"
                      loading="lazy"
                      className="w-full h-auto object-cover select-none rounded-[14px] opacity-100 border border-white/5"
                    />
                    {/* Glossy Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none" />
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Features Navigation */}
        <div className="mt-24 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <FadeIn delay={100} className="h-full">
            <div className="p-10 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm hover:border-green-500/30 transition-colors group h-full">
              <p className="font-mono text-sm text-green-400 mb-4 tracking-wider uppercase">Explore Features</p>
              <h2 className="text-3xl font-bold mb-4 text-white group-hover:text-green-400 transition-colors">AdeloopLab Ecosystem</h2>
              <p className="text-gray-400 mb-8 text-lg leading-relaxed">
                Discover how Adeloop addresses key business challenges. From data integration to real-time insights, 
                explore our comprehensive suite of tools designed for the modern data stack.
              </p>
               <div className="flex flex-wrap gap-3">
                   {['Data Integration', 'Real-time Analytics', 'AI Agents', 'Visual Pipelines'].map((tag) => (
                      <span key={tag} className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300 hover:bg-white/10 transition-colors cursor-default">
                          {tag}
                      </span>
                   ))}
               </div>
            </div>
          </FadeIn>

          <div className="flex flex-col gap-6">
             <FadeIn delay={200}>
              <Link
                href="/docs/adeloop"
                className="group relative flex items-center justify-between p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
              >
                <div className="flex items-center gap-6">
                  <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-green-500/20 to-blue-500/10 flex items-center justify-center text-green-400 ring-1 ring-white/10 group-hover:scale-110 transition-transform">
                      <PanelsTopLeftIcon className="size-7" />
                  </div>
                  <div>
                      <h3 className="text-xl font-bold text-white mb-1">Adeloop Platform</h3>
                      <p className="text-base text-gray-400">Core analytics engine & dashboarding</p>
                  </div>
                </div>
                <ArrowRightIcon className="size-6 text-gray-500 group-hover:text-green-400 group-hover:translate-x-2 transition-all" />
              </Link>
             </FadeIn>

             <FadeIn delay={300}>
              <Link
                href="/docs/agents"
                className="group relative flex items-center justify-between p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
              >
                <div className="flex items-center gap-6">
                  <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/10 flex items-center justify-center text-purple-400 ring-1 ring-white/10 group-hover:scale-110 transition-transform">
                      <ServerIcon className="size-7" />
                  </div>
                  <div>
                      <h3 className="text-xl font-bold text-white mb-1">Adeloop Agent</h3>
                      <p className="text-base text-gray-400">AI-driven automation & reasoning</p>
                  </div>
                </div>
                <ArrowRightIcon className="size-6 text-gray-500 group-hover:text-purple-400 group-hover:translate-x-2 transition-all" />
              </Link>
             </FadeIn>
          </div>
        </div>

        {/* Feature Grid / Why Adeloop */}
        <div id="highlights" className="mt-24">
             <FadeIn>
               <div className="mb-12 text-center">
                  <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                      Why Choose Adeloop?
                  </h2>
                  <div className="h-1 w-20 bg-green-500 mx-auto rounded-full"></div>
               </div>
             </FadeIn>
             
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-white/10 rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                {features.map((feature, index) => (
                    <FadeIn key={index} delay={index * 50} className="h-full">
                      <div 
                          className="bg-[#0e0e10] p-8 hover:bg-[#161618] transition-colors duration-300 group relative h-full"
                      >
                          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                          <div className="mb-6 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white/5 text-green-400 ring-1 ring-white/10 group-hover:bg-green-500/10 transition-colors">
                              {feature.icon}
                          </div>
                          <h3 className="text-lg font-bold mb-3 text-white">{feature.title}</h3>
                          <p className="text-gray-400 leading-relaxed text-sm">
                              {feature.description}
                          </p>
                      </div>
                    </FadeIn>
                ))}
             </div>
        </div>

        {/* CTA Footer */}
        <FadeIn delay={200}>
          <div className="mt-24 rounded-3xl border border-white/10 bg-gradient-to-b from-white/5 to-[#0a0a0a] backdrop-blur-sm p-16 text-center relative overflow-hidden group">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-1/2 bg-green-500/10 blur-[100px] rounded-full pointer-events-none group-hover:bg-green-500/20 transition-colors duration-700"></div>
              
              <div className="relative z-10 max-w-3xl mx-auto space-y-8">
                  <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
                      Ready to Transform Your Data?
                  </h2>
                  <p className="text-gray-400 text-xl max-w-2xl mx-auto">
                      Experience the power of Adeloop's analytics platform. Join thousands of teams making smarter decisions today.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-5 justify-center pt-4">
                      <Button size="lg" className="h-14 px-10 text-base font-bold bg-white text-black hover:bg-gray-200">
                          Get Started Now
                      </Button>
                      <Button variant="outline" size="lg" className="h-14 px-10 text-base border-white/20 hover:bg-white/10">
                          Schedule Demo
                      </Button>
                  </div>
              </div>
          </div>
        </FadeIn>

      </main>
    </div>
  );
}

const features = [
  {
    title: "Developer Documentation",
    description: "Comprehensive documentation with MDX support built specifically for developers to integrate fast.",
    icon: <BookAIcon className="size-6" />,
  },
  {
    title: "Intelligent Search",
    description: "Built-in AI semantic search capabilities to quickly find the specific context you need.",
    icon: <SearchIcon className="size-6" />,
  },
  {
    title: "Visual Pipelines",
    description: "Automatically generate visual representations of your data flow and dependencies.",
    icon: <ImageIcon className="size-6" />,
  },
  {
    title: "Responsive Dashboard",
    description: "Optimized for all screen sizes, ensuring a seamless experience on tablets and mobile.",
    icon: <LayoutIcon className="size-6" />,
  },
  {
    title: "Clean Modern UI",
    description: "Modern interface focused on readability, dark mode support, and superior user experience.",
    icon: <LayoutDashboardIcon className="size-6" />,
  },
  {
    title: "High Performance",
    description: "Optimized for speed and SEO visibility, helping your reports load instantly.",
    icon: <ZapIcon className="size-6" />,
  },
  {
    title: "Data Quality Engine",
    description: "Built-in data cleansing, pre-built connectors, and anomaly detection.",
    icon: <ServerIcon className="size-6" />,
  },
  {
    title: "Self-Service Analytics",
    description: "Drag-and-drop dashboards with natural language querying capabilities.",
    icon: <PanelsTopLeftIcon className="size-6" />,
  },
  {
    title: "AI-Guided Insights",
    description: "Automated guided insights and trend recommendations for all business users.",
    icon: <GraduationCapIcon className="size-6" />,
  },
];