import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Spinner } from "react-bootstrap";
import { supabase } from "../../src/assets/database/supabaseconfig";

import ModalRegistroCliente from "../components/clientes/ModalRegistroCliente";
import ModalEditarCliente from "../components/clientes/ModalEditarCliente";
import NotificacionOperacion from "../components/NotificacionOperacion";
import TablaCliente from "../components/clientes/TablaCliente";

const clientes = () => {

  // 🔔 Toast
  const [toast, setToast] = useState({
    mostrar: false,
    mensaje: "",
    tipo: "",
  });

  // 📦 Data
  const [clientes, setClientes] = useState([]);
  const [cargando, setCargando] = useState(true);

  // ➕ Modal crear
  const [mostrarModal, setMostrarModal] = useState(false);

  // ✏️ Modal editar
  const [mostrarModalEditar, setMostrarModalEditar] = useState(false);

  // 🆕 Nuevo cliente
  const [nuevoCliente, setNuevoCliente] = useState({
    nombre: "",
    telefono: "",
    direccion: "",
  });

  // ✏️ Cliente editando
  const [clienteEditando, setClienteEditando] = useState({
    id_cliente: "",
    nombre: "",
    telefono: "",
    direccion: "",
  });

  // 📥 READ
  const cargarClientes = async () => {
    setCargando(true);

    const { data, error } = await supabase
      .from("Dim_Cliente")
      .select("*")
      .order("id_cliente", { ascending: true });

    if (error) {
      console.log(error.message);
    } else {
      setClientes(data);
    }

    setCargando(false);
  };

  useEffect(() => {
    cargarClientes();
  }, []);

  // ✍️ INPUT CREAR
  const manejoCambioInput = (e) => {
    const { name, value } = e.target;

    setNuevoCliente((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ➕ CREATE
  const agregarCliente = async () => {
    const { error } = await supabase.from("Dim_Cliente").insert([
      nuevoCliente
    ]);

    if (error) {
      setToast({ mostrar: true, mensaje: "Error al registrar", tipo: "error" });
    } else {
      setToast({ mostrar: true, mensaje: "Cliente creado", tipo: "exito" });

      setNuevoCliente({ nombre: "", telefono: "", direccion: "" });
      setMostrarModal(false);
      cargarClientes();
    }
  };

  // 🗑️ DELETE
  const eliminarCliente = async (cliente) => {
    const confirmar = window.confirm(`¿Eliminar a ${cliente.nombre}?`);
    if (!confirmar) return;

    const { error } = await supabase
      .from("Dim_Cliente")
      .delete()
      .eq("id_cliente", cliente.id_cliente);

    if (error) {
      setToast({ mostrar: true, mensaje: "Error al eliminar", tipo: "error" });
    } else {
      setToast({ mostrar: true, mensaje: "Cliente eliminado", tipo: "exito" });
      cargarClientes();
    }
  };

  // ✏️ ABRIR EDIT
  const abrirModalEdicion = (cliente) => {
    setClienteEditando(cliente);
    setMostrarModalEditar(true);
  };

  // ✍️ INPUT EDIT
  const manejoCambioEdit = (e) => {
    const { name, value } = e.target;

    setClienteEditando((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 💾 UPDATE
  const actualizarCliente = async () => {
    const { error } = await supabase
      .from("Dim_Cliente")
      .update({
        nombre: clienteEditando.nombre,
        telefono: clienteEditando.telefono,
        direccion: clienteEditando.direccion,
      })
      .eq("id_cliente", clienteEditando.id_cliente);

    if (error) {
      setToast({ mostrar: true, mensaje: "Error al actualizar", tipo: "error" });
    } else {
      setToast({ mostrar: true, mensaje: "Cliente actualizado", tipo: "exito" });

      setMostrarModalEditar(false);
      cargarClientes();
    }
  };

  return (
    <Container className="mt-3">

      {/* HEADER */}
      <Row className="mb-3">
        <Col>
          <h3>Clientes</h3>
        </Col>

        <Col className="text-end">
          <Button onClick={() => setMostrarModal(true)}>
            Nuevo Cliente
          </Button>
        </Col>
      </Row>

      {/* LOADING */}
      {cargando ? (
        <Spinner animation="border" />
      ) : (
        <TablaCliente
          clientes={clientes}
          abrirModalEdicion={abrirModalEdicion}
          abrirModalEliminacion={eliminarCliente}
        />
      )}

      {/* MODAL CREAR */}
      <ModalRegistroCliente
        mostrarModal={mostrarModal}
        setMostrarModal={setMostrarModal}
        nuevoCliente={nuevoCliente}
        manejoCambioInput={manejoCambioInput}
        agregarCliente={agregarCliente}
      />

      {/* MODAL EDITAR */}
      <ModalEditarCliente
        mostrarModalEditar={mostrarModalEditar}
        setMostrarModalEditar={setMostrarModalEditar}
        clienteEditando={clienteEditando}
        manejoCambioEdit={manejoCambioEdit}
        actualizarCliente={actualizarCliente}
      />

      {/* TOAST */}
      <NotificacionOperacion
        mostrar={toast.mostrar}
        mensaje={toast.mensaje}
        tipo={toast.tipo}
        onCerrar={() => setToast({ ...toast, mostrar: false })}
      />

    </Container>
  );
};

export default clientes;