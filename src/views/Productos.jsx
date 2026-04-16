import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button , Spinner} from "react-bootstrap";
import { supabase } from "../../src/assets/database/supabaseconfig";
import ModalRegistroProducto from "../components/productos/ModalRegistroProducto";

import NotificacionOperacion from "../components/NotificacionOperacion";
import TablaProducto from "../components/productos/TablaProducto";
// finalizado //
const Productos = () => {
  // 🔔 Notificaciones
  const [toast, setToast] = useState({
    mostrar: false,
    mensaje: "",
    tipo: "",
  });

  // 📦 Datos
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);

  // 🪟 Modales
  const [mostrarModal, setMostrarModal] = useState(false);
  const [mostrarModalEdicion, setMostrarModalEdicion] = useState(false);
  const [mostrarModalEliminacion, setMostrarModalEliminacion] = useState(false);

  // 🧠 Estados auxiliares
  const [productoEditar, setProductoEditar] = useState(null);
  const [productoAEliminar, setProductoAEliminar] = useState(null);

  // 🆕 Nuevo producto
  const [nuevoProducto, setNuevoProducto] = useState({
    nombre: "",
    categoria: "",
    precio: "",
  });

  // 📥 Cargar productos
  const cargarProductos = async () => {
    try {
      setCargando(true);

      const { data, error } = await supabase
        .from("Dim_Producto")
        .select("*")
        .order("id_producto", { ascending: true });

      if (error) {
        console.error("Error al cargar productos:", error.message);
        setToast({
          mostrar: true,
          mensaje: "Error al cargar productos.",
          tipo: "error",
        });
        return;
      }

      setProductos(data || []);
    } catch (err) {
      console.error("Excepción al cargar productos:", err.message);
      setToast({
        mostrar: true,
        mensaje: "Error inesperado al cargar productos.",
        tipo: "error",
      });
    } finally {
      setCargando(false);
    }
  };

  // 🔄 Ejecutar al iniciar
  useEffect(() => {
    cargarProductos();
  }, []);

  // ✏️ Abrir edición
  const abrirModalEdicion = (producto) => {
    setProductoEditar(producto);
    setMostrarModalEdicion(true);
  };

  // 🗑️ Abrir eliminación
  const abrirModalEliminacion = (producto) => {
    setProductoAEliminar(producto);
    setMostrarModalEliminacion(true);
  };

  // ⌨️ Inputs
  const manejoCambioInput = (e) => {
    const { name, value } = e.target;
    setNuevoProducto((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ➕ Agregar producto
  const agregarProducto = async () => {
    try {
      if (
        !nuevoProducto.nombre.trim() ||
        !nuevoProducto.categoria.trim() ||
        !nuevoProducto.precio
      ) {
        setToast({
          mostrar: true,
          mensaje: "Debe llenar todos los campos.",
          tipo: "advertencia",
        });
        return;
      }

      const { error } = await supabase.from("Dim_Producto").insert([
        {
          nombre: nuevoProducto.nombre,
          categoria: nuevoProducto.categoria,
          precio: parseFloat(nuevoProducto.precio),
        },
      ]);

      if (error) {
        console.error("Error al agregar producto:", error.message);
        setToast({
          mostrar: true,
          mensaje: "Error al registrar producto.",
          tipo: "error",
        });
        return;
      }

      setToast({
        mostrar: true,
        mensaje: `Producto "${nuevoProducto.nombre}" registrado exitosamente.`,
        tipo: "exito",
      });

      setNuevoProducto({
        nombre: "",
        categoria: "",
        precio: "",
      });

      setMostrarModal(false);
      cargarProductos(); // 🔥 refresca la tabla
    } catch (err) {
      console.error("Excepción al agregar producto:", err.message);
      setToast({
        mostrar: true,
        mensaje: "Error inesperado al registrar producto.",
        tipo: "error",
      });
    }
  };

  return (
    <Container className="mt-3">
      {/* Encabezado */}
      <Row className="align-items-center mb-3">
        <Col>
          <h3 className="mb-0">
            <i className="bi bi-box-seam me-2"></i> Productos
          </h3>
        </Col>

        <Col className="text-end">
          <Button onClick={() => setMostrarModal(true)}>
            <i className="bi bi-plus-lg"></i>
            <span className="ms-2">Nuevo Producto</span>
          </Button>
        </Col>
      </Row>

      <hr />

      {/* Cargando */}
      {cargando && (
        <Row className="text-center my-5">
          <Col>
            <Spinner animation="border" variant="success" />
            <p className="mt-3 text-muted">Cargando productos...</p>
          </Col>
        </Row>
      )}

      {/* Tabla */}
      {!cargando && productos.length > 0 && (
        <Row>
          <Col lg={12}>
            <TablaProducto
              productos={productos}
              abrirModalEdicion={abrirModalEdicion}
              abrirModalEliminacion={abrirModalEliminacion}
            />
          </Col>
        </Row>
      )}

      {/* Modal registro */}
      <ModalRegistroProducto
        mostrarModal={mostrarModal}
        setMostrarModal={setMostrarModal}
        nuevoProducto={nuevoProducto}
        manejoCambioInput={manejoCambioInput}
        agregarProducto={agregarProducto}
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

export default Productos;