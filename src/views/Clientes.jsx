import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Spinner } from "react-bootstrap";
import { supabase } from "../assets/database/supabaseconfig";

// 🔥 IMPORTS CORREGIDOS (carpeta "Clientes")
import TablaCliente from "../components/Clientes/TablaCliente";
import ModalRegistroCliente from "../components/Clientes/ModalRegistroCliente";
import ModalEditarCliente from "../components/Clientes/ModalEditarCliente";
import ModalEliminarCliente from "../components/Clientes/ModalEliminarCliente";

const Clientes = () => {

  const [clientes, setClientes] = useState([]);
  const [cargando, setCargando] = useState(true);

  const [mostrarModal, setMostrarModal] = useState(false);
  const [mostrarModalEditar, setMostrarModalEditar] = useState(false);
  const [mostrarModalEliminar, setMostrarModalEliminar] = useState(false);

  const [nuevoCliente, setNuevoCliente] = useState({
    nombre: "",
    telefono: "",
    direccion: "",
  });

  const [clienteEditando, setClienteEditando] = useState({
    id_cliente: "",
    nombre: "",
    telefono: "",
    direccion: "",
  });

  const [clienteSeleccionado, setClienteSeleccionado] = useState(null);

  const cargarClientes = async () => {
    setCargando(true);

    const { data } = await supabase
      .from("Dim_Cliente")
      .select("*")
      .order("id_cliente", { ascending: true });

    setClientes(data || []);
    setCargando(false);
  };

  useEffect(() => {
    cargarClientes();
  }, []);

  // ➕ CREATE
  const agregarCliente = async () => {
    await supabase.from("Dim_Cliente").insert([nuevoCliente]);

    setNuevoCliente({ nombre: "", telefono: "", direccion: "" });
    setMostrarModal(false);
    cargarClientes();
  };

  // ✏️ OPEN EDIT
  const abrirModalEdicion = (cliente) => {
    setClienteEditando(cliente);
    setMostrarModalEditar(true);
  };

  // 💾 UPDATE
  const actualizarCliente = async () => {
    await supabase
      .from("Dim_Cliente")
      .update({
        nombre: clienteEditando.nombre,
        telefono: clienteEditando.telefono,
        direccion: clienteEditando.direccion,
      })
      .eq("id_cliente", clienteEditando.id_cliente);

    setMostrarModalEditar(false);
    cargarClientes();
  };

  // 🗑️ OPEN DELETE
  const abrirModalEliminar = (cliente) => {
    setClienteSeleccionado(cliente);
    setMostrarModalEliminar(true);
  };

  // 🗑️ DELETE
  const eliminarCliente = async () => {
    await supabase
      .from("Dim_Cliente")
      .delete()
      .eq("id_cliente", clienteSeleccionado.id_cliente);

    setMostrarModalEliminar(false);
    cargarClientes();
  };

  return (
    <Container className="mt-3">

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

      {cargando ? (
        <Spinner animation="border" />
      ) : (
        <TablaCliente
          clientes={clientes}
          abrirModalEdicion={abrirModalEdicion}
          abrirModalEliminar={abrirModalEliminar}
        />
      )}

      <ModalRegistroCliente
        mostrarModal={mostrarModal}
        setMostrarModal={setMostrarModal}
        nuevoCliente={nuevoCliente}
        setNuevoCliente={setNuevoCliente}
        agregarCliente={agregarCliente}
      />

      <ModalEditarCliente
        mostrarModalEditar={mostrarModalEditar}
        setMostrarModalEditar={setMostrarModalEditar}
        clienteEditando={clienteEditando}
        setClienteEditando={setClienteEditando}
        actualizarCliente={actualizarCliente}
      />

      <ModalEliminarCliente
        mostrarModalEliminar={mostrarModalEliminar}
        setMostrarModalEliminar={setMostrarModalEliminar}
        clienteSeleccionado={clienteSeleccionado}
        eliminarCliente={eliminarCliente}
      />

    </Container>
  );
};

export default Clientes;