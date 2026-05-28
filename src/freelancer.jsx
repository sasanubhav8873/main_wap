import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip as RechartsTooltip, 
  CartesianGrid, 
  BarChart, 
  Bar, 
  Cell, 
  PieChart, 
  Pie 
} from "recharts";
import { 
  Globe, 
  Star, 
  Shield, 
  Search as SearchIcon, 
  Bell, 
  MessageSquare, 
  Send, 
  Paperclip, 
  CheckCheck, 
  Circle, 
  TrendingUp, 
  FileText,
  DollarSign,
  Briefcase,
  Award,
  Clock,
  Sparkles,
  Users,
  CheckCircle,
  Menu,
  ChevronRight,
  Info,
  ExternalLink,
  ChevronLeft,
  Eye,
  File
} from "lucide-react";

/* ── Inline SVG brand icons (Lucide brand fallbacks) ── */
const Github = ({ size = 16, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const Linkedin = ({ size = 16, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);


/* ── Inline styles extending the CSS design system ── */
const G = {
  bg: "#0F1115",
  surface: "#171A21",
  surface2: "#1D2029",
  border: "#262B36",
  borderSubtle: "rgba(38,43,54,0.6)",
  text1: "#F5F7FA",
  text2: "#9AA4B2",
  text3: "rgba(154,164,178,0.5)",
  blue: "#5B8CFF",
  blueGlow: "rgba(91,140,255,0.15)",
  blueBorder: "rgba(91,140,255,0.25)",
  green: "#4FAF8F",
  greenGlow: "rgba(79,175,143,0.15)",
  greenBorder: "rgba(79,175,143,0.25)",
  amber: "#F5A623",
  amberGlow: "rgba(245,166,35,0.15)",
  amberBorder: "rgba(245,166,35,0.25)",
  red: "#FF6B6B",
  redGlow: "rgba(255,107,107,0.15)",
  redBorder: "rgba(255,107,107,0.25)",
};

const font = { sora: "'Sora', sans-serif", dm: "'DM Sans', sans-serif" };

/* ── SVG Icons (Fallback) ── */
const Icon = {
  shield: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  briefcase: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  ),
  dollar: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="1" x2="12" y2="23" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  ),
  clock: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  check: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  upload: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 16 12 12 8 16" />
      <line x1="12" y1="12" x2="12" y2="21" />
      <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
    </svg>
  ),
  trending: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  ),
  bell: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  ),
  search: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  ),
  award: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="6" />
      <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
    </svg>
  ),
  zap: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
  arrow: (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  ),
  eye: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  wallet: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4" />
      <path d="M4 6v12c0 1.1.9 2 2 2h14v-4" />
      <path d="M18 12a2 2 0 0 0 0 4h4v-4z" />
    </svg>
  ),
  user: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
  lock: (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  ),
  dots: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="12" cy="5" r="1"/>
      <circle cx="12" cy="12" r="1"/>
      <circle cx="12" cy="19" r="1"/>
    </svg>
  ),
};

/* ── Data ── */
const MY_WORK_PROJECTS = [
  {
    id: 1,
    title: "E-Commerce Redesign",
    client: "Nexus Digital",
    escrow: "3,486 Tokens",
    due: "Jun 12",
    progress: 72,
    milestone: "UI Prototype",
    status: "active",
    yield: "+15.27 Tokens",
  },
  {
    id: 2,
    title: "Mobile App MVP",
    client: "Startup Labs",
    escrow: "7,055 Tokens",
    due: "Jun 28",
    progress: 38,
    milestone: "Backend API",
    status: "active",
    yield: "+30.88 Tokens",
  },
  {
    id: 3,
    title: "Brand Identity Kit",
    client: "Bloom Co.",
    escrow: "1,494 Tokens",
    due: "May 30",
    progress: 90,
    milestone: "Final Delivery",
    status: "review",
    yield: "+6.56 Tokens",
  },
  {
    id: 4,
    title: "SaaS Landing Page",
    client: "Orbit Stack",
    escrow: "2,075 Tokens",
    due: "Apr 18",
    progress: 100,
    milestone: "Project Completed",
    status: "completed",
    yield: "+11.20 Tokens",
  },
];

const EXPLORE_PROJECTS = [
  {
    id: 101,
    title: "Fintech Mobile App UI",
    client: "RupeeFlow",
    budget: "4,800 Tokens",
    duration: "6 weeks",
    skills: "Figma · Design System · Mobile UI",
  },
  {
    id: 102,
    title: "React Admin Dashboard",
    client: "CloudMint",
    budget: "3,200 Tokens",
    duration: "4 weeks",
    skills: "React · Charts · API Integration",
  },
  {
    id: 103,
    title: "Brand Identity Package",
    client: "Studio Bloom",
    budget: "1,750 Tokens",
    duration: "3 weeks",
    skills: "Logo · Typography · Brand Guide",
  },
  {
    id: 104,
    title: "E-commerce Checkout Revamp",
    client: "CartNest",
    budget: "2,900 Tokens",
    duration: "5 weeks",
    skills: "UX Audit · Prototyping · Conversion",
  },
];

const MILESTONES = [
  { label: "Submit UI Prototype", project: "E-Commerce Redesign", due: "Jun 5", done: false, pct: 35 },
  { label: "API Integration", project: "Mobile App MVP", due: "Jun 8", done: false, pct: 20 },
  { label: "Final Brand Kit", project: "Brand Identity Kit", due: "May 30", done: false, pct: 90 },
  { label: "Wireframes Approved", project: "E-Commerce Redesign", due: "May 22", done: true, pct: 100 },
];

const NAV = [
  { icon: Icon.briefcase, label: "My Work", id: "mywork" },
  { icon: Icon.search, label: "Explore", id: "explore" },
  { icon: <MessageSquare size={15} />, label: "Messages", id: "messages", badge: 1 },
  { icon: Icon.dollar, label: "Earnings", id: "earnings" },
  { icon: Icon.award, label: "Profile", id: "profile" },
];

const MOCK_CHATS_INIT = [
  {
    id: 1,
    name: "Alex Rivera (Nexus Digital)",
    avatarColor: "linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%)",
    role: "Product Owner",
    online: true,
    lastSeen: "Active now",
    messages: [
      { sender: "client", text: "Hey! Just reviewed the milestone mockup. It looks awesome!", time: "10:30 AM" },
      { sender: "me", text: "Thanks Alex! Glad you liked the UI prototype. I'm starting on the interaction logic today.", time: "10:32 AM" },
      { sender: "client", text: "Perfect. Do you think we can wrap up the billing integrations by next week?", time: "10:35 AM" }
    ],
    unreadCount: 1,
    typing: false
  },
  {
    id: 2,
    name: "Sarah Chen (Startup Labs)",
    avatarColor: "linear-gradient(135deg, #4FAF8F 0%, #34D399 100%)",
    role: "Engineering Lead",
    online: false,
    lastSeen: "Active 2h ago",
    messages: [
      { sender: "me", text: "Hi Sarah, the API endpoints for the authentication module are now live on staging.", time: "Yesterday" },
      { sender: "client", text: "Awesome work! Let me run the end-to-end tests and I will approve the escrow release.", time: "Yesterday" }
    ],
    unreadCount: 0,
    typing: false
  },
  {
    id: 3,
    name: "Michael K. (Bloom Co.)",
    avatarColor: "linear-gradient(135deg, #5B8CFF 0%, #7BA7FF 100%)",
    role: "CEO",
    online: true,
    lastSeen: "Active now",
    messages: [
      { sender: "client", text: "Could you send over the final brand identity vector exports when ready?", time: "2 days ago" },
      { sender: "me", text: "Yes, uploading them to the escrow dashboard for review shortly.", time: "2 days ago" }
    ],
    unreadCount: 0,
    typing: false
  }
];

/* ── Sub-components ── */

function Badge({ color, children }) {
  const colors = {
    blue: { bg: G.blueGlow, c: G.blue, border: G.blueBorder },
    green: { bg: G.greenGlow, c: G.green, border: G.greenBorder },
    amber: { bg: G.amberGlow, c: G.amber, border: G.amberBorder },
    red: { bg: G.redGlow, c: G.red, border: G.redBorder },
  };
  const s = colors[color] || colors.blue;
  return (
    <span style={{
      fontSize: 10,
      fontWeight: 600,
      padding: "3px 9px",
      borderRadius: 100,
      letterSpacing: "0.05em",
      textTransform: "uppercase",
      background: s.bg,
      color: s.c,
      border: `1px solid ${s.border}`,
      whiteSpace: "nowrap",
    }}>
      {children}
    </span>
  );
}

