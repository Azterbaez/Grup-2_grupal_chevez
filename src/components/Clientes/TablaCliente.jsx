import React from "react";

import {
  Table,
  Button,
  Badge,
} from "react-bootstrap";

const TablaCliente = ({
  clientes = [],
  abrirModalEdicion,
  abrirModalEliminar,
}) => {

  return (

    <div className="table-responsive shadow-sm rounded">

      <Table
        striped
        bordered
        hover
        className="align-middle"
      >

        <thead className="table-dark">

          <tr className="text-center">

            <th>ID</th>
            <th>Nombre</th>
            <th>Teléfono</th>
            <th>Dirección</th>
            <th>Estado</th>
            <th>Acciones</th>

          </tr>

        </thead>

        <tbody>

          {clientes.length === 0 ? (

            <tr>

              <td
                colSpan="6"
                className="text-center py-4"
              >
                No hay clientes registrados
              </td>

            </tr>

          ) : (

            clientes.map((c) => (

              <tr key={c.id_cliente}>

                <td className="text-center">
                  {c.id_cliente}
                </td>

                <td>{c.nombre_cliente}</td>

                <td>{c.telefono}</td>

                <td>{c.direccion}</td>

                <td className="text-center">

                  <Badge bg="success">
                    Activo
                  </Badge>

                </td>

                <td className="text-center">

                  <Button
                    variant="warning"
                    size="sm"
                    className="me-2"
                    onClick={() =>
                      abrirModalEdicion(c)
                    }
                  >
                    ✏ Editar
                  </Button>

                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() =>
                      abrirModalEliminar(c)
                    }
                  >
                    🗑 Eliminar
                  </Button>

                </td>

              </tr>

            ))

          )}

        </tbody>

      </Table>

    </div>

  );

};

export default TablaCliente;