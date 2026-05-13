import React from "react";

import {
  Modal,
  Button,
  Form,
} from "react-bootstrap";

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

    <Modal
      show={mostrarModalEditar}
      onHide={() =>
        setMostrarModalEditar(false)
      }
      centered
    >

      <Modal.Header
        closeButton
        className="bg-warning"
      >

        <Modal.Title>
          ✏ Editar Cliente
        </Modal.Title>

      </Modal.Header>

      <Modal.Body>

        <Form>

          <Form.Control
            className="mb-3"
            name="nombre_cliente"
            placeholder="Nombre"
            value={
              clienteEditando.nombre_cliente || ""
            }
            onChange={handleChange}
          />

          <Form.Control
            className="mb-3"
            name="telefono"
            placeholder="Teléfono"
            value={
              clienteEditando.telefono || ""
            }
            onChange={handleChange}
          />

          <Form.Control
            className="mb-3"
            name="direccion"
            placeholder="Dirección"
            value={
              clienteEditando.direccion || ""
            }
            onChange={handleChange}
          />

        </Form>

      </Modal.Body>

      <Modal.Footer>

        <Button
          variant="secondary"
          onClick={() =>
            setMostrarModalEditar(false)
          }
        >
          Cancelar
        </Button>

        <Button
          variant="warning"
          onClick={actualizarCliente}
        >
          Guardar Cambios
        </Button>

      </Modal.Footer>

    </Modal>

  );

};

export default ModalEditarCliente;