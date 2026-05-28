import { useState, useEffect } from "react";
import {
  Modal,
  Button,
  Form,
  Spinner,
  Row,
  Col,
  Image,
  Alert,
  Card,
  Badge,
  ListGroup
} from "react-bootstrap";

import { supabase } from "../../database/supabaseconfig";

const ModalRegistroVenta = ({
  show,
  onHide,
  onSuccess
}) => {

  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState("");

  const [items, setItems] = useState([
    {
      id_producto: "",
      cantidad: 1,
      precio: 0,
      total: 0
    }
  ]);

  useEffect(() => {

    if (show) {
      cargarProductos();
    }

  }, [show]);

  const cargarProductos = async () => {

    try {

      const { data, error } = await supabase
        .from("productos")
        .select("*")
        .order("nombre_producto", { ascending: true });

      if (error) throw error;

      setProductos(data || []);

    } catch (error) {

      console.error("Error productos:", error);
    }
  };

  const handleProducto = (index, e) => {

    const id = e.target.value;

    const producto = productos.find(
      (p) => String(p.id_producto) === String(id)
    );

    const precio = parseFloat(producto?.precio_venta || 0);

    const nuevosItems = [...items];

    nuevosItems[index] = {
      ...nuevosItems[index],
      id_producto: id,
      precio,
      total: precio * nuevosItems[index].cantidad
    };

    setItems(nuevosItems);
  };

  const handleCantidad = (index, e) => {

    const cantidad = parseInt(e.target.value) || 1;

    const nuevosItems = [...items];

    nuevosItems[index] = {
      ...nuevosItems[index],
      cantidad,
      total: cantidad * nuevosItems[index].precio
    };

    setItems(nuevosItems);
  };

  const agregarProducto = () => {

    setItems([
      ...items,
      {
        id_producto: "",
        cantidad: 1,
        precio: 0,
        total: 0
      }
    ]);
  };

  const eliminarProducto = (index) => {

    const nuevosItems = items.filter((_, i) => i !== index);

    setItems(nuevosItems);
  };

  const totalGeneral = items.reduce(
    (acc, item) => acc + item.total,
    0
  );

  const guardar = async () => {

    try {

      setFormError("");

      const itemsValidos = items.filter(
        (item) => item.id_producto
      );

      if (itemsValidos.length === 0) {

        setFormError("Debes seleccionar al menos un producto");
        return;
      }

      setLoading(true);

      for (const item of itemsValidos) {

        const producto = productos.find(
          (p) =>
            String(p.id_producto) ===
            String(item.id_producto)
        );

        if ((producto?.stock || 0) < item.cantidad) {

          setFormError(
            `Stock insuficiente para ${producto?.nombre_producto}`
          );

          setLoading(false);
          return;
        }

        const { error } = await supabase
          .from("ventas")
          .insert([
            {
              id_producto: item.id_producto,
              cantidad: item.cantidad,
              total: item.total
            }
          ]);

        if (error) {

          console.error("Error insertando venta:", error);

          setFormError(error.message);

          setLoading(false);
          return;
        }

        const nuevoStock =
          (producto.stock || 0) - item.cantidad;

        const { error: stockError } = await supabase
          .from("productos")
          .update({
            stock: nuevoStock
          })
          .eq("id_producto", item.id_producto);

        if (stockError) {

          console.error(
            "Error actualizando stock:",
            stockError
          );
        }
      }

      setItems([
        {
          id_producto: "",
          cantidad: 1,
          precio: 0,
          total: 0
        }
      ]);

      onHide();
      onSuccess();

    } catch (error) {

      console.error(error);

      setFormError("Error al registrar venta");

    } finally {

      setLoading(false);
    }
  };

  return (

    <Modal
      show={show}
      onHide={onHide}
      centered
      size="xl"
      backdrop="static"
    >

      <Modal.Header
        closeButton
        className="border-0"
        style={{
          background:
            "linear-gradient(135deg, #0f172a, #1e40af)",
          color: "#fff",
          borderRadius: "18px 18px 0 0"
        }}
      >

        <Modal.Title className="fw-bold fs-4">
          <i className="bi bi-cart-check-fill me-2"></i>
          Nueva Venta
        </Modal.Title>

      </Modal.Header>

      <Modal.Body
        style={{
          background: "#f4f7fb",
          padding: "25px"
        }}
      >

        {formError && (

          <Alert
            variant="danger"
            className="border-0 shadow-sm rounded-4"
          >
            <i className="bi bi-exclamation-triangle me-2"></i>
            {formError}
          </Alert>

        )}

        <Row className="g-4">

          {/* IZQUIERDA */}

          <Col lg={8}>

            <Card
              className="border-0 shadow-sm"
              style={{
                borderRadius: "18px"
              }}
            >

              <Card.Body className="p-4">

                <div className="d-flex justify-content-between align-items-center mb-4">

                  <h5
                    className="fw-bold mb-0"
                    style={{
                      color: "#1e3a8a"
                    }}
                  >
                    Productos Agregados
                  </h5>

                  <Button
                    onClick={agregarProducto}
                    style={{
                      borderRadius: "12px",
                      border: "none",
                      padding: "10px 18px",
                      background:
                        "linear-gradient(135deg, #2563eb, #1d4ed8)"
                    }}
                  >
                    <i className="bi bi-plus-circle me-2"></i>
                    Agregar Producto
                  </Button>

                </div>

                <div
                  style={{
                    maxHeight: "500px",
                    overflowY: "auto"
                  }}
                >

                  {items.map((item, index) => {

                    const producto = productos.find(
                      (p) =>
                        String(p.id_producto) ===
                        String(item.id_producto)
                    );

                    return (

                      <Card
                        key={index}
                        className="border-0 shadow-sm mb-4"
                        style={{
                          borderRadius: "18px"
                        }}
                      >

                        <Card.Body>

                          <Row className="align-items-center g-4">

                            {/* IMAGEN */}

                            <Col md={3} className="text-center">

                              <div
                                className="mx-auto overflow-hidden"
                                style={{
                                  width: "110px",
                                  height: "110px",
                                  borderRadius: "16px",
                                  background: "#f1f5f9"
                                }}
                              >

                                {producto?.url_imagen ? (

                                  <Image
                                    src={producto.url_imagen}
                                    fluid
                                    style={{
                                      width: "100%",
                                      height: "100%",
                                      objectFit: "cover"
                                    }}
                                  />

                                ) : (

                                  <div className="d-flex justify-content-center align-items-center h-100">

                                    <i
                                      className="bi bi-box-seam"
                                      style={{
                                        fontSize: "45px",
                                        color: "#94a3b8"
                                      }}
                                    ></i>

                                  </div>

                                )}

                              </div>

                            </Col>

                            {/* FORM */}

                            <Col md={9}>

                              <Row className="g-3">

                                <Col md={6}>

                                  <Form.Label className="fw-semibold text-secondary">
                                    Producto
                                  </Form.Label>

                                  <Form.Select
                                    value={item.id_producto}
                                    onChange={(e) =>
                                      handleProducto(index, e)
                                    }
                                    style={{
                                      borderRadius: "12px",
                                      padding: "12px",
                                      border: "1px solid #dbe3ef"
                                    }}
                                  >

                                    <option value="">
                                      Selecciona producto
                                    </option>

                                    {productos.map((p) => (

                                      <option
                                        key={p.id_producto}
                                        value={p.id_producto}
                                      >
                                        {p.nombre_producto}
                                      </option>

                                    ))}

                                  </Form.Select>

                                </Col>

                                <Col md={3}>

                                  <Form.Label className="fw-semibold text-secondary">
                                    Cantidad
                                  </Form.Label>

                                  <Form.Control
                                    type="number"
                                    min="1"
                                    value={item.cantidad}
                                    onChange={(e) =>
                                      handleCantidad(index, e)
                                    }
                                    style={{
                                      borderRadius: "12px",
                                      padding: "12px",
                                      border: "1px solid #dbe3ef"
                                    }}
                                  />

                                </Col>

                                <Col md={3}>

                                  <Form.Label className="fw-semibold text-secondary">
                                    Subtotal
                                  </Form.Label>

                                  <Form.Control
                                    value={`C$ ${item.total.toFixed(2)}`}
                                    disabled
                                    className="fw-bold text-success"
                                    style={{
                                      borderRadius: "12px",
                                      padding: "12px",
                                      background: "#f8fafc"
                                    }}
                                  />

                                </Col>

                              </Row>

                              <div className="d-flex justify-content-between align-items-center mt-4 flex-wrap gap-2">

                                <div className="d-flex gap-2 flex-wrap">

                                  <Badge
                                    bg="primary"
                                    className="px-3 py-2 rounded-pill"
                                  >
                                    Precio: C$ {item.precio.toFixed(2)}
                                  </Badge>

                                  <Badge
                                    bg="success"
                                    className="px-3 py-2 rounded-pill"
                                  >
                                    Stock: {producto?.stock || 0}
                                  </Badge>

                                </div>

                                {items.length > 1 && (

                                  <Button
                                    variant="outline-danger"
                                    size="sm"
                                    style={{
                                      borderRadius: "10px"
                                    }}
                                    onClick={() =>
                                      eliminarProducto(index)
                                    }
                                  >
                                    <i className="bi bi-trash me-1"></i>
                                    Eliminar
                                  </Button>

                                )}

                              </div>

                            </Col>

                          </Row>

                        </Card.Body>

                      </Card>

                    );
                  })}

                </div>

              </Card.Body>

            </Card>

          </Col>

          {/* DERECHA */}

          <Col lg={4}>

            <Card
              className="border-0 shadow-sm sticky-top"
              style={{
                borderRadius: "18px"
              }}
            >

              <Card.Header
                className="border-0 py-4"
                style={{
                  background:
                    "linear-gradient(135deg, #1e293b, #334155)",
                  color: "#fff",
                  borderRadius: "18px 18px 0 0"
                }}
              >

                <h5 className="fw-bold mb-0">
                  <i className="bi bi-receipt me-2"></i>
                  Resumen de Venta
                </h5>

              </Card.Header>

              <Card.Body className="p-4">

                <ListGroup variant="flush">

                  <ListGroup.Item className="px-0 d-flex justify-content-between border-0">

                    <span className="text-muted">
                      Productos agregados
                    </span>

                    <span className="fw-bold">
                      {items.length}
                    </span>

                  </ListGroup.Item>

                  <ListGroup.Item className="px-0 d-flex justify-content-between border-0">

                    <span className="text-muted">
                      Total General
                    </span>

                    <span
                      className="fw-bold"
                      style={{
                        color: "#16a34a",
                        fontSize: "24px"
                      }}
                    >
                      C$ {totalGeneral.toFixed(2)}
                    </span>

                  </ListGroup.Item>

                </ListGroup>

                <Button
                  onClick={guardar}
                  disabled={loading}
                  className="w-100 mt-4 fw-bold border-0"
                  style={{
                    borderRadius: "14px",
                    padding: "14px",
                    background:
                      "linear-gradient(135deg, #16a34a, #22c55e)"
                  }}
                >

                  {loading ? (

                    <>
                      <Spinner
                        animation="border"
                        size="sm"
                        className="me-2"
                      />
                      Guardando...
                    </>

                  ) : (

                    <>
                      <i className="bi bi-check-circle me-2"></i>
                      Guardar Venta
                    </>

                  )}

                </Button>

              </Card.Body>

            </Card>

          </Col>

        </Row>

      </Modal.Body>

    </Modal>
  );
};

export default ModalRegistroVenta;