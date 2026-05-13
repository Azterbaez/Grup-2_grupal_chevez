import React from "react";

import {
  Modal,
  Button,
} from "react-bootstrap";

const ModalEliminarCliente = ({
  mostrarModalEliminar,
  setMostrarModalEliminar,
  clienteSeleccionado,
  eliminarCliente,
}) => {

  return (

    <Modal
      show={mostrarModalEliminar}
      onHide={() =>
        setMostrarModalEliminar(false)
      }
      centered
    >

      <Modal.Header
        closeButton
        className="bg-danger text-white"
      >

        <Modal.Title>
          🗑 Eliminar Cliente
        </Modal.Title>

      </Modal.Header>

      <Modal.Body className="text-center">

        <h5>
          ¿Deseas eliminar este cliente?
        </h5>

        <strong>
          {clienteSeleccionado?.nombre_cliente}
        </strong>

      </Modal.Body>

      <Modal.Footer>

        <Button
          variant="secondary"
          onClick={() =>
            setMostrarModalEliminar(false)
          }
        >
          Cancelar
        </Button>

        <Button
          variant="danger"
          onClick={eliminarCliente}
        >
          Eliminar
        </Button>

      </Modal.Footer>

    </Modal>

  );

};

export default ModalEliminarCliente;