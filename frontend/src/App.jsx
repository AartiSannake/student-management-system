import { useState } from "react";
import Login from "./Login.jsx";
import Students from "./Students.jsx";
import Master from "./Master.jsx";
import Records from "./Records.jsx";

export default function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user") || "null"));
  const [tab, setTab] = useState(user?.role === "STUDENT" ? "profile" : "students");

  const logout = () => { localStorage.clear(); setUser(null); };
  const onLogin = (u) => {
    localStorage.setItem("token", u.token);
    localStorage.setItem("user", JSON.stringify(u));
    setUser(u);
    setTab(u.role === "STUDENT" ? "profile" : "students");
  };

  if (!user) return <Login onLogin={onLogin} />;

  const tabs = {
    ADMIN: ["students", "master", "attendance", "marks"],
    TEACHER: ["students", "attendance", "marks"],
    STUDENT: ["profile", "attendance", "marks"],
  }[user.role];

  return (
    <div className="app">
      <header>
        <h2>Student Management</h2>
        <nav>
          {tabs.map((t) => (
            <button key={t} className={tab === t ? "active" : ""} onClick={() => setTab(t)}>
              {t === "master" ? "Depts & Courses" : t[0].toUpperCase() + t.slice(1)}
            </button>
          ))}
        </nav>
        <span>{user.username} ({user.role}) <button onClick={logout}>Logout</button></span>
      </header>
      <main>
        {(tab === "students" || tab === "profile") && <Students role={user.role} />}
        {tab === "master" && <Master />}
        {tab === "attendance" && <Records kind="attendance" role={user.role} />}
        {tab === "marks" && <Records kind="marks" role={user.role} />}
      </main>
    </div>
  );
}
