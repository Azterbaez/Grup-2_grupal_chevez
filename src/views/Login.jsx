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
  InputGroup
} from "react-bootstrap";

import { useNavigate } from "react-router-dom";

import { supabase } from "../../src/database/supabaseconfig";

const Login = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  // =========================================
  // LOGIN
  // =========================================

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
        password
      });

      if (error) throw error;

      localStorage.setItem(
        "usuario-supabase",
        email
      );

      navigate("/");

    } catch (err) {

      setError(
        "Correo o contraseña incorrectos"
      );

    } finally {

      setLoading(false);
    }
  };

  return (

    <div className="login-page">

      {/* FONDO ANIMADO */}

      <div className="background-blur blur-1"></div>
      <div className="background-blur blur-2"></div>
      <div className="background-blur blur-3"></div>

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

          {/* LOGIN */}

          <Col md={9} lg={4}>

            <Card className="login-card border-0">

              <Card.Body className="p-5">

                {/* LOGO */}

                <div className="text-center mb-4">

                  <div className="logo-wrapper mx-auto mb-4">

                    <div className="logo-circle">

                      <i className="bi bi-shop-window"></i>

                    </div>

                  </div>

                  <h2 className="fw-bold mb-2">
                    Bienvenido
                  </h2>

                  <p className="text-muted mb-0">
                    Inicia sesión para continuar
                  </p>

                </div>

                {/* ERROR */}

                {error && (

                  <Alert
                    variant="danger"
                    className="rounded-4 border-0 text-center shadow-sm"
                  >

                    <i className="bi bi-exclamation-triangle-fill me-2"></i>

                    {error}

                  </Alert>

                )}

                {/* FORM */}

                <Form onSubmit={handleLogin}>

                  {/* EMAIL */}

                  <Form.Group className="mb-4">

                    <Form.Label className="fw-semibold mb-2">

                      Correo Electrónico

                    </Form.Label>

                    <InputGroup>

                      <InputGroup.Text className="input-icon-box">

                        <i className="bi bi-envelope-fill"></i>

                      </InputGroup.Text>

                      <Form.Control
                        type="email"
                        placeholder="correo@ejemplo.com"
                        value={email}
                        onChange={(e) =>
                          setEmail(e.target.value)
                        }
                        className="custom-input"
                      />

                    </InputGroup>

                  </Form.Group>

                  {/* PASSWORD */}

                  <Form.Group className="mb-4">

                    <Form.Label className="fw-semibold mb-2">

                      Contraseña

                    </Form.Label>

                    <InputGroup>

                      <InputGroup.Text className="input-icon-box">

                        <i className="bi bi-lock-fill"></i>

                      </InputGroup.Text>

                      <Form.Control
                        type={
                          showPassword
                            ? "text"
                            : "password"
                        }
                        placeholder="********"
                        value={password}
                        onChange={(e) =>
                          setPassword(e.target.value)
                        }
                        className="custom-input"
                      />

                      <Button
                        variant="light"
                        className="show-btn"
                        onClick={() =>
                          setShowPassword(!showPassword)
                        }
                      >

                        <i
                          className={`bi ${
                            showPassword
                              ? "bi-eye-slash-fill"
                              : "bi-eye-fill"
                          }`}
                        ></i>

                      </Button>

                    </InputGroup>

                  </Form.Group>

                  {/* BOTON */}

                  <Button
                    type="submit"
                    disabled={loading}
                    className="login-btn w-100 py-3 fw-bold rounded-4"
                  >

                    {loading ? (

                      <>

                        <Spinner
                          animation="border"
                          size="sm"
                          className="me-2"
                        />

                        Ingresando...

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

                  <small className="footer-text">

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

        *{
          font-family: 'Inter', sans-serif;
        }

        .login-page{
          min-height:100vh;
          background:
          linear-gradient(
            135deg,
            #020617 0%,
            #0f172a 45%,
            #111827 100%
          );
          overflow:hidden;
          position:relative;
        }

        .background-blur{
          position:absolute;
          border-radius:50%;
          filter:blur(100px);
          opacity:.35;
        }

        .blur-1{
          width:350px;
          height:350px;
          background:#2563eb;
          top:-80px;
          left:-80px;
        }

        .blur-2{
          width:300px;
          height:300px;
          background:#7c3aed;
          bottom:-100px;
          right:-50px;
        }

        .blur-3{
          width:250px;
          height:250px;
          background:#06b6d4;
          top:50%;
          left:45%;
        }

        .hero-content{
          color:white;
          padding-right:40px;
          animation:fadeUp .8s ease;
        }

        .hero-badge{
          display:inline-flex;
          align-items:center;
          gap:10px;
          padding:10px 18px;
          border-radius:999px;
          background:rgba(255,255,255,.08);
          backdrop-filter:blur(10px);
          margin-bottom:30px;
          font-weight:600;
          border:1px solid rgba(255,255,255,.08);
        }

        .badge-dot{
          width:10px;
          height:10px;
          border-radius:50%;
          background:#22c55e;
          box-shadow:0 0 10px #22c55e;
        }

        .hero-title{
          font-size:4.5rem;
          font-weight:800;
          line-height:1;
          margin-bottom:25px;
        }

        .hero-description{
          color:rgba(255,255,255,.7);
          font-size:1.15rem;
          line-height:1.8;
          max-width:520px;
        }

        .hero-stats{
          display:flex;
          gap:20px;
          flex-wrap:wrap;
          margin-top:45px;
        }

        .stat-card{
          min-width:150px;
          padding:22px;
          border-radius:24px;
          background:rgba(255,255,255,.06);
          backdrop-filter:blur(16px);
          border:1px solid rgba(255,255,255,.08);
          transition:.3s ease;
        }

        .stat-card:hover{
          transform:translateY(-5px);
          background:rgba(255,255,255,.08);
        }

        .stat-card h2{
          font-weight:800;
          margin-bottom:5px;
        }

        .stat-card p{
          margin:0;
          color:rgba(255,255,255,.65);
        }

        .login-card{
          border-radius:32px;
          background:rgba(255,255,255,.97);
          backdrop-filter:blur(18px);
          box-shadow:
          0 20px 60px rgba(0,0,0,.35);
          animation:fadeUp .8s ease;
        }

        .logo-wrapper{
          width:90px;
          height:90px;
          border-radius:50%;
          background:
          linear-gradient(
            135deg,
            rgba(37,99,235,.15),
            rgba(59,130,246,.05)
          );
          display:flex;
          align-items:center;
          justify-content:center;
        }

        .logo-circle{
          width:70px;
          height:70px;
          border-radius:50%;
          background:
          linear-gradient(
            135deg,
            #2563eb,
            #1d4ed8
          );
          display:flex;
          align-items:center;
          justify-content:center;
          color:white;
          font-size:1.8rem;
          box-shadow:
          0 10px 25px rgba(37,99,235,.35);
        }

        .input-icon-box{
          border:none;
          background:#f1f5f9;
          color:#64748b;
          border-radius:16px 0 0 16px;
          padding:0 18px;
        }

        .custom-input{
          height:58px;
          border:none;
          background:#f1f5f9;
          box-shadow:none !important;
          font-weight:500;
          border-radius:0 16px 16px 0 !important;
        }

        .custom-input:focus{
          background:#eef4ff;
        }

        .show-btn{
          border:none !important;
          background:#f1f5f9 !important;
          color:#64748b !important;
          border-radius:0 16px 16px 0 !important;
          padding:0 18px;
        }

        .login-btn{
          border:none;
          background:
          linear-gradient(
            135deg,
            #2563eb,
            #1d4ed8
          );
          transition:.3s ease;
          font-size:1rem;
          letter-spacing:.3px;
          box-shadow:
          0 10px 25px rgba(37,99,235,.35);
        }

        .login-btn:hover{
          transform:translateY(-3px);
          opacity:.95;
        }

        .footer-text{
          color:#64748b;
          font-weight:500;
        }

        @keyframes fadeUp{

          from{
            opacity:0;
            transform:translateY(30px);
          }

          to{
            opacity:1;
            transform:translateY(0);
          }

        }

        @media(max-width:992px){

          .login-card{
            border-radius:28px;
          }

        }

      `}</style>

    </div>
  );
};

export default Login;