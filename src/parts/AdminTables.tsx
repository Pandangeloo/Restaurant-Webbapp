import { useEffect, useState, Table, Button, Modal, Form } from "../index";
import {
  getTables,
  updateTables,
  deleteTables,
  createTables,
} from "../utils/tables";

type Tables = {
  id: number;
  name: string;
  seats: number;
};

//TODO: Make better components, i resuse a lot of this.
//TODO: Check if i can make it sp edit button = i cant try to change name. It dosnt work if i chnge name and try to save. but it is annoying that i can try to write another table

export default function AdminTables() {
  const [tables, setTablesgetTables] = useState<Tables[]>([]);
  const [editing, setEditing] = useState<Tables | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getTables().then(setTablesgetTables);
  }, []);

  const handleSave = async () => {
    if (!editing) return;

    if (editing.id) {
      const updated = await updateTables(editing.id, editing);
      setTablesgetTables((prev) =>
        prev.map((t) => (t.id === updated.id ? updated : t))
      );
    } else {
      const created = await createTables(editing);
      setTablesgetTables((prev) => [...prev, created]);
    }
    setEditing(null);
    setShowModal(false);
  };

  const handleDelete = async (id: number) => {
    await deleteTables(id);
    setTablesgetTables((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div>
      <h2>Tables</h2>
      <Button
        className="mb-3"
        variant="success"
        onClick={() => {
          setEditing({ id: 0, name: "", seats: 2 });
          setShowModal(true);
        }}
      >
        Add Table
      </Button>

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
                <Button
                  className="me-2"
                  variant="primary"
                  onClick={() => {
                    setEditing(t);
                    setShowModal(true);
                  }}
                >
                  Edit
                </Button>
                <Button variant="danger" onClick={() => handleDelete(t.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editing?.id ? "Edit Table" : "Add Table"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editing && (
            <Form>
              <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  value={editing.name}
                  onChange={(e) =>
                    setEditing({ ...editing, name: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Seats</Form.Label>
                <Form.Control
                  type="number"
                  value={editing.seats}
                  onChange={(e) =>
                    setEditing({
                      ...editing,
                      seats: parseInt(e.target.value, 10),
                    })
                  }
                />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="success" onClick={handleSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
