import React, { useState, useEffect, useCallback } from "react";
import { Card, Row, Col, Button } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";

const TarjetaEmpleado = ({
  empleados,
  abrirModalEdicion,
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
      {!empleados || empleados.length === 0 ? (
        <p className="text-center text-muted tarjeta-movil-texto-secundario py-4 mb-0">
          No hay empleados para mostrar
        </p>
      ) : (
        <div>
          {empleados.map((empleado) => {
            const tarjetaActiva = idTarjetaActiva === empleado.id_empleado;

            return (
              <Card
                key={empleado.id_empleado}
                className="mb-3 border-0 rounded-3 shadow-sm w-100 tarjeta-empleado-contenedor tarjeta-movil-contenedor"
                onClick={() => alternarTarjetaActiva(empleado.id_empleado)}
                tabIndex={0}
                onKeyDown={(evento) => {
                  if (evento.key === "Enter" || evento.key === " ") {
                    evento.preventDefault();
                    alternarTarjetaActiva(empleado.id_empleado);
                  }
                }}
                aria-label={`Empleado ${empleado.nombre_empleado} ${empleado.apellido_empleado}`}
              >
                <Card.Body
                  className={`p-2 tarjeta-empleado-cuerpo tarjeta-movil-cuerpo ${
                    tarjetaActiva
                      ? "tarjeta-empleado-cuerpo-activo"
                      : "tarjeta-empleado-cuerpo-inactivo"
                  }`}
                >
                  <Row className="align-items-center gx-2 gx-sm-3">
                    <Col xs="auto" className="px-2">
                      <div className="bg-light d-flex align-items-center justify-content-center rounded tarjeta-empleado-placeholder-imagen tarjeta-movil-placeholder">
                        <i className="bi bi-person text-muted"></i>
                      </div>
                    </Col>

                    <Col className="text-start min-w-0">
                      <div className="tarjeta-movil-texto-principal text-truncate">
                        {empleado.nombre_empleado} {empleado.apellido_empleado}
                      </div>
                      <div className="tarjeta-movil-texto-secundario text-truncate">
                        {empleado.email || "Sin correo"}
                      </div>
                      <div className="tarjeta-movil-texto-secundario text-truncate">
                        Cel: {empleado.celular || "-"}
                      </div>
                    </Col>

                    <Col xs="auto" className="text-end">
                      <div className="tarjeta-movil-texto-secundario text-truncate">
                        {empleado.tipo_empleado}
                      </div>
                      <div className="tarjeta-movil-texto-destacado">
                        PIN: {empleado.pin || "-"}
                      </div>
                    </Col>
                  </Row>
                </Card.Body>

                {tarjetaActiva && (
                  <div
                    role="dialog"
                    aria-modal="true"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIdTarjetaActiva(null);
                    }}
                    className="tarjeta-empleado-capa tarjeta-movil-capa"
                  >
                    <div
                      className="d-flex gap-2 tarjeta-empleado-botones-capa tarjeta-movil-botones-capa"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Button
                        variant="outline-warning"
                        size="sm"
                        onClick={() => {
                          abrirModalEdicion(empleado);
                          setIdTarjetaActiva(null);
                        }}
                        aria-label={`Editar ${empleado.nombre_empleado} ${empleado.apellido_empleado}`}
                      >
                        <i className="bi bi-pencil"></i>
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

export default TarjetaEmpleado;
