import React, { useState, useEffect } from "react";
import { Card, Row, Col, Spinner, Button } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";

const TarjetaCategoria = ({
  categorias,
  abrirModalEdicion,
  abrirModalEliminacion,
}) => {

  const [cargando, setCargando] = useState(true);

  useEffect(() => {

    if (categorias) {
      setCargando(false);
    }

  }, [categorias]);

  return (
    <>
      {cargando ? (

        <div className="text-center my-5">

          <Spinner animation="border" variant="primary" />

          <p className="mt-2 text-muted">
            Cargando categorías...
          </p>

        </div>

      ) : (

        <Row className="g-3">

          {categorias.map((categoria) => (

            <Col xs={12} key={categoria.id_categoria}>

              <Card
                className="border-0 shadow-sm rounded-4"
                style={{
                  transition: "0.2s",
                  backgroundColor: "#fff",
                }}
              >

                <Card.Body className="p-3">

                  <Row className="align-items-center">

                    {/* ICONO */}
                    <Col xs={2} md={1}>

                      <div
                        className="d-flex align-items-center justify-content-center rounded-3"
                        style={{
                          width: "55px",
                          height: "55px",
                          backgroundColor: "#eef4ff",
                        }}
                      >

                        <i
                          className="bi bi-bookmark-fill text-primary"
                          style={{ fontSize: "1.3rem" }}
                        ></i>

                      </div>

                    </Col>

                    {/* INFORMACION */}
                    <Col xs={7} md={8}>

                      <h6 className="fw-bold mb-1">
                        {categoria.nombre_categoria}
                      </h6>

                      <small className="text-muted">
                        {categoria.descripcion_categoria ||
                          "Sin descripción"}
                      </small>

                    </Col>

                    {/* BOTONES */}
                    <Col
                      xs={3}
                      md={3}
                      className="text-end"
                    >

                      <Button
                        variant="light"
                        size="sm"
                        className="me-2 border"
                        onClick={() =>
                          abrirModalEdicion(categoria)
                        }
                      >
                        <i className="bi bi-pencil text-warning"></i>
                      </Button>

                      <Button
                        variant="light"
                        size="sm"
                        className="border"
                        onClick={() =>
                          abrirModalEliminacion(categoria)
                        }
                      >
                        <i className="bi bi-trash text-danger"></i>
                      </Button>

                    </Col>

                  </Row>

                </Card.Body>

              </Card>

            </Col>

          ))}

        </Row>

      )}
    </>
  );
};

export default TarjetaCategoria;