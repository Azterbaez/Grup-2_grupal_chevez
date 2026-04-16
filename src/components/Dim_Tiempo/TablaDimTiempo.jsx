import React, { useState, useEffect } from "react";
import { Table, Spinner, Button } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";

const TablaDimTiempo = ({
  tiempos,
  abrirModalEdicion,
  abrirModalEliminacion
}) => {

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (tiempos && tiempos.length > 0) {
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [tiempos]);

  return (
    <>
      {loading ? (
        <div className="text-center">
          <h4>Cargando fechas...</h4>
          <Spinner animation="border" variant="success" role="status" />
        </div>
      ) : (
        <Table striped borderless hover responsive size="sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>Fecha</th>
              <th>Mes</th>
              <th>Año</th>
              <th className="text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {tiempos.map((tiempo) => (
              <tr key={tiempo.id_tiempo}>
                <td>{tiempo.id_tiempo}</td>
                <td>{tiempo.fecha}</td>
                <td>{tiempo.mes}</td>
                <td>{tiempo.anio}</td>
                <td className="text-center">
                  <Button
                    variant="outline-warning"
                    size="sm"
                    className="m-1"
                    onClick={() => abrirModalEdicion(tiempo)}
                  >
                    <i className="bi bi-pencil"></i>
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => abrirModalEliminacion(tiempo)}
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

export default TablaDimTiempo;