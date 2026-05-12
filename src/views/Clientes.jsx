import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Spinner,
} from "react-bootstrap";

import { supabase } from "../database/supabaseconfig";

import TablaCliente from "../components/Clientes/TablaCliente";
import ModalRegistroCliente from "../components/Clientes/ModalRegistroCliente";
import ModalEditarCliente from "../components/Clientes/ModalEditarCliente";
import ModalEliminarCliente from "../components/Clientes/ModalEliminarCliente";
import CuadroBusquedas from "../components/busquedas/cuadroBusquedas";

const Clientes = () => {

  const [clientes, setClientes] = useState([]);
  const [clientesFiltrados, setClientesFiltrados] = useState([]);

  const [cargando, setCargando] = useState(true);

  const [textoBusqueda, setTextoBusqueda] = useState("");

  const [mostrarModal, setMostrarModal] = useState(false);
  const [mostrarModalEditar, setMostrarModalEditar] = useState(false);
  const [mostrarModalEliminar, setMostrarModalEliminar] = useState(false);

  const [nuevoCliente, setNuevoCliente] = useState({
    nombre_cliente: "",
    telefono_cliente: "",
    direccion_cliente: "",
  });

  const [clienteEditando, setClienteEditando] = useState({
    id_cliente: "",
    nombre_cliente: "",
    telefono_cliente: "",
    direccion_cliente: "",
  });

  const [clienteSeleccionado, setClienteSeleccionado] = useState(null);

  // ==========================
  // CARGAR CLIENTES
  // ==========================

  const cargarClientes = async () => {

    try {

      setCargando(true);

      const { data, error } = await supabase
        .from("clientes")
        .select("*")
        .order("id_cliente", { ascending: true });

      if (error) throw error;

      setClientes(data || []);
      setClientesFiltrados(data || []);

    } catch (error) {

      console.error("Error al cargar clientes:", error);

    } finally {

      setCargando(false);

    }

  };

  useEffect(() => {
    cargarClientes();
  }, []);

  // ==========================
  // BUSCADOR
  // ==========================

  useEffect(() => {

    if (!textoBusqueda.trim()) {

      setClientesFiltrados(clientes);

    } else {

      const texto = textoBusqueda.toLowerCase();

      const filtrados = clientes.filter((cliente) => {

        return (
          cliente.nombre_cliente?.toLowerCase().includes(texto) ||
          cliente.telefono_cliente?.toLowerCase().includes(texto) ||
          cliente.direccion_cliente?.toLowerCase().includes(texto)
        );

      });

      setClientesFiltrados(filtrados);

    }

  }, [textoBusqueda, clientes]);

  // ==========================
  // CREATE
  // ==========================

  const agregarCliente = async () => {

    try {

      const { error } = await supabase
        .from("clientes")
        .insert([
          {
            nombre_cliente: nuevoCliente.nombre_cliente,
            telefono_cliente: nuevoCliente.telefono_cliente,
            direccion_cliente: nuevoCliente.direccion_cliente,
          },
        ]);

      if (error) throw error;

      setNuevoCliente({
        nombre_cliente: "",
        telefono_cliente: "",
        direccion_cliente: "",
      });

      setMostrarModal(false);

      cargarClientes();

    } catch (error) {

      console.error("Error al registrar cliente:", error);

    }

  };

  // ==========================
  // ABRIR MODAL EDITAR
  // ==========================

  const abrirModalEdicion = (cliente) => {

    setClienteEditando(cliente);

    setMostrarModalEditar(true);

  };

  // ==========================
  // UPDATE
  // ==========================

  const actualizarCliente = async () => {

    try {

      const { error } = await supabase
        .from("clientes")
        .update({
          nombre_cliente: clienteEditando.nombre_cliente,
          telefono_cliente: clienteEditando.telefono_cliente,
          direccion_cliente: clienteEditando.direccion_cliente,
        })
        .eq("id_cliente", clienteEditando.id_cliente);

      if (error) throw error;

      setMostrarModalEditar(false);

      cargarClientes();

    } catch (error) {

      console.error("Error al actualizar cliente:", error);

    }

  };

  // ==========================
  // ABRIR MODAL ELIMINAR
  // ==========================

  const abrirModalEliminar = (cliente) => {

    setClienteSeleccionado(cliente);

    setMostrarModalEliminar(true);

  };

  // ==========================
  // DELETE
  // ==========================

  const eliminarCliente = async () => {

    try {

      const { error } = await supabase
        .from("clientes")
        .delete()
        .eq("id_cliente", clienteSeleccionado.id_cliente);

      if (error) throw error;

      setMostrarModalEliminar(false);

      cargarClientes();

    } catch (error) {

      console.error("Error al eliminar cliente:", error);

    }

  };

  return (

    <Container className="mt-3">

      {/* HEADER */}

      <Row className="align-items-center mb-3">

        <Col>

          <h3 className="mb-0">
            👥 Clientes
          </h3>

        </Col>

        <Col className="text-end">

          <Button
            onClick={() => setMostrarModal(true)}
          >
            Nuevo Cliente
          </Button>

        </Col>

      </Row>

      <hr />

      {/* BUSCADOR */}

      <Row className="mb-4">

        <Col md={6} lg={5}>

          <CuadroBusquedas
            textoBusqueda={textoBusqueda}
            manejarCambioBusqueda={(e) =>
              setTextoBusqueda(e.target.value)
            }
            placeholder="Buscar cliente..."
          />

        </Col>

      </Row>

      {/* LOADING */}

      {cargando ? (

        <div className="text-center py-5">

          <Spinner
            animation="border"
            variant="primary"
          />

          <p className="mt-3 text-muted">
            Cargando clientes...
          </p>

        </div>

      ) : (

        <TablaCliente
          clientes={clientesFiltrados}
          abrirModalEdicion={abrirModalEdicion}
          abrirModalEliminar={abrirModalEliminar}
        />

      )}

      {/* MODALES */}

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