
import React, { useId } from 'react';
import { 
  Globe, Server, Box, Database, 
  User, Shield, Hash, Cpu, MessageSquare, 
  Cloud, Activity, ArrowDown, CheckCircle, HardDrive,
  Zap, Search, Brain, Play, Save,
  Terminal, Code, BarChart
} from 'lucide-react';

const CYCLE_DUR = 8;
const DIM_OPACITY = 0.1;
const BRIGHT_OPACITY = 1.0;

// Helper for step-based animation keyframes
function sequenceKeyframes(stepIndex: number, totalSteps: number) {
  const stepSize = 1 / totalSteps;
  const start = stepIndex * stepSize;
  const end = (stepIndex + 1) * stepSize;
  const ramp = 0.04;
  
  return {
    keyTimes: `0; ${Math.max(0, start - ramp).toFixed(3)}; ${start.toFixed(3)}; ${end.toFixed(3)}; ${Math.min(1, end + ramp).toFixed(3)}; 1`,
    values: `${DIM_OPACITY}; ${DIM_OPACITY}; ${BRIGHT_OPACITY}; ${BRIGHT_OPACITY}; ${DIM_OPACITY}; ${DIM_OPACITY}`,
  };
}

// Animated data flow line with moving particle
const AnimatedDataFlow: React.FC<{
  path: string;
  delay?: number;
  duration?: number;
  color?: string;
}> = ({ path, delay = 0, duration = 3 }) => {
  return (
    <g className="text-indigo-500/20 dark:text-indigo-400/10">
      <path d={path} stroke="currentColor" strokeWidth="1.5" fill="none" strokeDasharray="4 4" />
      <circle r="2" className="fill-indigo-500 dark:fill-indigo-400">
        <animateMotion
          path={path}
          dur={`${duration}s`}
          begin={`${delay}s`}
          repeatCount="indefinite"
        />
        <animate
          attributeName="opacity"
          values="0; 1; 1; 0"
          keyTimes="0; 0.1; 0.9; 1"
          dur={`${duration}s`}
          begin={`${delay}s`}
          repeatCount="indefinite"
        />
      </circle>
    </g>
  );
};

// Reusable Node component with Icon and Step logic
const Node: React.FC<{
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  stepIndex: number;
  totalSteps: number;
  icon: React.ElementType;
}> = ({ x, y, w, h, label, stepIndex, totalSteps, icon: Icon }) => {
  const { keyTimes, values } = sequenceKeyframes(stepIndex, totalSteps);
  
  return (
    <g transform={`translate(${x}, ${y})`}>
      {/* Background Card */}
      <rect
        width={w}
        height={h}
        rx="8"
        className="fill-white dark:fill-slate-950 stroke-slate-200 dark:stroke-slate-800"
        strokeWidth="1"
      />
      
      {/* Animated Active State Border */}
      <rect
        width={w}
        height={h}
        rx="8"
        fill="none"
        strokeWidth="1.5"
        className="stroke-indigo-500 dark:stroke-indigo-400"
        opacity={0}
      >
        <animate attributeName="opacity" keyTimes={keyTimes} values={values} dur={`${CYCLE_DUR}s`} repeatCount="indefinite" />
      </rect>

      {/* Icon and Label Content */}
      <g transform={`translate(${w / 2}, ${h / 2 - 4})`}>
        <g transform="translate(-10, -14)">
          <Icon size={20} className="text-slate-400 dark:text-slate-600 transition-colors">
            <animate attributeName="color" values="currentColor; #6366f1; #6366f1; currentColor" keyTimes={keyTimes} dur={`${CYCLE_DUR}s`} repeatCount="indefinite" />
          </Icon>
        </g>
        <text
          y={18}
          textAnchor="middle"
          fontSize="9"
          fontWeight="600"
          className="fill-slate-400 dark:fill-slate-500 uppercase tracking-tighter select-none"
        >
          {label}
          <animate attributeName="fill" values="currentColor; #6366f1; #6366f1; currentColor" keyTimes={keyTimes} dur={`${CYCLE_DUR}s`} repeatCount="indefinite" />
        </text>
      </g>
    </g>
  );
};

