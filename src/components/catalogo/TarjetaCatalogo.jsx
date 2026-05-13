import React, { useState } from "react";
import { Card, Badge, Modal, Button } from "react-bootstrap";

const TarjetaCatalogo = ({ producto, categoriaNombre }) => {

    const [mostrarModal, setMostrarModal] = useState(false);

    const descripcion = producto.descripcion_producto || "";

    const previsualizacionTexto =
        descripcion.length > 60
            ? descripcion.substring(0, 60) + "..."
            : descripcion;

    return (
        <>
            {/* TARJETA */}
            <Card
                className="border-0 shadow-sm rounded-4 h-100 overflow-hidden"
                style={{
                    cursor: "pointer",
                    transition: "0.2s",
                    backgroundColor: "#fff",
                }}
                onClick={() => setMostrarModal(true)}
            >

                {/* IMAGEN */}
                <div
                    style={{
                        height: "220px",
                        overflow: "hidden",
                        background: "#f5f5f5",
                    }}
                >

                    {producto.url_imagen ? (

                        <img
                            src={producto.url_imagen}
                            alt={producto.nombre_producto}
                            className="w-100 h-100"
                            style={{
                                objectFit: "cover",
                            }}
                        />

                    ) : (

                        <div className="d-flex align-items-center justify-content-center h-100">

                            <i className="bi bi-image text-muted fs-1"></i>

                        </div>

                    )}

                </div>

                {/* CONTENIDO */}
                <Card.Body className="d-flex flex-column p-3">

                    <div className="mb-2">

                        <Badge
                            bg="light"
                            text="dark"
                            className="border"
                        >
                            {categoriaNombre || "Sin categoría"}
                        </Badge>

                    </div>

                    <Card.Title className="fw-bold text-dark mb-2">
                        {producto.nombre_producto}
                    </Card.Title>

                    <Card.Text
                        className="text-muted small flex-grow-1"
                    >
                        {previsualizacionTexto || "Sin descripción"}
                    </Card.Text>

                    <div className="mt-3">

                        <h5 className="fw-bold text-success mb-0">
                            C$
                            {parseFloat(
                                producto.precio_venta || 0
                            ).toFixed(2)}
                        </h5>

                    </div>

                </Card.Body>

            </Card>

            {/* MODAL */}
            <Modal
                show={mostrarModal}
                onHide={() => setMostrarModal(false)}
                centered
            >

                <Modal.Header closeButton>

                    <Modal.Title className="fw-bold">
                        {producto.nombre_producto}
                    </Modal.Title>

                </Modal.Header>

                <Modal.Body>

                    {/* IMAGEN */}
                    <div className="text-center mb-3">

                        {producto.url_imagen ? (

                            <img
                                src={producto.url_imagen}
                                alt={producto.nombre_producto}
                                className="img-fluid rounded-4 shadow-sm"
                                style={{
                                    maxHeight: "280px",
                                    objectFit: "cover",
                                }}
                            />

                        ) : (

                            <div className="bg-light p-5 rounded-4">

                                <i className="bi bi-image fs-1 text-muted"></i>

                            </div>

                        )}

                    </div>

                    {/* INFO */}
                    <Badge bg="secondary" className="mb-3">
                        {categoriaNombre || "Sin categoría"}
                    </Badge>

                    <h4 className="fw-bold text-success">
                        C$
                        {parseFloat(
                            producto.precio_venta || 0
                        ).toFixed(2)}
                    </h4>

                    <p className="text-muted mt-3 mb-0">
                        {descripcion || "Sin descripción"}
                    </p>

                </Modal.Body>

                <Modal.Footer className="border-0">

                    <Button
                        variant="secondary"
                        onClick={() => setMostrarModal(false)}
                    >
                        Cerrar
                    </Button>

                </Modal.Footer>

            </Modal>
        </>
    );
};

export default TarjetaCatalogo;