function ProgressBar({ value, color = G.blue }) {
  return (
    <div style={{
      width: "100%",
      height: 4,
      borderRadius: 99,
      background: "rgba(38,43,54,0.9)",
      overflow: "hidden",
    }}>
      <div style={{
        width: `${value}%`,
        height: "100%",
        borderRadius: 99,
        background: `linear-gradient(90deg, ${color}, ${color}cc)`,
        transition: "width 0.6s ease",
        boxShadow: `0 0 8px ${color}55`,
      }} />
    </div>
  );
}

function StatCard({ icon, label, value, sub, color = "blue", delay = 0 }) {
  const [hov, setHov] = useState(false);
  const c = color === "green" ? G.green : color === "amber" ? G.amber : G.blue;
  const bg = color === "green" ? G.greenGlow : color === "amber" ? G.amberGlow : G.blueGlow;
  const bd = color === "green" ? G.greenBorder : color === "amber" ? G.amberBorder : G.blueBorder;
  const glowClass = `stat-card-glow-${color}`;

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className={glowClass}
      style={{
        background: G.surface,
        border: `1px solid ${hov ? bd : G.border}`,
        borderRadius: 16,
        padding: "20px 22px",
        display: "flex",
        flexDirection: "column",
        gap: 14,
        transition: "border-color 0.22s ease, box-shadow 0.22s ease",
        boxShadow: hov
          ? `0 8px 32px rgba(0,0,0,0.45), 0 0 20px ${bg}`
          : "0 4px 16px rgba(0,0,0,0.3)",
        animation: `fadeSlideUp 0.65s ${delay}s ease both`,
        cursor: "default",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{
          width: 34, height: 34, borderRadius: 8,
          background: bg, color: c, border: `1px solid ${bd}`,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          {icon}
        </div>
        <span style={{
          fontSize: 11, fontWeight: 500, color: G.text2,
          letterSpacing: "0.05em", textTransform: "uppercase",
        }}>{label}</span>
      </div>
      <div>
        <div style={{
          fontFamily: font.sora, fontSize: 26, fontWeight: 700,
          color: G.text1, letterSpacing: "-0.03em", lineHeight: 1.1,
        }}>{value}</div>
        <div style={{ fontSize: 12, color: G.text2, marginTop: 4 }}>{sub}</div>
      </div>
    </div>
  );
}

function ProjectCard({ p, delay }) {
  const [hov, setHov] = useState(false);
  const [submitHov, setSubmitHov] = useState(false);
  const statusColor = p.status === "review" ? "amber" : p.status === "completed" ? "green" : "blue";
  const statusLabel = p.status === "review" ? "In Review" : p.status === "completed" ? "Completed" : "Ongoing";

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: G.surface,
        border: `1px solid ${hov ? G.blueBorder : G.border}`,
        borderRadius: 16,
        padding: "20px 22px",
        display: "flex",
        flexDirection: "column",
        gap: 16,
        transition: "border-color 0.22s ease, box-shadow 0.22s ease",
        boxShadow: hov
          ? "0 12px 40px rgba(0,0,0,0.5), 0 0 24px rgba(91,140,255,0.1)"
          : "0 4px 16px rgba(0,0,0,0.3)",
        animation: `fadeSlideUp 0.65s ${delay}s ease both`,
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
        <div>
          <div style={{
            fontFamily: font.sora, fontSize: 15, fontWeight: 600,
            color: G.text1, letterSpacing: "-0.02em", marginBottom: 3,
          }}>{p.title}</div>
          <div style={{ fontSize: 12, color: G.text2 }}>
            <span style={{ color: G.text3 }}>Client: </span>{p.client}
          </div>
        </div>
        <Badge color={statusColor}>{statusLabel}</Badge>
      </div>

      {/* Progress */}
      <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 11.5, color: G.text2, fontWeight: 500 }}>
            {Icon.clock}&nbsp;{p.milestone}
          </span>
          <span style={{ fontFamily: font.sora, fontSize: 12, fontWeight: 700, color: G.text1 }}>
            {p.progress}%
          </span>
        </div>
        <ProgressBar value={p.progress} color={p.status === "review" ? G.amber : p.status === "completed" ? G.green : G.blue} />
      </div>

      {/* Escrow row */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: G.surface2, borderRadius: 10, padding: "11px 14px",
        border: `1px solid ${G.border}`,
      }}>
        <div>
          <div style={{ fontSize: 10.5, color: G.text3, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 2 }}>
            Escrow Locked
          </div>
          <div style={{ fontFamily: font.sora, fontSize: 16, fontWeight: 700, color: G.text1 }}>
            {p.escrow}
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 10.5, color: G.text3, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 2 }}>
            Yield Earned
          </div>
          <div style={{ fontFamily: font.sora, fontSize: 14, fontWeight: 700, color: G.green }}>
            {p.yield}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
        <span style={{ fontSize: 11.5, color: G.text2 }}>
          <span style={{ color: G.text3 }}>Due: </span>{p.due}
        </span>
        {p.status !== "completed" && <button
          onMouseEnter={() => setSubmitHov(true)}
          onMouseLeave={() => setSubmitHov(false)}
          style={{
            display: "flex", alignItems: "center", gap: 6,
            padding: "7px 14px", borderRadius: 8,
            background: submitHov ? G.blue : "transparent",
            border: `1px solid ${submitHov ? G.blue : G.blueBorder}`,
            color: submitHov ? "#fff" : G.blue,
            fontSize: 12, fontWeight: 600,
            fontFamily: font.dm,
            transition: "all 0.22s ease",
            cursor: "pointer",
          }}
        >
          {Icon.upload} Submit Work
        </button>}
      </div>
    </div>
  );
}

function ExploreProjectCard({ p, delay }) {
  const [hov, setHov] = useState(false);

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: G.surface,
        border: `1px solid ${hov ? G.blueBorder : G.border}`,
        borderRadius: 16,
        padding: "20px 22px",
        display: "flex",
        flexDirection: "column",
        gap: 16,
        transition: "border-color 0.22s ease, box-shadow 0.22s ease",
        boxShadow: hov ? "0 12px 40px rgba(0,0,0,0.5)" : "0 4px 16px rgba(0,0,0,0.3)",
        animation: `fadeSlideUp 0.65s ${delay}s ease both`,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
        <div>
          <div style={{ fontFamily: font.sora, fontSize: 15, fontWeight: 600, marginBottom: 3 }}>
            {p.title}
          </div>
          <div style={{ fontSize: 12, color: G.text2 }}>
            <span style={{ color: G.text3 }}>Client: </span>{p.client}
          </div>
        </div>
        <Badge color="green">Open</Badge>
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
        gap: 12,
        background: G.surface2,
        border: `1px solid ${G.border}`,
        borderRadius: 10,
        padding: "12px 14px",
      }}>
        <div>
          <div style={{ fontSize: 10.5, color: G.text3, textTransform: "uppercase", marginBottom: 3 }}>Budget</div>
          <div style={{ fontFamily: font.sora, fontWeight: 700 }}>{p.budget}</div>
        </div>
        <div>
          <div style={{ fontSize: 10.5, color: G.text3, textTransform: "uppercase", marginBottom: 3 }}>Duration</div>
          <div style={{ fontFamily: font.sora, fontWeight: 700 }}>{p.duration}</div>
        </div>
      </div>

      <div style={{ fontSize: 12, color: G.text2 }}>{p.skills}</div>

      <button style={{
        alignSelf: "flex-start",
        padding: "8px 14px",
        borderRadius: 8,
        border: `1px solid ${G.blueBorder}`,
        color: G.blue,
        fontSize: 12,
        fontWeight: 600,
      }}>
        Apply Now
      </button>
    </div>
  );
}

function MilestoneRow({ m, idx }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "flex", alignItems: "center", gap: 14,
        padding: "12px 14px",
        borderRadius: 10,
        background: hov ? "rgba(91,140,255,0.04)" : "transparent",
        border: `1px solid ${hov ? G.blueBorder : "transparent"}`,
        transition: "all 0.22s ease",
        animation: `fadeSlideUp 0.6s ${0.4 + idx * 0.08}s ease both`,
      }}
    >
      <div style={{
        width: 22, height: 22, borderRadius: "50%",
        display: "flex", alignItems: "center", justifyContent: "center",
        flexShrink: 0,
        background: m.done ? G.greenGlow : G.blueGlow,
        border: `1.5px solid ${m.done ? G.greenBorder : G.blueBorder}`,
        color: m.done ? G.green : G.blue,
      }}>
        {m.done ? Icon.check : <span style={{ fontSize: 9, fontWeight: 700 }}>{m.pct}%</span>}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontSize: 13, fontWeight: 500, color: m.done ? G.text2 : G.text1,
          textDecoration: m.done ? "line-through" : "none",
          whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
        }}>{m.label}</div>
        <div style={{ fontSize: 11, color: G.text3, marginTop: 1 }}>{m.project}</div>
      </div>
      <div style={{ fontSize: 11, color: G.text2, whiteSpace: "nowrap" }}>
        {m.done ? <Badge color="green">Done</Badge> : <span style={{ color: G.amber }}>{m.due}</span>}
      </div>
    </div>
  );
}