export const DuckDBFlowIllustration: React.FC = () => (
  <svg viewBox="0 0 440 120" className="w-full h-auto overflow-visible">
    <Node x={10} y={30} w={70} h={60} label="Browser" icon={Globe} stepIndex={0} totalSteps={4} />
    <AnimatedDataFlow path="M80 60 L120 60" delay={0} duration={2} />
    
    <Node x={125} y={30} w={70} h={60} label="Express" icon={Server} stepIndex={1} totalSteps={4} />
    <AnimatedDataFlow path="M195 60 L235 60" delay={2} duration={2} />
    
    <Node x={240} y={30} w={70} h={60} label="Node.js" icon={Box} stepIndex={2} totalSteps={4} />
    <AnimatedDataFlow path="M310 60 L350 60" delay={4} duration={2} />
    
    <Node x={355} y={30} w={70} h={60} label="DuckDB" icon={Database} stepIndex={3} totalSteps={4} />
  </svg>
);

export const RAGFlowIllustration: React.FC = () => (
  <svg viewBox="0 0 500 180" className="w-full h-auto overflow-visible">
    <Node x={10} y={20} w={65} h={55} label="User" icon={User} stepIndex={0} totalSteps={6} />
    <AnimatedDataFlow path="M75 47.5 L100 47.5" delay={0} duration={1.3} />
    
    <Node x={105} y={20} w={65} h={55} label="Proxy" icon={Shield} stepIndex={1} totalSteps={6} />
    <AnimatedDataFlow path="M170 47.5 L195 47.5" delay={1.3} duration={1.3} />
    
    <Node x={200} y={20} w={65} h={55} label="Embed" icon={Hash} stepIndex={2} totalSteps={6} />
    <AnimatedDataFlow path="M265 47.5 L290 47.5" delay={2.6} duration={1.3} />
    
    <Node x={295} y={20} w={65} h={55} label="Vector" icon={Database} stepIndex={3} totalSteps={6} />
    <AnimatedDataFlow path="M360 47.5 L385 47.5" delay={3.9} duration={1.3} />
    
    <Node x={390} y={20} w={65} h={55} label="LLM" icon={Cpu} stepIndex={4} totalSteps={6} />
    <AnimatedDataFlow path="M422 75 L422 105" delay={5.2} duration={1.3} />
    
    <Node x={105} y={110} w={350} h={45} label="Response" icon={MessageSquare} stepIndex={5} totalSteps={6} />
  </svg>
);

export const DataIngestionIllustration: React.FC = () => (
  <svg viewBox="0 0 500 240" className="w-full h-auto overflow-visible">
    {/* Sources with increased vertical spacing */}
    <Node x={10} y={20} w={75} h={55} label="S3 Buckets" icon={Cloud} stepIndex={0} totalSteps={4} />
    <Node x={10} y={90} w={75} h={55} label="SQL DBs" icon={Database} stepIndex={0} totalSteps={4} />
    <Node x={10} y={160} w={75} h={55} label="Live Stream" icon={Activity} stepIndex={0} totalSteps={4} />
    
    {/* Curved Paths Converging */}
    <AnimatedDataFlow path="M85 47.5 Q 150 47.5, 175 117.5" delay={0} duration={2} />
    <AnimatedDataFlow path="M85 117.5 L175 117.5" delay={0.5} duration={1.5} />
    <AnimatedDataFlow path="M85 187.5 Q 150 187.5, 175 117.5" delay={1} duration={2} />
    
    {/* Processing Pipeline */}
    <Node x={180} y={90} w={85} h={55} label="Unified" icon={ArrowDown} stepIndex={1} totalSteps={4} />
    <AnimatedDataFlow path="M265 117.5 L300 117.5" delay={2} duration={2} />
    
    <Node x={305} y={90} w={80} h={55} label="Validate" icon={CheckCircle} stepIndex={2} totalSteps={4} />
    <AnimatedDataFlow path="M385 117.5 L420 117.5" delay={4} duration={2} />
    
    <Node x={425} y={90} w={70} h={55} label="Warehouse" icon={HardDrive} stepIndex={3} totalSteps={4} />
  </svg>
);

