import { useEffect, useState } from "react";
import { api } from "./api.js";

const empty = { name: "", email: "", rollNo: "", departmentId: "", courseId: "" };

export default function Students({ role }) {
  const [list, setList] = useState([]);
  const [depts, setDepts] = useState([]);
  const [courses, setCourses] = useState([]);
  const [q, setQ] = useState("");
  const [form, setForm] = useState(empty);
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState("");

  const load = async () => {
    try {
      if (role === "STUDENT") setList([await api("/students/me")]);
      else setList(await api(`/students?q=${encodeURIComponent(q)}`));
    } catch (e) { setError(e.message); }
  };

  useEffect(() => {
    load();
    if (role === "ADMIN") {
      api("/departments").then(setDepts);
      api("/courses").then(setCourses);
    }
  }, []);

  const save = async (e) => {
    e.preventDefault();
    setError("");
    const body = {
      name: form.name, email: form.email, rollNo: form.rollNo,
      department: form.departmentId ? { id: +form.departmentId } : null,
      course: form.courseId ? { id: +form.courseId } : null,
    };
    try {
      if (editId) await api(`/students/${editId}`, "PUT", body);
      else await api("/students", "POST", body);
      setForm(empty); setEditId(null); load();
    } catch (e) { setError(e.message); }
  };

  const edit = (s) => {
    setEditId(s.id);
    setForm({ name: s.name, email: s.email, rollNo: s.rollNo,
      departmentId: s.department?.id || "", courseId: s.course?.id || "" });
  };

  const remove = async (id) => {
    if (!confirm("Delete this student?")) return;
    await api(`/students/${id}`, "DELETE"); load();
  };

  return (
    <div>
      <h3>{role === "STUDENT" ? "My Profile" : "Students"}</h3>
      {error && <p className="error">{error}</p>}

      {role !== "STUDENT" && (
        <div className="row">
          <input placeholder="Search by name or roll no" value={q} onChange={(e) => setQ(e.target.value)} />
          <button onClick={load}>Search</button>
        </div>
      )}

      {role === "ADMIN" && (
        <form className="row form" onSubmit={save}>
          <input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          <input type="email" placeholder="Email (login)" value={form.email} disabled={!!editId}
            onChange={(e) => setForm({ ...form, email: e.target.value })} required />
          <input placeholder="Roll No (initial password)" value={form.rollNo}
            onChange={(e) => setForm({ ...form, rollNo: e.target.value })} required />
          <select value={form.departmentId} onChange={(e) => setForm({ ...form, departmentId: e.target.value })}>
            <option value="">Department</option>
            {depts.map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}
          </select>
          <select value={form.courseId} onChange={(e) => setForm({ ...form, courseId: e.target.value })}>
            <option value="">Course</option>
            {courses.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
          <button type="submit">{editId ? "Update" : "Add"}</button>
          {editId && <button type="button" onClick={() => { setEditId(null); setForm(empty); }}>Cancel</button>}
        </form>
      )}

      <table>
        <thead>
          <tr><th>Roll No</th><th>Name</th><th>Email</th><th>Department</th><th>Course</th>{role === "ADMIN" && <th>Actions</th>}</tr>
        </thead>
        <tbody>
          {list.map((s) => (
            <tr key={s.id}>
              <td>{s.rollNo}</td><td>{s.name}</td><td>{s.email}</td>
              <td>{s.department?.name}</td><td>{s.course?.name}</td>
              {role === "ADMIN" && (
                <td>
                  <button onClick={() => edit(s)}>Edit</button>
                  <button className="danger" onClick={() => remove(s.id)}>Delete</button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
