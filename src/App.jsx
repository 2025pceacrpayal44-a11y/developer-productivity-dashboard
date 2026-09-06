import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  FolderKanban,
  CheckSquare,
  BarChart3,
  Settings,
  Search,
  Bell,
  Plus,
  MoreHorizontal,
  CalendarDays,
  Clock3,
  Menu,
  X,
  CheckCircle2,
  Circle,
  AlertCircle,
} from "lucide-react";
import "./App.css";

const projects = [
  {
    id: 1,
    name: "E-Commerce Platform",
    description: "Modern online shopping platform",
    progress: 80,
    tasks: 12,
    completed: 10,
    due: "Sep 12",
    category: "Development",
  },
  {
    id: 2,
    name: "Portfolio Website",
    description: "Personal developer portfolio",
    progress: 65,
    tasks: 8,
    completed: 5,
    due: "Sep 18",
    category: "Design",
  },
  {
    id: 3,
    name: "Task Management App",
    description: "Productivity management system",
    progress: 45,
    tasks: 15,
    completed: 7,
    due: "Sep 25",
    category: "Development",
  },
];

const initialTasks = [
  {
    id: 1,
    title: "Build authentication system",
    project: "E-Commerce Platform",
    status: "Done",
    priority: "High",
    due: "Today",
  },
  {
    id: 2,
    title: "Create responsive homepage",
    project: "Portfolio Website",
    status: "In Progress",
    priority: "Medium",
    due: "Tomorrow",
  },
  {
    id: 3,
    title: "Design dashboard components",
    project: "Task Management App",
    status: "Todo",
    priority: "High",
    due: "Sep 10",
  },
  {
    id: 4,
    title: "Connect product API",
    project: "E-Commerce Platform",
    status: "In Progress",
    priority: "Medium",
    due: "Sep 11",
  },
  {
    id: 5,
    title: "Write project documentation",
    project: "Portfolio Website",
    status: "Todo",
    priority: "Low",
    due: "Sep 14",
  },
];

function App() {
  const [activePage, setActivePage] = useState("Dashboard");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [tasks, setTasks] = useState(initialTasks);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  useEffect(() => {
  const timer = setTimeout(() => {
    setLoading(false);
  }, 800);

  return () => clearTimeout(timer);
}, []);

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(search.toLowerCase()) ||
      task.project.toLowerCase().includes(search.toLowerCase());

    const matchesFilter = filter === "All" || task.status === filter;

    return matchesSearch && matchesFilter;
  });

  const changeStatus = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              status:
                task.status === "Todo"
                  ? "In Progress"
                  : task.status === "In Progress"
                  ? "Done"
                  : "Todo",
            }
          : task
      )
    );
  };
  const refreshDashboard = () => {
  setError(false);
  setLoading(true);

  setTimeout(() => {
    setLoading(false);
  }, 800);
};
  const navItems = [
    { name: "Dashboard", icon: LayoutDashboard },
    { name: "Projects", icon: FolderKanban },
    { name: "Tasks", icon: CheckSquare },
    { name: "Analytics", icon: BarChart3 },
    { name: "Settings", icon: Settings },
  ];

  return (
    <div className="app">
      {/* Mobile Overlay */}
      {mobileMenu && (
        <div
          className="overlay"
          onClick={() => setMobileMenu(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`sidebar ${mobileMenu ? "sidebar-open" : ""}`}>
        <div className="brand">
          <div className="brand-icon">D</div>
          <div>
            <h2>DevFlow</h2>
            <span>Productivity</span>
          </div>

          <button
            className="close-menu"
            onClick={() => setMobileMenu(false)}
          >
            <X size={20} />
          </button>
        </div>

        <div className="workspace">
          <span>WORKSPACE</span>
          <strong>My Workspace</strong>
        </div>

        <nav>
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.name}
                className={`nav-item ${
                  activePage === item.name ? "active" : ""
                }`}
                onClick={() => {
                  setActivePage(item.name);
                  setMobileMenu(false);
                }}
              >
                <Icon size={19} />
                <span>{item.name}</span>
              </button>
            );
          })}
        </nav>

        <div className="sidebar-bottom">
          <div className="upgrade-card">
            <div className="upgrade-icon">⚡</div>
            <strong>Boost your productivity</strong>
            <p>Stay focused and get more done.</p>
            <button>Explore Pro</button>
          </div>

          <div className="user-mini">
            <div className="avatar">PC</div>
            <div>
              <strong>Payal Choudhary</strong>
              <span>Developer</span>
            </div>
            <MoreHorizontal size={18} />
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="main">
        {/* Header */}
        <header className="header">
          <button
            className="menu-btn"
            onClick={() => setMobileMenu(true)}
          >
            <Menu size={22} />
          </button>

          <div className="breadcrumb">
            <span>Workspace</span>
            <b>/</b>
            <strong>{activePage}</strong>
          </div>

          <div className="header-actions">
            <div className="header-search">
              <Search size={18} />
              <input
                placeholder="Search tasks..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <kbd>⌘ K</kbd>
            </div>

            <button className="icon-btn">
              <Bell size={19} />
              <span className="notification-dot" />
            </button>

            <div className="profile">
              <div className="avatar">PC</div>
              <div className="profile-info">
                <strong>Payal Choudhary</strong>
                <span>Developer</span>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        {/* Dashboard Content */}
     <div className="content">
  {loading ? (
    <div className="state-page">
      <div className="loading-spinner"></div>
      <h2>Loading dashboard...</h2>
      <p>Preparing your productivity workspace.</p>
    </div>
  ) : error ? (
    <div className="state-page">
      <div className="state-icon error-icon">!</div>
      <h2>Something went wrong</h2>
      <p>
        We couldn't load your dashboard data. Please try again.
      </p>
      <button
        className="primary-btn"
        onClick={refreshDashboard}
      >
        Try Again
      </button>
    </div>
  ) : activePage === "Dashboard" ? (
           <>
          <section className="welcome">
            <div>
              <p className="eyebrow">SATURDAY, SEPTEMBER 5</p>
              <h1>Good morning, Payal 👋</h1>
              <p>
                Here's what's happening with your projects today.
              </p>
            </div>

           <div className="welcome-actions">
  <button
    className="secondary-btn"
    onClick={refreshDashboard}
  >
    ↻ Refresh
  </button>

  <button className="primary-btn">
    <Plus size={18} />
    New Project
  </button>
</div>
</section>
          {/* Stats */}
          <section className="stats-grid">
            <StatCard
              icon={<CheckSquare size={20} />}
              title="Total Tasks"
              value="35"
              change="+12%"
              text="vs last week"
            />

            <StatCard
              icon={<FolderKanban size={20} />}
              title="Active Projects"
              value="6"
              change="+2"
              text="this month"
            />

            <StatCard
              icon={<CheckCircle2 size={20} />}
              title="Completed"
              value="22"
              change="+18%"
              text="vs last week"
            />

            <StatCard
              icon={<BarChart3 size={20} />}
              title="Productivity"
              value="78%"
              change="+8%"
              text="vs last week"
            />
          </section>

          {/* Projects */}
          <section className="section">
            <div className="section-heading">
              <div>
                <h2>Active Projects</h2>
                <p>Keep track of your ongoing work.</p>
              </div>

              <button className="text-btn">View all →</button>
            </div>

            <div className="projects-grid">
              {projects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                />
              ))}
            </div>
          </section>

          {/* Tasks */}
          <section className="section tasks-section">
            <div className="section-heading">
              <div>
                <h2>Recent Tasks</h2>
                <p>Manage your tasks and stay on schedule.</p>
              </div>

              <button className="primary-btn small">
                <Plus size={16} />
                Add Task
              </button>
            </div>

            <div className="task-toolbar">
              <div className="task-search">
                <Search size={17} />
                <input
                  placeholder="Search tasks or projects..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              <div className="filters">
                {["All", "Todo", "In Progress", "Done"].map(
                  (item) => (
                    <button
                      key={item}
                      className={filter === item ? "selected" : ""}
                      onClick={() => setFilter(item)}
                    >
                      {item}
                    </button>
                  )
                )}
              </div>
            </div>

            <div className="tasks-list">
              {filteredTasks.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-icon">
                     <Search size={25} />
                  </div>
                  <h3>No tasks found</h3>
                  <p>
                    Try changing your search or filter.
                  </p>
                </div>
              ) : (
                filteredTasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onStatusChange={changeStatus}
                  />
                ))
              )}
            </div>
                    </section>
    </>
  ) : (
    <section className="page-placeholder">
      <div className="placeholder-icon">
        {activePage === "Projects" && "📁"}
        {activePage === "Tasks" && "✅"}
        {activePage === "Analytics" && "📊"}
        {activePage === "Settings" && "⚙️"}
      </div>

      <h1>{activePage}</h1>

      <p>
        This section is ready for the next stage of the
        productivity platform.
      </p>

      <button
        className="primary-btn"
        onClick={() => setActivePage("Dashboard")}
      >
        ← Back to Dashboard
      </button>
    </section>
  )}

  <footer>
            <span>© 2026 DevFlow</span>
            <span>Developer Productivity Dashboard</span>
          </footer>
        </div>
      </main>
    </div>
  );
}