/* ── Freelancer Profile Card Component (Right Sidebar) ── */
function FreelancerProfileCard({ name }) {
  const skills = ["React", "Node.js", "Solidity", "TypeScript", "UI/UX", "TailwindCSS"];
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -4 }}
      className="profile-card-glow"
      style={{
        background: "rgba(23, 26, 33, 0.6)",
        backdropFilter: "blur(16px) saturate(1.2)",
        WebkitBackdropFilter: "blur(16px) saturate(1.2)",
        border: `1px solid ${G.border}`,
        borderRadius: 20,
        padding: 24,
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255,255,255,0.02) inset",
        display: "flex",
        flexDirection: "column",
        gap: 18,
        position: "relative",
        overflow: "hidden"
      }}
    >
      <div style={{
        position: "absolute",
        top: -40,
        right: -40,
        width: 120,
        height: 120,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(91, 140, 255, 0.15) 0%, transparent 70%)",
        pointerEvents: "none"
      }} />

      <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
        <div style={{ position: "relative" }}>
          <div style={{
            width: 58,
            height: 58,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #5B8CFF 0%, #4FAF8F 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 20,
            fontWeight: 800,
            color: "#fff",
            boxShadow: "0 4px 16px rgba(91,140,255,0.3)"
          }}>
            {name ? name.split(" ").map(n => n[0]).join("").toUpperCase().substring(0, 2) : "FL"}
          </div>
          <div 
            title="Available for Work"
            style={{
              position: "absolute",
              bottom: 1,
              right: 1,
              width: 13,
              height: 13,
              borderRadius: "50%",
              background: "#4FAF8F",
              border: `2.5px solid ${G.surface}`,
              boxShadow: "0 0 8px #4FAF8F"
            }} 
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <span style={{ fontFamily: font.sora, fontSize: 15, fontWeight: 700, color: G.text1 }}>
              {name || "Freelancer"}
            </span>
            <span title="Verified Architect" style={{ color: G.blue, display: "flex" }}>
              <Shield size={13} fill="rgba(91, 140, 255, 0.1)" />
            </span>
          </div>
          <span style={{ fontSize: 12.5, color: G.text2, fontWeight: 500 }}>
            Lead Frontend Architect
          </span>
          <span style={{ 
            fontSize: 9.5, 
            fontWeight: 700, 
            color: G.green, 
            textTransform: "uppercase", 
            letterSpacing: "0.05em",
            display: "flex",
            alignItems: "center",
            gap: 4
          }}>
            Available for Work
          </span>
        </div>
      </div>

      <p style={{ fontSize: 12, color: G.text2, lineHeight: 1.6, margin: 0 }}>
        Crafting robust, high-performance web applications. Focused on Web3, custom dashboards, and performance optimization.
      </p>

      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 10,
        background: "rgba(38,43,54,0.3)",
        border: `1px solid ${G.borderSubtle}`,
        borderRadius: 12,
        padding: "10px 14px"
      }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <span style={{ fontSize: 10, color: G.text3, textTransform: "uppercase", letterSpacing: "0.04em" }}>
            Rating
          </span>
          <span style={{ fontFamily: font.sora, fontSize: 13.5, fontWeight: 700, color: G.text1, display: "flex", alignItems: "center", gap: 3 }}>
            <Star size={12} fill={G.amber} color={G.amber} /> 4.92 <span style={{ fontSize: 10, color: G.text3, fontWeight: 400 }}>(47)</span>
          </span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <span style={{ fontSize: 10, color: G.text3, textTransform: "uppercase", letterSpacing: "0.04em" }}>
            Level
          </span>
          <span style={{ fontFamily: font.sora, fontSize: 13.5, fontWeight: 700, color: G.text1 }}>
            Senior Architect
          </span>
        </div>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
        {skills.map((skill) => (
          <span
            key={skill}
            style={{
              fontSize: 10,
              fontWeight: 500,
              padding: "3px 8px",
              borderRadius: 6,
              background: "rgba(91, 140, 255, 0.05)",
              color: G.blue,
              border: `1px solid rgba(91, 140, 255, 0.15)`
            }}
          >
            {skill}
          </span>
        ))}
      </div>

      <div style={{ height: 1, background: G.borderSubtle }} />

      <div style={{ display: "flex", gap: 6 }}>
        <a href="https://github.com" target="_blank" rel="noreferrer" style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 5, padding: "7px 10px", borderRadius: 8, border: `1px solid ${G.border}`, background: "rgba(255, 255, 255, 0.02)", color: G.text2, fontSize: 11.5, fontWeight: 600, textDecoration: "none", transition: "all 0.2s" }} onMouseEnter={(e) => { e.currentTarget.style.borderColor = G.blueBorder; e.currentTarget.style.color = G.text1; e.currentTarget.style.background = G.blueGlow; }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = G.border; e.currentTarget.style.color = G.text2; e.currentTarget.style.background = "rgba(255, 255, 255, 0.02)"; }}><Github size={12} /> GitHub</a>
        <a href="https://linkedin.com" target="_blank" rel="noreferrer" style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 5, padding: "7px 10px", borderRadius: 8, border: `1px solid ${G.border}`, background: "rgba(255, 255, 255, 0.02)", color: G.text2, fontSize: 11.5, fontWeight: 600, textDecoration: "none", transition: "all 0.2s" }} onMouseEnter={(e) => { e.currentTarget.style.borderColor = G.blueBorder; e.currentTarget.style.color = G.text1; e.currentTarget.style.background = G.blueGlow; }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = G.border; e.currentTarget.style.color = G.text2; e.currentTarget.style.background = "rgba(255, 255, 255, 0.02)"; }}><Linkedin size={12} /> LinkedIn</a>
        <a href="https://google.com" target="_blank" rel="noreferrer" style={{ width: 32, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 8, border: `1px solid ${G.border}`, background: "rgba(255, 255, 255, 0.02)", color: G.text2, textDecoration: "none", transition: "all 0.2s" }} onMouseEnter={(e) => { e.currentTarget.style.borderColor = G.blueBorder; e.currentTarget.style.color = G.text1; e.currentTarget.style.background = G.blueGlow; }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = G.border; e.currentTarget.style.color = G.text2; e.currentTarget.style.background = "rgba(255, 255, 255, 0.02)"; }}><Globe size={12} /></a>
      </div>
    </motion.div>
  );
}

