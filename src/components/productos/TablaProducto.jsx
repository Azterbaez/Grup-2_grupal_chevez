import React, { useState, useEffect } from "react";
import { Table, Spinner, Button } from "react-bootstrap";
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
        <div className="text-center">
          <h4>Cargando productos...</h4>
          <Spinner animation="border" variant="success" role="status" />
        </div>
      ) : (
        <Table striped borderless hover responsive size="sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Categoría</th>
              <th>Precio</th>
              <th className="text-center">Acciones</th>
            </tr>
          </thead>

          <tbody>
            {productos.map((producto) => (
              <tr key={producto.id_producto}>
                <td>{producto.id_producto}</td>

                <td>{producto.nombre_producto}</td>

                <td>
                  {obtenerNombreCategoria(producto.categoria_producto)}
                </td>

                <td>
                  C$ {producto.precio_venta}
                </td>

                <td className="text-center">
                  <Button
                    variant="outline-warning"
                    size="sm"
                    className="m-1"
                    onClick={() => abrirModalEdicion(producto)}
                  >
                    <i className="bi bi-pencil"></i>
                  </Button>

                  <Button
                    variant="outline-danger"
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
      )}
    </>
  );
};

export default TablaProducto;