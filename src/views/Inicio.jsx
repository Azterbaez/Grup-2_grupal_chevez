import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Inicio = () => {
  const navigate = useNavigate();

  return (
    <Container fluid className="p-0">

      {/* 🔥 HERO */}
      <div
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=1600')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "75vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.65)",
          }}
        />

        <div className="text-center text-white position-relative">
          <h1 className="display-4 fw-bold mb-3">Pulpería Chevez</h1>
          <p className="lead mb-4">
            Control y análisis inteligente de tu negocio
          </p>

          <div className="d-flex justify-content-center gap-3 flex-wrap">
            <Button
              variant="success"
              size="lg"
              onClick={() => navigate("/catalogo")}
            >
              🛒 Catálogo
            </Button>

            <Button
              variant="outline-light"
              size="lg"
              onClick={() => navigate("/productos")}
            >
              📦 Productos
            </Button>
          </div>

          {/* acceso discreto */}
          <div className="mt-3">
            <Button
              variant="dark"
              size="sm"
              onClick={() => navigate("/dashboard")}
            >
              📊 Ver análisis
            </Button>
          </div>
        </div>
      </div>

      {/* 🔥 TARJETAS (REDUCIDAS A 2) */}
      <Container className="py-5">
        <Row className="g-4 justify-content-center">

          <Col md={5}>
            <Card className="shadow border-0 text-center p-4 rounded-4 hover-scale">
              <div className="fs-1 mb-3">📂</div>
              <h5 className="fw-bold">Categorías</h5>
              <p className="text-muted">Organiza tus productos fácilmente</p>
              <Button onClick={() => navigate("/categorias")}>
                Ver categorías
              </Button>
            </Card>
          </Col>

          <Col md={5}>
            <Card className="shadow border-0 text-center p-4 rounded-4 hover-scale">
              <div className="fs-1 mb-3">📊</div>
              <h5 className="fw-bold">Dashboard</h5>
              <p className="text-muted">Analiza ventas y rendimiento</p>
              <Button onClick={() => navigate("/dashboard")}>
                Ir al análisis
              </Button>
            </Card>
          </Col>

        </Row>
      </Container>

      {/* 🔥 ESTILOS */}
      <style>
        {`
        .hover-scale {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .hover-scale:hover {
          transform: translateY(-5px);
          box-shadow: 0px 10px 25px rgba(0,0,0,0.15);
        }
        `}
      </style>

    </Container>
  );
};

export default Inicio;