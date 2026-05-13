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

      <Modal.Header
        closeButton
        className="bg-primary text-white"
      >

        <Modal.Title>
          👤 Registrar Cliente
        </Modal.Title>

      </Modal.Header>

      <Modal.Body className="p-4">

        <Form>

          <Form.Group className="mb-4">

            <Form.Label>
              Nombre Completo
            </Form.Label>

            <InputGroup>

              <InputGroup.Text>
                👤
              </InputGroup.Text>

              <Form.Control
                type="text"
                name="nombre_cliente"
                placeholder="Ingrese nombre"
                value={nuevoCliente.nombre_cliente}
                onChange={handleChange}
              />

            </InputGroup>

          </Form.Group>

          <Row>

            <Col md={6}>

              <Form.Group className="mb-4">

                <Form.Label>
                  Teléfono
                </Form.Label>

                <InputGroup>

                  <InputGroup.Text>
                    📞
                  </InputGroup.Text>

                  <Form.Control
                    type="text"
                    name="telefono"
                    placeholder="8888-8888"
                    value={nuevoCliente.telefono}
                    onChange={handleChange}
                  />

                </InputGroup>

              </Form.Group>

            </Col>

            <Col md={6}>

              <Form.Group className="mb-4">

                <Form.Label>
                  Dirección
                </Form.Label>

                <InputGroup>

                  <InputGroup.Text>
                    📍
                  </InputGroup.Text>

                  <Form.Control
                    type="text"
                    name="direccion"
                    placeholder="Ingrese dirección"
                    value={nuevoCliente.direccion}
                    onChange={handleChange}
                  />

                </InputGroup>

              </Form.Group>

            </Col>

          </Row>

        </Form>

      </Modal.Body>

      <Modal.Footer>

        <Button
          variant="secondary"
          onClick={() =>
            setMostrarModal(false)
          }
        >
          Cancelar
        </Button>

        <Button
          variant="primary"
          onClick={agregarCliente}
        >
          💾 Guardar
        </Button>

      </Modal.Footer>

    </Modal>

  );

};

export default ModalRegistroCliente;