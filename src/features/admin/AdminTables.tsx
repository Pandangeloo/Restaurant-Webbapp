import { useEffect, useState, Table } from "../../index";
import {
  getTables,
  updateTables,
  deleteTables,
  createTables,
} from "../../api/tables";
import { EditButton, CancelButton, AddButton } from "./AdminButtons";
import AdminModal from "./AdminModal";

type Tables = {
  id: number;
  name: string;
  seats: number;
};

//TODO: Check if i can make it sp edit button = i cant try to change name. It dosnt work if i chnge name and try to save. but it is annoying that i can try to write another table

export default function AdminTables() {
  const [tables, setTables] = useState<Tables[]>([]);
  const [editing, setEditing] = useState<Tables | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getTables().then(setTables);
  }, []);

  const handleSave = async () => {
    if (!editing) return;

    if (editing.id) {
      const updated = await updateTables(editing.id, editing);
      setTables((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
    } else {
      const created = await createTables(editing);
      setTables((prev) => [...prev, created]);
    }
    setEditing(null);
    setShowModal(false);
  };

  const handleDelete = async (id: number) => {
    await deleteTables(id);
    setTables((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div>
      <h2>Tables</h2>
      <p className="text-muted">
        Need to adjust the layout? Add, rename or remove tables to match the
        restaurant floor.
      </p>
      <AddButton
        onClick={() => {
          setEditing({ id: 0, name: "", seats: 2 });
          setShowModal(true);
        }}
      />

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Seats</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tables.map((t) => (
            <tr key={t.id}>
              <td>{t.name}</td>
              <td>{t.seats}</td>
              <td>
                <EditButton
                  onClick={() => {
                    setEditing(t);
                    setShowModal(true);
                  }}
                />
                <CancelButton onClick={() => handleDelete(t.id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <AdminModal<Tables>
        show={showModal}
        onClose={() => setShowModal(false)}
        onSave={handleSave}
        editing={editing}
        setEditing={setEditing}
        title={editing?.id ? "Edit Table" : "Add Table"}
        fields={[
          { name: "name", label: "Name", type: "text" },
          { name: "seats", label: "Seats", type: "number" },
        ]}
      />
    </div>
  );
}
