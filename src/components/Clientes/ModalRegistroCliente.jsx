import React from "react";
import { Modal, Button, Form } from "react-bootstrap";

const ModalRegistroCliente = ({
  mostrarModal,
  setMostrarModal,
  nuevoCliente,
  setNuevoCliente,
  agregarCliente,
}) => {

  const handleChange = (e) => {
    setNuevoCliente({
      ...nuevoCliente,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Modal
      show={mostrarModal}
      onHide={() => setMostrarModal(false)}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Nuevo Cliente</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Control
            className="mb-2"
            name="nombre"
            placeholder="Nombre"
            value={nuevoCliente?.nombre || ""}
            onChange={handleChange}
          />

          <Form.Control
            className="mb-2"
            name="telefono"
            placeholder="Teléfono"
            value={nuevoCliente?.telefono || ""}
            onChange={handleChange}
          />

          <Form.Control
            className="mb-2"
            name="direccion"
            placeholder="Dirección"
            value={nuevoCliente?.direccion || ""}
            onChange={handleChange}
          />
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => setMostrarModal(false)}
        >
          Cancelar
        </Button>

        <Button
          variant="primary"
          onClick={agregarCliente}
        >
          Guardar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalRegistroCliente;