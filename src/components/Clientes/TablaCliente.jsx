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

    <div className="table-responsive rounded-4 shadow overflow-hidden">

      <Table
        hover
        className="align-middle mb-0"
      >

        {/* HEADER */}
        <thead className="table-dark">

          <tr className="text-center">

            <th className="py-3">ID</th>
            <th className="py-3">Nombre</th>
            <th className="py-3">Teléfono</th>
            <th className="py-3">Dirección</th>
            <th className="py-3">Estado</th>
            <th className="py-3">Acciones</th>

          </tr>

        </thead>

        <tbody>

          {clientes.length === 0 ? (

            <tr>

              <td
                colSpan="6"
                className="text-center py-5 fw-semibold"
              >
                No hay clientes registrados
              </td>

            </tr>

          ) : (

            clientes.map((c) => (

              <tr key={c.id_cliente}>

                {/* ID */}
                <td className="text-center fw-bold">
                  #{c.id_cliente}
                </td>

                {/* NOMBRE */}
                <td className="fw-semibold">
                  👤 {c.nombre_cliente}
                </td>

                {/* TELÉFONO */}
                <td>
                  📞 {c.telefono}
                </td>

                {/* DIRECCIÓN */}
                <td>
                  📍 {c.direccion}
                </td>

                {/* ESTADO */}
                <td className="text-center">

                  <Badge
                    bg="success"
                    pill
                    className="px-3 py-2"
                  >
                    Activo
                  </Badge>

                </td>

                {/* ACCIONES */}
                <td className="text-center">

                  <div className="d-flex justify-content-center gap-2">

                    {/* EDITAR */}
                    <Button
                      variant="warning"
                      size="sm"
                      className="rounded-pill px-3 fw-semibold shadow-sm"
                      onClick={() =>
                        abrirModalEdicion(c)
                      }
                    >
                      ✏ Editar
                    </Button>

                    {/* ELIMINAR */}
                    <Button
                      variant="danger"
                      size="sm"
                      className="rounded-pill px-3 fw-semibold shadow-sm"
                      onClick={() =>
                        abrirModalEliminar(c)
                      }
                    >
                      🗑 Eliminar
                    </Button>

                  </div>

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