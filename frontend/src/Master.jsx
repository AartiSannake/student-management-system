import { useEffect, useState } from "react";
import { api } from "./api.js";

export default function Master() {
  const [depts, setDepts] = useState([]);
  const [courses, setCourses] = useState([]);
  const [dName, setDName] = useState("");
  const [cName, setCName] = useState("");
  const [cDept, setCDept] = useState("");

  const load = async () => {
    setDepts(await api("/departments"));
    setCourses(await api("/courses"));
  };
  useEffect(() => { load(); }, []);

  const addDept = async (e) => {
    e.preventDefault();
    await api("/departments", "POST", { name: dName });
    setDName(""); load();
  };
  const addCourse = async (e) => {
    e.preventDefault();
    await api("/courses", "POST", { name: cName, department: cDept ? { id: +cDept } : null });
    setCName(""); load();
  };
  const del = async (path, id) => {
    try { await api(`${path}/${id}`, "DELETE"); load(); }
    catch { alert("Cannot delete: it is in use"); }
  };

  return (
    <div className="two-col">
      <div>
        <h3>Departments</h3>
        <form className="row" onSubmit={addDept}>
          <input placeholder="Department name" value={dName} onChange={(e) => setDName(e.target.value)} required />
          <button>Add</button>
        </form>
        <table><tbody>
          {depts.map((d) => (
            <tr key={d.id}><td>{d.name}</td>
              <td><button className="danger" onClick={() => del("/departments", d.id)}>Delete</button></td></tr>
          ))}
        </tbody></table>
      </div>
      <div>
        <h3>Courses</h3>
        <form className="row" onSubmit={addCourse}>
          <input placeholder="Course name" value={cName} onChange={(e) => setCName(e.target.value)} required />
          <select value={cDept} onChange={(e) => setCDept(e.target.value)}>
            <option value="">Department</option>
            {depts.map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}
          </select>
          <button>Add</button>
        </form>
        <table><tbody>
          {courses.map((c) => (
            <tr key={c.id}><td>{c.name}</td><td>{c.department?.name}</td>
              <td><button className="danger" onClick={() => del("/courses", c.id)}>Delete</button></td></tr>
          ))}
        </tbody></table>
      </div>
    </div>
  );
}
