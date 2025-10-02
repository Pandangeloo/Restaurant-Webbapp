import { Button } from "react-bootstrap";

type ButtonProps = {
  onClick: () => void;
};

export function EditButton({ onClick }: ButtonProps) {
  return (
    <Button variant="primary" size="sm" className="me-2" onClick={onClick}>
      Edit
    </Button>
  );
}

export function CancelButton({ onClick }: ButtonProps) {
  return (
    <Button variant="danger" size="sm" className="me-2" onClick={onClick}>
      Cancel
    </Button>
  );
}

export function AddButton({ onClick }: ButtonProps) {
  return (
    <Button variant="success" size="sm" className="mb-2" onClick={onClick}>
      Add
    </Button>
  );
}
