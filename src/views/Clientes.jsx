import React, { useState, useEffect } from "react";

import {
  Container,
  Row,
  Col,
  Button,
  Spinner,
} from "react-bootstrap";

import Swal from "sweetalert2";

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
    telefono: "",
    direccion: "",
  });

  const [clienteEditando, setClienteEditando] = useState({
    id_cliente: "",
    nombre_cliente: "",
    telefono: "",
    direccion: "",
  });

  const [clienteSeleccionado, setClienteSeleccionado] = useState(null);

  // CARGAR CLIENTES

  const cargarClientes = async () => {

    try {

      setCargando(true);

      const { data, error } = await supabase
        .from("clientes")
        .select("*")
        .order("id_cliente", {
          ascending: true,
        });

      if (error) throw error;

      setClientes(data || []);
      setClientesFiltrados(data || []);

    } catch (error) {

      console.error(error);

    } finally {

      setCargando(false);

    }

  };

  useEffect(() => {

    cargarClientes();

  }, []);

  // BUSCADOR

  useEffect(() => {

    if (!textoBusqueda.trim()) {

      setClientesFiltrados(clientes);

    } else {

      const texto =
        textoBusqueda.toLowerCase();

      const filtrados = clientes.filter(
        (cliente) => {

          return (

            cliente.nombre_cliente
              ?.toLowerCase()
              .includes(texto)

            ||

            cliente.telefono
              ?.toLowerCase()
              .includes(texto)

            ||

            cliente.direccion
              ?.toLowerCase()
              .includes(texto)

          );

        }
      );

      setClientesFiltrados(filtrados);

    }

  }, [textoBusqueda, clientes]);

  // REGISTRAR CLIENTE

  const agregarCliente = async () => {

    try {

      const { error } = await supabase
        .from("clientes")
        .insert([
          {
            nombre_cliente:
              nuevoCliente.nombre_cliente,

            telefono:
              nuevoCliente.telefono,

            direccion:
              nuevoCliente.direccion,
          },
        ]);

      if (error) throw error;

      Swal.fire({
        icon: "success",
        title: "Cliente registrado",
        text: "Registro exitoso",
        timer: 2000,
        showConfirmButton: false,
      });

      setNuevoCliente({
        nombre_cliente: "",
        telefono: "",
        direccion: "",
      });

      setMostrarModal(false);

      cargarClientes();

    } catch (error) {

      console.error(error);

    }

  };

  // ABRIR MODAL EDITAR

  const abrirModalEdicion = (cliente) => {

    setClienteEditando(cliente);

    setMostrarModalEditar(true);

  };

  // ACTUALIZAR CLIENTE

  const actualizarCliente = async () => {

    try {

      const { error } = await supabase
        .from("clientes")
        .update({
          nombre_cliente:
            clienteEditando.nombre_cliente,

          telefono:
            clienteEditando.telefono,

          direccion:
            clienteEditando.direccion,
        })
        .eq(
          "id_cliente",
          clienteEditando.id_cliente
        );

      if (error) throw error;

      Swal.fire({
        icon: "success",
        title: "Cliente actualizado",
        text: "Cambios guardados",
        timer: 2000,
        showConfirmButton: false,
      });

      setMostrarModalEditar(false);

      cargarClientes();

    } catch (error) {

      console.error(error);

    }

  };

  // ABRIR MODAL ELIMINAR

  const abrirModalEliminar = (cliente) => {

    setClienteSeleccionado(cliente);

    setMostrarModalEliminar(true);

  };

  // ELIMINAR CLIENTE

  const eliminarCliente = async () => {

    try {

      const { error } = await supabase
        .from("clientes")
        .delete()
        .eq(
          "id_cliente",
          clienteSeleccionado.id_cliente
        );

      if (error) throw error;

      Swal.fire({
        icon: "success",
        title: "Cliente eliminado",
        text: "Registro eliminado",
        timer: 2000,
        showConfirmButton: false,
      });

      setMostrarModalEliminar(false);

      cargarClientes();

    } catch (error) {

      console.error(error);

    }

  };

  return (

    <Container className="mt-4">

      <Row className="align-items-center mb-4">

        <Col>

          <h2 className="fw-bold">
            👥 Gestión de Clientes
          </h2>

        </Col>

        <Col className="text-end">

          <Button
            onClick={() =>
              setMostrarModal(true)
            }
          >
            ➕ Nuevo Cliente
          </Button>

        </Col>

      </Row>

      <Row className="mb-4">

        <Col md={6}>

          <CuadroBusquedas
            textoBusqueda={textoBusqueda}
            manejarCambioBusqueda={(e) =>
              setTextoBusqueda(e.target.value)
            }
            placeholder="Buscar cliente..."
          />

        </Col>

      </Row>

      {cargando ? (

        <div className="text-center py-5">

          <Spinner animation="border" />

        </div>

      ) : (

        <TablaCliente
          clientes={clientesFiltrados}
          abrirModalEdicion={
            abrirModalEdicion
          }
          abrirModalEliminar={
            abrirModalEliminar
          }
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
        mostrarModalEditar={
          mostrarModalEditar
        }
        setMostrarModalEditar={
          setMostrarModalEditar
        }
        clienteEditando={clienteEditando}
        setClienteEditando={
          setClienteEditando
        }
        actualizarCliente={actualizarCliente}
      />

      <ModalEliminarCliente
        mostrarModalEliminar={
          mostrarModalEliminar
        }
        setMostrarModalEliminar={
          setMostrarModalEliminar
        }
        clienteSeleccionado={
          clienteSeleccionado
        }
        eliminarCliente={eliminarCliente}
      />

    </Container>

  );

};

export default Clientes;