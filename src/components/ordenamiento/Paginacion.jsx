import React, { useEffect } from "react";
import Pagination from "react-bootstrap/Pagination";
import { Row, Col, Form } from "react-bootstrap";

const Paginacion = ({
  registrosPorPagina,
  totalRegistros,
  paginaActual,
  establecerPaginaActual,
  establecerRegistrosPorPagina,
}) => {
  const totalPaginas = Math.max(
    1,
    Math.ceil(totalRegistros / registrosPorPagina)
  );

  const paginaSegura = Math.min(
    Math.max(1, paginaActual),
    totalPaginas
  );

  useEffect(() => {
    if (paginaActual !== paginaSegura) {
      establecerPaginaActual(paginaSegura);
    }
  }, [
    paginaActual,
    paginaSegura,
    establecerPaginaActual,
  ]);

  if (totalRegistros === 0) {
    return null;
  }

  const cambiarPagina = (numeroPagina) => {
    if (
      numeroPagina >= 1 &&
      numeroPagina <= totalPaginas
    ) {
      establecerPaginaActual(numeroPagina);
    }
  };

  const cambiarCantidadRegistros = (evento) => {
    establecerRegistrosPorPagina(
      Number(evento.target.value)
    );
    establecerPaginaActual(1);
  };

  const inicioRegistro =
    (paginaSegura - 1) * registrosPorPagina + 1;

  const finRegistro = Math.min(
    paginaSegura * registrosPorPagina,
    totalRegistros
  );

  const maximoPaginasAMostrar = 5;
  let paginaInicio = Math.max(
    1,
    paginaSegura -
      Math.floor(maximoPaginasAMostrar / 2)
  );
  let paginaFin = Math.min(
    totalPaginas,
    paginaInicio + maximoPaginasAMostrar - 1
  );

  if (
    paginaFin - paginaInicio + 1 <
    maximoPaginasAMostrar
  ) {
    paginaInicio = Math.max(
      1,
      paginaFin - maximoPaginasAMostrar + 1
    );
  }

  const elementosPaginacion = [];

  for (
    let numeroPagina = paginaInicio;
    numeroPagina <= paginaFin;
    numeroPagina++
  ) {
    elementosPaginacion.push(
      <Pagination.Item
        key={numeroPagina}
        active={numeroPagina === paginaSegura}
        onClick={() =>
          cambiarPagina(numeroPagina)
        }
      >
        {numeroPagina}
      </Pagination.Item>
    );
  }

  return (
    <div className="paginacion-bar mt-4">
      <Row className="align-items-center g-3">
        <Col
          xs={12}
          md="auto"
          className="paginacion-resumen"
        >
          <span>
            Mostrando{" "}
            <strong>
              {inicioRegistro}-{finRegistro}
            </strong>{" "}
            de{" "}
            <strong>{totalRegistros}</strong>
          </span>
        </Col>

        <Col
          xs={12}
          md="auto"
          className="d-flex align-items-center gap-2"
        >
          <Form.Label
            htmlFor="registros-por-pagina"
            className="mb-0 paginacion-etiqueta"
          >
            Por página
          </Form.Label>
          <Form.Select
            id="registros-por-pagina"
            size="sm"
            className="paginacion-select"
            value={registrosPorPagina}
            onChange={cambiarCantidadRegistros}
          >
            <option value={5}>5</option>
            <option value={8}>8</option>
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </Form.Select>
        </Col>

        <Col className="d-flex justify-content-md-end justify-content-center">
          <Pagination className="paginacion-controles mb-0">
            <Pagination.First
              onClick={() => cambiarPagina(1)}
              disabled={paginaSegura === 1}
            />
            <Pagination.Prev
              onClick={() =>
                cambiarPagina(paginaSegura - 1)
              }
              disabled={paginaSegura === 1}
            />

            {paginaInicio > 1 && (
              <Pagination.Ellipsis disabled />
            )}

            {elementosPaginacion}

            {paginaFin < totalPaginas && (
              <Pagination.Ellipsis disabled />
            )}

            <Pagination.Next
              onClick={() =>
                cambiarPagina(paginaSegura + 1)
              }
              disabled={
                paginaSegura === totalPaginas
              }
            />
            <Pagination.Last
              onClick={() =>
                cambiarPagina(totalPaginas)
              }
              disabled={
                paginaSegura === totalPaginas
              }
            />
          </Pagination>
        </Col>
      </Row>
    </div>
  );
};

export default Paginacion;
