import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { supabase } from "../database/supabaseconfig";

const modulos = [
  {
    ruta: "/ventas",
    icono: "bi-cart3",
    titulo: "Ventas",
    descripcion: "Registrar y consultar transacciones del día",
    destacado: true,
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
    localStorage
      .getItem("usuario-supabase")
      ?.split("@")[0] || "equipo";

  const [stats, setStats] = useState({
    productos: 0,
    clientes: 0,
    ventas: 0,
  });

  const [cargandoStats, setCargandoStats] =
    useState(true);

  useEffect(() => {
    const cargarStats = async () => {
      try {
        const [productos, clientes, ventas] =
          await Promise.all([
            supabase
              .from("productos")
              .select("*", {
                count: "exact",
                head: true,
              }),
            supabase
              .from("clientes")
              .select("*", {
                count: "exact",
                head: true,
              }),
            supabase
              .from("ventas")
              .select("*", {
                count: "exact",
                head: true,
              }),
          ]);

        setStats({
          productos: productos.count || 0,
          clientes: clientes.count || 0,
          ventas: ventas.count || 0,
        });
      } catch (err) {
        console.error("Error cargando estadísticas:", err);
      } finally {
        setCargandoStats(false);
      }
    };

    cargarStats();
  }, []);

  return (
    <div className="landing-page">
      <section className="landing-hero">
        <div className="landing-hero-bg" aria-hidden />
        <Container fluid className="landing-hero-inner">
          <Row className="align-items-center g-4">
            <Col lg={7}>
              <span className="landing-badge">
                <span className="landing-badge-dot" />
                Pulpería Chévez · Juigalpa
              </span>

              <h1 className="landing-title">
                Bienvenido,{" "}
                <span className="landing-title-accent">
                  {usuario}
                </span>
              </h1>

              <p className="landing-lead">
                Gestiona ventas, inventario y clientes desde
                un solo lugar. Todo lo que necesitas para
                tu negocio, rápido y organizado.
              </p>

              <div className="landing-acciones">
                <Button
                  as={Link}
                  to="/ventas"
                  className="landing-btn-principal"
                >
                  <i className="bi bi-cart-plus me-2" />
                  Nueva venta
                </Button>
                <Button
                  as={Link}
                  to="/catalogo"
                  variant="outline-light"
                  className="landing-btn-secundario"
                >
                  <i className="bi bi-journal-text me-2" />
                  Ver catálogo
                </Button>
              </div>

              <div className="landing-stats">
                {cargandoStats ? (
                  <Spinner
                    animation="border"
                    size="sm"
                    variant="light"
                  />
                ) : (
                  <>
                    <div className="landing-stat">
                      <strong>{stats.productos}</strong>
                      <span>Productos</span>
                    </div>
                    <div className="landing-stat">
                      <strong>{stats.clientes}</strong>
                      <span>Clientes</span>
                    </div>
                    <div className="landing-stat">
                      <strong>{stats.ventas}</strong>
                      <span>Ventas</span>
                    </div>
                  </>
                )}
              </div>
            </Col>

            <Col
              lg={5}
              className="text-center text-lg-end"
            >
              <div className="landing-logo-wrap">
                <img
                  src={logo}
                  alt="Pulpería Chévez"
                  className="landing-logo"
                />
                <p className="landing-horario">
                  <i className="bi bi-clock me-2" />
                  Lun – Dom · 6:00 am – 11:00 pm
                </p>
                <p className="landing-direccion">
                  <i className="bi bi-geo-alt me-2" />
                  De la Gasolinera UNO ½ c al Oeste,
                  Juigalpa – Chontales
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <Container fluid className="landing-contenido">
        <div className="landing-seccion-titulo">
          <h2>Módulos del sistema</h2>
          <p>
            Selecciona una sección para comenzar a trabajar
          </p>
        </div>

        <Row className="g-3 g-md-4">
          {modulos.map((modulo) => (
            <Col
              key={modulo.ruta}
              xs={12}
              sm={6}
              lg={4}
              xl={3}
            >
              <Link
                to={modulo.ruta}
                className={`modulo-acceso ${
                  modulo.destacado
                    ? "modulo-acceso-destacado"
                    : ""
                }`}
              >
                <div className="icono-modulo">
                  <i
                    className={`bi ${modulo.icono}`}
                    aria-hidden
                  />
                </div>
                <h3>{modulo.titulo}</h3>
                <span>{modulo.descripcion}</span>
                <span className="modulo-flecha">
                  <i className="bi bi-arrow-right" />
                </span>
              </Link>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Inicio;
