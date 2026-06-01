import React, { useState } from "react";

import {
    Modal,
    Form,
    Button,
    Row,
    Col,
    Image
} from "react-bootstrap";

const ModalEdicionProducto = ({
    mostrarModalEdicion,
    setMostrarModalEdicion,
    productoEditar,
    manejoCambioInputEdicion,
    manejoCambioArchivoActualizar,
    actualizarProducto,
    categorias
}) => {

    const [deshabilitado, setDeshabilitado] = useState(false);

    const handleActualizar = async () => {

        if (deshabilitado) return;

        setDeshabilitado(true);

        await actualizarProducto();

        setDeshabilitado(false);

    };

    return (

        <Modal
            show={mostrarModalEdicion}
            onHide={() => setMostrarModalEdicion(false)}
            backdrop="static"
            centered
            size="lg"
        >

            <Modal.Header
                closeButton
                className="border-0 pb-0"
            >

                <Modal.Title className="fw-bold text-primary">
                    <i className="bi bi-pencil-square me-2"></i>
                    Editar Producto
                </Modal.Title>

            </Modal.Header>

            <Modal.Body className="pt-2">

                <Form>

                    <Row className="g-4">

                        {/* FORMULARIO */}
                        <Col lg={7}>

                            {/* Categoria */}
                            <Form.Group className="mb-3">

                                <Form.Label className="fw-semibold">
                                    Categoría
                                </Form.Label>

                                <Form.Select
                                    name="categoria_producto"
                                    value={productoEditar.categoria_producto || ""}
                                    onChange={manejoCambioInputEdicion}
                                    className="shadow-sm"
                                >

                                    <option value="">
                                        Seleccione...
                                    </option>

                                    {categorias.map((cat) => (

                                        <option
                                            key={cat.id_categoria}
                                            value={cat.id_categoria}
                                        >
                                            {cat.nombre_categoria}
                                        </option>

                                    ))}

                                </Form.Select>

                            </Form.Group>

                            {/* Nombre */}
                            <Form.Group className="mb-3">

                                <Form.Label className="fw-semibold">
                                    Nombre
                                </Form.Label>

                                <Form.Control
                                    type="text"
                                    name="nombre_producto"
                                    value={productoEditar.nombre_producto || ""}
                                    onChange={manejoCambioInputEdicion}
                                    placeholder="Nombre del producto"
                                    className="shadow-sm"
                                />

                            </Form.Group>

                            {/* Precio */}
                            <Form.Group className="mb-3">

                                <Form.Label className="fw-semibold">
                                    Precio de venta
                                </Form.Label>

                                <Form.Control
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    name="precio_venta"
                                    value={productoEditar.precio_venta || ""}
                                    onChange={manejoCambioInputEdicion}
                                    placeholder="Precio"
                                    className="shadow-sm"
                                />

                            </Form.Group>

                            {/* Stock */}
                            <Form.Group className="mb-3">

                                <Form.Label className="fw-semibold">
                                    Stock
                                </Form.Label>

                                <Form.Control
                                    type="number"
                                    min="0"
                                    name="stock"
                                    value={productoEditar.stock || ""}
                                    onChange={manejoCambioInputEdicion}
                                    placeholder="Cantidad disponible"
                                    className="shadow-sm"
                                />

                            </Form.Group>

                            {/* Descripcion */}
                            <Form.Group className="mb-3">

                                <Form.Label className="fw-semibold">
                                    Descripción
                                </Form.Label>

                                <Form.Control
                                    as="textarea"
                                    rows={5}
                                    name="descripcion_producto"
                                    value={productoEditar.descripcion_producto || ""}
                                    onChange={manejoCambioInputEdicion}
                                    placeholder="Descripción del producto"
                                    className="shadow-sm"
                                />

                            </Form.Group>

                        </Col>

                        {/* IMAGEN */}
                        <Col
                            lg={5}
                            className="d-flex align-items-center"
                        >

                            <div className="border rounded-4 p-3 bg-light text-center w-100 shadow-sm">

                                <h6 className="fw-bold mb-3 text-secondary">
                                    Vista previa
                                </h6>

                                {productoEditar.url_imagen ? (

                                    <Image
                                        src={productoEditar.url_imagen}
                                        alt="Producto actual"
                                        fluid
                                        rounded
                                        className="shadow-sm mb-3"
                                        style={{
                                            maxHeight: "260px",
                                            objectFit: "cover"
                                        }}
                                    />

                                ) : (

                                    <div className="py-5">

                                        <i className="bi bi-image fs-1 text-muted"></i>

                                        <p className="text-muted mt-2">
                                            Sin imagen
                                        </p>

                                    </div>

                                )}

                                <Form.Control
                                    type="file"
                                    accept="image/*"
                                    onChange={manejoCambioArchivoActualizar}
                                    className="shadow-sm"
                                />

                                <Form.Text className="text-muted">
                                    La nueva imagen reemplazará la actual
                                </Form.Text>

                            </div>

                        </Col>

                    </Row>

                </Form>

            </Modal.Body>

            <Modal.Footer className="border-0 pt-0">

                <Button
                    variant="outline-secondary"
                    onClick={() => setMostrarModalEdicion(false)}
                >
                    Cancelar
                </Button>

                <Button
                    variant="primary"
                    onClick={handleActualizar}
                    disabled={deshabilitado}
                    className="px-4"
                >

                    {deshabilitado ? (
                        <>
                            <span className="spinner-border spinner-border-sm me-2"></span>
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

export default ModalEdicionProducto;