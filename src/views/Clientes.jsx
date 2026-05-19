import React, { useState, useEffect } from "react";

import {
  Container,
  Row,
  Col,
  Button,
  Spinner,
  Pagination,
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

  // PAGINACIÓN

  const [paginaActual, setPaginaActual] = useState(1);

  const clientesPorPagina = 5;

  // MODALES

  const [mostrarModal, setMostrarModal] = useState(false);

  const [mostrarModalEditar, setMostrarModalEditar] = useState(false);

  const [mostrarModalEliminar, setMostrarModalEliminar] = useState(false);

  // NUEVO CLIENTE

  const [nuevoCliente, setNuevoCliente] = useState({
    nombre_cliente: "",
    telefono: "",
    direccion: "",
  });

  // CLIENTE EDITANDO

  const [clienteEditando, setClienteEditando] = useState({
    id_cliente: "",
    nombre_cliente: "",
    telefono: "",
    direccion: "",
  });

  // CLIENTE SELECCIONADO

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
        .order("id_cliente", {
          ascending: true,
        });

      if (error) throw error;

      setClientes(data || []);

      setClientesFiltrados(data || []);

    } catch (error) {

      console.error(error);

      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudieron cargar los clientes",
      });

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

    setPaginaActual(1);

  }, [textoBusqueda, clientes]);

  // ==========================
  // PAGINACIÓN
  // ==========================

  const indiceUltimoCliente =
    paginaActual * clientesPorPagina;

  const indicePrimerCliente =
    indiceUltimoCliente - clientesPorPagina;

  const clientesActuales =
    clientesFiltrados.slice(
      indicePrimerCliente,
      indiceUltimoCliente
    );

  const totalPaginas = Math.ceil(
    clientesFiltrados.length /
      clientesPorPagina
  );

  // ==========================
  // REGISTRAR CLIENTE
  // ==========================

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

      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo registrar",
      });

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
  // ACTUALIZAR CLIENTE
  // ==========================

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

      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo actualizar",
      });

    }

  };

  

  const abrirModalEliminar = (cliente) => {

    setClienteSeleccionado(cliente);

    setMostrarModalEliminar(true);

  };

  // ==========================
  // ELIMINAR CLIENTE
  // ==========================

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

      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo eliminar",
      });

    }

  };

  return (

    <Container className="mt-4">

      {/* HEADER */}

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

      {/* BUSCADOR */}

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

      {/* TABLA */}

      {cargando ? (

        <div className="text-center py-5">

          <Spinner animation="border" />

        </div>

      ) : (

        <>

          <TablaCliente
            clientes={clientesActuales}
            abrirModalEdicion={
              abrirModalEdicion
            }
            abrirModalEliminar={
              abrirModalEliminar
            }
          />

          {/* PAGINACIÓN */}

          <div className="d-flex justify-content-center mt-4">

            <Pagination>

              <Pagination.Prev
                disabled={paginaActual === 1}
                onClick={() =>
                  setPaginaActual(
                    paginaActual - 1
                  )
                }
              />

              {[...Array(totalPaginas)].map(
                (_, index) => (

                  <Pagination.Item
                    key={index}
                    active={
                      paginaActual ===
                      index + 1
                    }
                    onClick={() =>
                      setPaginaActual(
                        index + 1
                      )
                    }
                  >
                    {index + 1}
                  </Pagination.Item>

                )
              )}

              <Pagination.Next
                disabled={
                  paginaActual ===
                  totalPaginas
                }
                onClick={() =>
                  setPaginaActual(
                    paginaActual + 1
                  )
                }
              />

            </Pagination>

          </div>

        </>

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