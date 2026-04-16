import React from "react";
import { Table, Button } from "react-bootstrap";

const TablaCliente = ({ clientes, abrirModalEdicion, abrirModalEliminar }) => {
  return (
    <Table striped hover responsive>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Teléfono</th>
          <th>Dirección</th>
          <th>Acciones</th>
        </tr>
      </thead>

      <tbody>
        {clientes.map((c) => (
          <tr key={c.id_cliente}>
            <td>{c.id_cliente}</td>
            <td>{c.nombre}</td>
            <td>{c.telefono}</td>
            <td>{c.direccion}</td>
            <td>
              <Button
                variant="warning"
                size="sm"
                onClick={() => abrirModalEdicion(c)}
              >
                Editar
              </Button>{" "}

              <Button
                variant="danger"
                size="sm"
                onClick={() => abrirModalEliminar(c)}
              >
                Eliminar
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default TablaCliente;