import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
 Col,
  Button,
  Spinner
} from "react-bootstrap";

import { supabase } from "../database/supabaseconfig";

import NotificacionOperacion from "../components/NotificacionOperacion";
import CuadroBusquedas from "../components/busquedas/cuadroBusquedas";
import Paginacion from "../components/ordenamiento/Paginacion";
import TablaVentas from "../components/Venta/TablaVenta";
import TarjetaVenta from "../components/Venta/TarjetaVenta";
import FormularioVenta from "../components/Venta/FormularioVenta";

const Ventas = () => {

  const [toast, setToast] = useState({
    mostrar: false,
    mensaje: "",
    tipo: ""
  });

  const [ventas, setVentas] = useState([]);
  const [cargando, setCargando] = useState(true);

  const [mostrarFormulario, setMostrarFormulario] =
    useState(false);

  const [ventaAEditar, setVentaAEditar] =
    useState(null);

  const [clientes, setClientes] = useState([]);
  const [empleados, setEmpleados] = useState([]);
  const [productos, setProductos] = useState([]);

  const [clienteSeleccionado,
    setClienteSeleccionado] = useState(null);

  const [empleadoSeleccionado,
    setEmpleadoSeleccionado] = useState(null);

  const [metodoPago,
    setMetodoPago] = useState("efectivo");

  const [detalles,
    setDetalles] = useState([]);

  const [totalGeneral,
    setTotalGeneral] = useState(0);

  const [textoBusqueda,
    setTextoBusqueda] = useState("");

  const [ventasFiltradas,
    setVentasFiltradas] = useState([]);

  const [registrosPorPagina,
    establecerRegistrosPorPagina] = useState(8);

  const [paginaActual,
    establecerPaginaActual] = useState(1);

  const ventasPaginadas = ventasFiltradas.slice(
    (paginaActual - 1) * registrosPorPagina,
    paginaActual * registrosPorPagina
  );

  // ==================== CARGAR AUXILIARES ====================

  const cargarDatosAuxiliares = async () => {

    try {

      const [c, e, p] = await Promise.all([
        supabase.from("clientes").select("*"),
        supabase.from("empleados").select("*"),
        supabase.from("productos").select("*")
      ]);

      setClientes(c.data || []);
      setEmpleados(e.data || []);
      setProductos(p.data || []);

    } catch (err) {

      console.error(
        "Error cargando auxiliares:",
        err
      );

    }

  };

  // ==================== CARGAR VENTAS ====================

  const cargarVentas = async () => {

    try {

      setCargando(true);

      // ==================== VENTAS ====================

      const {
        data: ventasData,
        error: ventasError
      } = await supabase
        .from("ventas")
        .select("*")
        .order("id_venta", {
          ascending: false
        });

      if (ventasError) throw ventasError;

      // ==================== CLIENTES ====================

      const {
        data: clientesData
      } = await supabase
        .from("clientes")
        .select("*");

      // ==================== EMPLEADOS ====================

      const {
        data: empleadosData
      } = await supabase
        .from("empleados")
        .select("*");

      // ==================== DETALLES ====================

      const {
        data: detallesData
      } = await supabase
        .from("detalle_venta")
        .select("*");

      // ==================== PRODUCTOS ====================

      const {
        data: productosData
      } = await supabase
        .from("productos")
        .select("*");

      // ==================== ARMAR VENTAS ====================

      const ventasCompletas =
        (ventasData || []).map((venta) => {

          const cliente =
            (clientesData || []).find(
              (c) =>
                c.id_cliente ===
                venta.id_cliente
            );

          const empleado =
            (empleadosData || []).find(
              (e) =>
                e.id_empleado ===
                venta.id_empleado
            );

          const detallesVenta =
            (detallesData || [])
              .filter(
                (d) =>
                  d.id_venta ===
                  venta.id_venta
              )
              .map((detalle) => {

                const producto =
                  (productosData || []).find(
                    (p) =>
                      p.id_producto ===
                      detalle.id_producto
                  );

                return {
                  ...detalle,
                  productos:
                    producto || null
                };

              });

          return {
            ...venta,
            clientes:
              cliente || null,
            empleados:
              empleado || null,
            detalle_venta:
              detallesVenta
          };

        });

      setVentas(ventasCompletas);

      setVentasFiltradas(
        ventasCompletas
      );

    } catch (err) {

      console.error(
        "Error al cargar ventas:",
        err
      );

      setToast({
        mostrar: true,
        mensaje:
          "Error al cargar ventas",
        tipo: "error"
      });

    } finally {

      setCargando(false);

    }

  };

  // ==================== EFECTOS ====================

  useEffect(() => {

    cargarVentas();
    cargarDatosAuxiliares();

  }, []);

  useEffect(() => {

    if (ventaAEditar) {

      const cliente = clientes.find(
        (c) =>
          c.id_cliente ===
          ventaAEditar.id_cliente
      );

      const empleado = empleados.find(
        (e) =>
          e.id_empleado ===
          ventaAEditar.id_empleado
      );

      setClienteSeleccionado(
        cliente || null
      );

      setEmpleadoSeleccionado(
        empleado || null
      );

      setMetodoPago(
        ventaAEditar.metodo_pago ||
        "efectivo"
      );

      if (
        ventaAEditar.detalle_venta?.length > 0
      ) {

        const detallesFormateados =
          ventaAEditar.detalle_venta.map(
            (d) => ({
              id_producto:
                d.id_producto,

              nombre_producto:
                d.productos
                  ?.nombre_producto ||
                "Producto",

              precio:
                d.precio,

              cantidad:
                d.cantidad
            })
          );

        setDetalles(
          detallesFormateados
        );

      } else {

        setDetalles([]);

      }

    }

  }, [ventaAEditar,
      clientes,
      empleados]);

  // ==================== TOTAL ====================

  useEffect(() => {

    const total = detalles.reduce(
      (sum, det) =>
        sum +
        (det.cantidad * det.precio),
      0
    );

    setTotalGeneral(total);

  }, [detalles]);

  // ==================== BUSQUEDA ====================

  useEffect(() => {

    if (!textoBusqueda.trim()) {

      setVentasFiltradas(ventas);

    } else {

      const textoLower =
        textoBusqueda.toLowerCase();

      const filtradas =
        ventas.filter((v) =>

          `${v.clientes?.nombre_cliente || ""}`
            .toLowerCase()
            .includes(textoLower)

          ||

          `${v.empleados?.nombre_empleado || ""}`
            .toLowerCase()
            .includes(textoLower)

        );

      setVentasFiltradas(filtradas);

    }

  }, [textoBusqueda, ventas]);

  // ==================== NUEVA VENTA ====================

  const abrirNuevaVenta = () => {

    resetFormulario();
    setMostrarFormulario(true);

  };

  // ==================== EDITAR ====================

  const abrirEdicion = (venta) => {

    setVentaAEditar(venta);
    setMostrarFormulario(true);

  };

  // ==================== RESET ====================

  const resetFormulario = () => {

    setClienteSeleccionado(null);

    setEmpleadoSeleccionado(null);

    setMetodoPago("efectivo");

    setDetalles([]);

    setVentaAEditar(null);

  };

  // ==================== DETALLES ====================

  const agregarDetalle = (
    producto,
    cantidad
  ) => {

    if (!producto || !cantidad)
      return;

    setDetalles((prev) => {

      const existe = prev.find(
        (d) =>
          d.id_producto ===
          producto.id_producto
      );

      if (existe) {

        return prev.map((d) =>
          d.id_producto ===
          producto.id_producto
            ? {
                ...d,
                cantidad:
                  d.cantidad +
                  cantidad
              }
            : d
        );

      }

      return [
        ...prev,
        {
          id_producto:
            producto.id_producto,

          nombre_producto:
            producto.nombre_producto,

          precio:
            producto.precio_venta,

          cantidad
        }
      ];

    });

  };

  const eliminarDetalle = (
    id_producto
  ) => {

    setDetalles((prev) =>
      prev.filter(
        (d) =>
          d.id_producto !==
          id_producto
      )
    );

  };

  const actualizarCantidad = (
    id_producto,
    nuevaCantidad
  ) => {

    if (nuevaCantidad < 1)
      return;

    setDetalles((prev) =>
      prev.map((d) =>
        d.id_producto ===
        id_producto
          ? {
              ...d,
              cantidad:
                nuevaCantidad
            }
          : d
      )
    );

  };

  // ==================== GUARDAR ====================

  const guardarVenta = async () => {

    if (
      !clienteSeleccionado ||
      !empleadoSeleccionado ||
      detalles.length === 0
    ) {

      setToast({
        mostrar: true,
        mensaje:
          "Faltan datos obligatorios",
        tipo: "advertencia"
      });

      return;

    }

    try {

      if (ventaAEditar) {

        const {
          error: updateError
        } = await supabase
          .from("ventas")
          .update({
            id_cliente:
              clienteSeleccionado.id_cliente,

            id_empleado:
              empleadoSeleccionado.id_empleado,

            total:
              totalGeneral
          })
          .eq(
            "id_venta",
            ventaAEditar.id_venta
          );

        if (updateError)
          throw updateError;

        const {
          error: deleteError
        } = await supabase
          .from("detalle_venta")
          .delete()
          .eq(
            "id_venta",
            ventaAEditar.id_venta
          );

        if (deleteError)
          throw deleteError;

        const detallesInsert =
          detalles.map((d) => ({
            id_venta:
              ventaAEditar.id_venta,

            id_producto:
              d.id_producto,

            cantidad:
              d.cantidad,

            precio:
              d.precio,

            subtotal:
              d.cantidad * d.precio
          }));

        const {
          error: detalleError
        } = await supabase
          .from("detalle_venta")
          .insert(detallesInsert);

        if (detalleError)
          throw detalleError;

        setToast({
          mostrar: true,
          mensaje:
            "Venta actualizada exitosamente",
          tipo: "exito"
        });

      } else {

        const {
          data: ventaData,
          error: ventaError
        } = await supabase
          .from("ventas")
          .insert([
            {
              id_cliente:
                clienteSeleccionado.id_cliente,

              id_empleado:
                empleadoSeleccionado.id_empleado,

              total:
                totalGeneral
            }
          ])
          .select()
          .single();

        if (ventaError)
          throw ventaError;

        const detallesInsert =
          detalles.map((d) => ({
            id_venta:
              ventaData.id_venta,

            id_producto:
              d.id_producto,

            cantidad:
              d.cantidad,

            precio:
              d.precio,

            subtotal:
              d.cantidad * d.precio
          }));

        const {
          error: detalleError
        } = await supabase
          .from("detalle_venta")
          .insert(detallesInsert);

        if (detalleError)
          throw detalleError;

        setToast({
          mostrar: true,
          mensaje:
            "Venta registrada exitosamente",
          tipo: "exito"
        });

      }

      resetFormulario();

      setMostrarFormulario(false);

      await cargarVentas();

    } catch (err) {

      console.error(
        "Error al guardar venta:",
        err
      );

      setToast({
        mostrar: true,
        mensaje:
          "Error al guardar la venta",
        tipo: "error"
      });

    }

  };

  // ==================== BUSQUEDA ====================

  const manejarBusqueda = (e) => {

    setTextoBusqueda(
      e.target.value
    );

  };

  // ==================== RETURN ====================

  return (

    <Container
      className="mt-3 p-4 rounded-4 shadow-sm"
    >

      <Row className="align-items-center mb-3">

        <Col xs={8} lg={8}>

          <h3 className="mb-0 fw-bold text-dark">

            <i className="bi bi-receipt-cutoff me-2 text-primary"></i>

            Ventas

          </h3>

        </Col>

        <Col
          xs={4}
          lg={4}
          className="text-end"
        >

          <Button
            onClick={abrirNuevaVenta}
          >

            <i className="bi bi-plus-lg"></i>

            <span className="ms-2">
              Nueva Venta
            </span>

          </Button>

        </Col>

      </Row>

      <hr />

      <Row className="mb-4">

        <Col md={6} lg={5}>

          <CuadroBusquedas
            textoBusqueda={
              textoBusqueda
            }
            manejarCambioBusqueda={
              manejarBusqueda
            }
            placeholder="Buscar por cliente o empleado..."
          />

        </Col>

      </Row>

      {cargando ? (

        <Row className="text-center my-5">

          <Col>

            <Spinner
              animation="border"
              variant="primary"
            />

            <p className="mt-3">
              Cargando ventas...
            </p>

          </Col>

        </Row>

      ) : (

        <Row>

          <Col
            xs={12}
            className="d-lg-none"
          >

            <TarjetaVenta
              ventas={
                ventasPaginadas
              }
              abrirEdicion={
                abrirEdicion
              }
            />

          </Col>

          <Col
            lg={12}
            className="d-none d-lg-block"
          >

            <TablaVentas
              ventas={
                ventasPaginadas
              }
              abrirEdicion={
                abrirEdicion
              }
            />

          </Col>

        </Row>

      )}

      {ventasFiltradas.length > 0 && (

        <Paginacion
          registrosPorPagina={
            registrosPorPagina
          }
          totalRegistros={
            ventasFiltradas.length
          }
          paginaActual={
            paginaActual
          }
          establecerPaginaActual={
            establecerPaginaActual
          }
          establecerRegistrosPorPagina={
            establecerRegistrosPorPagina
          }
        />

      )}

      <FormularioVenta
        show={mostrarFormulario}
        onHide={() => {
          setMostrarFormulario(false);
          resetFormulario();
        }}
        clientes={clientes}
        empleados={empleados}
        productos={productos}
        clienteSeleccionado={
          clienteSeleccionado
        }
        setClienteSeleccionado={
          setClienteSeleccionado
        }
        empleadoSeleccionado={
          empleadoSeleccionado
        }
        setEmpleadoSeleccionado={
          setEmpleadoSeleccionado
        }
        metodoPago={metodoPago}
        setMetodoPago={
          setMetodoPago
        }
        detalles={detalles}
        totalGeneral={totalGeneral}
        agregarDetalle={
          agregarDetalle
        }
        eliminarDetalle={
          eliminarDetalle
        }
        actualizarCantidad={
          actualizarCantidad
        }
        guardarVenta={guardarVenta}
        ventaAEditar={
          ventaAEditar
        }
      />

      <NotificacionOperacion
        mostrar={toast.mostrar}
        mensaje={toast.mensaje}
        tipo={toast.tipo}
        onCerrar={() =>
          setToast({
            ...toast,
            mostrar: false
          })
        }
      />

    </Container>

  );

};

export default Ventas;