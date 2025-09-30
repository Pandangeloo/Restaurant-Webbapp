//CREATE A TABLE
export async function createTables(data: { name: string; seats: number }) {
  const res = await fetch("/api/tables", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to create table");
  }

  return res.json();
}

//GET ALL TABLES
export async function getTables() {
  const res = await fetch("/api/tables", { method: "GET" });
  if (!res.ok) {
    throw new Error("Failed to fetch tables");
  }

  return res.json();
}

//UPDATE A BOOKING
export async function updateTables(
  id: number,
  data: {
    name?: string;
    seats?: number;
  }
) {
  const res = await fetch(`/api/tables/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to update tables");
  }

  return res.json();
}

//DELETE A TABLE
export async function deleteTables(id: number) {
  const res = await fetch(`/api/tables/${id}`, { method: "DELETE" });
  if (!res.ok) {
    throw new Error("Failed to delete tables");
  }

  return res.json();
}
