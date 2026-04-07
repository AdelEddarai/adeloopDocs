"use client"

import React, { useState, useEffect } from 'react';
import { Liveline } from 'liveline';
import type { LivelinePoint, CandlePoint, LivelineSeries } from 'liveline';
import { ArrowUpRight, ArrowDownRight, Database, Cpu } from 'lucide-react';

const tabs = [
  { id: 'line', label: 'Query Latency Stream' },
  { id: 'candle', label: 'Execution Time Windows' },
  { id: 'multiseries', label: 'Agent vs DB Workload' },
  { id: 'crypto', label: 'Vector Ingestion Burst' },
  { id: 'orderbook', label: 'Connection Pool Depth' }
] as const;
type TabId = typeof tabs[number]['id'];

export function StreamingAnalytics() {
  const [activeTab, setActiveTab] = useState<TabId>('line');
  const [isConnecting, setIsConnecting] = useState(true);
  const [showLine, setShowLine] = useState(false);

  const [data, setData] = useState<LivelinePoint[]>([]);
  const [value, setValue] = useState(45); // e.g. 45ms latency baseline

  const [dataB, setDataB] = useState<LivelinePoint[]>([]);
  const [valueB, setValueB] = useState(80); // e.g. DB Load baseline

  const [candles, setCandles] = useState<CandlePoint[]>([]);
  const [liveCandle, setLiveCandle] = useState<CandlePoint>({ time: 0, open: 45, high: 45, low: 45, close: 45 });

  const [orderbook, setOrderbook] = useState({ bids: [] as [number, number][], asks: [] as [number, number][] });

  useEffect(() => {
    // Generate initial data covering 120 seconds
    const initialData: LivelinePoint[] = [];
    const initialDataB: LivelinePoint[] = [];
    const initialCandles: CandlePoint[] = [];
    let currentVal = 45;
    let currentValB = 80;
    const now = Math.floor(Date.now() / 1000);
    
    let currentCandle: CandlePoint | null = null;
    const candleWidth = 10; // 10 seconds per candle
    
    for (let i = 120; i > 0; i--) {
      const ptTime = now - i;
      // Random walk with bound constraints
      currentVal += (Math.random() - 0.5) * 4;
      currentVal = Math.max(10, Math.min(currentVal, 150)); 
      
      currentValB += (Math.random() - 0.5) * 6;
      currentValB = Math.max(20, Math.min(currentValB, 200));

      initialData.push({ time: ptTime, value: currentVal });
      initialDataB.push({ time: ptTime, value: currentValB });

      const cTime = Math.floor(ptTime / candleWidth) * candleWidth;
      if (!currentCandle || currentCandle.time !== cTime) {
         if (currentCandle) initialCandles.push(currentCandle);
         currentCandle = { time: cTime, open: currentVal, high: currentVal, low: currentVal, close: currentVal };
      } else {
         currentCandle.high = Math.max(currentCandle.high, currentVal);
         currentCandle.low = Math.min(currentCandle.low, currentVal);
         currentCandle.close = currentVal;
      }
    }
    
    // Simulate connection delay to showcase liveline morphing loading animation
    setTimeout(() => {
      setData(initialData);
      setValue(currentVal);
      setDataB(initialDataB);
      setValueB(currentValB);
      if (initialCandles.length > 0) setCandles(initialCandles);
      if (currentCandle) setLiveCandle(currentCandle);
      setIsConnecting(false);
    }, 1500);

    // Simulate streaming data
    const interval = setInterval(() => {
      const newTime = Math.floor(Date.now() / 1000);

      // Core Line (Latency)
      let nextVal = 0;
      setValue((prev) => {
        nextVal = prev + (Math.random() - 0.5) * 5;
        nextVal = Math.max(10, Math.min(nextVal, 150));
        setData((currentData) => {
          const lastTime = currentData.length > 0 ? currentData[currentData.length - 1].time : newTime - 1;
          return [...currentData, { time: Math.max(newTime, lastTime + 1), value: nextVal }];
        });
        return nextVal;
      });

      // Alt Line (Agent DB Load)
      let nextValB = 0;
      setValueB((prev) => {
        nextValB = prev + (Math.random() - 0.5) * 8;
        nextValB = Math.max(20, Math.min(nextValB, 200));
        setDataB((currentDataB) => {
          const lastTime = currentDataB.length > 0 ? currentDataB[currentDataB.length - 1].time : newTime - 1;
          return [...currentDataB, { time: Math.max(newTime, lastTime + 1), value: nextValB }];
        });
        return nextValB;
      });

      // Candles (Query Execution Windows)
      setLiveCandle((prevCandle) => {
        const cTime = Math.floor(newTime / candleWidth) * candleWidth;
        if (prevCandle.time !== cTime && prevCandle.time !== 0) {
           setCandles(c => [...c, prevCandle]);
           return { time: cTime, open: nextVal, high: nextVal, low: nextVal, close: nextVal };
        } else {
           return {
              time: prevCandle.time === 0 ? cTime : prevCandle.time,
              open: prevCandle.time === 0 ? nextVal : prevCandle.open,
              high: Math.max(prevCandle.high, nextVal),
              low: prevCandle.time === 0 ? nextVal : Math.min(prevCandle.low, nextVal),
              close: nextVal
           };
        }
      });

      // Orderbook (Connection Pool Depth Simulation)
      setOrderbook({
        bids: Array.from({length: 6}).map((_, i) => [nextVal - (i+1)* 1.2, Math.random() * 50 + 10] as [number, number]),
        asks: Array.from({length: 6}).map((_, i) => [nextVal + (i+1)* 1.2, Math.random() * 50 + 10] as [number, number]),
      });

    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Get last 50 data points for table, newest at the bottom
  const tableData = data.slice(-50);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      // Defer scrolling until after the browser paints the new row to prevent layout jumping
      requestAnimationFrame(() => {
        if (scrollRef.current) {
          scrollRef.current.scrollTo({
            top: scrollRef.current.scrollHeight,
            behavior: 'smooth'
          });
        }
      });
    }
  }, [data]);

  return (
    <div className="w-full flex flex-col gap-8">
      <style>{`
        @keyframes row-slide-in {
          0% { opacity: 0; transform: translateY(10px) scale(0.98); background-color: hsl(var(--primary) / 0.1); }
          100% { opacity: 1; transform: translateY(0) scale(1); background-color: transparent; }
        }
        .animate-row-slide {
          animation: row-slide-in 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
      <div className="flex items-center gap-3 w-full">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15 text-primary shrink-0">
          <Database className="size-6" />
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight flex items-center gap-2.5">
            AI Analytics Engine DB
            <span className="flex h-2.5 w-2.5 rounded-full bg-green-500 animate-pulse shrink-0 self-center translate-y-[1px]"></span>
          </h2>
          <p className="text-sm text-muted-foreground truncate">Real-time vector operations and sub-second query execution</p>
        </div>
      </div>
      
      {/* Table Above */}
      <div className="w-full">
        <div ref={scrollRef} className="overflow-y-auto overflow-x-auto max-h-[350px] scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden border border-border/40 rounded-2xl bg-card/5 shadow-inner backdrop-blur-3xl">
          <table className="w-full text-sm text-left relative">
            <thead className="text-[10px] text-muted-foreground uppercase sticky top-0 bg-card/50 backdrop-blur-2xl border-b border-border/30 z-10 shadow-sm">
              <tr>
                <th className="px-6 py-4 font-bold tracking-widest opacity-70">Timestamp</th>
                <th className="px-6 py-4 font-bold tracking-widest opacity-70">Latency</th>
                <th className="px-6 py-4 font-bold tracking-widest opacity-70">Jitter</th>
                <th className="px-6 py-4 font-bold tracking-widest opacity-70">Operation Log</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((point, i) => {
                const prevPoint = i === 0 
                  ? (data.length > 50 ? data[data.length - 51] : null) 
                  : tableData[i - 1];
                const isUp = prevPoint ? point.value >= prevPoint.value : false;
                
                // Deterministic operation name based on timestamp
                const operations = ["Vector Indexing", "Semantic Search", "Cache Hit", "RAG Pipeline", "DuckDB Aggregation"];
                const opName = operations[point.time % operations.length];

                return (
                  <tr key={point.time} className="border-b border-border/20 last:border-0 hover:bg-primary/5 transition-colors group animate-row-slide">
                    <td className="px-6 py-3 tabular-nums font-mono text-[11px] text-muted-foreground group-hover:text-primary transition-colors">
                      <span className="mr-2 opacity-40">•</span>
                      {new Date(point.time * 1000).toLocaleTimeString([], { hour12: false, hour: '2-digit', minute:'2-digit', second:'2-digit' })}
                    </td>
                    <td className="px-6 py-3 tabular-nums font-medium text-[13px]">
                      {point.value.toFixed(1)} ms
                    </td>
                    <td className="px-6 py-3">
                      <span className={`inline-flex items-center font-semibold text-[11px] ${isUp ? 'text-amber-500' : 'text-emerald-500'}`}>
                        {isUp ? <ArrowUpRight className="size-2.5 mr-1" /> : <ArrowDownRight className="size-2.5 mr-1" />}
                        {isUp ? '+' : ''}{prevPoint ? (point.value - prevPoint.value).toFixed(1) : '0.0'} ms
                      </span>
                    </td>
                    <td className="px-6 py-3">
                      <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-bold tracking-widest uppercase bg-primary/10 text-primary border border-primary/20 shadow-sm opacity-80 group-hover:opacity-100 transition-opacity">
                        {opName}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Dynamic Main Chart Area */}
      <div className="w-full flex flex-col gap-5">
        {/* Tab Controls */}
        <div className="flex flex-wrap items-center gap-2 bg-card/40 border border-border/40 p-2 rounded-2xl w-fit shadow-sm backdrop-blur-md relative z-20">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all duration-300 flex items-center gap-2 tracking-wide ${
                activeTab === tab.id 
                  ? 'bg-primary/10 text-primary shadow-sm ring-1 ring-primary/30' 
                  : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground hover:shadow-sm'
              }`}
            >
              {tab.id === 'crypto' && activeTab === 'crypto' && <Cpu className="size-3 text-purple-500 animate-pulse" />}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Selected Chart Canvas */}
        <div className="border border-border/60 bg-background/50 rounded-2xl p-6 shadow-xl backdrop-blur-sm">
          <div style={{ height: 400 }} className="w-full relative">
            {activeTab === 'line' && (
              <Liveline 
                data={data} value={value} 
                loading={isConnecting}
                color="#3b82f6" theme="dark" badgeVariant="minimal"
                showValue grid pulse scrub
                referenceLine={data.length > 0 ? { value: 120, label: 'SLA Limit' } : undefined}
                formatValue={(v) => v.toFixed(1) + 'ms'}
                windows={[{ label: '30s', secs: 30 }, { label: '1m', secs: 60 }, { label: '2m', secs: 120 }]}
              />
            )}
            {activeTab === 'candle' && (
              <Liveline 
                mode="candle" data={data} value={value}
                loading={isConnecting}
                candles={candles} liveCandle={liveCandle} candleWidth={10}
                lineMode={showLine} lineData={data} lineValue={value}
                onModeChange={(mode) => setShowLine(mode === 'line')}
                color="#f7931a" theme="dark" badgeVariant="minimal" showValue 
                formatValue={(v) => v.toFixed(1) + 'ms'}
                windows={[{ label: '1m', secs: 60 }, { label: '2m', secs: 120 }, { label: '5m', secs: 300 }]}
              />
            )}
            {activeTab === 'multiseries' && (
              <Liveline 
                data={[]} value={0} grid scrub pulse
                loading={isConnecting}
                series={[
                  { id: 'main', data: data, value: value, color: '#3b82f6', label: 'Semantic Agent' },
                  { id: 'secondary', data: dataB, value: valueB, color: '#ef4444', label: 'DuckDB Thread' },
                ]}
                theme="dark"
                windowStyle="rounded"
                seriesToggleCompact={false}
                formatValue={(v) => v.toFixed(1) + 'ms'}
                windows={[{ label: '30s', secs: 30 }, { label: '1m', secs: 60 }]}
              />
            )}
            {activeTab === 'crypto' && (
              <Liveline 
                data={data} value={value} 
                loading={isConnecting}
                color="#8b5cf6" theme="dark" badgeVariant="minimal"
                exaggerate degen showValue valueMomentumColor
                formatValue={(v) => v.toFixed(1) + 'ms'}
                windows={[{ label: '15s', secs: 15 }, { label: '30s', secs: 30 }]}
              />
            )}
            {activeTab === 'orderbook' && (
              <Liveline 
                data={data} value={value} 
                loading={isConnecting}
                color="#10b981" theme="dark" badgeVariant="minimal"
                orderbook={orderbook} degen showValue scrub
                valueMomentumColor badgeTail={false}
                formatValue={(v) => v.toFixed(1) + 'ms'}
                windows={[{ label: '15s', secs: 15 }, { label: '30s', secs: 30 }]}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
