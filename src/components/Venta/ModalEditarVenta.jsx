import { useState, useEffect } from "react";
import {
  Modal,
  Button,
  Form,
  Row,
  Col,
  Image,
  Card,
  Badge,
  Spinner,
} from "react-bootstrap";

import { supabase } from "../../database/supabaseconfig";

const ModalEditarVenta = ({
  mostrarModal,
  setMostrarModal,
  ventaSeleccionada,
  cargarVentas,
}) => {

  const [formulario, setFormulario] = useState({
    cantidad: "",
    total: "",
  });

  const [cargando, setCargando] = useState(false);

  useEffect(() => {

    if (ventaSeleccionada) {

      setFormulario({
        cantidad: ventaSeleccionada.cantidad || "",
        total: ventaSeleccionada.total || "",
      });

    }

  }, [ventaSeleccionada]);

  // ==========================
  // CAMBIO CANTIDAD
  // ==========================

  const manejarCantidad = (e) => {

    const cantidad = parseInt(e.target.value) || 1;

    const precioUnitario =
      ventaSeleccionada.total / ventaSeleccionada.cantidad;

    setFormulario({
      cantidad,
      total: cantidad * precioUnitario,
    });

  };

  // ==========================
  // ACTUALIZAR
  // ==========================

  const actualizarVenta = async () => {

    try {

      setCargando(true);

      const { error } = await supabase
        .from("ventas")
        .update({
          cantidad: formulario.cantidad,
          total: formulario.total,
        })
        .eq("id_venta", ventaSeleccionada.id_venta);

      if (error) throw error;

      setMostrarModal(false);

      cargarVentas();

    } catch (error) {

      console.error(
        "Error al actualizar venta:",
        error
      );

    } finally {

      setCargando(false);

    }

  };

  if (!ventaSeleccionada) return null;

  return (

    <Modal
      show={mostrarModal}
      onHide={() => setMostrarModal(false)}
      centered
      size="lg"
    >

      <Modal.Header
        closeButton
        className="border-0 pb-0"
      >

        <Modal.Title className="fw-bold text-success">
          <i className="bi bi-pencil-square me-2"></i>
          Editar Venta
        </Modal.Title>

      </Modal.Header>

      <Modal.Body className="pt-2">

        <Row className="g-4">

          {/* IMAGEN */}

          <Col md={5}>

            <Card className="border-0 shadow-sm rounded-4 overflow-hidden">

              <div
                className="bg-light d-flex align-items-center justify-content-center"
                style={{
                  height: "300px",
                }}
              >

                {ventaSeleccionada.productos?.url_imagen ? (

                  <Image
                    src={
                      ventaSeleccionada.productos.url_imagen
                    }
                    fluid
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />

                ) : (

                  <div className="text-center">

                    <i
                      className="bi bi-image text-muted"
                      style={{
                        fontSize: "5rem",
                      }}
                    ></i>

                    <p className="text-muted mt-2">
                      Sin imagen
                    </p>

                  </div>

                )}

              </div>

              <Card.Body>

                <h5 className="fw-bold mb-2">
                  {
                    ventaSeleccionada.productos
                      ?.nombre_producto
                  }
                </h5>

                <Badge bg="success">
                  Venta activa
                </Badge>

              </Card.Body>

            </Card>

          </Col>

          {/* FORMULARIO */}

          <Col md={7}>

            <Card className="border-0 shadow-sm rounded-4">

              <Card.Body>

                <Form>

                  {/* PRODUCTO */}

                  <Form.Group className="mb-4">

                    <Form.Label className="fw-semibold">
                      Producto
                    </Form.Label>

                    <Form.Control
                      type="text"
                      value={
                        ventaSeleccionada.productos
                          ?.nombre_producto || ""
                      }
                      disabled
                      size="lg"
                      className="bg-light shadow-sm"
                    />

                  </Form.Group>

                  {/* CANTIDAD */}

                  <Form.Group className="mb-4">

                    <Form.Label className="fw-semibold">
                      Cantidad
                    </Form.Label>

                    <Form.Control
                      type="number"
                      min={1}
                      value={formulario.cantidad}
                      onChange={manejarCantidad}
                      size="lg"
                      className="shadow-sm"
                    />

                  </Form.Group>

                  {/* TOTAL */}

                  <Form.Group>

                    <Form.Label className="fw-semibold">
                      Total
                    </Form.Label>

                    <Form.Control
                      type="text"
                      value={`C$ ${parseFloat(
                        formulario.total || 0
                      ).toFixed(2)}`}
                      disabled
                      size="lg"
                      className="fw-bold text-success bg-light shadow-sm"
                    />

                  </Form.Group>

                </Form>

              </Card.Body>

            </Card>

          </Col>

        </Row>

      </Modal.Body>

      <Modal.Footer className="border-0 pt-0">

        <Button
          variant="outline-secondary"
          onClick={() => setMostrarModal(false)}
        >
          Cancelar
        </Button>

        <Button
          variant="success"
          onClick={actualizarVenta}
          disabled={cargando}
          className="px-4"
        >

          {cargando ? (

            <>
              <Spinner
                animation="border"
                size="sm"
                className="me-2"
              />

              Actualizando...

            </>

          ) : (

            <>
              <i className="bi bi-check-circle me-2"></i>
              Actualizar
            </>

          )}

        </Button>

      </Modal.Footer>

    </Modal>

  );

};

export default ModalEditarVenta;