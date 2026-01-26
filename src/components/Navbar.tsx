import { NavLink } from "react-router-dom";

const Tab = ({ to, label }: { to: string; label: string }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `px-4 py-2 rounded-xl text-sm font-medium transition ${
        isActive
          ? "bg-[color:var(--navy)] text-white shadow"
          : "text-slate-700 hover:bg-slate-100"
      }`
    }
  >
    {label}
  </NavLink>
);

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/85 backdrop-blur border-b">
      <div className="max-w-8xl mx-auto h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Replace with your logo in /public/logo.png */}
          <img
            src="Gemini_Generated_Image_i5p1xyi5p1xyi5p1.png"
            className="h-20 w-auto"
          />
          <div className="leading-tight">
            <div className="font-semibold text-slate-900">ARC Labor Group</div>
            <div className="text-xs text-slate-500">Staffing Solutions</div>
          </div>
        </div>

        <nav className="flex items-center gap-2 bg-white rounded-2xl p-2 shadow-sm border">
          <Tab to="/" label="Home" />
          <Tab to="/job-seekers" label="Job Seekers" />
          <Tab to="/job-tickets" label="Job Tickets" />
        </nav>
      </div>
    </header>
  );
}