export const AgentWorkflowIllustration: React.FC = () => {
  const steps = [
    { label: "Trigger", icon: Zap },
    { label: "Search", icon: Search },
    { label: "Think", icon: Brain },
    { label: "Action", icon: Play },
    { label: "Persist", icon: Save },
  ];
  return (
    <svg viewBox="0 0 540 180" className="w-full h-auto overflow-visible">
      {steps.map((step, i) => (
        <React.Fragment key={i}>
          <Node x={10 + i * 105} y={40} w={85} h={65} label={step.label} icon={step.icon} stepIndex={i} totalSteps={5} />
          {i < steps.length - 1 && (
            <AnimatedDataFlow 
              path={`M${10 + i * 105 + 85} 72.5 L${10 + (i + 1) * 105} 72.5`} 
              delay={i * 1.6} 
              duration={1.6}
            />
          )}
        </React.Fragment>
      ))}
      {/* Feedback loop with cleaner dash */}
      <path d="M500 105 Q 500 150, 270 150 Q 52 150, 52 105" stroke="currentColor" strokeWidth="1" fill="none" className="text-slate-200 dark:text-slate-800" strokeDasharray="3 6" />
    </svg>
  );
};

export const NotebookIllustration: React.FC = () => {
  const { keyTimes: k0t, values: k0v } = sequenceKeyframes(0, 3);
  const { keyTimes: k1t, values: k1v } = sequenceKeyframes(1, 3);
  const { keyTimes: k2t, values: k2v } = sequenceKeyframes(2, 3);

  return (
    <svg viewBox="0 0 600 240" className="w-full h-auto overflow-visible">
      <rect x="10" y="10" width="580" height="220" rx="10" className="fill-white dark:fill-slate-950 stroke-slate-200 dark:stroke-slate-800" strokeWidth="1" />
      
      {/* Cell 1 */}
      <g transform="translate(30, 30)">
        <rect width="540" height="45" rx="6" className="fill-slate-50 dark:fill-slate-900 stroke-slate-200 dark:stroke-slate-800" />
        <Terminal x={12} y={14} size={16} className="text-slate-400" />
        <text x="40" y="27" fontSize="11" className="fill-slate-600 dark:fill-slate-400 font-mono tracking-tight">import duckdb; conn = duckdb.connect('docs.db')</text>
        <rect width="3" height="45" rx="1.5" className="fill-indigo-500" opacity={0}>
          <animate attributeName="opacity" keyTimes={k0t} values={k0v} dur={`${CYCLE_DUR}s`} repeatCount="indefinite" />
        </rect>
      </g>
      
      {/* Cell 2 */}
      <g transform="translate(30, 90)">
        <rect width="540" height="45" rx="6" className="fill-slate-50 dark:fill-slate-900 stroke-slate-200 dark:stroke-slate-800" />
        <Code x={12} y={14} size={16} className="text-slate-400" />
        <text x="40" y="27" fontSize="11" className="fill-slate-600 dark:fill-slate-400 font-mono tracking-tight">conn.execute("SELECT category, count(*) FROM data GROUP BY 1").df()</text>
        <rect width="3" height="45" rx="1.5" className="fill-indigo-500" opacity={0}>
          <animate attributeName="opacity" keyTimes={k1t} values={k1v} dur={`${CYCLE_DUR}s`} repeatCount="indefinite" />
        </rect>
      </g>
      
      {/* Output */}
      <g transform="translate(30, 150)">
        <rect width="540" height="65" rx="6" className="fill-indigo-50/50 dark:fill-indigo-950/20 stroke-indigo-100 dark:stroke-indigo-900/50" opacity={0}>
          <animate attributeName="opacity" keyTimes={k2t} values={k2v} dur={`${CYCLE_DUR}s`} repeatCount="indefinite" />
        </rect>
        <BarChart x={20} y={15} size={30} className="text-indigo-500/40" />
        <rect x="70" y="18" width="200" height="6" rx="3" className="fill-indigo-200/50 dark:fill-indigo-900/50" />
        <rect x="70" y="32" width="140" height="6" rx="3" className="fill-indigo-100/50 dark:fill-indigo-950/50" />
      </g>
    </svg>
  );
};
