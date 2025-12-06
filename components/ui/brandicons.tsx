import React from "react";
import Image from "next/image";

// Adeloop Logo (PNG from public folder)
export const AdeloopIcon = ({ className }: { className?: string }) => (
  <Image 
    src="/adeloopbg.png" 
    alt="Adeloop" 
    width={80} 
    height={80}
    className={`${className || "w-20 h-20"}`}
    priority
  />
);

// DuckDB Logo (Simplified)
export const DuckDBIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="128" height="128" rx="24" fill="#FFF000" />
    <path d="M96 78C96 78 86 88 64 88C42 88 32 78 32 78" stroke="black" strokeWidth="8" strokeLinecap="round"/>
    <circle cx="48" cy="48" r="8" fill="black"/>
    <circle cx="80" cy="48" r="8" fill="black"/>
    <path d="M64 64L40 70" stroke="black" strokeWidth="4"/>
  </svg>
);

// PostgreSQL Elephant (Simplified)
export const PostgresIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" className="text-blue-500 opacity-20 fill-blue-500" stroke="none"/>
    <path d="M16.5 7.5C16.5 7.5 17 9 16 11C15 13 13 14 11 14H9V18M9 14C8 14 7 13 7 11C7 9 9 6 12 6C15 6 16.5 7.5 16.5 7.5Z" stroke="#336791" fill="#336791"/>
  </svg>
);

// MongoDB Leaf
export const MongoIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
     <path d="M12 22C12 22 17 17 17 10C17 6 14 2 12 2C10 2 7 6 7 10C7 17 12 22 12 22Z" fill="#00ED64" fillOpacity="0.2"/>
     <path d="M12 22V2" stroke="#00ED64" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

// Supabase Bolt
export const SupabaseIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.5 2L3 13H11.5L10.5 22L21 10H12.5L12.5 2Z" stroke="#3ECF8E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="#3ECF8E" fillOpacity="0.2"/>
  </svg>
);

// Databricks
export const DatabricksIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L3 7L12 12L21 7L12 2Z" stroke="#FF3621" strokeWidth="1.5" fill="#FF3621" fillOpacity="0.1"/>
    <path d="M3 17L12 22L21 17" stroke="#FF3621" strokeWidth="1.5"/>
    <path d="M3 12L12 17L21 12" stroke="#FF3621" strokeWidth="1.5"/>
  </svg>
);

// Snowflake
export const SnowflakeIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2V22M20.66 7L3.34 17M20.66 17L3.34 7" stroke="#29B5E8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="12" cy="12" r="3" fill="#29B5E8" fillOpacity="0.2"/>
  </svg>
);

// Gemini / Google
export const GeminiIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="url(#gemini_grad)" fillOpacity="0.2"/>
    <path d="M8 16L12 8L16 16L8 16Z" fill="white"/>
    <defs>
      <linearGradient id="gemini_grad" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
        <stop stopColor="#4E75F6"/>
        <stop offset="1" stopColor="#E94335"/>
      </linearGradient>
    </defs>
  </svg>
);

// GitHub
export const GitHubIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

// MySQL
export const MySQLIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 12C4 12 5.5 15 8 15C10.5 15 12 12 12 12C12 12 13.5 9 16 9C18.5 9 20 12 20 12" stroke="#F29111" strokeLinecap="round" />
        <path d="M4 16C4 16 7 19 10 19C13 19 16 12 20 8" stroke="#00758F" strokeLinecap="round" opacity="0.6"/>
    </svg>
);