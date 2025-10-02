import { Modal, Button, Form } from "react-bootstrap";

type Field = {
  name: string;
  label: string;
  type: "text" | "number" | "date" | "time";
};

// NOTE: Props<T> is generic → makes this modal reusable for different data types (Booking, Table, etc.)
type Props<T> = {
  show: boolean;
  onClose: () => void;
  onSave: () => void;
  editing: T | null;
  setEditing: (value: T | null) => void;
  fields: Field[];
  title: string;
};

export default function AdminModal<T>({
  show,
  onClose,
  onSave,
  editing,
  setEditing,
  fields,
  title,
}: Props<T>) {
  if (!editing) return null;

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {fields.map((field) => (
            <Form.Group className="mb-2" key={field.name}>
              <Form.Label>{field.label}</Form.Label>
              <Form.Control
                type={field.type}
                // TypeScript does not know if "editing" has this field → forced with (as any)
                value={(editing as any)[field.name] ?? ""}
                onChange={(e) =>
                  setEditing({
                    ...editing,
                    [field.name]:
                      field.type === "number"
                        ? parseInt(e.target.value, 10)
                        : e.target.value,
                  })
                }
              />
            </Form.Group>
          ))}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="success" onClick={onSave}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
