import React, { useState, useEffect, useCallback } from "react";
import { Card, Row, Col, Button } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";

const TarjetaCliente = ({
  clientes,
  abrirModalEdicion,
  abrirModalEliminar,
}) => {
  const [idTarjetaActiva, setIdTarjetaActiva] = useState(null);

  const manejarTeclaEscape = useCallback((evento) => {
    if (evento.key === "Escape") setIdTarjetaActiva(null);
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", manejarTeclaEscape);
    return () => window.removeEventListener("keydown", manejarTeclaEscape);
  }, [manejarTeclaEscape]);

  const alternarTarjetaActiva = (id) => {
    setIdTarjetaActiva((anterior) => (anterior === id ? null : id));
  };

  return (
    <>
      {!clientes || clientes.length === 0 ? (
        <p className="text-center text-muted tarjeta-movil-texto-secundario py-4 mb-0">
          No hay clientes para mostrar
        </p>
      ) : (
        <div>
          {clientes.map((cliente) => {
            const tarjetaActiva = idTarjetaActiva === cliente.id_cliente;

            return (
              <Card
                key={cliente.id_cliente}
                className="mb-3 border-0 rounded-3 shadow-sm w-100 tarjeta-cliente-contenedor tarjeta-movil-contenedor"
                onClick={() => alternarTarjetaActiva(cliente.id_cliente)}
                tabIndex={0}
                onKeyDown={(evento) => {
                  if (evento.key === "Enter" || evento.key === " ") {
                    evento.preventDefault();
                    alternarTarjetaActiva(cliente.id_cliente);
                  }
                }}
                aria-label={`Cliente ${cliente.nombre_cliente}`}
              >
                <Card.Body
                  className={`p-2 tarjeta-cliente-cuerpo tarjeta-movil-cuerpo ${
                    tarjetaActiva
                      ? "tarjeta-cliente-cuerpo-activo"
                      : "tarjeta-cliente-cuerpo-inactivo"
                  }`}
                >
                  <Row className="align-items-center gx-2 gx-sm-3">
                    <Col xs="auto" className="px-2">
                      <div className="bg-light d-flex align-items-center justify-content-center rounded tarjeta-cliente-placeholder-imagen tarjeta-movil-placeholder">
                        <i className="bi bi-person-fill text-muted"></i>
                      </div>
                    </Col>

                    <Col className="text-start min-w-0">
                      <div className="tarjeta-movil-texto-principal text-truncate">
                        {cliente.nombre_cliente}
                      </div>
                      <div className="tarjeta-movil-texto-secundario text-truncate">
                        <i className="bi bi-telephone me-1" aria-hidden />
                        {cliente.telefono || "Sin teléfono"}
                      </div>
                      <div className="tarjeta-movil-texto-secundario text-truncate">
                        <i className="bi bi-geo-alt me-1" aria-hidden />
                        {cliente.direccion || "Sin dirección"}
                      </div>
                    </Col>

                    <Col xs="auto" className="text-end">
                      <span className="badge bg-success-subtle text-success border border-success-subtle tarjeta-movil-badge">
                        Activo
                      </span>
                    </Col>
                  </Row>
                </Card.Body>

                {tarjetaActiva && (
                  <div
                    role="dialog"
                    aria-modal="true"
                    onClick={(e) => e.stopPropagation()}
                    className="tarjeta-cliente-capa tarjeta-movil-capa"
                  >
                    <div
                      className="d-flex gap-2 tarjeta-cliente-botones-capa tarjeta-movil-botones-capa"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Button
                        variant="outline-warning"
                        size="sm"
                        onClick={() => {
                          abrirModalEdicion(cliente);
                          setIdTarjetaActiva(null);
                        }}
                        aria-label={`Editar ${cliente.nombre_cliente}`}
                      >
                        <i className="bi bi-pencil"></i>
                      </Button>

                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => {
                          abrirModalEliminar(cliente);
                          setIdTarjetaActiva(null);
                        }}
                        aria-label={`Eliminar ${cliente.nombre_cliente}`}
                      >
                        <i className="bi bi-trash"></i>
                      </Button>
                    </div>
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      )}
    </>
  );
};

export default TarjetaCliente;
