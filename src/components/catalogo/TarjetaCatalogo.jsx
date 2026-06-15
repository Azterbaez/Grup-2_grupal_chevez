import React, { useState } from "react";
import { Card, Badge, Modal, Button } from "react-bootstrap";

const TarjetaCatalogo = ({ producto, categoriaNombre }) => {
  const [mostrarModal, setMostrarModal] = useState(false);

  const descripcion = producto.descripcion_producto || "";

  const previsualizacionTexto =
    descripcion.length > 60
      ? descripcion.substring(0, 60) + "..."
      : descripcion;

  return (
    <>
      <Card
        className="border-0 shadow-sm rounded-4 h-100 overflow-hidden tarjeta-catalogo-contenedor"
        style={{ cursor: "pointer" }}
        onClick={() => setMostrarModal(true)}
      >
        <div className="tarjeta-catalogo-imagen">
          {producto.url_imagen ? (
            <img
              src={producto.url_imagen}
              alt={producto.nombre_producto}
              className="w-100 h-100"
              style={{ objectFit: "cover" }}
            />
          ) : (
            <div className="d-flex align-items-center justify-content-center h-100">
              <i className="bi bi-image text-muted fs-1"></i>
            </div>
          )}
        </div>

        <Card.Body className="d-flex flex-column p-3">
          <div className="mb-2">
            <Badge
              bg="light"
              text="dark"
              className="border tarjeta-catalogo-badge"
            >
              {categoriaNombre || "Sin categoría"}
            </Badge>
          </div>

          <Card.Title className="tarjeta-catalogo-titulo text-dark">
            {producto.nombre_producto}
          </Card.Title>

          <Card.Text className="tarjeta-catalogo-descripcion flex-grow-1">
            {previsualizacionTexto || "Sin descripción"}
          </Card.Text>

          <div className="mt-2">
            <h5 className="tarjeta-catalogo-precio">
              C$ {parseFloat(producto.precio_venta || 0).toFixed(2)}
            </h5>
          </div>
        </Card.Body>
      </Card>

      <Modal
        show={mostrarModal}
        onHide={() => setMostrarModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold tarjeta-movil-texto-principal">
            {producto.nombre_producto}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="text-center mb-3">
            {producto.url_imagen ? (
              <img
                src={producto.url_imagen}
                alt={producto.nombre_producto}
                className="img-fluid rounded-4 shadow-sm"
                style={{
                  maxHeight: "280px",
                  objectFit: "cover",
                }}
              />
            ) : (
              <div className="bg-light p-5 rounded-4">
                <i className="bi bi-image fs-1 text-muted"></i>
              </div>
            )}
          </div>

          <Badge bg="secondary" className="mb-3 tarjeta-catalogo-badge">
            {categoriaNombre || "Sin categoría"}
          </Badge>

          <h4 className="tarjeta-catalogo-precio">
            C$ {parseFloat(producto.precio_venta || 0).toFixed(2)}
          </h4>

          <p className="tarjeta-catalogo-descripcion mt-3 mb-0">
            {descripcion || "Sin descripción"}
          </p>
        </Modal.Body>

        <Modal.Footer className="border-0">
          <Button
            variant="secondary"
            onClick={() => setMostrarModal(false)}
          >
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default TarjetaCatalogo;
