export type CurrentUser = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: "user" | "admin";
};

// LOGIN
export async function login(data: { email: string; password: string }) {
  const res = await fetch("/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    credentials: "include",
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    const msg = errorData.message || `Login failed: ${res.status}`;
    throw new Error(msg);
  }

  return res.json();
}

// LOGOUT
export async function logout() {
  const res = await fetch("/api/login", {
    method: "DELETE",
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Failed to logout");
  }
}

// GET CURRENT USER

export async function getCurrentUser(): Promise<CurrentUser | null> {
  const res = await fetch("/api/login", {
    method: "GET",
    credentials: "include",
  });

  if (!res.ok) return null;

  try {
    return (await res.json()) as CurrentUser;
  } catch {
    return null;
  }
}

// REGISTER USER
export async function registerUser(data: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}) {
  const res = await fetch("/api/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    credentials: "include",
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    const msg = errorData.message || `Registration failed: ${res.status}`;
    throw new Error(msg);
  }

  return res.json();
}
