import React from "react";
import { Modal, Button, Form } from "react-bootstrap";

const ModalEditarCliente = ({
  mostrarModalEditar,
  setMostrarModalEditar,
  clienteEditando,
  manejoCambioEdit,
  actualizarCliente,
}) => {
  return (
    <Modal show={mostrarModalEditar} onHide={() => setMostrarModalEditar(false)} centered>
      <Modal.Header closeButton>
        <Modal.Title>Editar Cliente</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Control
            className="mb-2"
            name="nombre"
            value={clienteEditando.nombre}
            onChange={manejoCambioEdit}
          />

          <Form.Control
            className="mb-2"
            name="telefono"
            value={clienteEditando.telefono}
            onChange={manejoCambioEdit}
          />

          <Form.Control
            className="mb-2"
            name="direccion"
            value={clienteEditando.direccion}
            onChange={manejoCambioEdit}
          />
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={() => setMostrarModalEditar(false)}>
          Cancelar
        </Button>

        <Button variant="primary" onClick={actualizarCliente}>
          Guardar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalEditarCliente;