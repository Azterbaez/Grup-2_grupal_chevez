import React from "react";
import { Card, Row, Col, Button } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";

const TarjetaCategoria = ({
  categorias,
  abrirModalEdicion,
  abrirModalEliminacion,
}) => {
  if (!categorias || categorias.length === 0) {
    return (
      <p className="text-center text-muted tarjeta-movil-texto-secundario py-4 mb-0">
        No hay categorías para mostrar
      </p>
    );
  }

  return (
    <Row className="g-3">
      {categorias.map((categoria) => (
        <Col xs={12} key={categoria.id_categoria}>
          <Card className="border-0 shadow-sm rounded-4 tarjeta-categoria-contenedor">
            <Card.Body className="p-3 tarjeta-categoria-cuerpo tarjeta-movil-cuerpo">
              <Row className="align-items-center gx-2 gx-sm-3">
                <Col xs="auto">
                  <div className="d-flex align-items-center justify-content-center rounded-3 tarjeta-categoria-placeholder-imagen tarjeta-movil-placeholder bg-primary-subtle">
                    <i className="bi bi-bookmark-fill text-primary"></i>
                  </div>
                </Col>

                <Col className="min-w-0">
                  <h6 className="tarjeta-categoria-nombre text-truncate mb-1">
                    {categoria.nombre_categoria}
                  </h6>
                  <p className="tarjeta-categoria-descripcion mb-0">
                    {categoria.descripcion_categoria || "Sin descripción"}
                  </p>
                </Col>

                <Col xs="auto" className="text-end">
                  <div className="tarjeta-categoria-botones">
                    <Button
                      variant="light"
                      size="sm"
                      className="me-1 border"
                      onClick={() => abrirModalEdicion(categoria)}
                      aria-label={`Editar ${categoria.nombre_categoria}`}
                    >
                      <i className="bi bi-pencil text-warning"></i>
                    </Button>

                    <Button
                      variant="light"
                      size="sm"
                      className="border"
                      onClick={() => abrirModalEliminacion(categoria)}
                      aria-label={`Eliminar ${categoria.nombre_categoria}`}
                    >
                      <i className="bi bi-trash text-danger"></i>
                    </Button>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default TarjetaCategoria;
