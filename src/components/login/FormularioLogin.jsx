import React from "react";
import {Container, Form, Button, Card, Alert, InputGroup } from "react-bootstrap";
import { PersonFill, LockFill } from "react-bootstrap-icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../assets/database/supabaseconfig";


const FormularioLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const manejarLogin = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrorMsg("Correo o contraseña incorrectos");
    } else {
      navigate("/");
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card className="shadow-lg p-4 rounded-4 login-card" style={{ width: "400px" }}>
        <Card.Body>
          <h3 className="text-center mb-4 fw-bold">Iniciar Sesión</h3>

          {errorMsg && (
            <div className="alert alert-danger text-center">
              {errorMsg}
            </div>
          )}

          <Form onSubmit={manejarLogin}>
            <Form.Group className="mb-3">
              <Form.Label>Correo electrónico</Form.Label>
              <InputGroup>
                <InputGroup.Text>
                  <PersonFill />
                </InputGroup.Text>
                <Form.Control
                  type="email"
                  placeholder="ejemplo@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </InputGroup>
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Contraseña</Form.Label>
              <InputGroup>
                <InputGroup.Text>
                  <LockFill />
                </InputGroup.Text>
                <Form.Control
                  type="password"
                  placeholder="********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </InputGroup>
            </Form.Group>

            <Button
              type="submit"
              className="w-100 rounded-3 fw-semibold"
              variant="dark"
            >
              Ingresar
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};
export default FormularioLogin;