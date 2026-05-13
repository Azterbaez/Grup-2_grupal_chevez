import React, { useEffect, useState } from "react";
import {
  Table,
  Spinner,
  Button,
  Card,
  Badge,
} from "react-bootstrap";

import "bootstrap-icons/font/bootstrap-icons.css";

const TablaCategorias = ({
  categorias,
  abrirModalEdicion,
  abrirModalEliminacion
}) => {

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    if (categorias) {
      setLoading(false);
    } else {
      setLoading(true);
    }

  }, [categorias]);

  return (

    <Card className="border-0 shadow-sm rounded-4 overflow-hidden">

      <Card.Body className="p-0">

        {loading ? (

          <div className="text-center py-5">

            <Spinner
              animation="border"
              variant="success"
            />

            <h5 className="mt-3 text-muted">
              Cargando categorías...
            </h5>

          </div>

        ) : categorias.length === 0 ? (

          <div className="text-center py-5">

            <i
              className="bi bi-tags text-muted"
              style={{
                fontSize: "4rem",
              }}
            ></i>

            <h5 className="mt-3">
              No hay categorías registradas
            </h5>

            <p className="text-muted mb-0">
              Agrega una nueva categoría
            </p>

          </div>

        ) : (

          <Table
            hover
            responsive
            className="align-middle mb-0"
          >

            <thead
              className="text-white"
              style={{
                background:
                  "linear-gradient(90deg, #198754, #157347)",
              }}
            >

              <tr>

                <th className="py-3 ps-4">
                  ID
                </th>

                <th className="py-3">
                  Nombre
                </th>

                <th className="d-none d-md-table-cell py-3">
                  Descripción
                </th>

                <th className="text-center py-3 pe-4">
                  Acciones
                </th>

              </tr>

            </thead>

            <tbody>

              {categorias.map((categoria) => (

                <tr key={categoria.id_categoria}>

                  {/* ID */}

                  <td className="ps-4">

                    <Badge
                      bg="success"
                      pill
                      className="px-3 py-2"
                    >
                      #{categoria.id_categoria}
                    </Badge>

                  </td>

                  {/* NOMBRE */}

                  <td>

                    <div className="fw-semibold fs-6">

                      <i className="bi bi-tag-fill text-success me-2"></i>

                      {categoria.nombre_categoria}

                    </div>

                  </td>

                  {/* DESCRIPCION */}

                  <td className="d-none d-md-table-cell text-muted">

                    {categoria.descripcion_categoria || (
                      <span className="text-secondary">
                        Sin descripción
                      </span>
                    )}

                  </td>

                  {/* ACCIONES */}

                  <td className="text-center pe-4">

                    <Button
                      variant="warning"
                      size="sm"
                      className="me-2 rounded-pill px-3 shadow-sm"
                      onClick={() =>
                        abrirModalEdicion(categoria)
                      }
                    >

                      <i className="bi bi-pencil-square me-1"></i>

                      Editar

                    </Button>

                    <Button
                      variant="danger"
                      size="sm"
                      className="rounded-pill px-3 shadow-sm"
                      onClick={() =>
                        abrirModalEliminacion(categoria)
                      }
                    >

                      <i className="bi bi-trash me-1"></i>

                      Eliminar

                    </Button>

                  </td>

                </tr>

              ))}

            </tbody>

          </Table>

        )}

      </Card.Body>

    </Card>

  );

};

export default TablaCategorias;