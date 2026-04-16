import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Spinner } from "react-bootstrap";
import { supabase } from "../../src/assets/database/supabaseconfig";

import ModalRegistroCliente from "../components/clientes/ModalRegistroCliente";
import NotificacionOperacion from "../components/NotificacionOperacion";
import TablaCliente from "../components/clientes/TablaCliente";

const Clientes = () => {
  // 🔔 Notificaciones
  const [toast, setToast] = useState({
    mostrar: false,
    mensaje: "",
    tipo: "",
  });

  // 📦 Datos
  const [clientes, setClientes] = useState([]);
  const [cargando, setCargando] = useState(true);

  // 🪟 Modales
  const [mostrarModal, setMostrarModal] = useState(false);

  // 🆕 Nuevo cliente
  const [nuevoCliente, setNuevoCliente] = useState({
    nombre: "",
    telefono: "",
    direccion: "",
  });

  // 📥 Cargar clientes
  const cargarClientes = async () => {
    try {
      setCargando(true);

      const { data, error } = await supabase
        .from("Dim_Cliente")
        .select("*")
        .order("id_cliente", { ascending: true });

      if (error) {
        console.error("Error al cargar clientes:", error.message);
        setToast({
          mostrar: true,
          mensaje: "Error al cargar clientes.",
          tipo: "error",
        });
        return;
      }

      setClientes(data || []);
    } catch (err) {
      console.error("Excepción:", err.message);
    } finally {
      setCargando(false);
    }
  };

  // 🔄 Al iniciar
  useEffect(() => {
    cargarClientes();
  }, []);

  // ⌨️ Inputs
  const manejoCambioInput = (e) => {
    const { name, value } = e.target;
    setNuevoCliente((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ➕ Agregar cliente
  const agregarCliente = async () => {
    try {
      if (
        !nuevoCliente.nombre.trim() ||
        !nuevoCliente.telefono.trim() ||
        !nuevoCliente.direccion.trim()
      ) {
        setToast({
          mostrar: true,
          mensaje: "Debe llenar todos los campos.",
          tipo: "advertencia",
        });
        return;
      }

      const { error } = await supabase.from("Dim_Cliente").insert([
        {
          nombre: nuevoCliente.nombre,
          telefono: nuevoCliente.telefono,
          direccion: nuevoCliente.direccion,
        },
      ]);

      if (error) {
        console.error(error.message);
        setToast({
          mostrar: true,
          mensaje: "Error al registrar cliente.",
          tipo: "error",
        });
        return;
      }

      setToast({
        mostrar: true,
        mensaje: `Cliente "${nuevoCliente.nombre}" registrado.`,
        tipo: "exito",
      });

      setNuevoCliente({
        nombre: "",
        telefono: "",
        direccion: "",
      });

      setMostrarModal(false);
      cargarClientes();
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Container className="mt-3">
      {/* Encabezado */}
      <Row className="align-items-center mb-3">
        <Col>
          <h3>
            <i className="bi bi-people me-2"></i> Clientes
          </h3>
        </Col>

        <Col className="text-end">
          <Button onClick={() => setMostrarModal(true)}>
            <i className="bi bi-plus-lg"></i>
            <span className="ms-2">Nuevo Cliente</span>
          </Button>
        </Col>
      </Row>

      <hr />

      {/* Cargando */}
      {cargando && (
        <Row className="text-center my-5">
          <Col>
            <Spinner animation="border" />
            <p>Cargando clientes...</p>
          </Col>
        </Row>
      )}

      {/* Tabla */}
      {!cargando && (
        <TablaCliente clientes={clientes} />
      )}

      {/* Modal */}
      <ModalRegistroCliente
        mostrarModal={mostrarModal}
        setMostrarModal={setMostrarModal}
        nuevoCliente={nuevoCliente}
        manejoCambioInput={manejoCambioInput}
        agregarCliente={agregarCliente}
      />

      {/* Notificación */}
      <NotificacionOperacion
        mostrar={toast.mostrar}
        mensaje={toast.mensaje}
        tipo={toast.tipo}
        onCerrar={() => setToast({ ...toast, mostrar: false })}
      />
    </Container>
  );
};

export default Clientes;