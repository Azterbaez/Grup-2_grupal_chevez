import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button
} from "react-bootstrap";

import { useNavigate } from "react-router-dom";

const Inicio = () => {

  const navigate = useNavigate();

  return (

    <Container fluid className="p-0 bg-light min-vh-100">

      {/* HERO */}

      <div
        className="py-5 px-4"
        style={{
          background: "linear-gradient(135deg, #0f172a, #1e293b)",
          minHeight: "70vh",
          display: "flex",
          alignItems: "center",
        }}
      >

        <Container>

          <Row className="align-items-center g-5">

            <Col lg={6}>

              <span
                className="badge bg-success px-3 py-2 mb-3"
              >
                Sistema Inteligente
              </span>

              <h1
                className="fw-bold text-white mb-4"
                style={{
                  fontSize: "3.2rem",
                  lineHeight: "1.2"
                }}
              >
                Gestión Profesional para tu Negocio
              </h1>

              <p
                className="text-light mb-4"
                style={{
                  fontSize: "1.1rem"
                }}
              >
                Administra productos, categorías,
                ventas y estadísticas en tiempo real
                desde un solo lugar.
              </p>

              <div className="d-flex gap-3 flex-wrap">

                <Button
                  variant="success"
                  size="lg"
                  className="rounded-3 px-4"
                  onClick={() => navigate("/dashboard")}
                >
                  Ver Dashboard
                </Button>

                <Button
                  variant="outline-light"
                  size="lg"
                  className="rounded-3 px-4"
                  onClick={() => navigate("/productos")}
                >
                  Gestionar Productos
                </Button>

              </div>

            </Col>

            <Col lg={6}>

              <Card
                className="border-0 shadow-lg rounded-4 p-4"
              >

                <Row className="g-4">

                  <Col md={6}>

                    <div className="card-mini">

                      <div className="icono bg-primary">
                        📦
                      </div>

                      <h5 className="fw-bold mt-3">
                        Productos
                      </h5>

                      <p className="text-muted small">
                        Control completo de inventario
                      </p>

                    </div>

                  </Col>

                  <Col md={6}>

                    <div className="card-mini">

                      <div className="icono bg-success">
                        📊
                      </div>

                      <h5 className="fw-bold mt-3">
                        Reportes
                      </h5>

                      <p className="text-muted small">
                        Estadísticas y análisis
                      </p>

                    </div>

                  </Col>

                  <Col md={6}>

                    <div className="card-mini">

                      <div className="icono bg-warning">
                        🛒
                      </div>

                      <h5 className="fw-bold mt-3">
                        Ventas
                      </h5>

                      <p className="text-muted small">
                        Registro rápido y seguro
                      </p>

                    </div>

                  </Col>

                  <Col md={6}>

                    <div className="card-mini">

                      <div className="icono bg-danger">
                        📂
                      </div>

                      <h5 className="fw-bold mt-3">
                        Categorías
                      </h5>

                      <p className="text-muted small">
                        Organización eficiente
                      </p>

                    </div>

                  </Col>

                </Row>

              </Card>

            </Col>

          </Row>

        </Container>

      </div>

      {/* SECCION */}

      <Container className="py-5">

        <Row className="g-4">

          <Col md={4}>

            <Card className="border-0 shadow-sm rounded-4 p-4 h-100">

              <div className="fs-1 mb-3">
                📦
              </div>

              <h4 className="fw-bold">
                Productos
              </h4>

              <p className="text-muted">
                Administra inventario y stock fácilmente.
              </p>

              <Button
                variant="dark"
                className="rounded-3"
                onClick={() => navigate("/productos")}
              >
                Ir a Productos
              </Button>

            </Card>

          </Col>

          <Col md={4}>

            <Card className="border-0 shadow-sm rounded-4 p-4 h-100">

              <div className="fs-1 mb-3">
                📂
              </div>

              <h4 className="fw-bold">
                Categorías
              </h4>

              <p className="text-muted">
                Organiza tus productos correctamente.
              </p>

              <Button
                variant="dark"
                className="rounded-3"
                onClick={() => navigate("/categorias")}
              >
                Ver Categorías
              </Button>

            </Card>

          </Col>

          <Col md={4}>

            <Card className="border-0 shadow-sm rounded-4 p-4 h-100">

              <div className="fs-1 mb-3">
                📊
              </div>

              <h4 className="fw-bold">
                Dashboard
              </h4>

              <p className="text-muted">
                Analiza el rendimiento de tu negocio.
              </p>

              <Button
                variant="dark"
                className="rounded-3"
                onClick={() => navigate("/dashboard")}
              >
                Ver Dashboard
              </Button>

            </Card>

          </Col>

        </Row>

      </Container>

      <style>
        {`
          .card-mini {
            background: #f8fafc;
            border-radius: 18px;
            padding: 20px;
            transition: 0.3s;
            height: 100%;
          }

          .card-mini:hover {
            transform: translateY(-5px);
          }

          .icono {
            width: 55px;
            height: 55px;
            border-radius: 14px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 1.5rem;
          }
        `}
      </style>

    </Container>
  );
};

export default Inicio;