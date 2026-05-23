import React from "react";
import {
  Container,
  Row,
  Col
} from "react-bootstrap";

const Inicio = () => {

  return (

    <Container fluid className="p-0">

      {/* HERO SECTION */}

      <section
        className="hero-section d-flex align-items-center"
      >

        {/* EFECTOS */}

        <div className="circulo circulo-1"></div>
        <div className="circulo circulo-2"></div>
        <div className="circulo circulo-3"></div>

        <Container className="position-relative">

          <Row className="justify-content-center">

            <Col lg={9} className="text-center">

              <div className="badge-custom mb-4">
                ✨ Sistema Inteligente de Gestión
              </div>

              <h1 className="titulo-principal mb-4">

                Administra tu negocio
                <span className="texto-gradient">
                  {" "}de forma moderna
                </span>

              </h1>

              <p className="descripcion-principal mx-auto">

                Gestiona productos, categorías,
                ventas e inventario desde una sola
                plataforma rápida, elegante y eficiente.
                Mantén el control total de tu negocio
                en tiempo real y mejora tu productividad
                con una experiencia moderna y profesional.

              </p>

              <div className="stats-container">

                <div className="stat-card">

                  <h2>100%</h2>

                  <span>
                    Organización
                  </span>

                </div>

                <div className="stat-card">

                  <h2>24/7</h2>

                  <span>
                    Control Total
                  </span>

                </div>

                <div className="stat-card">

                  <h2>⚡</h2>

                  <span>
                    Gestión Rápida
                  </span>

                </div>

              </div>

            </Col>

          </Row>

        </Container>

      </section>

      {/* ESTILOS */}

      <style>
        {`

          .hero-section{
            min-height:100vh;
            background:
              linear-gradient(
                135deg,
                #020617 0%,
                #0f172a 40%,
                #1e293b 100%
              );
            overflow:hidden;
            position:relative;
          }

          .titulo-principal{
            font-size:4.5rem;
            font-weight:800;
            color:white;
            line-height:1.15;
            letter-spacing:-2px;
          }

          .texto-gradient{
            background:linear-gradient(
              90deg,
              #38bdf8,
              #22c55e,
              #06b6d4
            );
            -webkit-background-clip:text;
            -webkit-text-fill-color:transparent;
          }

          .descripcion-principal{
            color:rgba(255,255,255,0.75);
            font-size:1.25rem;
            line-height:2;
            max-width:850px;
          }

          .badge-custom{
            display:inline-block;
            background:rgba(255,255,255,0.08);
            border:1px solid rgba(255,255,255,0.1);
            color:#e2e8f0;
            padding:12px 24px;
            border-radius:50px;
            font-weight:600;
            backdrop-filter:blur(10px);
          }

          .stats-container{
            margin-top:60px;
            display:flex;
            justify-content:center;
            gap:25px;
            flex-wrap:wrap;
          }

          .stat-card{
            width:200px;
            padding:30px 20px;
            border-radius:28px;
            background:rgba(255,255,255,0.06);
            border:1px solid rgba(255,255,255,0.08);
            backdrop-filter:blur(14px);
            transition:0.4s;
          }

          .stat-card:hover{
            transform:translateY(-8px) scale(1.03);
            background:rgba(255,255,255,0.1);
          }

          .stat-card h2{
            color:white;
            font-size:2.7rem;
            font-weight:800;
            margin-bottom:10px;
          }

          .stat-card span{
            color:#cbd5e1;
            font-size:1rem;
          }

          .circulo{
            position:absolute;
            border-radius:50%;
            filter:blur(90px);
            opacity:0.35;
          }

          .circulo-1{
            width:350px;
            height:350px;
            background:#06b6d4;
            top:-100px;
            left:-100px;
          }

          .circulo-2{
            width:300px;
            height:300px;
            background:#22c55e;
            bottom:-120px;
            right:-80px;
          }

          .circulo-3{
            width:250px;
            height:250px;
            background:#3b82f6;
            top:50%;
            left:50%;
            transform:translate(-50%,-50%);
          }

          @media(max-width:992px){

            .titulo-principal{
              font-size:3.2rem;
            }

            .descripcion-principal{
              font-size:1.1rem;
              line-height:1.8;
            }

          }

          @media(max-width:576px){

            .titulo-principal{
              font-size:2.5rem;
            }

            .stat-card{
              width:100%;
            }

          }

        `}
      </style>

    </Container>
  );
};

export default Inicio;