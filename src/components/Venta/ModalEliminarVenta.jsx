import { Modal, Button } from "react-bootstrap";

const ModalEliminarVenta = ({ show, onHide, onConfirmar, venta }) => {

  if (!venta) return null;

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title className="text-danger">Eliminar Venta</Modal.Title>
      </Modal.Header>

      <Modal.Body className="text-center">
        <p>¿Eliminar venta ID {venta.id_venta}?</p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancelar
        </Button>

        <Button variant="danger" onClick={onConfirmar}>
          Eliminar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalEliminarVenta;