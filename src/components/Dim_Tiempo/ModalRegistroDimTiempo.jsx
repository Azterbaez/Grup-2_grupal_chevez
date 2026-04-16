import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const ModalRegistroDimTiempo = ({
  mostrarModal,
  setMostrarModal,
  nuevoTiempo,
  manejoCambioInput,
  agregarTiempo,
}) => {
  const [deshabilitado, setDeshabilitado] = useState(false);

  const handleRegistrar = async () => {
    if (deshabilitado) return;

    setDeshabilitado(true);
    await agregarTiempo();
    setDeshabilitado(false);
  };

  return (
    <Modal
      show={mostrarModal}
      onHide={() => setMostrarModal(false)}
      backdrop="static"
      keyboard={false}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Agregar Fecha</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          {/* Fecha */}
          <Form.Group className="mb-3">
            <Form.Label>Fecha</Form.Label>
            <Form.Control
              type="date"
              name="fecha"
              value={nuevoTiempo.fecha}
              onChange={manejoCambioInput}
            />
          </Form.Group>

          {/* Mes */}
          <Form.Group className="mb-3">
            <Form.Label>Mes</Form.Label>
            <Form.Control
              type="text"
              name="mes"
              value={nuevoTiempo.mes}
              onChange={manejoCambioInput}
              placeholder="Ej: Abril"
            />
          </Form.Group>

          {/* Año */}
          <Form.Group className="mb-3">
            <Form.Label>Año</Form.Label>
            <Form.Control
              type="number"
              name="anio"
              value={nuevoTiempo.anio}
              onChange={manejoCambioInput}
              placeholder="Ej: 2026"
            />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={() => setMostrarModal(false)}>
          Cancelar
        </Button>

        <Button
          variant="primary"
          onClick={handleRegistrar}
          disabled={
            !nuevoTiempo.fecha ||
            !nuevoTiempo.mes.trim() ||
            !nuevoTiempo.anio ||
            deshabilitado
          }
        >
          Guardar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalRegistroDimTiempo;