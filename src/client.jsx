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
  Cell
} from "recharts";
import { 
  TrendingUp, 
  Shield, 
  Lock, 
  DollarSign, 
  Activity, 
  MessageSquare, 
  HelpCircle, 
  Info, 
  Calendar, 
  ChevronRight, 
  Download, 
  User, 
  Key, 
  CreditCard, 
  Bell, 
  Percent, 
  Sliders,
  Check,
  Send,
  Paperclip,
  CheckCheck,
  Copy,
  Mail,
  Phone,
  Briefcase,
  Building,
  Menu,
  Sparkles,
  AlertCircle,
  Clock,
  ArrowUpRight,
  ExternalLink,
  ChevronLeft,
  Circle
} from "lucide-react";
import "./ClientDashboard.css";

/* ── Mock Data ─────────────────────────────────────────────── */
const INITIAL_PROJECTS = [
  {
    id: 1,
    title: "Brand Identity Redesign",
    freelancer: "Aria Mehta",
    avatar: "AM",
    budget: "2,656 Tokens",
    escrowed: "1,328 Tokens",
    due: "Jun 14, 2025",
    status: "In Progress",
    milestone: "Logo Concepts",
    progress: 52,
    yieldEarned: "15.27 Tokens",
  },
  {
    id: 2,
    title: "E-commerce Web App",
    freelancer: "Dev Patel",
    avatar: "DP",
    budget: "7,055 Tokens",
    escrowed: "3,527.5 Tokens",
    due: "Jul 02, 2025",
    status: "Under Review",
    milestone: "Frontend UI",
    progress: 78,
    yieldEarned: "50.80 Tokens",
  },
  {
    id: 3,
    title: "Motion Graphics Pack",
    freelancer: "Lena Koch",
    avatar: "LK",
    budget: "1,494 Tokens",
    escrowed: "747 Tokens",
    due: "May 28, 2025",
    status: "Pending Start",
    milestone: "Storyboard",
    progress: 10,
    yieldEarned: "2.99 Tokens",
  },
  {
    id: 4,
    title: "API Integration Suite",
    freelancer: "Omar Farooq",
    avatar: "OF",
    budget: "4,150 Tokens",
    escrowed: "4,150 Tokens",
    due: "May 20, 2025",
    status: "Completed",
    milestone: "Delivery",
    progress: 100,
    yieldEarned: "76.36 Tokens",
  },
];

function CoinsIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="8" cy="8" r="6" />
      <circle cx="16" cy="16" r="6" />
      <circle cx="12" cy="12" r="6" />
    </svg>
  );
}

const STATUS_META = {
  "In Progress":   { cls: "cd-badge--blue",    label: "In Progress"   },
  "Under Review":  { cls: "cd-badge--yellow",   label: "Under Review"  },
  "Pending Start": { cls: "cd-badge--neutral",  label: "Pending Start" },
  "Completed":     { cls: "cd-badge--green",    label: "Completed"     },
};

const NAV_ITEMS = [
  { icon: <GridIcon />,     label: "Dashboard",   id: "dashboard" },
  { icon: <BriefcaseIcon />,label: "Projects",    id: "projects"  },
  { icon: <VaultIcon />,    label: "Escrow Vault",id: "vault"     },
  { icon: <ActivityIcon />, label: "Activity",    id: "activity"  },
  { icon: <MessageIcon />,  label: "Messages",    id: "messages", badge: 3 },
  { icon: <CoinsIcon />,    label: "Buy Tokens",  id: "buy_tokens" },
  { icon: <SettingsIcon />, label: "Settings",    id: "settings"  },
];

