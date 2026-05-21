import { useState, useEffect } from "react";
import {
  Modal,
  Button,
  Form,
  Row,
  Col,
  Image,
  Badge
} from "react-bootstrap";

import { supabase } from "../../database/supabaseconfig";

const ModalEditarVenta = ({ show, onHide, venta, onSuccess }) => {

  const [form, setForm] = useState({});
  const [productos, setProductos] = useState([]);

  useEffect(() => {

    setForm(venta || {});

    cargarProductos();

  }, [venta]);

  const cargarProductos = async () => {

    const { data, error } = await supabase
      .from("productos")
      .select("*")
      .order("nombre_producto", { ascending: true });

    if (error) {
      console.log("Error productos:", error);
      return;
    }

    setProductos(data || []);
  };

  const handleProducto = (e) => {

    const id = parseInt(e.target.value);

    const producto = productos.find(
      (p) => p.id_producto === id
    );

    const precio = parseFloat(producto?.precio_venta || 0);

    setForm({
      ...form,
      id_producto: id,
      productos: producto,
      cantidad: form.cantidad || 1,
      total: (form.cantidad || 1) * precio
    });
  };

  const handleCantidad = (e) => {

    const cantidad = parseInt(e.target.value) || 1;

    const precio = form.productos?.precio_venta || 0;

    setForm({
      ...form,
      cantidad,
      total: cantidad * precio
    });
  };

  const actualizar = async () => {

    const { error } = await supabase
      .from("ventas")
      .update({
        id_producto: form.id_producto,
        cantidad: form.cantidad,
        total: form.total
      })
      .eq("id_venta", venta.id_venta);

    if (error) {
      console.log("Error actualizando venta:", error);
      return;
    }

    onHide();
    onSuccess();
  };

  if (!venta) return null;

  return (

    <Modal
      show={show}
      onHide={onHide}
      centered
      size="lg"
    >

      <Modal.Header
        closeButton
        className="border-0 pb-0"
      >

        <Modal.Title className="fw-bold fs-3">
          ✏️ Editar Venta
        </Modal.Title>

      </Modal.Header>

      <Modal.Body className="pt-2">

        <Row className="g-4 align-items-center">

          {/* IMAGEN */}

          <Col md={5}>

            <div
              className="border rounded-4 overflow-hidden shadow-sm bg-light mx-auto"
              style={{
                width: "240px",
                height: "240px"
              }}
            >

              {form.productos?.url_imagen ? (

                <Image
                  src={form.productos.url_imagen}
                  fluid
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover"
                  }}
                />

              ) : (

                <div className="d-flex align-items-center justify-content-center h-100">

                  <span style={{ fontSize: "5rem" }}>
                    📦
                  </span>

                </div>

              )}

            </div>

          </Col>

          {/* FORMULARIO */}

          <Col md={7}>

            <div className="bg-light rounded-4 p-4 shadow-sm">

              <Form>

                {/* PRODUCTO */}

                <Form.Group className="mb-4">

                  <Form.Label className="fw-semibold">
                    Producto
                  </Form.Label>

                  <Form.Select
                    value={form.id_producto || ""}
                    onChange={handleProducto}
                    size="lg"
                    className="rounded-3"
                  >

                    <option value="">
                      Selecciona un producto
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

                </Form.Group>

                {/* CATEGORIA */}

                <div className="mb-4">

                  <Form.Label className="fw-semibold d-block">
                    Categoría
                  </Form.Label>

                  <Badge
                    bg="primary"
                    className="px-3 py-2 fs-6"
                  >
                    {form.productos?.categoria_producto || "Sin categoría"}
                  </Badge>

                </div>

                {/* CANTIDAD */}

                <Form.Group className="mb-4">

                  <Form.Label className="fw-semibold">
                    Cantidad
                  </Form.Label>

                  <Form.Control
                    type="number"
                    min="1"
                    value={form.cantidad || ""}
                    onChange={handleCantidad}
                    size="lg"
                    className="rounded-3"
                  />

                </Form.Group>

                {/* TOTAL */}

                <Form.Group>

                  <Form.Label className="fw-semibold">
                    Total
                  </Form.Label>

                  <Form.Control
                    value={`C$ ${parseFloat(form.total || 0).toFixed(2)}`}
                    disabled
                    size="lg"
                    className="fw-bold text-success rounded-3"
                  />

                </Form.Group>

              </Form>

            </div>

          </Col>

        </Row>

      </Modal.Body>

      <Modal.Footer className="border-0 pt-0">

        <Button
          variant="light"
          onClick={onHide}
          className="px-4 py-2 rounded-3"
        >
          Cancelar
        </Button>

        <Button
          variant="success"
          onClick={actualizar}
          className="px-4 py-2 rounded-3 shadow-sm"
        >
          💾 Guardar Cambios
        </Button>

      </Modal.Footer>

    </Modal>
  );
};

export default ModalEditarVenta;