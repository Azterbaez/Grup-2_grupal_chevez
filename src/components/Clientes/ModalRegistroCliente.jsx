import React from "react";
import {
  Modal,
  Button,
  Form,
  Row,
  Col,
  InputGroup,
} from "react-bootstrap";

const ModalRegistroCliente = ({
  mostrarModal,
  setMostrarModal,
  nuevoCliente,
  setNuevoCliente,
  agregarCliente,
}) => {

  const handleChange = (e) => {

    setNuevoCliente({
      ...nuevoCliente,
      [e.target.name]: e.target.value,
    });

  };

  return (

    <Modal
      show={mostrarModal}
      onHide={() => setMostrarModal(false)}
      centered
      size="lg"
    >

      {/* HEADER */}

      <Modal.Header
        closeButton
        className="border-0 bg-primary text-white"
      >

        <Modal.Title className="fw-bold">
          👤 Registrar Cliente
        </Modal.Title>

      </Modal.Header>

      {/* BODY */}

      <Modal.Body className="px-4 py-4">

        <div className="text-center mb-4">

          <div
            className="mx-auto d-flex align-items-center justify-content-center bg-light rounded-circle shadow-sm"
            style={{
              width: "90px",
              height: "90px",
              fontSize: "2.5rem",
            }}
          >
            🧑
          </div>

          <h4 className="fw-bold mt-3 mb-1">
            Nuevo Cliente
          </h4>

          <p className="text-muted">
            Completa la información del cliente
          </p>

        </div>

        <Form>

          {/* NOMBRE */}

          <Form.Group className="mb-4">

            <Form.Label className="fw-semibold">
              Nombre Completo
            </Form.Label>

            <InputGroup>

              <InputGroup.Text>
                👤
              </InputGroup.Text>

              <Form.Control
                type="text"
                name="nombre_cliente"
                placeholder="Ingresa el nombre"
                value={nuevoCliente?.nombre_cliente || ""}
                onChange={handleChange}
                size="lg"
              />

            </InputGroup>

          </Form.Group>

          <Row>

            {/* TELEFONO */}

            <Col md={6}>

              <Form.Group className="mb-4">

                <Form.Label className="fw-semibold">
                  Teléfono
                </Form.Label>

                <InputGroup>

                  <InputGroup.Text>
                    📞
                  </InputGroup.Text>

                  <Form.Control
                    type="text"
                    name="telefono_cliente"
                    placeholder="8888-8888"
                    value={nuevoCliente?.telefono_cliente || ""}
                    onChange={handleChange}
                    size="lg"
                  />

                </InputGroup>

              </Form.Group>

            </Col>

            {/* DIRECCION */}

            <Col md={6}>

              <Form.Group className="mb-4">

                <Form.Label className="fw-semibold">
                  Dirección
                </Form.Label>

                <InputGroup>

                  <InputGroup.Text>
                    📍
                  </InputGroup.Text>

                  <Form.Control
                    type="text"
                    name="direccion_cliente"
                    placeholder="Ingresa la dirección"
                    value={nuevoCliente?.direccion_cliente || ""}
                    onChange={handleChange}
                    size="lg"
                  />

                </InputGroup>

              </Form.Group>

            </Col>

          </Row>

        </Form>

      </Modal.Body>

      {/* FOOTER */}

      <Modal.Footer className="border-0 px-4 pb-4">

        <Button
          variant="outline-secondary"
          size="lg"
          onClick={() => setMostrarModal(false)}
        >
          Cancelar
        </Button>

        <Button
          variant="primary"
          size="lg"
          className="px-4 shadow-sm"
          onClick={agregarCliente}
          disabled={
            !nuevoCliente?.nombre_cliente?.trim()
          }
        >
          💾 Guardar Cliente
        </Button>

      </Modal.Footer>

    </Modal>

  );

};

export default ModalRegistroCliente;