/* ── Upwork/Fiverr style Messaging Panel ── */
function MessagingPanel({ name }) {
  const [chats, setChats] = useState(MOCK_CHATS_INIT);
  const [activeChatId, setActiveChatId] = useState(1);
  const [msgText, setMsgText] = useState("");
  const [chatSearch, setChatSearch] = useState("");
  const [showAttachmentMenu, setShowAttachmentMenu] = useState(false);
  const [mobileView, setMobileView] = useState("chat"); // "list" or "chat"
  
  const messagesEndRef = useRef(null);
  const activeChat = chats.find(c => c.id === activeChatId) || chats[0];
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [activeChat.messages, activeChat.typing]);
  
  const handleSend = (e) => {
    if (e) e.preventDefault();
    if (!msgText.trim()) return;
    
    // Add user message
    const updatedMessages = [
      ...activeChat.messages,
      { sender: "me", text: msgText, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
    ];
    
    const updatedChats = chats.map(c => {
      if (c.id === activeChatId) {
        return {
          ...c,
          messages: updatedMessages,
          unreadCount: 0
        };
      }
      return c;
    });
    
    setChats(updatedChats);
    setMsgText("");
    
    // Simulate bot response
    setTimeout(() => {
      // Set typing to true
      setChats(prevChats => prevChats.map(c => {
        if (c.id === activeChatId) {
          return { ...c, typing: true };
        }
        return c;
      }));
      
      setTimeout(() => {
        // Append response
        setChats(prevChats => prevChats.map(c => {
          if (c.id === activeChatId) {
            let replyText = "Received your message! I'm reviewing the updates with my team and will get back to you soon.";
            if (activeChatId === 1) replyText = "Awesome! I will check the interaction flow tomorrow morning. Let's aim to wrap it up by Thursday.";
            if (activeChatId === 2) replyText = "End-to-end tests passed on my side as well! I've just initiated the escrow payout release. Great working with you!";
            if (activeChatId === 3) replyText = "Excellent. Thanks for the quick response. The design package looks perfect.";
            
            return {
              ...c,
              typing: false,
              messages: [
                ...c.messages,
                { sender: "client", text: replyText, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
              ]
            };
          }
          return c;
        }));
      }, 1500);
      
    }, 800);
  };
  
  const filteredChats = chats.filter(c => 
    c.name.toLowerCase().includes(chatSearch.toLowerCase()) || 
    c.role.toLowerCase().includes(chatSearch.toLowerCase())
  );
  
  return (
    <div className="chat-container">
      {/* Sidebar - conversations list */}
      <div className={`chat-sidebar ${mobileView === "list" ? "mobile-open" : ""}`} style={{
        display: mobileView === "list" ? "flex" : undefined
      }}>
        {/* Search */}
        <div className="chat-sidebar-search">
          <div style={{
            display: "flex", alignItems: "center", gap: 8,
            background: G.surface2, border: `1px solid ${G.border}`,
            borderRadius: 8, padding: "8px 14px", width: "100%"
          }}>
            <SearchIcon size={14} style={{ color: G.text3 }} />
            <input 
              type="text" 
              placeholder="Search conversations..."
              value={chatSearch}
              onChange={(e) => setChatSearch(e.target.value)}
              style={{
                background: "none", border: "none", outline: "none",
                color: G.text1, fontFamily: font.dm, fontSize: 13,
                width: "100%"
              }}
            />
          </div>
        </div>
        
        {/* Chats List */}
        <div className="chat-list">
          {filteredChats.map(c => {
            const lastMsg = c.messages[c.messages.length - 1];
            return (
              <div 
                key={c.id}
                onClick={() => {
                  setActiveChatId(c.id);
                  setChats(prev => prev.map(item => item.id === c.id ? { ...item, unreadCount: 0 } : item));
                  setMobileView("chat");
                }}
                className={`chat-item ${c.id === activeChatId ? "chat-item-active" : ""}`}
              >
                <div style={{ position: "relative" }}>
                  <div style={{
                    width: 42, height: 42, borderRadius: "50%",
                    background: c.avatarColor,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontWeight: 700, color: "#fff", fontSize: 14
                  }}>
                    {c.name.split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase()}
                  </div>
                  {c.online && (
                    <div style={{
                      position: "absolute", bottom: 0, right: 0,
                      width: 10, height: 10, borderRadius: "50%",
                      background: G.green, border: `2px solid ${G.surface}`,
                    }} />
                  )}
                </div>
                
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 2 }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: G.text1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {c.name.split(" (")[0]}
                    </span>
                    <span style={{ fontSize: 10, color: G.text3 }}>{lastMsg?.time || ""}</span>
                  </div>
                  <div style={{ fontSize: 11, color: G.text2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {c.typing ? <span style={{ color: G.green, fontWeight: 500 }}>Typing...</span> : lastMsg?.text || ""}
                  </div>
                </div>
                
                {c.unreadCount > 0 && (
                  <div style={{
                    background: G.blue, color: "#fff", borderRadius: 10,
                    minWidth: 16, height: 16, display: "flex", alignItems: "center",
                    justifyContent: "center", fontSize: 9, fontWeight: 700, padding: "0 4px"
                  }}>
                    {c.unreadCount}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Chat Window */}
      <div className="chat-window" style={{
        display: mobileView === "list" ? "none" : "flex"
      }}>
        {/* Header */}
        <div className="chat-header">
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <button 
              onClick={() => setMobileView("list")}
              style={{
                display: "none", color: G.text2, cursor: "pointer",
                marginRight: 4
              }}
              className="chat-back-btn"
            >
              <ChevronLeft size={20} />
            </button>
            
            <div style={{ position: "relative" }}>
              <div style={{
                width: 40, height: 40, borderRadius: "50%",
                background: activeChat.avatarColor,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontWeight: 700, color: "#fff", fontSize: 14
              }}>
                {activeChat.name.split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase()}
              </div>
              {activeChat.online && (
                <div style={{
                  position: "absolute", bottom: 0, right: 0,
                  width: 9, height: 9, borderRadius: "50%",
                  background: G.green, border: `2px solid ${G.surface}`,
                }} />
              )}
            </div>
            
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ fontSize: 14.5, fontWeight: 700, color: G.text1 }}>
                  {activeChat.name}
                </span>
                <span style={{ fontSize: 10, color: G.text3, border: `1px solid ${G.border}`, borderRadius: 4, padding: "1px 4px" }}>
                  {activeChat.role}
                </span>
              </div>
              <div style={{ fontSize: 11, color: activeChat.online ? G.green : G.text3, display: "flex", alignItems: "center", gap: 4, marginTop: 2 }}>
                <Circle size={6} fill={activeChat.online ? G.green : "transparent"} color={activeChat.online ? G.green : G.text3} />
                {activeChat.lastSeen}
              </div>
            </div>
          </div>
          
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 12, color: G.text2, display: "flex", alignItems: "center", gap: 6, padding: "6px 12px", borderRadius: 8, background: "rgba(91,140,255,0.06)", border: `1px solid ${G.blueBorder}` }}>
              <Shield size={12} color={G.blue} /> Escrow Active
            </span>
          </div>
        </div>
        
        {/* Messages Log */}
        <div className="chat-messages">
          {activeChat.messages.map((m, idx) => (
            <div 
              key={idx}
              className={`chat-bubble ${m.sender === "me" ? "chat-bubble-me" : "chat-bubble-client"}`}
            >
              <div style={{ wordBreak: "break-word" }}>{m.text}</div>
              <div style={{ 
                fontSize: 9, 
                color: m.sender === "me" ? "rgba(255,255,255,0.6)" : G.text3,
                alignSelf: "flex-end",
                display: "flex",
                alignItems: "center",
                gap: 4,
                marginTop: 2
              }}>
                {m.time}
                {m.sender === "me" && <CheckCheck size={11} />}
              </div>
            </div>
          ))}
          
          {activeChat.typing && (
            <div className="typing-dots">
              <div className="typing-dot" />
              <div className="typing-dot" />
              <div className="typing-dot" />
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
        
        {/* Input area */}
        <div className="chat-input-area">
          <form onSubmit={handleSend} style={{ display: "flex", alignItems: "center", gap: 10, position: "relative" }}>
            <button 
              type="button"
              onClick={() => setShowAttachmentMenu(!showAttachmentMenu)}
              style={{
                width: 38, height: 38, borderRadius: 8,
                background: "rgba(255,255,255,0.02)", border: `1px solid ${G.border}`,
                color: G.text2, display: "flex", alignItems: "center", justifyContent: "center",
                transition: "all 0.2s"
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = G.blueBorder; e.currentTarget.style.color = G.text1; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = G.border; e.currentTarget.style.color = G.text2; }}
            >
              <Paperclip size={16} />
            </button>
            
            {showAttachmentMenu && (
              <div style={{
                position: "absolute", bottom: "100%", left: 0, marginBottom: 8,
                background: G.surface, border: `1px solid ${G.border}`, borderRadius: 10,
                padding: 6, display: "flex", flexDirection: "column", gap: 4,
                width: 160, boxShadow: "0 8px 32px rgba(0,0,0,0.5)", zIndex: 100
              }}>
                <button type="button" onClick={() => { setShowAttachmentMenu(false); alert("Mock Upload: Select Document"); }} style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 10px", borderRadius: 6, color: G.text1, fontSize: 12, cursor: "pointer", width: "100%", textAlign: "left", background: "transparent", border: "none" }} onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.03)"} onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}>
                  <File size={13} color={G.blue} /> Document
                </button>
                <button type="button" onClick={() => { setShowAttachmentMenu(false); alert("Mock Upload: Select Link"); }} style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 10px", borderRadius: 6, color: G.text1, fontSize: 12, cursor: "pointer", width: "100%", textAlign: "left", background: "transparent", border: "none" }} onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.03)"} onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}>
                  <Globe size={13} color={G.green} /> Live Mockup Link
                </button>
                <button type="button" onClick={() => { setShowAttachmentMenu(false); alert("Mock Upload: Select Delivery ZIP"); }} style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 10px", borderRadius: 6, color: G.text1, fontSize: 12, cursor: "pointer", width: "100%", textAlign: "left", background: "transparent", border: "none" }} onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.03)"} onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}>
                  <Briefcase size={13} color={G.amber} /> Deliverable ZIP
                </button>
              </div>
            )}
            
            <input 
              type="text" 
              value={msgText}
              onChange={(e) => setMsgText(e.target.value)}
              placeholder={`Send a message to ${activeChat.name.split(" (")[0]}...`}
              style={{
                flex: 1, height: 38, padding: "0 16px",
                background: "rgba(255,255,255,0.01)", border: `1px solid ${G.border}`,
                borderRadius: 8, color: G.text1, fontFamily: font.dm, fontSize: 13,
                outline: "none"
              }}
            />
            
            <button 
              type="submit"
              disabled={!msgText.trim()}
              style={{
                width: 38, height: 38, borderRadius: 8,
                background: msgText.trim() ? G.blue : "rgba(255,255,255,0.02)",
                border: `1px solid ${msgText.trim() ? G.blue : G.border}`,
                color: msgText.trim() ? "#fff" : G.text3,
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: msgText.trim() ? "pointer" : "default",
                transition: "all 0.2s"
              }}
            >
              <Send size={15} />
            </button>
          </form>
        </div>
      </div>
      
      <style>{`
        @media (max-width: 768px) {
          .chat-back-btn { display: flex !important; }
        }
      `}</style>
    </div>
  );
}

