const BASE = "http://localhost:8080/api";

export async function api(path, method = "GET", body) {
  const token = localStorage.getItem("token");
  const res = await fetch(BASE + path, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  if (!res.ok) throw new Error(text || `Error ${res.status}`);
  return text ? JSON.parse(text) : null;
}
