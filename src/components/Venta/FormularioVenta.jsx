import React, { useState, useEffect } from "react";
import {
  Modal,
  Button,
  Form,
  Row,
  Col,
  Table,
  Alert
} from "react-bootstrap";

const FormularioVenta = ({
  show,
  onHide,
  clientes,
  empleados,
  productos,
  clienteSeleccionado,
  setClienteSeleccionado,
  empleadoSeleccionado,
  setEmpleadoSeleccionado,
  metodoPago,
  setMetodoPago,
  detalles,
  totalGeneral,
  agregarDetalle,
  eliminarDetalle,
  actualizarCantidad,
  guardarVenta,
  ventaAEditar
}) => {

  const [productoSeleccionado,
    setProductoSeleccionado] =
    useState("");

  const [cantidad,
    setCantidad] = useState(1);

  const [error,
    setError] = useState("");

  useEffect(() => {

    if (!show) {

      setProductoSeleccionado("");
      setCantidad(1);
      setError("");

    }

  }, [show]);

  const obtenerStockDisponible = (producto) => {

    let stockDisponible =
      producto.stock || 0;

    if (ventaAEditar?.detalle_venta) {

      const cantidadOriginal =
        ventaAEditar.detalle_venta
          .filter(
            (d) =>
              d.id_producto ===
              producto.id_producto
          )
          .reduce(
            (sum, d) =>
              sum + d.cantidad,
            0
          );

      stockDisponible +=
        cantidadOriginal;

    }

    return stockDisponible;

  };

  const agregarProducto = () => {

    setError("");

    if (!productoSeleccionado) {

      setError(
        "Debes seleccionar un producto"
      );

      return;

    }

    const producto = productos.find(
      (p) =>
        String(p.id_producto) ===
        String(productoSeleccionado)
    );

    if (!producto) {

      setError("Producto inválido");

      return;

    }

    if (
      !Number.isInteger(cantidad) ||
      cantidad <= 0
    ) {

      setError(
        "La cantidad debe ser un numero entero mayor que cero"
      );

      return;

    }

    const cantidadEnDetalle =
      detalles.find(
        (d) =>
          String(d.id_producto) ===
          String(producto.id_producto)
      )?.cantidad || 0;

    const stockDisponible =
      obtenerStockDisponible(producto);

    if (
      cantidadEnDetalle + cantidad >
      stockDisponible
    ) {

      setError(
        "La cantidad supera el stock disponible"
      );

      return;

    }

    agregarDetalle(producto, cantidad);

    setProductoSeleccionado("");
    setCantidad(1);

  };

  return (

    <Modal
      show={show}
      onHide={onHide}
      centered
      size="xl"
      backdrop="static"
    >

      <Modal.Header closeButton>

        <Modal.Title>

          {
            ventaAEditar
              ? "Editar Venta"
              : "Nueva Venta"
          }

        </Modal.Title>

      </Modal.Header>

      <Modal.Body>

        {error && (

          <Alert variant="danger">

            {error}

          </Alert>

        )}

        <Row className="mb-4">

          {/* CLIENTE */}

          <Col md={4}>

            <Form.Group>

              <Form.Label>
                Cliente
              </Form.Label>

              <Form.Select
                value={
                  clienteSeleccionado
                    ?.id_cliente || ""
                }
                onChange={(e) => {

                  const cliente =
                    clientes.find(
                      (c) =>
                        String(
                          c.id_cliente
                        ) ===
                        String(
                          e.target.value
                        )
                    );

                  setClienteSeleccionado(
                    cliente || null
                  );

                }}
              >

                <option value="">
                  Seleccione cliente
                </option>

                {clientes.map((c) => (

                  <option
                    key={c.id_cliente}
                    value={c.id_cliente}
                  >

                    {c.nombre_cliente}

                  </option>

                ))}

              </Form.Select>

            </Form.Group>

          </Col>

          {/* EMPLEADO */}

          <Col md={4}>

            <Form.Group>

              <Form.Label>
                Empleado
              </Form.Label>

              <Form.Select
                value={
                  empleadoSeleccionado
                    ?.id_empleado || ""
                }
                onChange={(e) => {

                  const empleado =
                    empleados.find(
                      (emp) =>
                        String(
                          emp.id_empleado
                        ) ===
                        String(
                          e.target.value
                        )
                    );

                  setEmpleadoSeleccionado(
                    empleado || null
                  );

                }}
              >

                <option value="">
                  Seleccione empleado
                </option>

                {empleados.map((e) => (

                  <option
                    key={e.id_empleado}
                    value={e.id_empleado}
                  >

                    {e.nombre_empleado}{" "}
                    {e.apellido_empleado}

                  </option>

                ))}

              </Form.Select>

            </Form.Group>

          </Col>

          {/* METODO PAGO */}

          <Col md={4}>

            <Form.Group>

              <Form.Label>
                Método de Pago
              </Form.Label>

              <Form.Select
                value={metodoPago}
                onChange={(e) =>
                  setMetodoPago(
                    e.target.value
                  )
                }
              >

                <option value="efectivo">
                  Efectivo
                </option>

                <option value="tarjeta">
                  Tarjeta
                </option>

                <option value="transferencia">
                  Transferencia
                </option>

              </Form.Select>

            </Form.Group>

          </Col>

        </Row>

        <hr />

        {/* AGREGAR PRODUCTOS */}

        <Row className="align-items-end mb-4">

          <Col md={6}>

            <Form.Group>

              <Form.Label>
                Producto
              </Form.Label>

              <Form.Select
                value={
                  productoSeleccionado
                }
                onChange={(e) =>
                  setProductoSeleccionado(
                    e.target.value
                  )
                }
              >

                <option value="">
                  Seleccione producto
                </option>

                {productos.map((p) => (

                  <option
                    key={p.id_producto}
                    value={p.id_producto}
                  >

                    {p.nombre_producto}
                    {" - "}
                    Stock:
                    {" "}
                    {p.stock}

                  </option>

                ))}

              </Form.Select>

            </Form.Group>

          </Col>

          <Col md={3}>

            <Form.Group>

              <Form.Label>
                Cantidad
              </Form.Label>

              <Form.Control
                type="number"
                min="1"
                value={cantidad}
                onChange={(e) =>
                  setCantidad(
                    parseInt(
                      e.target.value
                    ) || 1
                  )
                }
              />

            </Form.Group>

          </Col>

          <Col md={3}>

            <Button
              className="w-100"
              onClick={
                agregarProducto
              }
            >

              <i className="bi bi-plus-lg me-2"></i>

              Agregar

            </Button>

          </Col>

        </Row>

        {/* TABLA */}

        <Table
          striped
          bordered
          hover
          responsive
        >

          <thead className="table-dark">

            <tr>

              <th>Producto</th>

              <th width="120">
                Precio
              </th>

              <th width="120">
                Cantidad
              </th>

              <th width="140">
                Subtotal
              </th>

              <th width="100">
                Acción
              </th>

            </tr>

          </thead>

          <tbody>

            {detalles.length > 0 ? (

              detalles.map((d) => (

                <tr
                  key={d.id_producto}
                >

                  <td>
                    {
                      d.nombre_producto
                    }
                  </td>

                  <td>

                    C$
                    {" "}
                    {parseFloat(
                      d.precio
                    ).toFixed(2)}

                  </td>

                  <td>

                    <Form.Control
                      type="number"
                      min="1"
                      value={
                        d.cantidad
                      }
                      onChange={(e) => {

                        const nuevaCantidad =
                          parseInt(
                            e.target.value
                          ) || 1;

                        const producto =
                          productos.find(
                            (p) =>
                              p.id_producto ===
                              d.id_producto
                          );

                        if (!producto) {

                          setError(
                            "Producto invalido"
                          );

                          return;

                        }

                        if (
                          !Number.isInteger(
                            nuevaCantidad
                          ) ||
                          nuevaCantidad <= 0
                        ) {

                          setError(
                            "La cantidad debe ser un numero entero mayor que cero"
                          );

                          return;

                        }

                        const stockDisponible =
                          obtenerStockDisponible(
                            producto
                          );

                        if (
                          nuevaCantidad >
                          stockDisponible
                        ) {

                          setError(
                            `La cantidad supera el stock disponible para ${d.nombre_producto}`
                          );

                          return;

                        }

                        setError("");

                        actualizarCantidad(
                          d.id_producto,
                          nuevaCantidad
                        );

                      }}
                    />

                  </td>

                  <td>

                    C$
                    {" "}

                    {(
                      d.precio *
                      d.cantidad
                    ).toFixed(2)}

                  </td>

                  <td className="text-center">

                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() =>
                        eliminarDetalle(
                          d.id_producto
                        )
                      }
                    >

                      <i className="bi bi-trash"></i>

                    </Button>

                  </td>

                </tr>

              ))

            ) : (

              <tr>

                <td
                  colSpan={5}
                  className="text-center text-muted py-4"
                >

                  No hay productos agregados

                </td>

              </tr>

            )}

          </tbody>

        </Table>

        <div className="text-end mt-4">

          <h4>

            Total:
            {" "}

            <span className="text-success">

              C$
              {" "}
              {totalGeneral.toFixed(2)}

            </span>

          </h4>

        </div>

      </Modal.Body>

      <Modal.Footer>

        <Button
          variant="secondary"
          onClick={onHide}
        >

          Cancelar

        </Button>

        <Button
          variant="success"
          onClick={guardarVenta}
        >

          {
            ventaAEditar
              ? "Actualizar Venta"
              : "Guardar Venta"
          }

        </Button>

      </Modal.Footer>

    </Modal>

  );

};

export default FormularioVenta;