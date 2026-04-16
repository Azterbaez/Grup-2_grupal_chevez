import React from "react";
import { Modal, Button, Form } from "react-bootstrap";

const ModalEditarCliente = ({
  mostrarModalEditar,
  setMostrarModalEditar,
  clienteEditando,
  setClienteEditando,
  actualizarCliente,
}) => {

  const handleChange = (e) => {
    setClienteEditando({
      ...clienteEditando,
      [e.target.name]: e.target.value,
    });
  };

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
            onChange={handleChange}
          />

          <Form.Control
            className="mb-2"
            name="telefono"
            value={clienteEditando.telefono}
            onChange={handleChange}
          />

          <Form.Control
            className="mb-2"
            name="direccion"
            value={clienteEditando.direccion}
            onChange={handleChange}
          />
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={() => setMostrarModalEditar(false)}>
          Cancelar
        </Button>

        <Button onClick={actualizarCliente}>
          Guardar cambios
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalEditarCliente;