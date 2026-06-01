import React from "react";
import { Table, Button, Badge } from "react-bootstrap";

const TablaVentas = ({
  ventas,
  abrirEdicion
}) => {

  return (

    <Table
      striped
      hover
      responsive
      size="sm"
      className="align-middle"
    >

      <thead className="table-dark">

        <tr>

          <th>ID</th>

          <th>Fecha</th>

          <th>Cliente</th>

          <th>Empleado</th>

          <th>Pago</th>

          <th className="text-end">
            Total
          </th>

          <th className="text-center">
            Acciones
          </th>

        </tr>

      </thead>

      <tbody>

        {ventas.length > 0 ? (

          ventas.map((venta) => (

            <tr key={venta.id_venta}>

              <td className="fw-bold text-primary">

                #{venta.id_venta}

              </td>

              <td>

                {
                  venta.fecha
                    ? new Date(
                        venta.fecha
                      ).toLocaleString(
                        "es-NI"
                      )
                    : "Sin fecha"
                }

              </td>

              <td>

                {
                  venta.clientes
                    ?.nombre_cliente || ""
                }{" "}

                {
                  venta.clientes
                    ?.apellido_cliente || ""
                }

              </td>

              <td>

                {
                  venta.empleados
                    ?.nombre_empleado || ""
                }{" "}

                {
                  venta.empleados
                    ?.apellido_empleado || ""
                }

              </td>

              <td>

                <Badge bg="info">

                  {
                    venta.metodo_pago ||
                    "Sin método"
                  }

                </Badge>

              </td>

              <td className="text-end fw-bold text-success">

                C${" "}

                {
                  parseFloat(
                    venta.total || 0
                  ).toFixed(2)
                }

              </td>

              <td className="text-center">

                <Button
                  variant="outline-warning"
                  size="sm"
                  onClick={() =>
                    abrirEdicion(venta)
                  }
                >

                  <i className="bi bi-pencil"></i>

                </Button>

              </td>

            </tr>

          ))

        ) : (

          <tr>

            <td
              colSpan={7}
              className="text-center py-4 text-muted"
            >

              No hay ventas registradas

            </td>

          </tr>

        )}

      </tbody>

    </Table>

  );

};

export default TablaVentas;