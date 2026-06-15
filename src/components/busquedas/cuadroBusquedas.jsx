import React from "react";
import { Form, InputGroup } from "react-bootstrap";

const CuadroBusquedas = ({
  textoBusqueda,
  textBusqueda,
  manejarCambioBusqueda,
  placeholder = "Buscar...",
}) => {
  const valor = textoBusqueda ?? textBusqueda ?? "";

  return (
    <InputGroup
      style={{ width: "100%", borderRadius: "0.375rem" }}
      className="shadow-sm"
    >
      <InputGroup.Text>
        <i className="bi bi-search" aria-hidden />
      </InputGroup.Text>
      <Form.Control
        type="text"
        placeholder={placeholder}
        value={valor}
        onChange={manejarCambioBusqueda}
        aria-label={placeholder}
      />
    </InputGroup>
  );
};

export default CuadroBusquedas;
