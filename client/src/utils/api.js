/**
 * Lightweight API helper.
 * All requests are sent to the same origin (CRA proxy forwards /api/* to :5000).
 */

const BASE = "";   // proxy handles /api/...

async function request(path, options = {}) {
  const token = localStorage.getItem("tc_token");

  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers
  };

  const res = await fetch(`${BASE}${path}`, { ...options, headers });
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
}

export const api = {
  get:    (path)         => request(path, { method: "GET" }),
  post:   (path, body)   => request(path, { method: "POST",   body: JSON.stringify(body) }),
  put:    (path, body)   => request(path, { method: "PUT",    body: JSON.stringify(body) }),
  delete: (path)         => request(path, { method: "DELETE" })
};
