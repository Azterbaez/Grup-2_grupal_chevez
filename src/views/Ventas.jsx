import { useState, useEffect } from "react";
import { Container, Row, Col, Button, Table, Spinner, Card, Badge } from "react-bootstrap";

import { supabase } from "../database/supabaseconfig";

import ModalRegistroVenta from "../components/Venta/ModalRegistroVenta";
import ModalEditarVenta from "../components/Venta/ModalEditarVenta";
import ModalEliminarVenta from "../components/Venta/ModalEliminarVenta";
import NotificacionOperacion from "../components/NotificacionOperacion";

const Ventas = () => {
  const [ventas, setVentas] = useState([]);
  const [cargando, setCargando] = useState(true);

  const [mostrarRegistro, setMostrarRegistro] = useState(false);
  const [mostrarEditar, setMostrarEditar] = useState(false);
  const [mostrarEliminar, setMostrarEliminar] = useState(false);

  const [ventaSeleccionada, setVentaSeleccionada] = useState(null);

  const [toast, setToast] = useState({
    mostrar: false,
    mensaje: "",
    tipo: "",
  });

  useEffect(() => {
    cargarVentas();
  }, []);


  const cargarVentas = async () => {
    try {
      setCargando(true);

      const { data, error } = await supabase
        .from("ventas")
        .select(`
          *,
          productos (
            id_producto,
            nombre_producto,
            categoria_producto,
            url_imagen
          )
        `)
        .order("id_venta", { ascending: false });

      if (error) throw error;

      setVentas(data || []);
    } catch (error) {
      console.error("Error al cargar ventas:", error);

      setToast({
        mostrar: true,
        mensaje: "Error al cargar ventas",
        tipo: "error",
      });
    } finally {
      setCargando(false);
    }
  };


  const eliminarVenta = async () => {
    try {
      if (!ventaSeleccionada) return;

      const { error } = await supabase
        .from("ventas")
        .delete()
        .eq("id_venta", ventaSeleccionada.id_venta);

      if (error) throw error;

      setMostrarEliminar(false);

      setToast({
        mostrar: true,
        mensaje: "Venta eliminada correctamente",
        tipo: "exito",
      });

      cargarVentas();
    } catch (error) {
      console.error("Error al eliminar venta:", error);

      setToast({
        mostrar: true,
        mensaje: "Error al eliminar venta",
        tipo: "error",
      });
    }
  };

  return (
    <Container className="mt-3">

      {/* ENCABEZADO */}

      <Row className="align-items-center mb-4">

        <Col>
          <h3 className="mb-0">
            <i className="bi bi-cart-check me-2"></i>
            Gestión de Ventas
          </h3>
        </Col>

        <Col className="text-end">
          <Button
            variant="success"
            onClick={() => setMostrarRegistro(true)}
          >
            <i className="bi bi-plus-lg"></i>
            <span className="ms-2">
              Nueva Venta
            </span>
          </Button>
        </Col>

      </Row>

      <hr />

      {/* LOADING */}

      {cargando && (

        <Row className="text-center my-5">

          <Col>

            <Spinner
              animation="border"
              variant="success"
            />

            <p className="mt-3 text-muted">
              Cargando ventas...
            </p>

          </Col>

        </Row>

      )}

      {/* TABLA */}

      {!cargando && ventas.length > 0 && (

        <Row>

          <Col xs={12} className="d-none d-lg-block">

            <Card className="shadow-sm border-0">

              <Table hover responsive className="mb-0 align-middle">

                <thead className="table-dark">

                  <tr>
                    <th>ID</th>
                    <th>Imagen</th>
                    <th>Producto</th>
                    <th>Categoría</th>
                    <th>Cantidad</th>
                    <th>Total</th>
                    <th className="text-center">
                      Acciones
                    </th>
                  </tr>

                </thead>

                <tbody>

                  {ventas.map((venta) => (

                    <tr key={venta.id_venta}>

                      <td>
                        #{venta.id_venta}
                      </td>

                      <td>

                        {venta.productos?.url_imagen ? (

                          <img
                            src={venta.productos.url_imagen}
                            alt={venta.productos.nombre_producto}
                            style={{
                              width: "60px",
                              height: "60px",
                              objectFit: "cover",
                              borderRadius: "10px",
                            }}
                          />

                        ) : (

                          <div
                            className="bg-light d-flex align-items-center justify-content-center"
                            style={{
                              width: "60px",
                              height: "60px",
                              borderRadius: "10px",
                            }}
                          >
                            📦
                          </div>

                        )}

                      </td>

                      <td className="fw-semibold">
                        {venta.productos?.nombre_producto}
                      </td>

                      <td>

                        <Badge bg="secondary">
                          {venta.productos?.categoria_producto}
                        </Badge>

                      </td>

                      <td>
                        {venta.cantidad}
                      </td>

                      <td className="fw-bold text-success">
                        C$ {parseFloat(venta.total).toFixed(2)}
                      </td>

                      <td className="text-center">

                        <Button
                          size="sm"
                          variant="warning"
                          className="me-2"
                          onClick={() => {
                            setVentaSeleccionada(venta);
                            setMostrarEditar(true);
                          }}
                        >
                          ✏️
                        </Button>

                        <Button
                          size="sm"
                          variant="danger"
                          onClick={() => {
                            setVentaSeleccionada(venta);
                            setMostrarEliminar(true);
                          }}
                        >
                          🗑️
                        </Button>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </Table>

            </Card>

          </Col>

          {/* MOBILE */}

          <Col xs={12} className="d-lg-none">

            <Row className="g-3">

              {ventas.map((venta) => (

                <Col xs={12} key={venta.id_venta}>

                  <Card className="shadow-sm border-0">

                    <Card.Body>

                      <div className="d-flex gap-3">

                        {venta.productos?.url_imagen ? (

                          <img
                            src={venta.productos.url_imagen}
                            alt={venta.productos.nombre_producto}
                            style={{
                              width: "80px",
                              height: "80px",
                              objectFit: "cover",
                              borderRadius: "10px",
                            }}
                          />

                        ) : (

                          <div
                            className="bg-light d-flex align-items-center justify-content-center"
                            style={{
                              width: "80px",
                              height: "80px",
                              borderRadius: "10px",
                            }}
                          >
                            📦
                          </div>

                        )}

                        <div className="flex-grow-1">

                          <h5>
                            {venta.productos?.nombre_producto}
                          </h5>

                          <Badge bg="secondary" className="mb-2">
                            {venta.productos?.categoria_producto}
                          </Badge>

                          <p className="mb-1">
                            <strong>Cantidad:</strong>{" "}
                            {venta.cantidad}
                          </p>

                          <p className="fw-bold text-success">
                            C$ {parseFloat(venta.total).toFixed(2)}
                          </p>

                          <div className="d-flex gap-2">

                            <Button
                              size="sm"
                              variant="warning"
                              className="w-50"
                              onClick={() => {
                                setVentaSeleccionada(venta);
                                setMostrarEditar(true);
                              }}
                            >
                              Editar
                            </Button>

                            <Button
                              size="sm"
                              variant="danger"
                              className="w-50"
                              onClick={() => {
                                setVentaSeleccionada(venta);
                                setMostrarEliminar(true);
                              }}
                            >
                              Eliminar
                            </Button>

                          </div>

                        </div>

                      </div>

                    </Card.Body>

                  </Card>

                </Col>

              ))}

            </Row>

          </Col>

        </Row>

      )}

      {/* SIN DATOS */}

      {!cargando && ventas.length === 0 && (

        <Row className="text-center my-5">

          <Col>

            <h4>
              No hay ventas registradas
            </h4>

            <p className="text-muted">
              Registra una nueva venta
            </p>

          </Col>

        </Row>

      )}

      {/* MODALES */}

      <ModalRegistroVenta
        mostrarModal={mostrarRegistro}
        setMostrarModal={setMostrarRegistro}
        cargarVentas={cargarVentas}
      />

      <ModalEditarVenta
        mostrarModal={mostrarEditar}
        setMostrarModal={setMostrarEditar}
        ventaSeleccionada={ventaSeleccionada}
        cargarVentas={cargarVentas}
      />

      <ModalEliminarVenta
        mostrarModal={mostrarEliminar}
        setMostrarModal={setMostrarEliminar}
        eliminarVenta={eliminarVenta}
        venta={ventaSeleccionada}
      />

      {/* TOAST */}

      <NotificacionOperacion
        mostrar={toast.mostrar}
        mensaje={toast.mensaje}
        tipo={toast.tipo}
        onCerrar={() =>
          setToast({
            ...toast,
            mostrar: false,
          })
        }
      />

    </Container>
  );
};

export default Ventas;