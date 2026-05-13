import React from "react";
import {
  Container,
  Form,
  Button,
  Card,
  InputGroup,
} from "react-bootstrap";

import {
  PersonFill,
  LockFill,
} from "react-bootstrap-icons";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../database/supabaseconfig";

const FormularioLogin = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();

  const manejarLogin = async (e) => {

    e.preventDefault();

    setErrorMsg("");

    const { error } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (error) {

      setErrorMsg(
        "Correo o contraseña incorrectos"
      );

    } else {

      navigate("/");

    }

  };

  return (

    <Container className="d-flex justify-content-center align-items-center vh-100">

      <Card
        className="border-0 shadow-lg overflow-hidden"
        style={{
          width: "420px",
          borderRadius: "28px",
          background: "rgba(255,255,255,0.97)",
          backdropFilter: "blur(12px)",
        }}
      >

        {/* HEADER */}

        <div
          className="text-center py-4"
          style={{
            background:
              "linear-gradient(135deg, #121b96, #2697cc)",
          }}
        >

          <div
            className="mx-auto d-flex align-items-center justify-content-center bg-white shadow"
            style={{
              width: "85px",
              height: "85px",
              borderRadius: "50%",
            }}
          >

            <i
              className="bi bi-person-fill"
              style={{
                fontSize: "2.7rem",
                color: "#1e3c72",
              }}
            ></i>

          </div>

          <h2
            className="fw-bold mt-3 mb-1"
            style={{
              color: "#fff",
            }}
          >
            Bienvenido
          </h2>

          <p
            className="mb-0"
            style={{
              color: "rgba(255,255,255,0.8)",
              fontSize: "14px",
            }}
          >
            Inicia sesión para continuar
          </p>

        </div>

        {/* BODY */}

        <Card.Body className="p-4">

          {errorMsg && (

            <div className="alert alert-danger text-center rounded-3">

              {errorMsg}

            </div>

          )}

          <Form onSubmit={manejarLogin}>

            {/* CORREO */}

            <Form.Group className="mb-4">

              <Form.Label
                className="fw-semibold"
                style={{
                  color: "#1e3c72",
                }}
              >
                Correo electrónico
              </Form.Label>

              <InputGroup>

                <InputGroup.Text
                  style={{
                    backgroundColor: "#eff6ff",
                    border:
                      "1px solid #dbeafe",
                    color: "#2563eb",
                    borderRadius:
                      "14px 0 0 14px",
                  }}
                >
                  <PersonFill />
                </InputGroup.Text>

                <Form.Control
                  type="email"
                  placeholder="ejemplo@email.com"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  required
                  style={{
                    border:
                      "1px solid #dbeafe",
                    borderLeft: "none",
                    borderRadius:
                      "0 14px 14px 0",
                    padding: "12px",
                    color: "#000",
                    backgroundColor: "#fff",
                    boxShadow: "none",
                  }}
                />

              </InputGroup>

            </Form.Group>

            {/* CONTRASEÑA */}

            <Form.Group className="mb-4">

              <Form.Label
                className="fw-semibold"
                style={{
                  color: "#1e3c72",
                }}
              >
                Contraseña
              </Form.Label>

              <InputGroup>

                <InputGroup.Text
                  style={{
                    backgroundColor: "#eff6ff",
                    border:
                      "1px solid #dbeafe",
                    color: "#2563eb",
                    borderRadius:
                      "14px 0 0 14px",
                  }}
                >
                  <LockFill />
                </InputGroup.Text>

                <Form.Control
                  type="password"
                  placeholder="********"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  required
                  style={{
                    border:
                      "1px solid #dbeafe",
                    borderLeft: "none",
                    borderRadius:
                      "0 14px 14px 0",
                    padding: "12px",
                    color: "#000",
                    backgroundColor: "#fff",
                    boxShadow: "none",
                  }}
                />

              </InputGroup>

            </Form.Group>

            {/* BOTON */}

            <Button
              type="submit"
              className="w-100 fw-bold border-0"
              style={{
                padding: "12px",
                borderRadius: "14px",
                background:
                  "linear-gradient(135deg, #121b96, #2697cc)",
                fontSize: "16px",
                transition: "0.3s ease",
              }}
            >
              <i className="bi bi-box-arrow-in-right me-2"></i>
              Ingresar
            </Button>

          </Form>

        </Card.Body>

      </Card>

    </Container>

  );

};

export default FormularioLogin;