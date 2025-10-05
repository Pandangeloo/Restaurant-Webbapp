import { Button } from "react-bootstrap";

type ButtonProps = {
  onClick: () => void;
};

type ActionButtonsProps = {
  onEdit: () => void;
  onCancel: () => void;
};


export function EditButton({ onClick }: ButtonProps) {
  return (
    <Button variant="primary" onClick={onClick}>
      Edit
    </Button>
  );
}

export function CancelButton({ onClick }: ButtonProps) {
  return (
    <Button variant="danger" onClick={onClick}>
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


export function ActionButtons({ onEdit, onCancel }: ActionButtonsProps) {
  return (
    <div className="d-flex flex-column flex-sm-row gap-2">
      <EditButton onClick={onEdit} />
      <CancelButton onClick={onCancel} />
    </div>
  );
}
