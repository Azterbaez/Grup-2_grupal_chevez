import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Container, Nav, Navbar, Offcanvas } from "react-bootstrap";
import logo from "../../assets/logo.png";
import { supabase } from "../../database/supabaseconfig";
import ChatIA from "../ia/ChatIA";


const Encabezado = () => {
  const [mostrarMenu, setMostrarMenu] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const manejarToggle = () => setMostrarMenu(!mostrarMenu);
  const [mostrarChatIA, setMostrarChatIA] = useState(false);

  const manejarNavegacion = (ruta) => {
    navigate(ruta);
    setMostrarMenu(false);
  };

  const cerrarSesion = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      localStorage.removeItem("usuario-supabase");
      setMostrarMenu(false);
      navigate("/login");
    } catch (err) {
      console.error("Error cerrando sesión:", err.message);
    }
  };

  const esLogin = location.pathname === "/login";

  let contenidoMenu;

  if (esLogin) {
    contenidoMenu = (
      <Nav className="ms-auto pe-2">
        <Nav.Link
          onClick={() => manejarNavegacion("/login")}
          className="text-white"
        >
          <i className="bi-person-fill-lock me-2"></i>
          Inicia sesión
        </Nav.Link>
      </Nav>
    );
  } else {
    contenidoMenu = (
      <>
        <Nav className="ms-auto pe-2">

          <Nav.Link
            onClick={() => manejarNavegacion("/inicio")}
            className={mostrarMenu ? "color-texto-marca" : "text-white"}
          >
            {mostrarMenu ? <i className="bi-house-fill me-2"></i> : null}
            <strong>Inicio</strong>
          </Nav.Link>

          <Nav.Link
            onClick={() => manejarNavegacion("/Ventas")}
            className={mostrarMenu ? "color-texto-marca" : "text-white"}  
          >
            {mostrarMenu ? <i className="bi-cart-fill me-2"></i> : null}
            <strong>Ventas</strong>
          </Nav.Link>
          <Nav.Link
            onClick={() => manejarNavegacion("/dashboard-ventas")}
            className={mostrarMenu ? "color-texto-marca" : "text-white"}
          >
            {mostrarMenu ? <i className="bi-bar-chart-fill me-2"></i> : null}
            <strong>Dashboard Ventas</strong>
          </Nav.Link>
          <Nav.Link
            onClick={() => manejarNavegacion("/productos")}
            className={mostrarMenu ? "color-texto-marca" : "text-white"}    
          >
            {mostrarMenu ? <i className="bi-box-seam me-2"></i> : null}
            <strong>Productos</strong>
          </Nav.Link>
          <Nav.Link
            onClick={() => manejarNavegacion("/categorias")}
            className={mostrarMenu ? "color-texto-marca" : "text-white"}
          >
            {mostrarMenu ? <i className="bi-tags-fill me-2"></i> : null}
            <strong>Categorías</strong>
          </Nav.Link>
          <Nav.Link
            onClick={() => manejarNavegacion("/clientes")}
            className={mostrarMenu ? "color-texto-marca" : "text-white"}
          >
            {mostrarMenu ? <i className="bi-people-fill me-2"></i> : null}
            <strong>Clientes</strong>
          </Nav.Link>
          <Nav.Link
            onClick={() => manejarNavegacion("/catalogo")}
            className={mostrarMenu ? "color-texto-marca" : "text-white"}
          >
            {mostrarMenu ? <i className="bi-journal-bookmark-fill me-2"></i> : null}
            <strong>Catálogo</strong>
          </Nav.Link>

          <Nav.Link
            onClick={() => manejarNavegacion("/empleados")}
            className={mostrarMenu ? "color-texto-marca" : "text-white"}
          >
            {mostrarMenu ? <i className="bi-person-badge-fill me-2"></i> : null}
            <strong>Empleados</strong>
          </Nav.Link>

          <Nav.Link onClick={() => setMostrarChatIA(true)} className="text-white">
  <i className="bi bi-robot me-2"></i>
</Nav.Link>

          <hr />

          {!mostrarMenu && (
            <Nav.Link onClick={cerrarSesion} className="text-white">
              <i className="bi-box-arrow-right me-2"></i>
            </Nav.Link>
          )}

        </Nav>

        {mostrarMenu && (
          <div className="mt-3 p-3 rounded bg-light text-dark">
            <p className="mb-2">
              <i className="bi-envelope-fill me-2"></i>
              {localStorage.getItem("usuario-supabase")?.toLowerCase() || "Usuario"}
            </p>

            <button
              className="btn btn-outline-danger mt-3 w-100"
              onClick={cerrarSesion}
            >
              <i className="bi-box-arrow-right me-2"></i>
              Cerrar sesión
            </button>
          </div>
        )}
      </>
    );
  }

  return (
    <Navbar expand="md" fixed="top" className="color-navbar shadow-lg" variant="dark">
      <Container>
        <Navbar.Brand
          onClick={() => manejarNavegacion("/inicio")}
          className="text-white fw-bold d-flex align-items-center"
          style={{ cursor: "pointer" }}
        >
          <img
            alt=""
            src={logo}
            width="45"
            height="45"
            className="d-inline-block me-2"
          />
          <h4 className="mb-0">Don Chevez</h4>
        </Navbar.Brand>

        {!esLogin && (
          <Navbar.Toggle onClick={manejarToggle} />
        )}

        <ChatIA mostrar={mostrarChatIA} onCerrar={() => setMostrarChatIA(false)} />

        <Navbar.Offcanvas
          placement="end"
          show={mostrarMenu}
          onHide={() => setMostrarMenu(false)}
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Menú</Offcanvas.Title>
          </Offcanvas.Header>

          <Offcanvas.Body>
            {contenidoMenu}
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};

export default Encabezado;