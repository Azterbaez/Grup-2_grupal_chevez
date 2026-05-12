import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const ModalRegistroProducto = ({
  mostrarModal,
  setMostrarModal,
  nuevoProducto,
  manejoCambioInput,
  manejoCambioArchivo,
  agregarProducto,
}) => {

  const [deshabilitado, setDeshabilitado] = useState(false);

  const handleRegistrar = async () => {

    if (deshabilitado) return;

    setDeshabilitado(true);

    await agregarProducto();

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
        <Modal.Title>Agregar Producto</Modal.Title>
      </Modal.Header>

      <Modal.Body>

        <Form>

          {/* Nombre */}
          <Form.Group className="mb-3">

            <Form.Label>Nombre</Form.Label>

            <Form.Control
              type="text"
              name="nombre_producto"
              value={nuevoProducto.nombre_producto}
              onChange={manejoCambioInput}
              placeholder="Ingresa el nombre del producto"
            />

          </Form.Group>

          {/* Descripción */}
          <Form.Group className="mb-3">

            <Form.Label>Descripción</Form.Label>

            <Form.Control
              as="textarea"
              rows={3}
              name="descripcion_producto"
              value={nuevoProducto.descripcion_producto}
              onChange={manejoCambioInput}
              placeholder="Ingresa la descripción"
            />

          </Form.Group>

          {/* Categoría */}
          <Form.Group className="mb-3">

            <Form.Label>Categoría</Form.Label>

            <Form.Control
              type="text"
              name="categoria_producto"
              value={nuevoProducto.categoria_producto}
              onChange={manejoCambioInput}
              placeholder="Ingresa la categoría"
            />

          </Form.Group>

          {/* Precio */}
          <Form.Group className="mb-3">

            <Form.Label>Precio</Form.Label>

            <Form.Control
              type="number"
              name="precio_venta"
              value={nuevoProducto.precio_venta}
              onChange={manejoCambioInput}
              placeholder="Ingresa el precio"
            />

          </Form.Group>

          {/* Imagen */}
          <Form.Group className="mb-3">

            <Form.Label>Imagen</Form.Label>

            <Form.Control
              type="file"
              accept="image/*"
              onChange={manejoCambioArchivo}
            />

          </Form.Group>

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
          onClick={handleRegistrar}
          disabled={
            !nuevoProducto.nombre_producto?.trim() ||
            !nuevoProducto.categoria_producto?.trim() ||
            !nuevoProducto.precio_venta ||
            deshabilitado
          }
        >
          Guardar
        </Button>

      </Modal.Footer>

    </Modal>

  );

};

export default ModalRegistroProducto;