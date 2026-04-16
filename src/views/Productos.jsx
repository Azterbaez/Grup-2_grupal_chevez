import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { supabase } from "../../src/assets/database/supabaseconfig";

import ModalRegistroProducto from "../components/productos/ModalRegistroProducto";
import NotificacionOperacion from "../components/NotificacionOperacion";

const Productos = () => {
  const [toast, setToast] = useState({
    mostrar: false,
    mensaje: "",
    tipo: "",
  });

  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);

  const [mostrarModal, setMostrarModal] = useState(false);

  const [nuevoProducto, setNuevoProducto] = useState({
    nombre: "",
    categoria: "",
    precio: "",
  });

  // Manejo de inputs
  const manejoCambioInput = (e) => {
    const { name, value } = e.target;
    setNuevoProducto((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Agregar producto
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

      // Éxito
      setToast({
        mostrar: true,
        mensaje: `Producto "${nuevoProducto.nombre}" registrado exitosamente.`,
        tipo: "exito",
      });

      // Limpiar formulario
      setNuevoProducto({
        nombre: "",
        categoria: "",
        precio: "",
      });

      setMostrarModal(false);
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
      <Row className="align-items-center mb-3">
        <Col className="d-flex align-items-center">
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

      {/* Modal */}
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