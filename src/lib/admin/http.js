"use client";

function buildUrl(path, params) {
  if (!params || Object.keys(params).length === 0) return path;
  const url = new URL(path, typeof window !== "undefined" ? window.location.origin : "http://localhost");
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== "") url.searchParams.set(k, String(v));
  });
  return url.pathname + url.search;
}

async function request(path, { method = "GET", params, body, headers } = {}) {
  const url = buildUrl(path, params);
  const res = await fetch(url, {
    method,
    headers: { "Content-Type": "application/json", ...(headers || {}) },
    credentials: "include",
    body: body ? JSON.stringify(body) : undefined,
    cache: "no-store",
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || data?.success === false) {
    const message = data?.message || `Request failed with status ${res.status}`;
    const error = new Error(message);
    error.status = res.status;
    error.payload = data;
    throw error;
  }
  return data?.data !== undefined ? data.data : data;
}

export const http = {
  get: (path, opts) => request(path, { ...opts, method: "GET" }),
  post: (path, body, opts) => request(path, { ...opts, method: "POST", body }),
  put: (path, body, opts) => request(path, { ...opts, method: "PUT", body }),
  del: (path, opts) => request(path, { ...opts, method: "DELETE" }),
};
