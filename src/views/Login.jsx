import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Spinner,
  Alert,
  InputGroup,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { supabase } from "../database/supabaseconfig";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.includes("@")) {
      setError("Ingresa un correo válido");
      return;
    }

    if (password.length < 4) {
      setError("La contraseña es muy corta");
      return;
    }

    setLoading(true);

    try {
      const { error: authError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (authError) throw authError;

      localStorage.setItem("usuario-supabase", email);
      navigate("/");
    } catch {
      setError("Correo o contraseña incorrectos");
    } finally {
      setLoading(false);
    }
  };

  return (

<div
  className="login-page"
  style={{
    backgroundImage:
      'linear-gradient(rgba(15,41,34,0.55), rgba(15,41,34,0.55)), url("https://www.shutterstock.com/image-photo/young-woman-pushing-shopping-cart-260nw-2633121861.jpg")',
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    minHeight: "100vh",
  }}
> 
  



      <Container fluid className="min-vh-100 d-flex align-items-center justify-content-center position-relative px-4">

        <Row className="w-100 justify-content-center align-items-center g-5">

          {/* PANEL IZQUIERDO */}

          <Col lg={6} className="d-none d-lg-block">

            <div className="hero-content">

              <div className="hero-badge">

                <span className="badge-dot"></span>

                Sistema Premium

              </div>

              <h1 className="hero-title">
                Pulpería
                <br />
                Chevez
              </h1>

              <p className="hero-description">

                Controla productos, ventas,
                inventario y estadísticas desde
                una plataforma moderna,
                elegante y profesional.

              </p>

              <div className="hero-stats">

                <div className="stat-card">

                  <h2>+500</h2>

                  <p>
                    Ventas registradas
                  </p>

                </div>

                <div className="stat-card">

                  <h2>24/7</h2>

                  <p>
                    Acceso al sistema
                  </p>

                </div>

                <div className="stat-card">

                  <h2>100%</h2>

                  <p>
                    Seguro y confiable
                  </p>

                </div>

              </div>

            </div>

          </Col>
          {/* PANEL DERECHO */}

          <Col lg={6} className="login-panel-form">
            <Card className="login-card border-0">
              <Card.Body>
                <div className="text-center mb-4">
                  <h2 className="mb-2">Iniciar sesión</h2>
                  <p className="text-muted mb-0 login-footer-note">
                    Ingresa con tu cuenta de empleado
                  </p>
                </div>

                {error && (
                  <Alert variant="danger" className="py-2 small border-0">
                    <i className="bi bi-exclamation-circle me-2" aria-hidden />
                    {error}
                  </Alert>
                )}

                <Form onSubmit={handleLogin}>
                  <Form.Group className="mb-3">
                    <Form.Label>Correo electrónico</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <i className="bi bi-envelope" aria-hidden />
                      </InputGroup.Text>
                      <Form.Control
                        type="email"
                        placeholder="correo@ejemplo.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="email"
                      />
                    </InputGroup>
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label>Contraseña</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <i className="bi bi-lock" aria-hidden />
                      </InputGroup.Text>
                      <Form.Control
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="current-password"
                      />
                      <Button
                        type="button"
                        variant="outline-secondary"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={
                          showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
                        }
                      >
                        <i
                          className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"
                            }`}
                          aria-hidden
                        />
                      </Button>
                    </InputGroup>
                  </Form.Group>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="login-btn-submit w-100"
                  >
                    {loading ? (
                      <>
                        <Spinner animation="border" size="sm" className="me-2" />
                        Ingresando…
                      </>
                    ) : (
                      "Entrar al sistema"
                    )}
                  </Button>
                </Form>

                <p className="text-center login-footer-note mt-4 mb-0">
                  Pulpería Don Chevez · {new Date().getFullYear()}
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