function StatCard({ icon, title, value, change, text }) {
  return (
    <div className="stat-card">
      <div className="stat-top">
        <div className="stat-icon">{icon}</div>
        <span className="stat-change">{change}</span>
      </div>

      <div className="stat-value">{value}</div>

      <div className="stat-label">
        {title} <span>{text}</span>
      </div>
    </div>
  );
}

function ProjectCard({ project }) {
  return (
    <div className="project-card">
      <div className="project-top">
        <div className="project-symbol">
          {project.name.charAt(0)}
        </div>

        <button className="more-btn">
          <MoreHorizontal size={19} />
        </button>
      </div>

      <span className="category">{project.category}</span>

      <h3>{project.name}</h3>
      <p>{project.description}</p>

      <div className="progress-info">
        <span>Progress</span>
        <strong>{project.progress}%</strong>
      </div>

      <div className="progress-bar">
        <div style={{ width: `${project.progress}%` }} />
      </div>

      <div className="project-meta">
        <span>
          <CheckSquare size={15} />
          {project.completed}/{project.tasks} tasks
        </span>

        <span>
          <CalendarDays size={15} />
          {project.due}
        </span>
      </div>
    </div>
  );
}

function TaskCard({ task, onStatusChange }) {
  return (
    <div className="task-card">
      <button
        className={`task-check ${
          task.status === "Done" ? "completed" : ""
        }`}
        onClick={() => onStatusChange(task.id)}
      >
        {task.status === "Done" ? (
          <CheckCircle2 size={21} />
        ) : (
          <Circle size={21} />
        )}
      </button>

      <div className="task-main">
        <h3 className={task.status === "Done" ? "strike" : ""}>
          {task.title}
        </h3>

        <span>{task.project}</span>
      </div>

      <span
        className={`priority ${task.priority.toLowerCase()}`}
      >
        <AlertCircle size={13} />
        {task.priority}
      </span>

      <span
        className={`status ${task.status
          .toLowerCase()
          .replace(" ", "-")}`}
      >
        {task.status}
      </span>

      <span className="task-due">
        <Clock3 size={14} />
        {task.due}
      </span>

      <button className="more-btn">
        <MoreHorizontal size={18} />
      </button>
    </div>
  );
}

export default App;