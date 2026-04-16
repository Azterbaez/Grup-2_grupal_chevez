import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Spinner } from "react-bootstrap";
import { supabase } from "../../src/assets/database/supabaseconfig";
import ModalRegistroDimTiempo from "../components/Dim_Tiempo/ModalRegistroDimTiempo"; 

import NotificacionOperacion from "../components/NotificacionOperacion";
import TablaDimTiempo from "../components/Dim_Tiempo/TablaDimTiempo";

const Tiempo = () => {


  const [toast, setToast] = useState({
    mostrar: false,
    mensaje: "",
    tipo: "",
  });

  const [tiempos, setTiempos] = useState([]);
  const [cargando, setCargando] = useState(true);

  const [mostrarModal, setMostrarModal] = useState(false);

  const [nuevoTiempo, setNuevoTiempo] = useState({
    fecha: "",
    mes: "",
    anio: "",
  });


  const cargarTiempos = async () => {
    try {
      setCargando(true);

      const { data, error } = await supabase
        .from("Dim_Tiempo")
        .select("*")
        .order("id_tiempo", { ascending: true });

      if (error) {
        setToast({
          mostrar: true,
          mensaje: "Error al cargar fechas.",
          tipo: "error",
        });
        return;
      }

      setTiempos(data || []);
    } catch (err) {
      setToast({
        mostrar: true,
        mensaje: "Error inesperado.",
        tipo: "error",
      });
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarTiempos();
  }, []);

  const manejoCambioInput = (e) => {
    const { name, value } = e.target;
    setNuevoTiempo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  const agregarTiempo = async () => {
    try {
      if (!nuevoTiempo.fecha || !nuevoTiempo.mes || !nuevoTiempo.anio) {
        setToast({
          mostrar: true,
          mensaje: "Debe llenar todos los campos.",
          tipo: "advertencia",
        });
        return;
      }

      const { error } = await supabase.from("Dim_Tiempo").insert([
        {
          fecha: nuevoTiempo.fecha,
          mes: nuevoTiempo.mes,
          anio: parseInt(nuevoTiempo.anio),
        },
      ]);

      if (error) {
        setToast({
          mostrar: true,
          mensaje: "Error al registrar fecha.",
          tipo: "error",
        });
        return;
      }

      setToast({
        mostrar: true,
        mensaje: "Fecha registrada correctamente.",
        tipo: "exito",
      });

      setNuevoTiempo({
        fecha: "",
        mes: "",
        anio: "",
      });

      setMostrarModal(false);
      cargarTiempos();
    } catch (err) {
      setToast({
        mostrar: true,
        mensaje: "Error inesperado.",
        tipo: "error",
      });
    }
  };

  return (
    <Container className="mt-3">
      
      {/* Encabezado */}
      <Row className="align-items-center mb-3">
        <Col>
          <h3>
            <i className="bi bi-calendar-event me-2"></i> Tiempo
          </h3>
        </Col>

        <Col className="text-end">
          <Button onClick={() => setMostrarModal(true)}>
            <i className="bi bi-plus-lg"></i>
            <span className="ms-2">Nueva Fecha</span>
          </Button>
        </Col>
      </Row>

      <hr />

      {/* Cargando */}
      {cargando && (
        <Row className="text-center my-5">
          <Col>
            <Spinner animation="border" variant="success" />
            <p>Cargando fechas...</p>
          </Col>
        </Row>
      )}

      {/* Tabla */}
      {!cargando && tiempos.length > 0 && (
        <Row>
          <Col>
            <TablaTiempo tiempos={tiempos} />
          </Col>
        </Row>
      )}

      {/* Modal */}
      <ModalRegistroDimTiempo
        mostrarModal={mostrarModal}
        setMostrarModal={setMostrarModal}
        nuevoTiempo={nuevoTiempo}
        manejoCambioInput={manejoCambioInput}
        agregarTiempo={agregarTiempo}
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

export default Tiempo;