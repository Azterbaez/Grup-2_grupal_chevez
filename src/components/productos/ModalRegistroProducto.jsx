import React, { useState } from "react";
import {
  Modal,
  Button,
  Form,
  Row,
  Col,
  Image
} from "react-bootstrap";

const ModalRegistroProducto = ({
  mostrarModal,
  setMostrarModal,
  nuevoProducto,
  manejoCambioInput,
  manejoCambioArchivo,
  agregarProducto,
  categorias
}) => {

  const [deshabilitado, setDeshabilitado] = useState(false);

  const handleRegistrar = async () => {

    if (deshabilitado) return;

    setDeshabilitado(true);

    await agregarProducto();

    setDeshabilitado(false);

  };

  return (

    <Modal
      show={mostrarModal}
      onHide={() => setMostrarModal(false)}
      backdrop="static"
      keyboard={false}
      centered
      size="lg"
    >

      <Modal.Header
        closeButton
        className="border-0 pb-0"
      >

        <Modal.Title className="fw-bold text-success">
          <i className="bi bi-box-seam me-2"></i>
          Registrar Producto
        </Modal.Title>

      </Modal.Header>

      <Modal.Body className="pt-2">

        <Form>

          <Row>

            <Col md={7}>

              {/* Nombre */}
              <Form.Group className="mb-3">

                <Form.Label className="fw-semibold">
                  Nombre
                </Form.Label>

                <Form.Control
                  type="text"
                  name="nombre_producto"
                  value={nuevoProducto.nombre_producto}
                  onChange={manejoCambioInput}
                  placeholder="Ingresa el nombre"
                  className="shadow-sm"
                />

              </Form.Group>

              {/* Descripción */}
              <Form.Group className="mb-3">

                <Form.Label className="fw-semibold">
                  Descripción
                </Form.Label>

                <Form.Control
                  as="textarea"
                  rows={4}
                  name="descripcion_producto"
                  value={nuevoProducto.descripcion_producto}
                  onChange={manejoCambioInput}
                  placeholder="Ingresa una descripción"
                  className="shadow-sm"
                />

              </Form.Group>

              {/* Categoría */}
              <Form.Group className="mb-3">

                <Form.Label className="fw-semibold">
                  Categoría
                </Form.Label>

                <Form.Select
                  name="categoria_producto"
                  value={nuevoProducto.categoria_producto}
                  onChange={manejoCambioInput}
                  className="shadow-sm"
                >

                  <option value="">
                    Selecciona una categoría
                  </option>

                  {categorias?.map((cat) => (

                    <option
                      key={cat.id_categoria}
                      value={cat.id_categoria}
                    >
                      {cat.nombre_categoria}
                    </option>

                  ))}

                </Form.Select>

              </Form.Group>

              {/* Precio */}
              <Form.Group className="mb-3">

                <Form.Label className="fw-semibold">
                  Precio
                </Form.Label>

                <Form.Control
                  type="number"
                  name="precio_venta"
                  value={nuevoProducto.precio_venta}
                  onChange={manejoCambioInput}
                  placeholder="Ingresa el precio"
                  className="shadow-sm"
                />

              </Form.Group>

            </Col>

            <Col
              md={5}
              className="d-flex flex-column align-items-center justify-content-center"
            >

              <div
                className="border rounded-4 p-3 text-center bg-light w-100"
              >

                {nuevoProducto.archivo ? (

                  <Image
                    src={URL.createObjectURL(
                      nuevoProducto.archivo
                    )}
                    alt="preview"
                    fluid
                    rounded
                    className="mb-3 shadow-sm"
                    style={{
                      maxHeight: "250px",
                      objectFit: "cover"
                    }}
                  />

                ) : (

                  <div className="py-5">

                    <i className="bi bi-image fs-1 text-muted"></i>

                    <p className="text-muted mt-2 mb-0">
                      Vista previa
                    </p>

                  </div>

                )}

                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={manejoCambioArchivo}
                  className="shadow-sm"
                />

              </div>

            </Col>

          </Row>

        </Form>

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
          onClick={handleRegistrar}
          disabled={
            !nuevoProducto.nombre_producto?.trim() ||
            !nuevoProducto.categoria_producto ||
            !nuevoProducto.precio_venta ||
            deshabilitado
          }
        >

          {deshabilitado ? (
            <>
              <span
                className="spinner-border spinner-border-sm me-2"
              ></span>

              Guardando...
            </>
          ) : (
            <>
              <i className="bi bi-check-circle me-2"></i>
              Guardar Producto
            </>
          )}

        </Button>

      </Modal.Footer>

    </Modal>

  );

};

export default ModalRegistroProducto;