/* ── SaaS Analytics Dashboard ── */
function AnalyticsView() {
  const chartData = [
    { month: 'Jan', earnings: 1800, yield: 9.5 },
    { month: 'Feb', earnings: 2400, yield: 13 },
    { month: 'Mar', earnings: 3800, yield: 21 },
    { month: 'Apr', earnings: 2900, yield: 15 },
    { month: 'May', earnings: 4500, yield: 24.5 }
  ];

  const completionData = [
    { name: 'Nexus', completed: 4, total: 5 },
    { name: 'Startup Labs', completed: 3, total: 8 },
    { name: 'Bloom Co.', completed: 6, total: 6 },
    { name: 'Orbit Stack', completed: 2, total: 2 }
  ];

  const pieData = [
    { name: 'Development', value: 55, color: G.blue },
    { name: 'UI/UX Design', value: 20, color: G.green },
    { name: 'Architecture', value: 15, color: G.amber },
    { name: 'Meetings', value: 10, color: G.red }
  ];

  const [timeframe, setTimeframe] = useState("Monthly");

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {/* Title */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h2 style={{ fontFamily: font.sora, fontSize: 20, fontWeight: 700, color: G.text1, letterSpacing: "-0.025em" }}>
            Performance & Earnings Analytics
          </h2>
          <p style={{ fontSize: 13, color: G.text2, marginTop: 4 }}>
            DeFi-secured contract yields and billing breakdown
          </p>
        </div>
        
        <div style={{
          display: "flex", gap: 4, background: G.surface, border: `1px solid ${G.border}`,
          borderRadius: 8, padding: 4
        }}>
          {["Weekly", "Monthly", "Yearly"].map(t => (
            <button
              key={t}
              onClick={() => setTimeframe(t)}
              style={{
                padding: "6px 12px", borderRadius: 6, fontSize: 11.5, fontWeight: 600,
                color: timeframe === t ? G.blue : G.text2,
                background: timeframe === t ? G.blueGlow : "transparent",
                border: timeframe === t ? `1px solid ${G.blueBorder}` : "1px solid transparent",
                cursor: "pointer", transition: "all 0.2s"
              }}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Grid Stat Cards with Glowing Borders on Hover */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: 16
      }}>
        <StatCard icon={<TrendingUp size={16} />} label="Total Earnings" value="12,035 Tokens" sub="+15.4% vs last period" color="blue" delay={0.02} />
        <StatCard icon={<Briefcase size={16} />} label="Active Projects" value="3 Active" sub="2 building · 1 in review" color="blue" delay={0.08} />
        <StatCard icon={<DollarSign size={16} />} label="Pending Escrow" value="2,500 Tokens" sub="Milestones locked in vault" color="amber" delay={0.14} />
        <StatCard icon={<CheckCircle size={16} />} label="Completed Projects" value="47 Contracts" sub="100% Client satisfaction" color="green" delay={0.20} />
        <StatCard icon={<Star size={16} />} label="Client Rating" value="4.92 / 5.0" sub="Top Rated status active" color="amber" delay={0.26} />
        <StatCard icon={<Clock size={16} />} label="Hours Worked" value="1,280 Hrs" sub="Average 36.5 hrs/week" color="green" delay={0.32} />
      </div>

      {/* Visual Charts */}
      <div className="analytics-grid">
        {/* Earnings Over Time area chart */}
        <div className="chart-card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <div>
              <span style={{ fontSize: 10.5, color: G.text3, textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 600 }}>Earnings Over Time</span>
              <h3 style={{ fontFamily: font.sora, fontSize: 15, fontWeight: 700, color: G.text1, marginTop: 2 }}>Monthly Cashflow & Yield Growth</h3>
            </div>
            <span style={{ fontSize: 11, color: G.green, display: "flex", alignItems: "center", gap: 4, fontWeight: 600 }}>
              <TrendingUp size={12} /> +5.2% APY Yield Compounded
            </span>
          </div>
          
          <div style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer>
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={G.blue} stopOpacity={0.3}/>
                    <stop offset="95%" stopColor={G.blue} stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(38,43,54,0.3)" />
                <XAxis dataKey="month" stroke={G.text3} style={{ fontSize: 11 }} />
                <YAxis stroke={G.text3} style={{ fontSize: 11 }} tickFormatter={(v) => `${v.toLocaleString()} Tokens`} />
                <RechartsTooltip 
                  contentStyle={{ background: G.surface, borderColor: G.border, borderRadius: 8 }}
                  labelStyle={{ color: G.text1, fontWeight: 600, fontSize: 12 }}
                  itemStyle={{ color: G.blue, fontSize: 12 }}
                  formatter={(value) => [`${value.toLocaleString()} Tokens`, "Earnings"]}
                />
                <Area type="monotone" dataKey="earnings" stroke={G.blue} strokeWidth={2} fillOpacity={1} fill="url(#colorEarnings)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Productivity Pie/Donut Chart */}
        <div className="chart-card" style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontSize: 10.5, color: G.text3, textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 600, marginBottom: 4 }}>Work Distribution</span>
          <h3 style={{ fontFamily: font.sora, fontSize: 15, fontWeight: 700, color: G.text1, marginBottom: 20 }}>Productivity Hours</h3>
          
          <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", minHeight: 200, position: "relative" }}>
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={75}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <RechartsTooltip 
                  contentStyle={{ background: G.surface, borderColor: G.border, borderRadius: 8, fontSize: 12 }}
                  formatter={(value) => [`${value}%`, "Allocation"]}
                />
              </PieChart>
            </ResponsiveContainer>
            
            <div style={{
              position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
              textAlign: "center", display: "flex", flexDirection: "column"
            }}>
              <span style={{ fontSize: 18, fontWeight: 800, color: G.text1, fontFamily: font.sora }}>1,280</span>
              <span style={{ fontSize: 9, color: G.text3, textTransform: "uppercase", letterSpacing: "0.04em" }}>Total Hrs</span>
            </div>
          </div>
          
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 14, justifyContent: "center" }}>
            {pieData.map((d, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <div style={{ width: 7, height: 7, borderRadius: "50%", background: d.color }} />
                <span style={{ fontSize: 11, color: G.text2 }}>{d.name} ({d.value}%)</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Completion Bar Chart */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 24 }}>
        <div className="chart-card">
          <span style={{ fontSize: 10.5, color: G.text3, textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 600, marginBottom: 4 }}>Milestone Deliveries</span>
          <h3 style={{ fontFamily: font.sora, fontSize: 15, fontWeight: 700, color: G.text1, marginBottom: 20 }}>Contract Milestones Summary</h3>
          
          <div style={{ width: "100%", height: 260 }}>
            <ResponsiveContainer>
              <BarChart data={completionData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(38,43,54,0.3)" />
                <XAxis dataKey="name" stroke={G.text3} style={{ fontSize: 11 }} />
                <YAxis stroke={G.text3} style={{ fontSize: 11 }} />
                <RechartsTooltip 
                  contentStyle={{ background: G.surface, borderColor: G.border, borderRadius: 8, fontSize: 12 }}
                />
                <Bar dataKey="completed" fill={G.green} name="Completed Milestones" radius={[4, 4, 0, 0]} />
                <Bar dataKey="total" fill={G.blueGlow} stroke={G.blueBorder} name="Total Milestones" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Immersive Full Profile View Component ── */
function FullProfileView({ name }) {
  const [editing, setEditing] = useState(false);
  const [bioText, setBioText] = useState("Crafting robust, high-performance web applications. Focused on Web3, custom dashboards, and performance optimization.");
  const [roleTitle, setRoleTitle] = useState("Lead Frontend Architect");
  const [skillsList, setSkillsList] = useState(["React", "Node.js", "Solidity", "TypeScript", "UI/UX", "TailwindCSS"]);
  const [showToast, setShowToast] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setEditing(false);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const experienceHistory = [
    { role: "Senior Frontend Engineer", company: "Nexus Digital", duration: "2024 - Present", desc: "Spearheaded the rebuild of the core e-commerce dashboard using React, TailwindCSS, and Rolldown. Achieved a 45% increase in load speeds and 100% rating." },
    { role: "Full Stack Developer", company: "Decentralized Labs", duration: "2022 - 2024", desc: "Architected DeFi lending smart contracts and companion dashboard UIs. Integrated Web3Modal and secured over $5M in locked escrow assets." },
    { role: "UI Engineer", company: "Creative Tech Studio", duration: "2020 - 2022", desc: "Designed premium user interfaces and component libraries. Coordinated closely with design teams to translate complex Figma grids to reusable React code." }
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 28, position: "relative" }}>
      {/* Toast Notification */}
      {showToast && (
        <div style={{
          position: "fixed", bottom: 24, right: 24, background: G.green, color: "#fff",
          padding: "12px 24px", borderRadius: 8, boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
          zIndex: 1000, display: "flex", alignItems: "center", gap: 8, fontSize: 13.5, fontWeight: 600,
          animation: "fadeSlideUp 0.3s ease both"
        }}>
          <CheckCircle size={16} /> Profile changes saved successfully!
        </div>
      )}

      {/* Header Profile Cover & Info */}
      <div style={{
        background: `linear-gradient(135deg, rgba(23,26,33,0.8) 0%, rgba(91,140,255,0.06) 100%)`,
        border: `1px solid ${G.border}`, borderRadius: 20, padding: 32,
        boxShadow: "0 8px 32px rgba(0,0,0,0.3)", display: "flex", flexDirection: "column", gap: 24
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 16 }}>
          <div style={{ display: "flex", gap: 24, alignItems: "center", flexWrap: "wrap" }}>
            <div style={{ position: "relative" }}>
              <div style={{
                width: 90, height: 90, borderRadius: "50%",
                background: "linear-gradient(135deg, #5B8CFF 0%, #4FAF8F 100%)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 32, fontWeight: 800, color: "#fff",
                boxShadow: "0 8px 24px rgba(91,140,255,0.25)"
              }}>
                {name ? name.split(" ").map(n => n[0]).join("").toUpperCase().substring(0, 2) : "JD"}
              </div>
              <div style={{
                position: "absolute", bottom: 4, right: 4, width: 18, height: 18,
                borderRadius: "50%", background: G.green, border: `3px solid ${G.surface}`,
                boxShadow: "0 0 10px #4FAF8F"
              }} />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <h2 style={{ fontFamily: font.sora, fontSize: 24, fontWeight: 700, color: G.text1, margin: 0 }}>
                  {name || "Freelancer"}
                </h2>
                <div style={{ display: "flex", background: "rgba(91,140,255,0.08)", border: `1px solid ${G.blueBorder}`, borderRadius: 100, padding: "3px 10px", fontSize: 10.5, color: G.blue, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em", alignItems: "center", gap: 4 }}>
                  <Shield size={10} fill="rgba(91,140,255,0.2)" /> Verified Architect
                </div>
              </div>
              <span style={{ fontSize: 15, color: G.text2, fontWeight: 500 }}>
                {roleTitle}
              </span>
              <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 12.5, color: G.text2, marginTop: 4 }}>
                <span style={{ display: "flex", alignItems: "center", gap: 4 }}><Star size={14} fill={G.amber} color={G.amber} /> 4.92 Rating</span>
                <span style={{ width: 4, height: 4, borderRadius: "50%", background: G.border }} />
                <span>47 Completed Contracts</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setEditing(!editing)}
            style={{
              padding: "10px 20px", borderRadius: 8, border: `1px solid ${editing ? G.redBorder : G.blueBorder}`,
              background: editing ? "transparent" : G.blueGlow, color: editing ? G.red : G.blue,
              fontSize: 13, fontWeight: 600, cursor: "pointer", transition: "all 0.2s"
            }}
          >
            {editing ? "Cancel" : "Edit Profile"}
          </button>
        </div>

        {editing ? (
          <form onSubmit={handleSave} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <label style={{ fontSize: 12, color: G.text2, fontWeight: 600 }}>Role Title</label>
                <input 
                  type="text" 
                  value={roleTitle}
                  onChange={(e) => setRoleTitle(e.target.value)}
                  style={{
                    height: 40, padding: "0 12px", background: G.surface2, border: `1px solid ${G.border}`,
                    borderRadius: 8, color: G.text1, outline: "none"
                  }}
                />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <label style={{ fontSize: 12, color: G.text2, fontWeight: 600 }}>Skills (comma separated)</label>
                <input 
                  type="text" 
                  value={skillsList.join(", ")}
                  onChange={(e) => setSkillsList(e.target.value.split(",").map(s => s.trim()))}
                  style={{
                    height: 40, padding: "0 12px", background: G.surface2, border: `1px solid ${G.border}`,
                    borderRadius: 8, color: G.text1, outline: "none"
                  }}
                />
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <label style={{ fontSize: 12, color: G.text2, fontWeight: 600 }}>Short About Bio</label>
              <textarea 
                value={bioText}
                onChange={(e) => setBioText(e.target.value)}
                rows={3}
                style={{
                  padding: "12px", background: G.surface2, border: `1px solid ${G.border}`,
                  borderRadius: 8, color: G.text1, outline: "none", resize: "none", fontFamily: "inherit"
                }}
              />
            </div>
            <button 
              type="submit"
              style={{
                alignSelf: "flex-start", padding: "10px 24px", borderRadius: 8, background: G.blue,
                color: "#fff", border: "none", fontWeight: 600, cursor: "pointer", fontSize: 13
              }}
            >
              Save Profile
            </button>
          </form>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <p style={{ fontSize: 14, color: G.text2, lineHeight: 1.7, margin: 0 }}>
              {bioText}
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {skillsList.map((skill) => (
                <span
                  key={skill}
                  style={{
                    fontSize: 11, fontWeight: 500, padding: "4px 12px", borderRadius: 6,
                    background: "rgba(91, 140, 255, 0.05)", color: G.blue, border: `1px solid rgba(91, 140, 255, 0.15)`
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Grid Details */}
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1.15fr", gap: 24 }}>
        <div style={{
          background: G.surface, border: `1px solid ${G.border}`, borderRadius: 20, padding: 28,
          display: "flex", flexDirection: "column", gap: 20
        }}>
          <h3 style={{ fontFamily: font.sora, fontSize: 16, fontWeight: 700, color: G.text1, display: "flex", alignItems: "center", gap: 8 }}>
            <Briefcase size={16} color={G.blue} /> Work & Contract History
          </h3>
          
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {experienceHistory.map((exp, idx) => (
              <div key={idx} style={{ display: "flex", flexDirection: "column", gap: 6, position: "relative" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <h4 style={{ fontSize: 14.5, fontWeight: 700, color: G.text1 }}>
                    {exp.role} <span style={{ color: G.blue, fontWeight: 500 }}>@ {exp.company}</span>
                  </h4>
                  <span style={{ fontSize: 11.5, color: G.text3, fontWeight: 500 }}>{exp.duration}</span>
                </div>
                <p style={{ fontSize: 13, color: G.text2, lineHeight: 1.6, margin: 0 }}>
                  {exp.desc}
                </p>
                {idx < experienceHistory.length - 1 && <div style={{ height: 1, background: G.borderSubtle, marginTop: 16 }} />}
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{
            background: G.surface, border: `1px solid ${G.border}`, borderRadius: 20, padding: 24,
            display: "flex", flexDirection: "column", gap: 16
          }}>
            <h3 style={{ fontFamily: font.sora, fontSize: 15, fontWeight: 700, color: G.text1, display: "flex", alignItems: "center", gap: 8 }}>
              <Award size={16} color={G.green} /> Verified Credentials
            </h3>
            
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, padding: 10, borderRadius: 8, background: "rgba(255,255,255,0.02)", border: `1px solid ${G.border}` }}>
                <Award size={20} color={G.blue} />
                <div>
                  <div style={{ fontSize: 12.5, fontWeight: 700, color: G.text1 }}>React Core Expert</div>
                  <div style={{ fontSize: 10, color: G.text3 }}>Verified on-chain · Credential ID: #108A</div>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, padding: 10, borderRadius: 8, background: "rgba(255,255,255,0.02)", border: `1px solid ${G.border}` }}>
                <Award size={20} color={G.green} />
                <div>
                  <div style={{ fontSize: 12.5, fontWeight: 700, color: G.text1 }}>Smart Contract Architect</div>
                  <div style={{ fontSize: 10, color: G.text3 }}>Verified on-chain · Credential ID: #409F</div>
                </div>
              </div>
            </div>
          </div>
          
          <div style={{
            background: G.surface, border: `1px solid ${G.border}`, borderRadius: 20, padding: 24,
            display: "flex", flexDirection: "column", gap: 14
          }}>
            <h3 style={{ fontFamily: font.sora, fontSize: 15, fontWeight: 700, color: G.text1 }}>
              Official Links
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <a href="https://github.com" target="_blank" rel="noreferrer" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 12px", borderRadius: 8, background: G.surface2, border: `1px solid ${G.border}`, color: G.text1, textDecoration: "none", fontSize: 12.5 }}>
                <span style={{ display: "flex", alignItems: "center", gap: 8 }}><Github size={14} /> Github</span>
                <ExternalLink size={12} color={G.text3} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 12px", borderRadius: 8, background: G.surface2, border: `1px solid ${G.border}`, color: G.text1, textDecoration: "none", fontSize: 12.5 }}>
                <span style={{ display: "flex", alignItems: "center", gap: 8 }}><Linkedin size={14} /> LinkedIn</span>
                <ExternalLink size={12} color={G.text3} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Main Dashboard ── */
export default function FreelancerDashboard({ name = "Freelancer", onSignOut }) {
  const [activeNav, setActiveNav] = useState("mywork");
  const [notifHov, setNotifHov] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  const [showUserMenu, setShowUserMenu] = useState(false);
  
  const firstName = name.trim().split(/\s+/)[0] || "Freelancer";
  const initials = name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map(part => part[0]?.toUpperCase())
    .join("") || "F";
    
  const normalizedSearch = searchVal.trim().toLowerCase();
  
  const filteredExploreProjects = EXPLORE_PROJECTS.filter((p) =>
    [p.title, p.client, p.skills].some((value) => value.toLowerCase().includes(normalizedSearch))
  );
  
  const filteredMyWorkProjects = MY_WORK_PROJECTS.filter((p) =>
    [p.title, p.client, p.milestone, p.status].some((value) => value.toLowerCase().includes(normalizedSearch))
  );

  return (
    <>
      <div style={{
        display: "flex", minHeight: "100vh", fontFamily: font.dm,
        background: G.bg, color: G.text1,
      }}>
        {/* ── Sidebar ── */}
        <aside className="fd-sidebar" style={{
          width: 240, flexShrink: 0,
          display: "flex", flexDirection: "column",
          background: G.surface, borderRight: `1px solid ${G.border}`,
          padding: "28px 16px", gap: 6,
          position: "sticky", top: 0, height: "100vh",
          animation: "fadeSlideUp 0.6s ease both",
          zIndex: 100
        }}>
          {/* Brand */}
          <div style={{
            display: "flex", alignItems: "center", gap: 9,
            marginBottom: 32, paddingLeft: 8,
          }}>
            <div style={{
              width: 30, height: 30, borderRadius: 8,
              background: G.blueGlow, border: `1px solid ${G.blueBorder}`,
              display: "flex", alignItems: "center", justifyContent: "center", color: G.blue,
            }}>
              {Icon.shield}
            </div>
            <span style={{
              fontFamily: font.sora, fontSize: 16, fontWeight: 700,
              letterSpacing: "-0.025em", color: G.text1,
            }}>
              Escrow<span style={{ color: G.blue }}> Admin</span>
            </span>
          </div>

          {/* Nav */}
          {NAV.map((n) => (
            <button
              key={n.label}
              className="nav-item"
              onClick={() => n.id && setActiveNav(n.id)}
              style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "10px 12px", borderRadius: 10, border: "none",
                background: activeNav === n.id ? G.blueGlow : "transparent",
                color: activeNav === n.id ? G.blue : G.text2,
                fontFamily: font.dm, fontSize: 13.5, fontWeight: activeNav === n.id ? 600 : 400,
                cursor: "pointer", textAlign: "left",
                borderLeft: activeNav === n.id ? `2px solid ${G.blue}` : "2px solid transparent",
                transition: "all 0.2s"
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                {n.icon} <span>{n.label}</span>
              </div>
              {n.badge && activeNav !== n.id && (
                <span style={{
                  background: G.red, color: "#fff", borderRadius: "50%",
                  width: 16, height: 16, display: "flex", alignItems: "center",
                  justifyContent: "center", fontSize: 9, fontWeight: 700
                }}>
                  {n.badge}
                </span>
              )}
            </button>
          ))}

          {/* Bottom Escrow Health */}
          <div style={{ marginTop: "auto" }}>
            <div style={{
              background: G.surface2, borderRadius: 12, padding: "14px",
              border: `1px solid ${G.border}`,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: G.green, boxShadow: `0 0 8px ${G.green}`, animation: "pulse 2.2s ease-in-out infinite" }} />
                <span style={{ fontSize: 10.5, color: G.text2, textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 500 }}>
                  Escrow Health
                </span>
              </div>
              <div style={{ fontFamily: font.sora, fontSize: 18, fontWeight: 700, color: G.green, marginBottom: 4 }}>
                98.4%
              </div>
              <div style={{ fontSize: 11, color: G.text3, lineHeight: 1.5 }}>
                All funds secured & yielding
              </div>
            </div>

            {/* User pill */}
            <div style={{
              display: "flex", alignItems: "center", gap: 10,
              background: G.surface2, borderRadius: 10, padding: "10px 12px",
              border: `1px solid ${G.border}`, marginTop: 16, position: 'relative'
            }}>
              <div style={{
                width: 32, height: 32, borderRadius: "50%",
                background: `linear-gradient(135deg, ${G.blue}, #93B4FF)`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 13, fontWeight: 700, color: "#fff", flexShrink: 0,
              }}>{initials}</div>
              <div style={{ minWidth: 0, flex: 1 }}>
                <div style={{ fontSize: 12.5, fontWeight: 600, color: G.text1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {name}
                </div>
                <div style={{ fontSize: 10.5, color: G.text3 }}>Freelancer</div>
              </div>
              <button 
                onClick={() => setShowUserMenu(!showUserMenu)}
                style={{ background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', color: G.text2 }}
              >
                {Icon.dots}
              </button>
              
              {showUserMenu && (
                <div style={{
                  position: 'absolute', bottom: '100%', right: 0, marginBottom: 8,
                  background: G.surface, border: `1px solid ${G.border}`, borderRadius: 8,
                  padding: 4, width: 140, boxShadow: '0 4px 12px rgba(0,0,0,0.2)', zIndex: 10
                }}>
                  <button
                    onClick={onSignOut}
                    style={{
                      width: '100%', padding: '8px 12px', textAlign: 'left', background: 'transparent',
                      border: 'none', color: G.red, fontSize: 13, cursor: 'pointer', borderRadius: 6
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = G.redGlow}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </aside>

        {/* ── Main Content ── */}
        <main style={{
          flex: 1, overflowY: "auto", position: "relative",
          background: G.bg,
        }}>
          {/* Ambient Orbs */}
          <div className="orb-1" />
          <div className="orb-2" />
          <div className="grid-bg" />

          <div className="fd-content">
            {/* Top bar for dashboard pages */}
            {(activeNav === "mywork" || activeNav === "explore") && (
              <div style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                marginBottom: 32, animation: "fadeSlideUp 0.6s ease both",
              }}>
                <div>
                  <h1 style={{ fontFamily: font.sora, fontSize: 22, fontWeight: 700, letterSpacing: "-0.03em", color: G.text1, margin: 0 }}>
                    Good morning, {firstName} 👋
                  </h1>
                  <div style={{ fontSize: 13, color: G.text2, marginTop: 3 }}>
                    3 active projects · Escrow earning yield
                  </div>
                </div>
                
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  {/* Search */}
                  <div style={{
                    display: "flex", alignItems: "center", gap: 8,
                    background: G.surface, border: `1px solid ${G.border}`,
                    borderRadius: 8, padding: "8px 14px", height: 38,
                  }}>
                    <span style={{ color: G.text3 }}>{Icon.search}</span>
                    <input
                      value={searchVal}
                      onChange={e => setSearchVal(e.target.value)}
                      placeholder={activeNav === "explore" ? "Search available projects…" : "Search my work…"}
                      style={{
                        background: "none", border: "none", outline: "none",
                        color: G.text1, fontFamily: font.dm, fontSize: 13,
                        width: 140,
                      }}
                    />
                  </div>
                  {/* Notification */}
                  <button
                    onMouseEnter={() => setNotifHov(true)}
                    onMouseLeave={() => setNotifHov(false)}
                    style={{
                      width: 38, height: 38, borderRadius: 8, display: "flex",
                      alignItems: "center", justifyContent: "center",
                      background: notifHov ? G.blueGlow : G.surface,
                      border: `1px solid ${notifHov ? G.blueBorder : G.border}`,
                      color: notifHov ? G.blue : G.text2,
                      cursor: "pointer", position: "relative",
                      transition: "all 0.22s ease",
                    }}
                  >
                    {Icon.bell}
                    <div style={{
                      position: "absolute", top: 7, right: 7,
                      width: 7, height: 7, borderRadius: "50%",
                      background: G.red, border: `1.5px solid ${G.bg}`,
                    }} />
                  </button>
                </div>
              </div>
            )}

            {/* View Routing with Framer Motion AnimatePresence */}
            <AnimatePresence mode="wait">
              {activeNav === "mywork" && (
                <motion.div
                  key="mywork"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.25 }}
                >
                  {/* Stat Cards */}
                  <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                    gap: 16, marginBottom: 36,
                  }}>
                    <StatCard icon={Icon.wallet} label="Total Escrow" value="12,035 Tokens" sub="Across 3 projects" color="blue" delay={0.05} />
                    <StatCard icon={Icon.trending} label="Yield Earned" value="52.71 Tokens" sub="This month · DeFi optimized" color="green" delay={0.12} />
                    <StatCard icon={Icon.briefcase} label="Active Jobs" value="3" sub="2 ongoing · 1 in review" color="blue" delay={0.19} />
                    <StatCard icon={Icon.award} label="Reputation" value="4.92★" sub="47 completed contracts" color="amber" delay={0.26} />
                  </div>

                  {/* Trust Banner */}
                  <div style={{
                    background: `linear-gradient(135deg, rgba(91,140,255,0.07) 0%, rgba(79,175,143,0.07) 100%)`,
                    border: `1px solid ${G.blueBorder}`,
                    borderRadius: 14, padding: "16px 22px",
                    display: "flex", alignItems: "center", gap: 16,
                    marginBottom: 36,
                    animation: "fadeSlideUp 0.65s 0.3s ease both",
                  }}>
                    <div style={{ color: G.blue, flexShrink: 0 }}>{Icon.zap}</div>
                    <div style={{ flex: 1 }}>
                      <span style={{ fontSize: 13, fontWeight: 600, color: G.text1 }}>
                        Your escrow is working for you.&nbsp;
                      </span>
                      <span style={{ fontSize: 13, color: G.text2 }}>
                        12,035 Tokens locked across your contracts is earning <span style={{ color: G.green, fontWeight: 600 }}>+5.2% APY</span> in yield — fully accessible upon milestone approval.
                      </span>
                    </div>
                    <div style={{ cursor: "pointer" }} onClick={() => setActiveNav("earnings")}>
                      <span style={{ flexShrink: 0, color: G.blue, display: "flex", alignItems: "center", gap: 4, fontSize: 12, fontWeight: 500 }}>
                        View Analytics {Icon.arrow}
                      </span>
                    </div>
                  </div>

                  {/* Projects + Milestones grid */}
                  <div className="fd-main-grid">
                    {/* Projects Column */}
                    <div>
                      <div style={{
                        display: "flex", alignItems: "center", justifyContent: "space-between",
                        marginBottom: 16, animation: "fadeSlideUp 0.65s 0.35s ease both",
                      }}>
                        <h2 style={{
                          fontFamily: font.sora, fontSize: 16, fontWeight: 700,
                          letterSpacing: "-0.025em", color: G.text1, margin: 0
                        }}>My Work</h2>
                        <button style={{
                          fontSize: 12, color: G.blue, background: "none", border: "none",
                          fontFamily: font.dm, cursor: "pointer", display: "flex",
                          alignItems: "center", gap: 4, fontWeight: 500,
                        }}>
                          {filteredMyWorkProjects.length} active {Icon.arrow}
                        </button>
                      </div>
                      
                      <div style={{ display: "flex", flexDirection: "column", gap: 14, maxHeight: "calc(100vh - 250px)", overflowY: "auto", paddingRight: 8 }}>
                        {filteredMyWorkProjects.map((p, i) => (
                          <ProjectCard key={p.id} p={p} delay={0.4 + i * 0.1} />
                        ))}
                      </div>
                    </div>

                    {/* Milestones + Profile Card Column */}
                    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                      {/* Freelancer Profile Card (New) */}
                      <FreelancerProfileCard name={name} />

                      {/* Milestones */}
                      <div style={{
                        background: G.surface, borderRadius: 16, padding: "20px",
                        border: `1px solid ${G.border}`,
                        animation: "fadeSlideUp 0.65s 0.4s ease both",
                      }}>
                        <div style={{
                          fontFamily: font.sora, fontSize: 14.5, fontWeight: 700,
                          letterSpacing: "-0.02em", color: G.text1, marginBottom: 14,
                        }}>Upcoming Milestones</div>
                        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                          {MILESTONES.map((m, i) => (
                            <MilestoneRow key={i} m={m} idx={i} />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeNav === "explore" && (
                <motion.div
                  key="explore"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.25 }}
                >
                  <div className="fd-main-grid">
                    {/* Explore List */}
                    <div>
                      <div style={{
                        display: "flex", alignItems: "center", justifyContent: "space-between",
                        marginBottom: 16, animation: "fadeSlideUp 0.65s 0.35s ease both",
                      }}>
                        <h2 style={{
                          fontFamily: font.sora, fontSize: 16, fontWeight: 700,
                          letterSpacing: "-0.025em", color: G.text1, margin: 0
                        }}>Explore Projects</h2>
                        <span style={{ fontSize: 12, color: G.text2 }}>
                          {filteredExploreProjects.length} projects open
                        </span>
                      </div>
                      
                      <div style={{ display: "flex", flexDirection: "column", gap: 14, maxHeight: "calc(100vh - 250px)", overflowY: "auto", paddingRight: 8 }}>
                        {filteredExploreProjects.map((p, i) => (
                          <ExploreProjectCard key={p.id} p={p} delay={0.4 + i * 0.1} />
                        ))}
                      </div>
                    </div>

                    {/* Right column */}
                    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                      <FreelancerProfileCard name={name} />
                      
                      <div style={{
                        background: G.surface, borderRadius: 16, padding: "20px",
                        border: `1px solid ${G.border}`,
                      }}>
                        <div style={{ fontFamily: font.sora, fontSize: 14.5, fontWeight: 700, color: G.text1, marginBottom: 10 }}>Quick Tip</div>
                        <p style={{ fontSize: 12.5, color: G.text2, lineHeight: 1.6, margin: 0 }}>
                          Ensure your profile tags and verified credential badges match the project prerequisites to double your chance of application approval.
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeNav === "messages" && (
                <motion.div
                  key="messages"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.25 }}
                >
                  <MessagingPanel name={name} />
                </motion.div>
              )}

              {activeNav === "earnings" && (
                <motion.div
                  key="earnings"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.25 }}
                >
                  <AnalyticsView />
                </motion.div>
              )}

              {activeNav === "profile" && (
                <motion.div
                  key="profile"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.25 }}
                >
                  <FullProfileView name={name} />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Footer Note */}
            <div style={{
              marginTop: 40, paddingTop: 20, borderTop: `1px solid ${G.border}`,
              display: "flex", alignItems: "center", gap: 7,
              fontSize: 11, color: "rgba(154,164,178,0.4)", letterSpacing: "0.01em",
            }}>
              {Icon.lock}
              Funds secured via non-custodial smart contracts · 256-bit encrypted · Audited by ChainSec
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
