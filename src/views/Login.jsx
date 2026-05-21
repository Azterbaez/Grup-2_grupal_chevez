import React, { useState } from "react";
import {Container,Row,Col,Card,Form,Button,Spinner,Alert,} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../src/database/supabaseconfig";

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
      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) throw error;

      localStorage.setItem("usuario-supabase", email);

      navigate("/");
    } catch (err) {
      setError("Correo o contraseña incorrectos");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">

      {/* FONDO */}
      <div className="login-overlay"></div>

      <Container className="min-vh-100 d-flex align-items-center justify-content-center position-relative">

        <Row className="w-100 justify-content-center">

          {/* PANEL IZQUIERDO */}
          <Col lg={5} className="d-none d-lg-flex align-items-center">

            <div className="text-white pe-5">

              <span className="badge bg-light text-dark px-3 py-2 mb-3 rounded-pill">
                Sistema Inteligente
              </span>

              <h1 className="fw-bold display-5 mb-3">
                Pulpería Chevez
              </h1>

              <p className="lead text-light opacity-75">
                Administra productos, ventas, categorías y reportes
                desde una sola plataforma moderna.
              </p>

              <div className="mt-4 d-flex gap-4 flex-wrap">

                <div>
                  <h3 className="fw-bold mb-0">+500</h3>
                  <small className="text-light opacity-75">
                    Ventas registradas
                  </small>
                </div>

                <div>
                  <h3 className="fw-bold mb-0">24/7</h3>
                  <small className="text-light opacity-75">
                    Acceso al sistema
                  </small>
                </div>

              </div>

            </div>

          </Col>

          {/* LOGIN */}
          <Col md={8} lg={4}>

            <Card className="border-0 shadow-lg rounded-4 glass-card">

              <Card.Body className="p-5">

                <div className="text-center mb-4">

                  <div className="logo-circle mx-auto mb-3">
                    <i className="bi bi-shop fs-2 text-white"></i>
                  </div>

                  <h2 className="fw-bold mb-1">
                    Bienvenido
                  </h2>

                  <p className="text-muted">
                    Inicia sesión para continuar
                  </p>

                </div>

                {error && (
                  <Alert variant="danger" className="rounded-3 text-center">
                    {error}
                  </Alert>
                )}

                <Form onSubmit={handleLogin}>

                  {/* EMAIL */}
                  <Form.Group className="mb-4">

                    <Form.Label className="fw-semibold">
                      Correo electrónico
                    </Form.Label>

                    <div className="input-icon">

                      <i className="bi bi-envelope"></i>

                      <Form.Control
                        type="email"
                        placeholder="correo@ejemplo.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="custom-input"
                      />

                    </div>

                  </Form.Group>

                  {/* PASSWORD */}
                  <Form.Group className="mb-4">

                    <Form.Label className="fw-semibold">
                      Contraseña
                    </Form.Label>

                    <div className="input-icon position-relative">

                      <i className="bi bi-lock"></i>

                      <Form.Control
                        type={showPassword ? "text" : "password"}
                        placeholder="********"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="custom-input pe-5"
                      />

                      <button
                        type="button"
                        className="password-btn"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        <i
                          className={`bi ${
                            showPassword
                              ? "bi-eye-slash"
                              : "bi-eye"
                          }`}
                        ></i>
                      </button>

                    </div>

                  </Form.Group>

                  {/* BOTON */}
                  <Button
                    type="submit"
                    className="w-100 login-btn py-3 fw-bold rounded-3"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Spinner
                          animation="border"
                          size="sm"
                          className="me-2"
                        />
                        Entrando...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-box-arrow-in-right me-2"></i>
                        Iniciar Sesión
                      </>
                    )}
                  </Button>

                </Form>

                {/* FOOTER */}
                <div className="text-center mt-4">

                  <small className="text-muted">
                    Sistema de Gestión • 2026
                  </small>

                </div>

              </Card.Body>

            </Card>

          </Col>

        </Row>

      </Container>

      {/* ESTILOS */}
      <style>{`

        .login-page{
          min-height:100vh;
          background:
            linear-gradient(rgba(15,23,42,.88), rgba(15,23,42,.88)),
            url("https://images.unsplash.com/photo-1556740749-887f6717d7e4?q=80&w=1600");
          background-size:cover;
          background-position:center;
          position:relative;
          overflow:hidden;
        }

        .glass-card{
          background: rgba(255,255,255,0.96);
          backdrop-filter: blur(12px);
        }

        .logo-circle{
          width:70px;
          height:70px;
          border-radius:50%;
          background: linear-gradient(135deg, #2563eb, #1d4ed8);
          display:flex;
          align-items:center;
          justify-content:center;
        }

        .custom-input{
          height:55px;
          border-radius:14px;
          padding-left:45px;
          border:1px solid #dbeafe;
          box-shadow:none !important;
        }

        .custom-input:focus{
          border-color:#2563eb;
        }

        .input-icon{
          position:relative;
        }

        .input-icon i{
          position:absolute;
          top:50%;
          left:15px;
          transform:translateY(-50%);
          color:#64748b;
          z-index:10;
        }

        .password-btn{
          position:absolute;
          top:50%;
          right:10px;
          transform:translateY(-50%);
          border:none;
          background:none;
          color:#64748b;
        }

        .login-btn{
          background: linear-gradient(135deg, #2563eb, #1d4ed8);
          border:none;
          transition:.3s;
        }

        .login-btn:hover{
          transform:translateY(-2px);
          opacity:.95;
        }

      `}</style>

    </div>
  );
};

export default Login;