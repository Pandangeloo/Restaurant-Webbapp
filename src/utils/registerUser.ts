export default async function registerUser(data: {
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
    const msg = errorData.message || `Server error: ${res.status}`;
    throw new Error(msg);
  }

  return res.json();
}
