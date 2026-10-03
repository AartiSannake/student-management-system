import { useEffect, useState } from "react";
import { api } from "./api.js";

// kind = "attendance" | "marks"
export default function Records({ kind, role }) {
  const canEdit = role !== "STUDENT";
  const [students, setStudents] = useState([]);
  const [sid, setSid] = useState("");
  const [rows, setRows] = useState([]);
  const [f, setF] = useState({ date: "", present: true, subject: "", score: "", maxScore: 100 });
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        if (role === "STUDENT") setSid((await api("/students/me")).id);
        else setStudents(await api("/students"));
      } catch (e) { setError(e.message); }
    })();
  }, []);

  const load = async () => {
    if (!sid) return setRows([]);
    setRows(await api(`/${kind}/student/${sid}`));
  };
  useEffect(() => { load(); }, [sid, kind]);

  const add = async (e) => {
    e.preventDefault();
    const body = kind === "attendance"
      ? { student: { id: +sid }, date: f.date, present: f.present }
      : { student: { id: +sid }, subject: f.subject, score: +f.score, maxScore: +f.maxScore };
    await api(`/${kind}`, "POST", body);
    load();
  };

  const del = async (id) => { await api(`/${kind}/${id}`, "DELETE"); load(); };

  const present = rows.filter((r) => r.present).length;

  return (
    <div>
      <h3>{kind === "attendance" ? "Attendance" : "Marks / Result"}</h3>
      {error && <p className="error">{error}</p>}

      {canEdit && (
        <select value={sid} onChange={(e) => setSid(e.target.value)}>
          <option value="">Select student</option>
          {students.map((s) => <option key={s.id} value={s.id}>{s.rollNo} - {s.name}</option>)}
        </select>
      )}

      {canEdit && sid && (
        <form className="row form" onSubmit={add}>
          {kind === "attendance" ? (
            <>
              <input type="date" value={f.date} onChange={(e) => setF({ ...f, date: e.target.value })} required />
              <label><input type="checkbox" checked={f.present}
                onChange={(e) => setF({ ...f, present: e.target.checked })} /> Present</label>
            </>
          ) : (
            <>
              <input placeholder="Subject" value={f.subject} onChange={(e) => setF({ ...f, subject: e.target.value })} required />
              <input type="number" placeholder="Score" value={f.score} onChange={(e) => setF({ ...f, score: e.target.value })} required />
              <input type="number" placeholder="Max" value={f.maxScore} onChange={(e) => setF({ ...f, maxScore: e.target.value })} required />
            </>
          )}
          <button>Add</button>
        </form>
      )}

      {kind === "attendance" && rows.length > 0 && (
        <p>Attendance: <b>{Math.round((present / rows.length) * 100)}%</b> ({present}/{rows.length} days)</p>
      )}

      <table>
        <thead>
          <tr>
            {kind === "attendance" ? <><th>Date</th><th>Status</th></> : <><th>Subject</th><th>Score</th><th>Max</th></>}
            {canEdit && <th></th>}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.id}>
              {kind === "attendance"
                ? <><td>{r.date}</td><td>{r.present ? "Present" : "Absent"}</td></>
                : <><td>{r.subject}</td><td>{r.score}</td><td>{r.maxScore}</td></>}
              {canEdit && <td><button className="danger" onClick={() => del(r.id)}>Delete</button></td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
