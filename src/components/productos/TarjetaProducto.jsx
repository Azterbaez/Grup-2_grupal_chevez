import React, { useState, useEffect, useCallback } from "react";
import { Card, Row, Col, Button } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";

const TarjetasProductos = ({
  productos,
  categorias,
  abrirModalEdicion,
  abrirModalEliminacion,
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

  const obtenerNombreCategoria = (idCategoria) => {
    const cat = categorias.find((c) => c.id_categoria === idCategoria);
    return cat ? cat.nombre_categoria : "Sin categoría";
  };

  return (
    <>
      {!productos || productos.length === 0 ? (
        <p className="text-center text-muted tarjeta-movil-texto-secundario py-4 mb-0">
          No hay productos para mostrar
        </p>
      ) : (
        <div>
          {productos.map((prod) => {
            const tarjetaActiva = idTarjetaActiva === prod.id_producto;

            return (
              <Card
                key={prod.id_producto}
                className="mb-3 border-0 rounded-3 shadow-sm w-100 tarjeta-producto-contenedor tarjeta-movil-contenedor"
                onClick={() => alternarTarjetaActiva(prod.id_producto)}
                tabIndex={0}
                onKeyDown={(evento) => {
                  if (evento.key === "Enter" || evento.key === " ") {
                    evento.preventDefault();
                    alternarTarjetaActiva(prod.id_producto);
                  }
                }}
                aria-label={`Producto ${prod.nombre_producto}`}
              >
                <Card.Body
                  className={`p-2 tarjeta-producto-cuerpo tarjeta-movil-cuerpo ${
                    tarjetaActiva
                      ? "tarjeta-producto-cuerpo-activo"
                      : "tarjeta-producto-cuerpo-inactivo"
                  }`}
                >
                  <Row className="align-items-center gx-2 gx-sm-3">
                    <Col xs="auto" className="px-2">
                      <div className="bg-light d-flex align-items-center justify-content-center rounded tarjeta-producto-placeholder-imagen tarjeta-movil-placeholder">
                        {prod.url_imagen ? (
                          <img
                            src={prod.url_imagen}
                            alt={prod.nombre_producto}
                          />
                        ) : (
                          <i className="bi bi-box-seam text-muted"></i>
                        )}
                      </div>
                    </Col>

                    <Col className="text-start min-w-0">
                      <div className="tarjeta-movil-texto-principal text-truncate">
                        {prod.nombre_producto}
                      </div>
                      <div className="tarjeta-movil-texto-secundario text-truncate">
                        {obtenerNombreCategoria(prod.categoria_producto)}
                      </div>
                    </Col>

                    <Col xs="auto" className="text-end">
                      <div className="tarjeta-movil-texto-destacado">
                        C$ {parseFloat(prod.precio_venta || 0).toFixed(2)}
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
                    className="tarjeta-producto-capa tarjeta-movil-capa"
                  >
                    <div
                      className="d-flex gap-2 tarjeta-producto-botones-capa tarjeta-movil-botones-capa"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Button
                        variant="outline-warning"
                        size="sm"
                        onClick={() => {
                          abrirModalEdicion(prod);
                          setIdTarjetaActiva(null);
                        }}
                        aria-label={`Editar ${prod.nombre_producto}`}
                      >
                        <i className="bi bi-pencil"></i>
                      </Button>

                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => {
                          abrirModalEliminacion(prod);
                          setIdTarjetaActiva(null);
                        }}
                        aria-label={`Eliminar ${prod.nombre_producto}`}
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

export default TarjetasProductos;
