import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const modulos = [
  {
    ruta: "/ventas",
    icono: "bi-cart3",
    titulo: "Ventas",
    descripcion: "Registrar y consultar transacciones",
  },
  {
    ruta: "/productos",
    icono: "bi-box-seam",
    titulo: "Productos",
    descripcion: "Inventario, precios y existencias",
  },
  {
    ruta: "/clientes",
    icono: "bi-people",
    titulo: "Clientes",
    descripcion: "Datos de contacto y compradores",
  },
  {
    ruta: "/categorias",
    icono: "bi-tags",
    titulo: "Categorías",
    descripcion: "Organización del catálogo",
  },
  {
    ruta: "/catalogo",
    icono: "bi-journal-text",
    titulo: "Catálogo",
    descripcion: "Vista general de artículos",
  },
  {
    ruta: "/dashboard-ventas",
    icono: "bi-graph-up",
    titulo: "Dashboard",
    descripcion: "Indicadores y gráficos de ventas",
  },
  {
    ruta: "/empleados",
    icono: "bi-person-badge",
    titulo: "Empleados",
    descripcion: "Personal y accesos al sistema",
  },
];

const Inicio = () => {
  const usuario =
    localStorage.getItem("usuario-supabase")?.split("@")[0] || "equipo";

  return (
    <Container fluid className="pagina-inicio px-0">
      <header className="inicio-encabezado">
        <h1>Hola, {usuario}</h1>
        <p>
          Selecciona un módulo para comenzar. Todo el control del negocio está
          disponible desde el menú superior.
        </p>
      </header>

      <Row className="g-3">
        {modulos.map((modulo) => (
          <Col key={modulo.ruta} xs={12} sm={6} lg={4} xl={3}>
            <Link to={modulo.ruta} className="modulo-acceso">
              <div className="icono-modulo">
                <i className={`bi ${modulo.icono}`} aria-hidden />
              </div>
              <h3>{modulo.titulo}</h3>
              <span>{modulo.descripcion}</span>
            </Link>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Inicio;
