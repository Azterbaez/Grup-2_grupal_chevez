import React, { useState, useEffect } from "react";
import { Table, Spinner, Button, Image, Badge } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";

const TablaProducto = ({
  productos,
  categorias,
  abrirModalEdicion,
  abrirModalEliminacion
}) => {

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (productos) {
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [productos]);

  const obtenerNombreCategoria = (idCategoria) => {

    const categoria = categorias.find(
      (cat) => cat.id_categoria === Number(idCategoria)
    );

    return categoria
      ? categoria.nombre_categoria
      : "Sin categoría";
  };

  return (
    <>
      {loading ? (
        <div className="text-center py-5">
          <h4 className="text-success mb-3">
            Cargando productos...
          </h4>

          <Spinner
            animation="border"
            variant="success"
            role="status"
          />
        </div>
      ) : (
        <div className="table-responsive shadow rounded-4 overflow-hidden">

          <Table
            hover
            responsive
            className="align-middle mb-0"
          >

            <thead
              className="text-white"
              style={{
                background:
                  "linear-gradient(90deg, #198754, #157347)"
              }}
            >
              <tr>
                <th className="py-3">ID</th>

                <th className="py-3">Nombre</th>

                <th className="d-none d-md-table-cell py-3">
                  Descripción
                </th>

                <th className="py-3">Categoría</th>

                <th className="py-3">Precio</th>

                <th className="py-3">Imagen</th>

                <th className="text-center py-3">
                  Acciones
                </th>
              </tr>
            </thead>

            <tbody>

              {productos.map((producto) => (

                <tr key={producto.id_producto}>

                  <td className="fw-bold text-success">
                    #{producto.id_producto}
                  </td>

                  <td className="fw-semibold">
                    {producto.nombre_producto}
                  </td>

                  <td className="d-none d-md-table-cell text-muted">
                    {producto.descripcion_producto}
                  </td>

                  <td>
                    <Badge bg="success" pill>
                      {obtenerNombreCategoria(
                        producto.categoria_producto
                      )}
                    </Badge>
                  </td>

                  <td className="fw-bold text-success">
                    C$ {producto.precio_venta}
                  </td>

                  <td>

                    {producto.url_imagen ? (

                      <Image
                        src={producto.url_imagen}
                        alt="img"
                        width={50}
                        height={50}
                        roundedCircle
                        style={{
                          objectFit: "cover",
                          border: "2px solid #198754"
                        }}
                      />

                    ) : (

                      <div
                        className="bg-light rounded-circle d-flex align-items-center justify-content-center"
                        style={{
                          width: "50px",
                          height: "50px"
                        }}
                      >
                        <i className="bi bi-image text-muted"></i>
                      </div>

                    )}

                  </td>

                  <td className="text-center">

                    <Button
                      variant="warning"
                      size="sm"
                      className="m-1 text-white"
                      onClick={() => abrirModalEdicion(producto)}
                    >
                      <i className="bi bi-pencil"></i>
                    </Button>

                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => abrirModalEliminacion(producto)}
                    >
                      <i className="bi bi-trash"></i>
                    </Button>

                  </td>

                </tr>

              ))}

            </tbody>

          </Table>

        </div>
      )}
    </>
  );
};

export default TablaProducto;