import { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
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

      console.error("Error al actualizar venta:", error);

    }

  };

  if (!ventaSeleccionada) return null;

  return (

    <Modal
      show={mostrarModal}
      onHide={() => setMostrarModal(false)}
      centered
    >

      <Modal.Header closeButton>

        <Modal.Title>
          Editar Venta
        </Modal.Title>

      </Modal.Header>

      <Modal.Body>

        <Form>

          {/* PRODUCTO */}

          <Form.Group className="mb-3">

            <Form.Label>
              Producto
            </Form.Label>

            <Form.Control
              type="text"
              value={
                ventaSeleccionada.productos?.nombre_producto || ""
              }
              disabled
            />

          </Form.Group>

          {/* CANTIDAD */}

          <Form.Group className="mb-3">

            <Form.Label>
              Cantidad
            </Form.Label>

            <Form.Control
              type="number"
              min={1}
              value={formulario.cantidad}
              onChange={manejarCantidad}
            />

          </Form.Group>

          {/* TOTAL */}

          <Form.Group>

            <Form.Label>
              Total
            </Form.Label>

            <Form.Control
              type="text"
              value={`C$ ${parseFloat(formulario.total || 0).toFixed(2)}`}
              disabled
            />

          </Form.Group>

        </Form>

      </Modal.Body>

      <Modal.Footer>

        <Button
          variant="secondary"
          onClick={() => setMostrarModal(false)}
        >
          Cancelar
        </Button>

        <Button
          variant="success"
          onClick={actualizarVenta}
        >
          Actualizar
        </Button>

      </Modal.Footer>

    </Modal>

  );

};

export default ModalEditarVenta;