/* ── Root Component ─────────────────────────────────────────── */
export default function ClientDashboard({ name = "Client", onSignOut }) {
  const [activeNav, setActiveNav]       = useState("dashboard");
  const [activeFilter, setActiveFilter] = useState("All");
  const [expandedId, setExpandedId]     = useState(null);
  const [showModal, setShowModal]       = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const [projects, setProjects]         = useState(() => {
    const saved = localStorage.getItem("customClientProjects");
    const parsed = saved ? JSON.parse(saved) : [];
    return [...parsed, ...INITIAL_PROJECTS];
  });
  const [walletBalance, setWalletBalance] = useState(5000); // 5000 Tokens initially

  const filters = ["All", "In Progress", "Under Review", "Pending Start", "Completed"];

  const filtered = activeFilter === "All"
    ? projects
    : projects.filter(p => p.status === activeFilter);

  const totalEscrowed  = "9,752.5 Tokens";
  const totalYield     = "145.42 Tokens";
  const activeProjects = projects.filter(p => p.status !== "Completed").length;
  const firstName = name.trim().split(/\s+/)[0] || "Client";
  const initials = name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map(part => part[0]?.toUpperCase())
    .join("") || "C";

  return (
    <div className="cd-root">

      {/* ── Background FX ── */}
      <div className="cd-bg" aria-hidden="true">
        <div className="sr-orb sr-orb-1" />
        <div className="sr-orb sr-orb-2" />
        <div className="sr-grid-bg" />
      </div>

      {/* ── Sidebar ── */}
      <aside className="cd-sidebar">
        <div className="cd-sidebar-inner">

          {/* Logo */}
          <div className="cd-logo">
            <div className="cd-logo-icon">
              <ShieldIcon />
            </div>
            <span className="cd-logo-text">
              Escrow<span className="cd-logo-accent"> Admin</span>
            </span>
          </div>

          {/* Nav */}
          <nav className="cd-nav">
            <span className="cd-nav-label">MAIN MENU</span>
            {NAV_ITEMS.map(item => (
              <button
                key={item.id}
                className={`cd-nav-item${activeNav === item.id ? " cd-nav-item--active" : ""}`}
                onClick={() => setActiveNav(item.id)}
              >
                <span className="cd-nav-icon">{item.icon}</span>
                <span className="cd-nav-text">{item.label}</span>
                {item.badge && (
                  <span className="cd-nav-badge">{item.badge}</span>
                )}
              </button>
            ))}
          </nav>

          {/* Vault teaser */}
          <div className="cd-vault-teaser" style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div>
              <div className="cd-vt-top" style={{ marginBottom: 4 }}>
                <YieldIcon />
                <span className="cd-vt-label">Yield Earned</span>
              </div>
              <div className="cd-vt-amount">{totalYield}</div>
            </div>
            
            <div style={{ height: 1, background: "var(--border)", opacity: 0.2 }} />
            
            <div>
              <div className="cd-vt-top" style={{ marginBottom: 4 }}>
                <CoinsIcon />
                <span className="cd-vt-label">Wallet Balance</span>
              </div>
              <div className="cd-vt-amount" style={{ color: "var(--blue)" }}>
                {walletBalance.toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 1 })} T
              </div>
            </div>
            <p className="cd-vt-sub" style={{ marginTop: 2 }}>Secure multi-sig lockers active</p>
          </div>

          {/* User */}
          <div className="cd-sidebar-user" style={{ position: "relative" }}>
            <div className="cd-user-avatar">{initials}</div>
            <div className="cd-user-info">
              <span className="cd-user-name">{name}</span>
              <span className="cd-user-role">Client Account</span>
            </div>
            <button 
              className="cd-user-more" 
              onClick={() => setShowUserMenu(!showUserMenu)}
              style={{ background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex' }}
            >
              <DotsIcon />
            </button>
            
            {showUserMenu && (
              <div style={{
                position: 'absolute', bottom: '100%', right: 0, marginBottom: 8,
                background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8,
                padding: 4, width: 140, boxShadow: '0 4px 12px rgba(0,0,0,0.2)', zIndex: 10
              }}>
                <button
                  onClick={onSignOut}
                  style={{
                    width: '100%', padding: '8px 12px', textAlign: 'left', background: 'transparent',
                    border: 'none', color: '#ff6b6b', fontSize: 13, cursor: 'pointer', borderRadius: 6
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,107,107,0.1)'}
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
      <main className="cd-main">

        {/* Top bar */}
        <header className="cd-topbar">
          <div className="cd-topbar-left">
            <p className="cd-topbar-kicker">Client Dashboard</p>
            <h1 className="cd-topbar-title">Welcome back, {firstName}</h1>
          </div>
          <div className="cd-topbar-right">
            {activeNav !== "buy_tokens" && (
              <>
                <button className="cd-icon-btn">
                  <BellIcon />
                  <span className="cd-notif-dot" />
                </button>
                <button className="cd-primary-btn" onClick={() => setShowModal(true)}>
                  <PlusIcon />
                  New Project
                </button>
              </>
            )}
          </div>
        </header>

        {activeNav === "dashboard" && (
          <>
            {/* ── Stat Cards ── */}
            <section className="cd-stats">
              <StatCard
                icon={<VaultIcon />}
                iconCls="cd-sci--blue"
                label="Total Escrowed"
                value={totalEscrowed}
                sub="Across 4 contracts"
                trend="+747 Tokens this month"
                trendUp
              />
              <StatCard
                icon={<YieldIcon />}
                iconCls="cd-sci--green"
                label="Yield Generated"
                value={totalYield}
                sub="On idle escrow funds"
                trend="+27.22 Tokens this week"
                trendUp
              />
              <StatCard
                icon={<BriefcaseIcon />}
                iconCls="cd-sci--blue"
                label="Active Projects"
                value={activeProjects}
                sub="1 awaiting your review"
                trend="2 milestones due soon"
              />
              <StatCard
                icon={<ShieldIcon />}
                iconCls="cd-sci--green"
                label="Trust Score"
                value="98%"
                sub="Based on 14 contracts"
                trend="Top 5% of clients"
                trendUp
              />
            </section>

            {/* ── Projects Panel ── */}
            <section className="cd-panel">
              <div className="cd-panel-head">
                <div>
                  <h2 className="cd-panel-title">Active Contracts</h2>
                  <p className="cd-panel-sub">Manage milestones, escrow releases &amp; disputes</p>
                </div>
                <div className="cd-filter-row">
                  {filters.map(f => (
                    <button
                      key={f}
                      className={`cd-filter-btn${activeFilter === f ? " cd-filter-btn--active" : ""}`}
                      onClick={() => setActiveFilter(f)}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              <div className="cd-project-list">
                {filtered.slice(0, 3).map(proj => (
                  <ProjectCard
                    key={proj.id}
                    project={proj}
                    expanded={expandedId === proj.id}
                    onToggle={() => setExpandedId(expandedId === proj.id ? null : proj.id)}
                  />
                ))}
                {filtered.length === 0 && (
                  <div className="cd-empty">No contracts match this filter.</div>
                )}
                {filtered.length > 3 && (
                  <button className="cd-action-btn cd-action-btn--outline" style={{width: "100%", marginTop: 12}} onClick={() => setActiveNav("projects")}>
                    View all {filtered.length} projects
                  </button>
                )}
              </div>
            </section>

            {/* ── Bottom Grid ── */}
            <div className="cd-bottom-grid">
              <RecentActivity />
              <EscrowBreakdown projects={projects} />
            </div>
          </>
        )}

        {activeNav === "projects" && (
          <section className="cd-panel" style={{ flex: 1, display: "flex", flexDirection: "column" }}>
            <div className="cd-panel-head">
              <div>
                <h2 className="cd-panel-title">All Projects</h2>
                <p className="cd-panel-sub">Manage all your projects and contracts</p>
              </div>
              <div className="cd-filter-row">
                {filters.map(f => (
                  <button
                    key={f}
                    className={`cd-filter-btn${activeFilter === f ? " cd-filter-btn--active" : ""}`}
                    onClick={() => setActiveFilter(f)}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            <div className="cd-project-list" style={{ overflowY: "auto", flex: 1 }}>
              {filtered.map(proj => (
                <ProjectCard
                  key={proj.id}
                  project={proj}
                  expanded={expandedId === proj.id}
                  onToggle={() => setExpandedId(expandedId === proj.id ? null : proj.id)}
                />
              ))}
              {filtered.length === 0 && (
                <div className="cd-empty">No contracts match this filter.</div>
              )}
            </div>
          </section>
        )}

        {activeNav === "vault" && (
          <EscrowVault projects={projects} />
        )}

        {activeNav === "activity" && (
          <ActivityPage projects={projects} />
        )}

        {activeNav === "messages" && (
          <MessagesPage name={name} />
        )}

        {activeNav === "buy_tokens" && (
          <BuyTokensPage walletBalance={walletBalance} setWalletBalance={setWalletBalance} />
        )}

        {activeNav === "settings" && (
          <SettingsPage name={name} />
        )}
      </main>

      {/* ── New Project Modal ── */}
      {showModal && <NewProjectModal onClose={() => setShowModal(false)} onAddProject={(newProject) => {
        setProjects(prev => {
          const updated = [newProject, ...prev];
          const customOnly = updated.filter(p => !INITIAL_PROJECTS.some(ip => ip.id === p.id));
          localStorage.setItem("customClientProjects", JSON.stringify(customOnly));
          return updated;
        });

        // Sync to freelancer explore storage
        const exploreItem = {
          id: newProject.id,
          title: newProject.title,
          client: name || "Client Workspace",
          budget: newProject.budget,
          duration: newProject.duration || "4 weeks",
          skills: newProject.skills || "React · Escrow Protection",
          isCustom: true
        };

        const savedExplore = localStorage.getItem("customExploreProjects");
        const parsedExplore = savedExplore ? JSON.parse(savedExplore) : [];
        const updatedExplore = [exploreItem, ...parsedExplore];
        localStorage.setItem("customExploreProjects", JSON.stringify(updatedExplore));
      }} />}
    </div>
  );
}

/* ── Stat Card ─────────────────────────────────────────────── */
function StatCard({ icon, iconCls, label, value, sub, trend, trendUp }) {
  return (
    <div className="cd-stat-card">
      <div className={`cd-stat-icon ${iconCls}`}>{icon}</div>
      <div className="cd-stat-body">
        <span className="cd-stat-label">{label}</span>
        <strong className="cd-stat-value">{value}</strong>
        <span className="cd-stat-sub">{sub}</span>
      </div>
      {trend && (
        <div className={`cd-stat-trend${trendUp ? " cd-stat-trend--up" : ""}`}>
          {trendUp ? <TrendUpIcon /> : <ClockIcon />}
          {trend}
        </div>
      )}
    </div>
  );
}

/* ── Project Card ───────────────────────────────────────────── */
function ProjectCard({ project: p, expanded, onToggle }) {
  const meta = STATUS_META[p.status];
  return (
    <div className={`cd-project-card${expanded ? " cd-project-card--open" : ""}`}>
      <div className="cd-project-main" onClick={onToggle}>

        {/* Avatar + info */}
        <div className="cd-project-left">
          <div className="cd-avatar">{p.avatar}</div>
          <div className="cd-project-info">
            <h3 className="cd-project-title">{p.title}</h3>
            <p className="cd-project-meta">
              <span>{p.freelancer}</span>
              <span className="cd-dot" />
              <span>Due {p.due}</span>
            </p>
          </div>
        </div>

        {/* Right side */}
        <div className="cd-project-right">
          <div className="cd-project-amounts">
            <span className="cd-amount-label">Escrowed</span>
            <span className="cd-amount-val">{p.escrowed}</span>
          </div>
          <div className="cd-project-amounts">
            <span className="cd-amount-label">Yield</span>
            <span className="cd-amount-val cd-amount-val--green">{p.yieldEarned}</span>
          </div>
          <span className={`cd-badge ${meta.cls}`}>{meta.label}</span>
          <button className={`cd-chevron${expanded ? " cd-chevron--open" : ""}`}>
            <ChevronIcon />
          </button>
        </div>
      </div>

      {/* Progress bar */}
      <div className="cd-progress-bar">
        <div className="cd-progress-fill" style={{ width: `${p.progress}%` }} />
      </div>

      {/* Expanded detail */}
      {expanded && (
        <div className="cd-project-detail">
          <div className="cd-detail-row">
            <div className="cd-detail-block">
              <span className="cd-detail-label">Total Budget</span>
              <span className="cd-detail-val">{p.budget}</span>
            </div>
            <div className="cd-detail-block">
              <span className="cd-detail-label">Current Milestone</span>
              <span className="cd-detail-val">{p.milestone}</span>
            </div>
            <div className="cd-detail-block">
              <span className="cd-detail-label">Completion</span>
              <span className="cd-detail-val">{p.progress}%</span>
            </div>
          </div>
          <div className="cd-detail-actions">
            {p.status === "Under Review" && (
              <button className="cd-action-btn cd-action-btn--green">
                <CheckIcon /> Approve &amp; Release
              </button>
            )}
            {p.status !== "Completed" && (
              <button className="cd-action-btn cd-action-btn--outline">
                <MessageIcon /> Message Freelancer
              </button>
            )}
            {p.status !== "Completed" && (
              <button className="cd-action-btn cd-action-btn--red">
                <FlagIcon /> Raise Dispute
              </button>
            )}
            {p.status === "Completed" && (
              <button className="cd-action-btn cd-action-btn--outline">
                <StarIcon /> Leave Review
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Recent Activity ────────────────────────────────────────── */
const ACTIVITY = [
  { icon: <CheckIcon />,   cls: "cd-act--green",  text: "Omar Farooq submitted final delivery",    time: "2h ago"  },
  { icon: <VaultIcon />,   cls: "cd-act--blue",   text: "3,527.5 Tokens escrowed for E-commerce Web App",  time: "1d ago"  },
  { icon: <YieldIcon />,   cls: "cd-act--green",  text: "Yield of 15.27 Tokens credited to vault",       time: "2d ago"  },
  { icon: <AlertIcon />,   cls: "cd-act--yellow", text: "Milestone review pending: Frontend UI",   time: "3d ago"  },
  { icon: <PlusIcon />,    cls: "cd-act--blue",   text: "New contract started with Lena Koch",     time: "5d ago"  },
];

function RecentActivity() {
  return (
    <div className="cd-panel cd-activity-panel">
      <div className="cd-panel-head cd-panel-head--flush">
        <h2 className="cd-panel-title">Recent Activity</h2>
      </div>
      <ul className="cd-activity-list">
        {ACTIVITY.map((a, i) => (
          <li key={i} className="cd-activity-item">
            <div className={`cd-act-icon ${a.cls}`}>{a.icon}</div>
            <div className="cd-act-body">
              <p className="cd-act-text">{a.text}</p>
              <span className="cd-act-time">{a.time}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ── Escrow Breakdown ───────────────────────────────────────── */
function EscrowBreakdown({ projects }) {
  const total = 9752.5;
  const colors = ["var(--blue)", "var(--green)", "#a78bfa", "#f59e0b"];
  return (
    <div className="cd-panel cd-breakdown-panel">
      <div className="cd-panel-head cd-panel-head--flush">
        <h2 className="cd-panel-title">Escrow Breakdown</h2>
      </div>
      <div className="cd-breakdown-list">
        {projects.map((p, i) => {
          const val = parseFloat(p.escrowed.replace(/[^\d.]/g, "") || 0);
          const pct = total > 0 ? Math.round((val / total) * 100) : 0;
          return (
            <div key={p.id} className="cd-breakdown-row">
              <div className="cd-breakdown-meta">
                <span className="cd-breakdown-dot" style={{ background: colors[i] }} />
                <span className="cd-breakdown-name">{p.title}</span>
                <span className="cd-breakdown-pct">{pct}%</span>
              </div>
              <div className="cd-breakdown-track">
                <div
                  className="cd-breakdown-fill"
                  style={{ width: `${pct}%`, background: colors[i] }}
                />
              </div>
              <span className="cd-breakdown-val">{p.escrowed}</span>
            </div>
          );
        })}
      </div>
      <div className="cd-breakdown-total">
        <span>Total in Escrow</span>
        <strong>9,752.5 Tokens</strong>
      </div>
    </div>
  );
}

/* ── New Project Modal ──────────────────────────────────────── */
function NewProjectModal({ onClose, onAddProject }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    due: "",
    budget: "",
    escrowed: "",
    milestone: "",
    skills: "",
    duration: ""
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCreate = () => {
    const newProject = {
      id: Date.now(),
      title: formData.title || "New Contract",
      freelancer: "Pending Assignment",
      avatar: "PA",
      budget: formData.budget ? `${formData.budget} Tokens` : "0 Tokens",
      escrowed: formData.escrowed ? `${formData.escrowed} Tokens` : "0 Tokens",
      due: formData.due || "TBD",
      status: "Pending Start",
      milestone: formData.milestone || "Initial Setup",
      progress: 0,
      yieldEarned: "0 Tokens",
      skills: formData.skills ? formData.skills.split(",").map(s => s.trim()).join(" · ") : "React · Escrow Protection",
      duration: formData.duration || "4 weeks",
    };
    onAddProject?.(newProject);
    onClose();
  };

  return (
    <div className="cd-modal-overlay" onClick={onClose}>
      <div className="cd-modal" onClick={e => e.stopPropagation()}>
        <div className="cd-modal-head">
          <div>
            <h3 className="cd-modal-title">Create New Contract</h3>
            <p className="cd-modal-sub">Step {step} of 3 — {step === 1 ? "Project Details" : step === 2 ? "Escrow Setup" : "Confirm"}</p>
          </div>
          <button className="cd-icon-btn" onClick={onClose}><CloseIcon /></button>
        </div>

        <div className="cd-modal-steps">
          {[1,2,3].map(s => (
            <div key={s} className={`cd-step${step >= s ? " cd-step--done" : ""}`}>
              <div className="cd-step-dot">{step > s ? <CheckIcon /> : s}</div>
              <span>{s === 1 ? "Details" : s === 2 ? "Escrow" : "Confirm"}</span>
            </div>
          ))}
        </div>

        {step === 1 && (
          <div className="cd-modal-body">
            <div className="sr-field-group">
              <label className="sr-field-label">Project Title</label>
              <input className="sr-input" name="title" value={formData.title} onChange={handleChange} placeholder="e.g. Mobile App Redesign" />
            </div>
            <div className="sr-field-group">
              <label className="sr-field-label">Project Description</label>
              <textarea className="sr-input cd-textarea" name="description" value={formData.description} onChange={handleChange} placeholder="Describe the scope of work..." />
            </div>
            <div className="sr-field-group">
              <label className="sr-field-label">Required Skills (Optional)</label>
              <input className="sr-input" name="skills" value={formData.skills} onChange={handleChange} placeholder="e.g. React, Figma, Mobile UI" />
            </div>
            <div className="sr-field-group">
              <label className="sr-field-label">Estimated Duration (Optional)</label>
              <input className="sr-input" name="duration" value={formData.duration} onChange={handleChange} placeholder="e.g. 4 weeks" />
            </div>
            <div className="sr-field-group">
              <label className="sr-field-label">Deadline</label>
              <input className="sr-input" name="due" value={formData.due} onChange={handleChange} type="date" />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="cd-modal-body">
            <div className="sr-field-group">
              <label className="sr-field-label">Total Budget (Tokens)</label>
              <input className="sr-input" name="budget" value={formData.budget} onChange={handleChange} placeholder="0.00" />
            </div>
            <div className="sr-field-group">
              <label className="sr-field-label">Initial Escrow Deposit (Tokens)</label>
              <input className="sr-input" name="escrowed" value={formData.escrowed} onChange={handleChange} placeholder="0.00" />
            </div>
            <div className="cd-yield-notice">
              <YieldIcon />
              <p>Locked funds earn yield while held in escrow — returned to you or released to freelancer at milestone completion.</p>
            </div>
            <div className="sr-field-group">
              <label className="sr-field-label">Milestone Name</label>
              <input className="sr-input" name="milestone" value={formData.milestone} onChange={handleChange} placeholder="e.g. Initial Wireframes" />
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="cd-modal-body">
            <div className="cd-confirm-block">
              <div className="cd-confirm-row"><span>Project</span><strong>{formData.title || "New Contract"}</strong></div>
              <div className="cd-confirm-row"><span>Budget</span><strong>{formData.budget || "0"} Tokens</strong></div>
              <div className="cd-confirm-row"><span>Escrow Deposit</span><strong>{formData.escrowed || "0"} Tokens</strong></div>
              <div className="cd-confirm-row"><span>Milestone</span><strong>{formData.milestone || "Initial Setup"}</strong></div>
              <div className="cd-confirm-row"><span>Required Skills</span><strong>{formData.skills || "React · Escrow Protection"}</strong></div>
              <div className="cd-confirm-row"><span>Duration</span><strong>{formData.duration || "4 weeks"}</strong></div>
            </div>
            <div className="cd-yield-notice">
              <ShieldIcon />
              <p>By creating this contract, funds will be locked in escrow and both parties are protected by Escrow Admin's dispute resolution policy.</p>
            </div>
          </div>
        )}

        <div className="cd-modal-foot">
          {step > 1 && (
            <button className="cd-action-btn cd-action-btn--outline" onClick={() => setStep(s => s - 1)}>
              Back
            </button>
          )}
          {step < 3
            ? <button className="sr-cta-btn" style={{width:"auto",padding:"0 28px"}} onClick={() => setStep(s => s + 1)}>Continue</button>
            : <button className="sr-cta-btn" style={{width:"auto",padding:"0 28px"}} onClick={handleCreate}><CheckIcon /> Create Contract</button>
          }
        </div>
      </div>
    </div>
  );
}

/* ── SVG Icons ──────────────────────────────────────────────── */
function ShieldIcon()    { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>; }
function GridIcon()      { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>; }
function BriefcaseIcon() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg>; }
function VaultIcon()     { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="18" rx="2"/><circle cx="12" cy="12" r="3"/><path d="M12 9v-2M12 17v-2M9 12H7M17 12h-2"/></svg>; }
function ActivityIcon()  { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>; }
function MessageIcon()   { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>; }

/* ── SVG Icons ──────────────────────────────────────────────── */
function SettingsIcon()  { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>; }
function YieldIcon()     { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>; }
function PlusIcon()      { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>; }
function BellIcon()      { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>; }
function DotsIcon()      { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="5" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="12" cy="19" r="1"/></svg>; }
function ChevronIcon()   { return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="6 9 12 15 18 9"/></svg>; }
function CheckIcon()     { return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>; }
function FlagIcon()      { return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>; }
function StarIcon()      { return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>; }
function TrendUpIcon()   { return <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>; }
function ClockIcon()     { return <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>; }
function AlertIcon()     { return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>; }
function CloseIcon()     { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>; }

/* ────────────────────────────────────────────────────────── */
/*                       ESCROW VAULT PAGE                    */
/* ────────────────────────────────────────────────────────── */
const MOCK_YIELD_DATA = [
  { month: "Jan", yield: 21.5 },
  { month: "Feb", yield: 48.0 },
  { month: "Mar", yield: 83.0 },
  { month: "Apr", yield: 112.0 },
  { month: "May", yield: 145.42 },
];

function EscrowVault({ projects }) {
  const [deposit, setDeposit] = useState(5000);
  const [months, setMonths] = useState(6);

  const getAPY = (amount) => {
    if (amount < 2000) return 5.5;
    if (amount < 10000) return 6.5;
    return 7.5;
  };

  const apy = getAPY(deposit);
  const calculatedYield = ((deposit * (apy / 100)) / 12) * months;
  const calculatedTotal = deposit + calculatedYield;

  const parsedTotalEscrowed = projects.reduce((acc, p) => acc + parseFloat(p.escrowed.replace(/[^0-9.]/g, "") || 0), 0);
  const parsedTotalYield = projects.reduce((acc, p) => acc + parseFloat(p.yieldEarned.replace(/[^0-9.]/g, "") || 0), 0);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.4 }}
      className="cd-vault-container"
    >
      {/* Stat grid */}
      <div className="cd-stats">
        <StatCard
          icon={<VaultIcon />}
          iconCls="cd-sci--blue"
          label="Total Locked Escrow"
          value={`${parsedTotalEscrowed.toLocaleString()} Tokens`}
          sub={`${projects.length} Secured Contracts`}
        />
        <StatCard
          icon={<YieldIcon />}
          iconCls="cd-sci--green"
          label="Accrued Yield"
          value={`${parsedTotalYield.toLocaleString()} Tokens`}
          sub="Working funds locked securely"
          trend="+27.22 Tokens this week"
          trendUp
        />
        <StatCard
          icon={<Percent />}
          iconCls="cd-sci--green"
          label="Yield APY Rate"
          value="Up to 7.5%"
          sub="Based on deposit volume"
          trend="Highest in Industry"
          trendUp
        />
        <StatCard
          icon={<Shield />}
          iconCls="cd-sci--blue"
          label="Vault Security"
          value="100%"
          sub="Multisig Cryptographic Lock"
          trend="Audited"
          trendUp
        />
      </div>

      <div className="cd-vault-grid">
        {/* Left Side: Yield accrued trend chart */}
        <div className="cd-panel" style={{ margin: 0 }}>
          <div className="cd-panel-head cd-panel-head--flush" style={{ marginBottom: 16 }}>
            <h2 className="cd-panel-title">Yield Accrual Analytics</h2>
            <p className="cd-panel-sub">Historical growth of DeFi-optimized yield payouts (in Tokens)</p>
          </div>
          <div style={{ width: "100%", height: 320 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={MOCK_YIELD_DATA} margin={{ left: -10, right: 10, top: 10 }}>
                <defs>
                  <linearGradient id="vaultYieldGlow" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--green)" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="var(--green)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="month" stroke="var(--text-2)" fontSize={11} />
                <YAxis stroke="var(--text-2)" fontSize={11} tickFormatter={(v) => `${v} T`} />
                <RechartsTooltip 
                  contentStyle={{ background: "var(--surface)", borderColor: "var(--border)", borderRadius: 8 }}
                  formatter={(value) => [`${value} Tokens`, "Yield Balance"]}
                />
                <Area type="monotone" dataKey="yield" stroke="var(--green)" strokeWidth={2} fillOpacity={1} fill="url(#vaultYieldGlow)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right Side: Compounding yield calculator */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div className="cd-panel cd-calculator-card" style={{ margin: 0 }}>
            <div className="cd-panel-head cd-panel-head--flush" style={{ marginBottom: 14 }}>
              <h2 className="cd-panel-title">Yield Projection Calculator</h2>
              <p className="cd-panel-sub">Simulate returns on new escrow deposits (in Tokens)</p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div className="cd-calc-slider-group">
                <div className="cd-calc-slider-header">
                  <span>Deposit Size</span>
                  <strong>{deposit.toLocaleString()} Tokens</strong>
                </div>
                <input 
                  type="range" 
                  min="500" 
                  max="20000" 
                  step="500"
                  value={deposit} 
                  onChange={(e) => setDeposit(Number(e.target.value))}
                  className="cd-calc-slider"
                />
              </div>

              <div className="cd-calc-slider-group">
                <div className="cd-calc-slider-header">
                  <span>Lock Duration</span>
                  <strong>{months} Months</strong>
                </div>
                <input 
                  type="range" 
                  min="1" 
                  max="12" 
                  step="1"
                  value={months} 
                  onChange={(e) => setMonths(Number(e.target.value))}
                  className="cd-calc-slider"
                />
              </div>
            </div>

            <div className="cd-calc-results">
              <div className="cd-calc-row">
                <span>Calculated Tier APY</span>
                <strong style={{ color: "var(--blue)" }}>{apy}% APY</strong>
              </div>
              <div className="cd-calc-row">
                <span>Accrued Yield</span>
                <strong style={{ color: "var(--green)" }}>+{Math.round(calculatedYield).toLocaleString()} Tokens</strong>
              </div>
              <div className="cd-calc-row cd-calc-row-total">
                <span>Projected Payout</span>
                <strong>{Math.round(calculatedTotal).toLocaleString()} Tokens</strong>
              </div>
            </div>
            <button className="sr-cta-btn" style={{ height: 40 }} onClick={() => alert("Simulation added to planning records.")}>
              Lock Funds &amp; Generate Yield
            </button>
          </div>

          {/* Secure Audit Badges */}
          <div className="cd-vault-shield-card">
            <div className="cd-vault-shield-icon">
              <Shield size={18} />
            </div>
            <div className="cd-vault-shield-body">
              <h4 className="cd-vault-shield-title">Audited Multisig Vaults</h4>
              <p className="cd-vault-shield-desc">Funds are locked securely in smart contracts verified by CertiK and Halborn. Safe, transparent escrow operations.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Locked Vaults Table */}
      <div className="cd-panel" style={{ marginTop: 24 }}>
        <div className="cd-panel-head" style={{ marginBottom: 16 }}>
          <div>
            <h2 className="cd-panel-title">Active Security Lockers</h2>
            <p className="cd-panel-sub">Real-time status of multi-sig smart contracts and yield-bearing nodes</p>
          </div>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table className="cd-vault-table" style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border)", color: "var(--text-2)", fontSize: 12 }}>
                <th style={{ padding: "12px 16px" }}>Freelancer / Contract</th>
                <th style={{ padding: "12px 16px" }}>Locker Status</th>
                <th style={{ padding: "12px 16px" }}>Locked Principal</th>
                <th style={{ padding: "12px 16px" }}>APY Rate</th>
                <th style={{ padding: "12px 16px" }}>Yield Accrued</th>
                <th style={{ padding: "12px 16px" }}>Locker Signature</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((p) => {
                const isComp = p.status === "Completed";
                const pEscrow = parseFloat(p.escrowed.replace(/[^0-9.]/g, "") || 0);
                const pYield = parseFloat(p.yieldEarned.replace(/[^0-9.]/g, "") || 0);
                const pApy = getAPY(pEscrow);
                return (
                  <tr key={p.id} style={{ borderBottom: "1px solid var(--border)", fontSize: 13.5 }}>
                    <td style={{ padding: "16px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div className="cd-avatar" style={{ width: 30, height: 30, fontSize: 11 }}>{p.avatar}</div>
                        <div>
                          <strong style={{ display: "block", color: "var(--text-1)" }}>{p.freelancer}</strong>
                          <span style={{ fontSize: 11, color: "var(--text-2)" }}>{p.title}</span>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: "16px" }}>
                      <span className={`cd-badge ${isComp ? "cd-badge--green" : "cd-badge--blue"}`}>
                        {isComp ? "Released" : "Secured"}
                      </span>
                    </td>
                    <td style={{ padding: "16px", color: "var(--text-1)", fontWeight: 600 }}>
                      {pEscrow.toLocaleString()} Tokens
                    </td>
                    <td style={{ padding: "16px", color: "var(--blue)", fontWeight: 600 }}>
                      {pApy}% APY
                    </td>
                    <td style={{ padding: "16px", color: "var(--green)", fontWeight: 600 }}>
                      +{pYield.toLocaleString()} Tokens
                    </td>
                    <td style={{ padding: "16px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 6, color: "var(--text-2)", fontSize: 11.5 }}>
                        <Shield size={12} style={{ color: "var(--blue)" }} />
                        <span>{isComp ? "Tx Released" : "CertiK Verified"}</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}

/* ────────────────────────────────────────────────────────── */
/*                       ACTIVITY LOG PAGE                    */
/* ────────────────────────────────────────────────────────── */
const INITIAL_ACTIVITIES = [
  { id: 1, type: "milestone", cat: "Milestones", title: "Omar Farooq submitted final delivery", sub: "API Integration Suite · Milestone 3", time: "2 hours ago", status: "Review" },
  { id: 2, type: "deposit", cat: "Deposits", title: "3,527.5 Tokens escrow deposited securely", sub: "E-commerce Web App · Dev Patel", time: "1 day ago", status: "Secured" },
  { id: 3, type: "yield", cat: "Releases", title: "Yield of 15.27 Tokens credited to vault balance", sub: "Accrued interest on Brand Identity Redesign", time: "2 days ago", status: "Credited" },
  { id: 4, type: "milestone", cat: "Milestones", title: "Milestone review requested: Frontend UI", sub: "E-commerce Web App · Dev Patel", time: "3 days ago", status: "Pending Approval" },
  { id: 5, type: "contract", cat: "Deposits", title: "New contract signed with Lena Koch", sub: "Motion Graphics Pack · Budget 1,494 Tokens", time: "5 days ago", status: "Active" },
  { id: 6, type: "release", cat: "Releases", title: "Released 1,328 Tokens milestone payment", sub: "Brand Identity Redesign · Aria Mehta", time: "1 week ago", status: "Completed" },
  { id: 7, type: "dispute", cat: "Disputes", title: "Dispute raise warning cleared: Logo Concepts", sub: "Brand Identity Redesign · Aria Mehta", time: "10 days ago", status: "Resolved" }
];

function ActivityPage() {
  const [filter, setFilter] = useState("All");
  const pills = ["All", "Deposits", "Milestones", "Releases", "Disputes"];

  const filtered = filter === "All" 
    ? INITIAL_ACTIVITIES 
    : INITIAL_ACTIVITIES.filter(a => a.cat === filter);

  // Render Category Icon Badge
  const getActIcon = (type) => {
    switch (type) {
      case "milestone":
        return <Activity size={16} />;
      case "deposit":
        return <VaultIcon />;
      case "yield":
        return <YieldIcon />;
      case "release":
        return <Check size={16} />;
      case "dispute":
        return <AlertCircle size={16} />;
      default:
        return <PlusIcon />;
    }
  };

  const getActCls = (type) => {
    switch (type) {
      case "release":
      case "yield":
        return "cd-act--green";
      case "deposit":
      case "contract":
        return "cd-act--blue";
      case "milestone":
      case "dispute":
        return "cd-act--yellow";
      default:
        return "cd-act--blue";
    }
  };

  // Bar Chart Data represent activity trends
  const MOCK_BAR_DATA = [
    { name: "Wk 1", count: 4 },
    { name: "Wk 2", count: 8 },
    { name: "Wk 3", count: 5 },
    { name: "Wk 4", count: 12 },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.4 }}
      className="cd-vault-container"
    >
      <div className="cd-activity-pills-row">
        {pills.map(p => (
          <button 
            key={p} 
            onClick={() => setFilter(p)}
            className={`cd-filter-btn${filter === p ? " cd-filter-btn--active" : ""}`}
          >
            {p}
          </button>
        ))}
      </div>

      <div className="cd-activity-page-grid">
        {/* Left Side: Activity Timeline */}
        <div className="cd-panel" style={{ margin: 0, display: "flex", flexDirection: "column", gap: 14 }}>
          <div className="cd-panel-head cd-panel-head--flush">
            <h2 className="cd-panel-title">Audit Trail &amp; Events Log</h2>
          </div>
          <ul className="cd-activity-list">
            {filtered.map(act => (
              <li key={act.id} className="cd-activity-item" style={{ 
                border: "1px solid var(--border)", 
                borderRadius: 12, 
                padding: "12px 16px",
                background: "var(--surface-2)",
                transition: "all 0.2s ease"
              }}>
                <div className={`cd-act-icon ${getActCls(act.type)}`}>{getActIcon(act.type)}</div>
                <div className="cd-act-body" style={{ flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10 }}>
                    <p className="cd-act-text" style={{ fontWeight: 600, color: "var(--text-1)" }}>{act.title}</p>
                    <span style={{
                      fontSize: 10.5,
                      fontWeight: 600,
                      padding: "2px 8px",
                      borderRadius: 4,
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid var(--border)",
                      color: "var(--text-2)"
                    }}>{act.status}</span>
                  </div>
                  <p style={{ fontSize: 12, color: "var(--text-2)", marginTop: 2 }}>{act.sub}</p>
                  <span className="cd-act-time" style={{ marginTop: 4, display: "inline-block" }}>{act.time}</span>
                </div>
              </li>
            ))}
            {filtered.length === 0 && (
              <div className="cd-empty">No events matching this filter found.</div>
            )}
          </ul>
        </div>

        {/* Right Side: Analytics Volume Sidebar */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div className="cd-panel" style={{ margin: 0 }}>
            <div className="cd-panel-head cd-panel-head--flush" style={{ marginBottom: 14 }}>
              <h2 className="cd-panel-title">Monthly Audit Volume</h2>
              <p className="cd-panel-sub">Escrow actions tracked weekly</p>
            </div>
            <div style={{ width: "100%", height: 160 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={MOCK_BAR_DATA} margin={{ left: -30, right: 10 }}>
                  <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" opacity={0.2} />
                  <XAxis dataKey="name" stroke="var(--text-2)" fontSize={11} />
                  <YAxis stroke="var(--text-2)" fontSize={11} allowDecimals={false} />
                  <RechartsTooltip 
                    contentStyle={{ background: "var(--surface)", borderColor: "var(--border)", borderRadius: 8 }}
                  />
                  <Bar dataKey="count" fill="var(--blue)" radius={[4, 4, 0, 0]}>
                    {MOCK_BAR_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index === 3 ? "var(--green)" : "var(--blue)"} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="cd-vault-shield-card" style={{ background: "rgba(91, 140, 255, 0.03)", borderColor: "var(--blue-border)" }}>
            <div className="cd-vault-shield-icon" style={{ color: "var(--blue)", background: "var(--blue-glow)", borderColor: "var(--blue-border)" }}>
              <Download size={18} />
            </div>
            <div className="cd-vault-shield-body">
              <h4 className="cd-vault-shield-title">Export Log Records</h4>
              <p className="cd-vault-shield-desc">Download signed cryptographic activity statements for tax or accounting purposes.</p>
              <button 
                className="cd-action-btn cd-action-btn--outline" 
                style={{ alignSelf: "flex-start", marginTop: 8, fontSize: 12, height: 32, padding: "0 12px" }}
                onClick={() => alert("CSV audit log downloaded successfully.")}
              >
                Download CSV Statement
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ────────────────────────────────────────────────────────── */
/*                       MESSAGES CHAT PAGE                   */
/* ────────────────────────────────────────────────────────── */
const MOCK_CHATS_CLIENT_INIT = [
  {
    id: 1,
    name: "Aria Mehta (Redesign)",
    avatarColor: "linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%)",
    role: "Brand Identity Redesign",
    online: true,
    lastSeen: "Active now",
    messages: [
      { sender: "client", text: "Hi Aria, how are the logo concepts coming along?", time: "May 25, 2:30 PM" },
      { sender: "freelancer", text: "Hey! I am finalized on three custom directions. Will share them by tomorrow afternoon.", time: "May 25, 2:34 PM" },
      { sender: "client", text: "Excellent! Let's ensure the typography feels premium.", time: "May 25, 2:40 PM" }
    ],
    unreadCount: 0,
    typing: false
  },
  {
    id: 2,
    name: "Dev Patel (E-commerce)",
    avatarColor: "linear-gradient(135deg, #4FAF8F 0%, #34D399 100%)",
    role: "E-commerce Web App",
    online: true,
    lastSeen: "Active now",
    messages: [
      { sender: "freelancer", text: "Hi! I just finished the frontend UI for the cart page. Please let me know your thoughts.", time: "May 27, 11:30 AM" },
      { sender: "client", text: "It looks fantastic! I've sent it to our team for a quick review.", time: "May 27, 11:35 AM" },
      { sender: "freelancer", text: "Awesome! Once approved, I can start on the checkout logic.", time: "May 27, 11:42 AM" }
    ],
    unreadCount: 3,
    typing: false
  },
  {
    id: 3,
    name: "Lena Koch (Motion)",
    avatarColor: "linear-gradient(135deg, #5B8CFF 0%, #7BA7FF 100%)",
    role: "Motion Graphics Pack",
    online: false,
    lastSeen: "Active 2 hours ago",
    messages: [
      { sender: "client", text: "Hi Lena! Excited to kick off this motion project.", time: "May 26, 9:00 AM" },
      { sender: "freelancer", text: "Me too! I will prepare a moodboard draft by Thursday.", time: "May 26, 9:05 AM" }
    ],
    unreadCount: 0,
    typing: false
  },
  {
    id: 4,
    name: "Omar Farooq (APIs)",
    avatarColor: "linear-gradient(135deg, #a78bfa 0%, #c084fc 100%)",
    role: "API Integration Suite",
    online: true,
    lastSeen: "Active now",
    messages: [
      { sender: "freelancer", text: "Hi, the API endpoints are fully active and tested on staging.", time: "May 20, 4:00 PM" },
      { sender: "client", text: "Thank you Omar! The integration is fully running. Escrow has been released.", time: "May 20, 5:15 PM" },
      { sender: "freelancer", text: "Awesome! It was a pleasure working with you. Hope to collaborate again!", time: "May 20, 5:20 PM" }
    ],
    unreadCount: 0,
    typing: false
  }
];

function MessagesPage() {
  const [chats, setChats] = useState(MOCK_CHATS_CLIENT_INIT);
  const [activeChatId, setActiveChatId] = useState(2);
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

    // Client sent message
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const updatedMessages = [
      ...activeChat.messages,
      { sender: "client", text: msgText, time: timestamp }
    ];

    setChats(prev => prev.map(c => c.id === activeChatId ? { ...c, messages: updatedMessages, unreadCount: 0 } : c));
    setMsgText("");

    // Simulate freelancer reply
    setTimeout(() => {
      // Show typing indicator
      setChats(prev => prev.map(c => c.id === activeChatId ? { ...c, typing: true } : c));

      setTimeout(() => {
        // Appends automated freelancer response
        setChats(prev => prev.map(c => {
          if (c.id === activeChatId) {
            let replyText = "Received! Let me review this with my team and I will get back to you shortly.";
            if (activeChatId === 1) replyText = "Got it! Incorporating those design points. I will have the final files uploaded to the escrow portal shortly!";
            if (activeChatId === 2) replyText = "Thanks for the feedback! I'll be online to implement the checkout changes as soon as you approve the UI milestone.";
            if (activeChatId === 3) replyText = "Perfect! I'm reviewing the storyboard timeline now and will match the brand guidelines exactly.";
            if (activeChatId === 4) replyText = "Awesome! It was a pleasure working with you. Let me know if you need any adjustments on the API routes in the future.";

            return {
              ...c,
              typing: false,
              messages: [
                ...c.messages,
                { sender: "freelancer", text: replyText, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
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
      {/* Sidebar thread listings */}
      <div className={`chat-sidebar ${mobileView === "list" ? "mobile-open" : ""}`} style={{
        display: mobileView === "list" ? "flex" : undefined
      }}>
        {/* Search */}
        <div className="chat-sidebar-search">
          <div style={{
            display: "flex", alignItems: "center", gap: 8,
            background: "var(--surface-2)", border: "1px solid var(--border)",
            borderRadius: 8, padding: "8px 14px", width: "100%"
          }}>
            <ActivityIcon />
            <input 
              type="text" 
              placeholder="Search freelancers..."
              value={chatSearch}
              onChange={(e) => setChatSearch(e.target.value)}
              style={{
                background: "none", border: "none", outline: "none",
                color: "var(--text-1)", fontFamily: "'DM Sans', sans-serif", fontSize: 13,
                width: "100%"
              }}
            />
          </div>
        </div>

        {/* List of active chat threads */}
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
                      background: "var(--green)", border: "2px solid var(--surface)",
                    }} />
                  )}
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 2 }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: "var(--text-1)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {c.name.split(" (")[0]}
                    </span>
                    <span style={{ fontSize: 10, color: "var(--text-3)" }}>{lastMsg?.time || ""}</span>
                  </div>
                  <div style={{ fontSize: 11, color: "var(--text-2)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {c.typing ? <span style={{ color: "var(--green)", fontWeight: 500 }}>Typing...</span> : lastMsg?.text || ""}
                  </div>
                </div>

                {c.unreadCount > 0 && (
                  <div style={{
                    background: "var(--blue)", color: "#fff", borderRadius: 10,
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

      {/* Main chat window */}
      <div className="chat-window" style={{
        display: mobileView === "list" ? "none" : "flex"
      }}>
        {/* Header */}
        <div className="chat-header">
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <button 
              onClick={() => setMobileView("list")}
              style={{
                display: "none", color: "var(--text-2)", cursor: "pointer",
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
                  background: "var(--green)", border: "2px solid var(--surface)",
                }} />
              )}
            </div>

            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ fontSize: 14.5, fontWeight: 700, color: "var(--text-1)" }}>
                  {activeChat.name}
                </span>
                <span style={{ fontSize: 10, color: "var(--text-3)", border: "1px solid var(--border)", borderRadius: 4, padding: "1px 4px" }}>
                  {activeChat.role}
                </span>
              </div>
              <div style={{ fontSize: 11, color: activeChat.online ? "var(--green)" : "var(--text-3)", display: "flex", alignItems: "center", gap: 4, marginTop: 2 }}>
                <Circle size={6} fill={activeChat.online ? "var(--green)" : "transparent"} color={activeChat.online ? "var(--green)" : "var(--text-3)"} />
                {activeChat.lastSeen}
              </div>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 12, color: "var(--text-2)", display: "flex", alignItems: "center", gap: 6, padding: "6px 12px", borderRadius: 8, background: "rgba(91,140,255,0.06)", border: "1px solid var(--blue-border)" }}>
              <Shield size={12} color="var(--blue)" /> Escrow Secure
            </span>
          </div>
        </div>

        {/* Message Log */}
        <div className="chat-messages">
          {activeChat.messages.map((m, idx) => (
            <div 
              key={idx}
              className={`chat-bubble ${m.sender === "client" ? "chat-bubble-me" : "chat-bubble-client"}`}
            >
              <div style={{ wordBreak: "break-word" }}>{m.text}</div>
              <div style={{ 
                fontSize: 9, 
                color: m.sender === "client" ? "rgba(255,255,255,0.6)" : "var(--text-3)",
                alignSelf: "flex-end",
                display: "flex",
                alignItems: "center",
                gap: 4,
                marginTop: 2
              }}>
                {m.time}
                {m.sender === "client" && <CheckCheck size={11} />}
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

        {/* Input box */}
        <div className="chat-input-area">
          <form onSubmit={handleSend} style={{ display: "flex", alignItems: "center", gap: 10, position: "relative" }}>
            <button 
              type="button"
              onClick={() => setShowAttachmentMenu(!showAttachmentMenu)}
              style={{
                width: 38, height: 38, borderRadius: 8,
                background: "rgba(255,255,255,0.02)", border: "1px solid var(--border)",
                color: "var(--text-2)", display: "flex", alignItems: "center", justifyContent: "center",
                transition: "all 0.2s"
              }}
            >
              <Paperclip size={16} />
            </button>

            {showAttachmentMenu && (
              <div style={{
                position: "absolute", bottom: "100%", left: 0, marginBottom: 8,
                background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 10,
                padding: 6, display: "flex", flexDirection: "column", gap: 4,
                width: 170, boxShadow: "0 8px 32px rgba(0,0,0,0.5)", zIndex: 100
              }}>
                <button type="button" onClick={() => { setShowAttachmentMenu(false); alert("Uploading file..."); }} style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 10px", borderRadius: 6, color: "var(--text-1)", fontSize: 12, cursor: "pointer", width: "100%", textAlign: "left", background: "transparent", border: "none" }}>
                  <Download size={13} color="var(--blue)" /> Upload Document
                </button>
                <button type="button" onClick={() => { setShowAttachmentMenu(false); alert("Requesting revision log..."); }} style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 10px", borderRadius: 6, color: "var(--text-1)", fontSize: 12, cursor: "pointer", width: "100%", textAlign: "left", background: "transparent", border: "none" }}>
                  <AlertCircle size={13} color="var(--blue)" /> Request Revision
                </button>
              </div>
            )}

            <input 
              type="text" 
              placeholder="Type your message securely..."
              value={msgText}
              onChange={(e) => setMsgText(e.target.value)}
              style={{
                flex: 1, height: 38, padding: "0 14px",
                background: "rgba(255,255,255,0.02)", border: "1px solid var(--border)",
                borderRadius: 8, color: "var(--text-1)", outline: "none",
                fontFamily: "'DM Sans', sans-serif", fontSize: 13.5
              }}
            />
            <button 
              type="submit"
              style={{
                width: 38, height: 38, borderRadius: 8,
                background: "var(--blue)", border: "none",
                color: "#fff", display: "flex", alignItems: "center", justifyContent: "center",
                transition: "all 0.2s"
              }}
            >
              <Send size={16} />
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

/* ────────────────────────────────────────────────────────── */
/*                       SETTINGS PAGE                        */
/* ────────────────────────────────────────────────────────── */
const GRADIENTS = [
  { id: "grad-blue", value: "linear-gradient(135deg, var(--blue), #93b4ff)" },
  { id: "grad-green", value: "linear-gradient(135deg, var(--green), #7ed4b9)" },
  { id: "grad-amber", value: "linear-gradient(135deg, #f5a623, #fcd34d)" },
  { id: "grad-purple", value: "linear-gradient(135deg, #a78bfa, #c084fc)" },
];

function SettingsPage({ name }) {
  const [activeTab, setActiveTab] = useState("profile");
  
  // Profile settings
  const [profileName, setProfileName] = useState(name);
  const [profileEmail, setProfileEmail] = useState("company.admin@escrowadmin.com");
  const [company, setCompany] = useState("Escrow Labs Inc.");
  const [phone, setPhone] = useState("+91 98765 43210");
  const [activeGrad, setActiveGrad] = useState("grad-blue");

  // Notifications toggles
  const [notifyEmail, setNotifyEmail] = useState(true);
  const [notifySlack, setNotifySlack] = useState(false);
  const [slackUrl, setSlackUrl] = useState("https://hooks.slack.com/services/YOUR_WORKSPACE_ID/YOUR_CHANNEL_ID/YOUR_TOKEN");

  // Security elements
  const [twoFactor, setTwoFactor] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [copied, setCopied] = useState(false);

  // Simulated Save feedback
  const [saving, setSaving] = useState(false);
  const [toastText, setToastText] = useState("");

  const triggerToast = (text) => {
    setToastText(text);
    setTimeout(() => setToastText(""), 3000);
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      triggerToast("Profile settings saved successfully!");
    }, 1200);
  };

  const generateApiKey = () => {
    const randomHex = "sk_live_" + [...Array(24)].map(() => Math.floor(Math.random() * 16).toString(16)).join("");
    setApiKey(randomHex);
    triggerToast("API secret key generated securely!");
  };

  const copyToClipboard = () => {
    if (!apiKey) return;
    navigator.clipboard.writeText(apiKey);
    setCopied(true);
    triggerToast("API key copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.4 }}
      className="cd-panel"
      style={{ margin: 0, minHeight: 460 }}
    >
      <div className="cd-settings-grid">
        {/* Settings Tab Sidebar */}
        <aside className="cd-settings-sidebar">
          <button 
            type="button"
            className={`cd-settings-tab-btn${activeTab === "profile" ? " cd-settings-tab-btn--active" : ""}`}
            onClick={() => setActiveTab("profile")}
          >
            <User size={16} /> Profile Details
          </button>
          <button 
            type="button"
            className={`cd-settings-tab-btn${activeTab === "security" ? " cd-settings-tab-btn--active" : ""}`}
            onClick={() => setActiveTab("security")}
          >
            <Key size={16} /> Security Settings
          </button>
          <button 
            type="button"
            className={`cd-settings-tab-btn${activeTab === "payments" ? " cd-settings-tab-btn--active" : ""}`}
            onClick={() => setActiveTab("payments")}
          >
            <CreditCard size={16} /> Bank &amp; Payments
          </button>
          <button 
            type="button"
            className={`cd-settings-tab-btn${activeTab === "notifications" ? " cd-settings-tab-btn--active" : ""}`}
            onClick={() => setActiveTab("notifications")}
          >
            <Bell size={16} /> Notifications
          </button>
        </aside>

        {/* Tab Content Panel */}
        <div style={{ flex: 1 }}>
          {activeTab === "profile" && (
            <form className="cd-settings-panel" onSubmit={handleSaveProfile}>
              <div>
                <h3 className="cd-panel-title">Profile Customization</h3>
                <p className="cd-panel-sub">Change your admin info and customize dashboard aesthetics</p>
              </div>

              {/* Avatar Selector */}
              <div className="cd-avatar-selector-group">
                <div 
                  className="cd-avatar-preview" 
                  style={{ background: GRADIENTS.find(g => g.id === activeGrad)?.value }}
                >
                  {(profileName || "C").split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase()}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <span className="sr-field-label">Choose Avatar Theme</span>
                  <div className="cd-avatar-gradients">
                    {GRADIENTS.map(grad => (
                      <div 
                        key={grad.id}
                        onClick={() => setActiveGrad(grad.id)}
                        className={`cd-avatar-grad-option${activeGrad === grad.id ? " cd-avatar-grad-option--active" : ""}`}
                        style={{ background: grad.value }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                <div className="sr-field-group">
                  <label className="sr-field-label">Admin Full Name</label>
                  <input className="sr-input" value={profileName} onChange={(e) => setProfileName(e.target.value)} placeholder="Full Name" required />
                </div>
                <div className="sr-field-group">
                  <label className="sr-field-label">Linked Business Email</label>
                  <input className="sr-input" type="email" value={profileEmail} onChange={(e) => setProfileEmail(e.target.value)} placeholder="Email address" required />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                <div className="sr-field-group">
                  <label className="sr-field-label">Company Name</label>
                  <input className="sr-input" value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Company" />
                </div>
                <div className="sr-field-group">
                  <label className="sr-field-label">Contact Phone</label>
                  <input className="sr-input" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone" />
                </div>
              </div>

              <button className="sr-cta-btn" style={{ width: "auto", padding: "0 28px", alignSelf: "flex-end" }} type="submit" disabled={saving}>
                {saving ? (
                  <>
                    <span className="cd-loading-spinner" /> Saving...
                  </>
                ) : "Save Custom Profile"}
              </button>
            </form>
          )}

          {activeTab === "security" && (
            <div className="cd-settings-panel">
              <div>
                <h3 className="cd-panel-title">Security Settings</h3>
                <p className="cd-panel-sub">Manage authentication credentials, secrets, and API access</p>
              </div>

              <div className="cd-toggle-wrapper">
                <div className="cd-toggle-info">
                  <span className="cd-toggle-title">Two-Factor Authentication (2FA)</span>
                  <span className="cd-toggle-desc">Require verification code alongside account passwords.</span>
                </div>
                <input 
                  type="checkbox" 
                  checked={twoFactor}
                  onChange={() => setTwoFactor(!twoFactor)}
                  style={{ width: 44, height: 22, cursor: "pointer" }}
                />
              </div>

              {/* API Access Tokens */}
              <div className="cd-api-token-widget">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span className="cd-toggle-title" style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <Key size={14} color="var(--blue)" /> API Access Webhook Token
                  </span>
                  <button type="button" className="cd-action-btn cd-action-btn--green" style={{ fontSize: 11.5, padding: "5px 10px" }} onClick={generateApiKey}>
                    Generate Token
                  </button>
                </div>
                <p className="cd-toggle-desc" style={{ margin: 0 }}>Use this secret key to hook payment and contract status directly to your external server.</p>
                {apiKey && (
                  <div className="cd-api-token-display">
                    <span>{apiKey}</span>
                    <button type="button" className="cd-api-copy-btn" onClick={copyToClipboard} title="Copy secret key">
                      {copied ? <Check size={14} color="var(--green)" /> : <Copy size={14} />}
                    </button>
                  </div>
                )}
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 12, borderTop: "1px solid var(--border)", paddingTop: 18 }}>
                <h4 style={{ fontSize: 13.5, fontWeight: 600 }}>Reset Admin Password</h4>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
                  <input className="sr-input" type="password" placeholder="Current password" />
                  <input className="sr-input" type="password" placeholder="New password" />
                  <input className="sr-input" type="password" placeholder="Confirm new password" />
                </div>
                <button type="button" className="sr-cta-btn" style={{ width: "auto", padding: "0 22px", alignSelf: "flex-end", height: 38 }} onClick={() => triggerToast("Password updated securely!")}>
                  Update Password
                </button>
              </div>
            </div>
          )}

          {activeTab === "payments" && (
            <div className="cd-settings-panel">
              <div>
                <h3 className="cd-panel-title">Linked Payment Accounts</h3>
                <p className="cd-panel-sub">Manage linked bank deposit lockers and compound rules</p>
              </div>

              <div className="sr-field-group">
                <label className="sr-field-label">Secured Bank Account (Lump Deposit Source)</label>
                <input className="sr-input" value="HDFC Bank •••• 9876" disabled />
              </div>

              <div className="sr-field-group">
                <label className="sr-field-label">Linked UPI Identification (Immediate Withdrawals)</label>
                <input className="sr-input" placeholder="UPI ID e.g. name@okhdfcbank" />
              </div>

              <div className="cd-toggle-wrapper">
                <div className="cd-toggle-info">
                  <span className="cd-toggle-title">Automated Escrow Funding</span>
                  <span className="cd-toggle-desc">Automatically secure deposit reserves directly from bank when contracts are created.</span>
                </div>
                <input type="checkbox" defaultChecked style={{ width: 44, height: 22, cursor: "pointer" }} />
              </div>

              <div className="cd-toggle-wrapper">
                <div className="cd-toggle-info">
                  <span className="cd-toggle-title">Yield Compounder</span>
                  <span className="cd-toggle-desc">Automatically compound accumulated interest directly back into active contracts to boost APY metrics.</span>
                </div>
                <input type="checkbox" defaultChecked style={{ width: 44, height: 22, cursor: "pointer" }} />
              </div>
              
              <button type="button" className="sr-cta-btn" style={{ width: "auto", padding: "0 22px", alignSelf: "flex-end", height: 38 }} onClick={() => triggerToast("Payment configurations saved!")}>
                Save Payment Settings
              </button>
            </div>
          )}

          {activeTab === "notifications" && (
            <div className="cd-settings-panel">
              <div>
                <h3 className="cd-panel-title">Notification Channels</h3>
                <p className="cd-panel-sub">Customize emails, push, and external integration alerts</p>
              </div>

              <div className="cd-toggle-wrapper">
                <div className="cd-toggle-info">
                  <span className="cd-toggle-title">Milestone Submission Email Alerts</span>
                  <span className="cd-toggle-desc">Get notified immediately when a freelancer completes a milestone and requests review.</span>
                </div>
                <input type="checkbox" checked={notifyEmail} onChange={() => setNotifyEmail(!notifyEmail)} style={{ width: 44, height: 22, cursor: "pointer" }} />
              </div>

              <div className="cd-toggle-wrapper">
                <div className="cd-toggle-info">
                  <span className="cd-toggle-title">Slack Integration Alerts</span>
                  <span className="cd-toggle-desc">Pipe escrow events and contract locks into your team's Slack channel.</span>
                </div>
                <input type="checkbox" checked={notifySlack} onChange={() => setNotifySlack(!notifySlack)} style={{ width: 44, height: 22, cursor: "pointer" }} />
              </div>

              {notifySlack && (
                <div className="sr-field-group" style={{ animation: "fadeIn 0.3s ease both" }}>
                  <label className="sr-field-label">Slack Webhook URL</label>
                  <div style={{ display: "flex", gap: 10 }}>
                    <input className="sr-input" value={slackUrl} onChange={(e) => setSlackUrl(e.target.value)} placeholder="Slack webhook" />
                    <button type="button" className="cd-action-btn cd-action-btn--outline" onClick={() => triggerToast("Slack test webhook fired successfully!")}>
                      Test Channel
                    </button>
                  </div>
                </div>
              )}

              <button type="button" className="sr-cta-btn" style={{ width: "auto", padding: "0 22px", alignSelf: "flex-end", height: 38 }} onClick={() => triggerToast("Notification settings saved!")}>
                Save Notification Settings
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Floating success toast notification */}
      {toastText && (
        <div className="cd-toast-success">
          <Check size={16} />
          <span>{toastText}</span>
        </div>
      )}
    </motion.div>
  );
}

/* ────────────────────────────────────────────────────────── */
/*                       BUY TOKENS PAGE                      */
/* ────────────────────────────────────────────────────────── */
export function BuyTokensPage({ walletBalance, setWalletBalance }) {
  const [processing, setProcessing] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [successToast, setSuccessToast] = useState("");
  const [purchaseAmount, setPurchaseAmount] = useState(0);

  const steps = [
    "Connecting with secure UPI/Bank node...",
    "Authorizing smart contract vault...",
    "Securing ledger transactions with multi-sig signature...",
    "Depositing custom tokens to your workspace locker..."
  ];

  useEffect(() => {
    if (processing) {
      const interval = setInterval(() => {
        setLoadingStep(s => {
          if (s >= steps.length - 1) {
            clearInterval(interval);
            return s;
          }
          return s + 1;
        });
      }, 700);
      
      const timeout = setTimeout(() => {
        setProcessing(false);
        setWalletBalance(prev => prev + purchaseAmount);
        setSuccessToast(`Successfully purchased and credited ${purchaseAmount.toLocaleString()} Tokens!`);
        setTimeout(() => setSuccessToast(""), 4000);
      }, 3000);

      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    }
  }, [processing, purchaseAmount]);

  const triggerPurchase = (amount) => {
    setPurchaseAmount(amount);
    setLoadingStep(0);
    setProcessing(true);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.4 }}
      className="cd-vault-container"
    >
      <div className="cd-panel-head cd-panel-head--flush" style={{ marginBottom: 24 }}>
        <div>
          <h2 className="cd-panel-title">Tokens Subscriptions Center</h2>
          <p className="cd-panel-sub">Convert traditional currency to custom platform Tokens monthly at our discounted tier pools</p>
        </div>
      </div>

      <div className="cd-panel" style={{ margin: 0 }}>
        <div className="cd-panel-head cd-panel-head--flush" style={{ marginBottom: 20 }}>
          <h3 className="cd-panel-title">Available Subscription Pools</h3>
          <p className="cd-panel-sub">Exchange rates are dynamically calculated at 10 Tokens = 1,000 INR (1 Token = 100 INR)</p>
        </div>

        <div className="cd-tier-list">
          <div className="cd-sub-card">
            <span className="cd-sub-discount">Save 10%</span>
            <h4 className="cd-sub-title">Starter Pool</h4>
            <div className="cd-sub-price">
              <strong className="cd-sub-price-num">₹45,000</strong>
              <span className="cd-sub-price-den">/ month</span>
            </div>
            <div style={{ fontSize: 13, fontWeight: 700, color: "var(--blue)", display: "flex", alignItems: "center", gap: 4 }}>
              <CoinsIcon /> 500 Tokens / month
            </div>
            <ul className="cd-sub-features">
              <li className="cd-sub-feature-item">
                <Check size={12} />
                <span>Auto-credit monthly</span>
              </li>
              <li className="cd-sub-feature-item">
                <Check size={12} />
                <span>Locked APY compounding</span>
              </li>
            </ul>
            <button 
              className="sr-cta-btn" 
              style={{ height: 34, fontSize: 12 }} 
              onClick={() => triggerPurchase(500)}
            >
              Subscribe &amp; Convert
            </button>
          </div>

          <div className="cd-sub-card cd-sub-card--premium">
            <span className="cd-sub-tag">Popular</span>
            <span className="cd-sub-discount" style={{ background: "rgba(91, 140, 255, 0.16)", color: "var(--blue)" }}>Save 15%</span>
            <h4 className="cd-sub-title">Growth Pool</h4>
            <div className="cd-sub-price">
              <strong className="cd-sub-price-num">₹1,70,000</strong>
              <span className="cd-sub-price-den">/ month</span>
            </div>
            <div style={{ fontSize: 13, fontWeight: 700, color: "var(--green)", display: "flex", alignItems: "center", gap: 4 }}>
              <CoinsIcon /> 2,000 Tokens / month
            </div>
            <ul className="cd-sub-features">
              <li className="cd-sub-feature-item">
                <Check size={12} />
                <span>Advanced APY perks (+0.5%)</span>
              </li>
              <li className="cd-sub-feature-item">
                <Check size={12} />
                <span>Priority review support</span>
              </li>
            </ul>
            <button 
              className="sr-cta-btn" 
              style={{ height: 34, fontSize: 12, background: "var(--blue)" }} 
              onClick={() => triggerPurchase(2000)}
            >
              Subscribe &amp; Convert
            </button>
          </div>

          <div className="cd-sub-card">
            <span className="cd-sub-discount">Save 20%</span>
            <h4 className="cd-sub-title">Enterprise Pool</h4>
            <div className="cd-sub-price">
              <strong className="cd-sub-price-num">₹8,00,000</strong>
              <span className="cd-sub-price-den">/ month</span>
            </div>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#a78bfa", display: "flex", alignItems: "center", gap: 4 }}>
              <CoinsIcon /> 10,000 Tokens / month
            </div>
            <ul className="cd-sub-features">
              <li className="cd-sub-feature-item">
                <Check size={12} />
                <span>Bespoke contract design</span>
              </li>
              <li className="cd-sub-feature-item">
                <Check size={12} />
                <span>100% FDIC compliance</span>
              </li>
            </ul>
            <button 
              className="sr-cta-btn" 
              style={{ height: 34, fontSize: 12 }} 
              onClick={() => triggerPurchase(10000)}
            >
              Subscribe &amp; Convert
            </button>
          </div>
        </div>
      </div>

      {processing && (
        <div className="cd-modal-overlay" style={{ animation: "fadeIn 0.25s ease both", zIndex: 1000 }}>
          <div className="cd-modal" style={{ maxWidth: 400, textAlign: "center", padding: "36px 24px", display: "flex", flexDirection: "column", gap: 20 }}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div className="cd-loading-spinner" style={{ width: 48, height: 48, borderWidth: 3, color: "var(--blue)" }} />
            </div>
            <div>
              <h3 className="cd-panel-title" style={{ fontSize: 17, marginBottom: 6 }}>Processing Secure Exchange</h3>
              <p style={{ fontSize: 12.5, color: "var(--text-2)", minHeight: 36 }}>{steps[loadingStep]}</p>
            </div>
            <div style={{ height: 4, background: "rgba(255,255,255,0.06)", borderRadius: 99, overflow: "hidden", position: "relative" }}>
              <div style={{ 
                height: "100%", 
                width: `${((loadingStep + 1) / steps.length) * 100}%`, 
                background: "var(--blue)", 
                borderRadius: 99,
                transition: "width 0.4s ease"
              }} />
            </div>
            <span style={{ fontSize: 11, color: "var(--text-2)", opacity: 0.6 }}>Locked via 256-bit AES Multi-sig Protocol</span>
          </div>
        </div>
      )}

      {successToast && (
        <div className="cd-toast-success" style={{ animation: "fadeSlideUp 0.3s ease both" }}>
          <Check size={16} />
          <span>{successToast}</span>
        </div>
      )}
    </motion.div>
  );
}

