import React from "react";
import { Modal, Button } from "react-bootstrap";

const ModalEliminarCliente = ({
  mostrarModalEliminar,
  setMostrarModalEliminar,
  clienteSeleccionado,
  eliminarCliente,
}) => {
  return (
    <Modal show={mostrarModalEliminar} onHide={() => setMostrarModalEliminar(false)} centered>
      <Modal.Header closeButton>
        <Modal.Title>Eliminar Cliente</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        ¿Seguro que deseas eliminar a{" "}
        <strong>{clienteSeleccionado?.nombre}</strong>?
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={() => setMostrarModalEliminar(false)}>
          Cancelar
        </Button>

        <Button variant="danger" onClick={eliminarCliente}>
          Eliminar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalEliminarCliente;