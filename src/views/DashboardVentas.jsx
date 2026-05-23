import { useEffect, useState } from "react";
import {
    Container,
    Row,
    Col,
    Card,
    Spinner,
    Table,
    Badge
} from "react-bootstrap";

import { supabase } from "../database/supabaseconfig";

const DashboardVentas = () => {

    const [ventas, setVentas] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        cargarVentas();
    }, []);

    // =========================
    // CARGAR VENTAS
    // =========================

    const cargarVentas = async () => {

        try {

            setLoading(true);

            // VENTAS

            const { data: ventasData, error: ventasError } = await supabase
                .from("ventas")
                .select("*")
                .order("id_venta", { ascending: false });

            if (ventasError) {
                console.error("Error ventas:", ventasError);
                return;
            }


            const { data: productosData, error: productosError } = await supabase
                .from("productos")
                .select("*");

            if (productosError) {
                console.error("Error productos:", productosError);
                return;
            }

            // UNIR PRODUCTOS CON VENTAS

            const ventasCompletas = ventasData.map((venta) => {

                const producto = productosData.find(
                    (p) =>
                        String(p.id_producto) ===
                        String(venta.id_producto)
                );

                return {
                    ...venta,
                    producto: producto || null
                };
            });

            setVentas(ventasCompletas);

        } catch (err) {

            console.error("Error:", err);

        } finally {

            setLoading(false);
        }
    };

    // =========================
    // KPIs
    // =========================

    const totalIngresos = ventas.reduce(
        (acc, venta) => acc + Number(venta.total || 0),
        0
    );

    const totalVentas = ventas.length;

    const totalProductos = ventas.reduce(
        (acc, venta) => acc + Number(venta.cantidad || 0),
        0
    );

    return (

        <div className="dashboard-bg py-5">

            <Container>

                {/* HEADER */}

                <div className="mb-5">

                    <Badge bg="primary" className="px-3 py-2 rounded-pill mb-3">
                        PANEL ADMINISTRATIVO
                    </Badge>

                    <h1 className="fw-bold text-white display-5">
                        Dashboard de Ventas
                    </h1>

                    <p className="text-light opacity-75">
                        Visualiza estadísticas, ingresos y rendimiento de tu negocio
                    </p>

                </div>

                {loading ? (

                    <div className="text-center py-5">

                        <Spinner animation="border" variant="light" />

                        <p className="mt-3 text-light">
                            Cargando datos...
                        </p>

                    </div>

                ) : (

                    <>

                        {/* KPI */}

                        {/* KPI */}

                        <Row className="g-4 mb-5">

                            <Col md={4}>

                                <Card className="kpi-card ingresos-card border-0 shadow-lg rounded-4">

                                    <Card.Body>

                                        <div className="d-flex justify-content-between align-items-center">

                                            <div>

                                                <p
                                                    className="mb-2 fw-semibold"
                                                    style={{
                                                        color: "#111827",
                                                        letterSpacing: "1px",
                                                        fontSize: ".85rem"
                                                    }}
                                                >
                                                    INGRESOS TOTALES
                                                </p>

                                                <h2
                                                    className="fw-bold mb-0"
                                                    style={{
                                                        color: "#000"
                                                    }}
                                                >
                                                    C$ {totalIngresos.toFixed(2)}
                                                </h2>

                                            </div>

                                            <div className="icon-circle">
                                                💰
                                            </div>

                                        </div>

                                    </Card.Body>

                                </Card>

                            </Col>

                            <Col md={4}>

                                <Card className="kpi-card ventas-card border-0 shadow-lg rounded-4">

                                    <Card.Body>

                                        <div className="d-flex justify-content-between align-items-center">

                                            <div>

                                                <p
                                                    className="mb-2 fw-semibold"
                                                    style={{
                                                        color: "#111827",
                                                        letterSpacing: "1px",
                                                        fontSize: ".85rem"
                                                    }}
                                                >
                                                    TOTAL DE VENTAS
                                                </p>

                                                <h2
                                                    className="fw-bold mb-0"
                                                    style={{
                                                        color: "#000"
                                                    }}
                                                >
                                                    {totalVentas}
                                                </h2>

                                            </div>

                                            <div className="icon-circle">
                                                📊
                                            </div>

                                        </div>

                                    </Card.Body>

                                </Card>

                            </Col>

                            <Col md={4}>

                                <Card className="kpi-card productos-card border-0 shadow-lg rounded-4">

                                    <Card.Body>

                                        <div className="d-flex justify-content-between align-items-center">

                                            <div>

                                                <p
                                                    className="mb-2 fw-semibold"
                                                    style={{
                                                        color: "#111827",
                                                        letterSpacing: "1px",
                                                        fontSize: ".85rem"
                                                    }}
                                                >
                                                    PRODUCTOS VENDIDOS
                                                </p>

                                                <h2
                                                    className="fw-bold mb-0"
                                                    style={{
                                                        color: "#000"
                                                    }}
                                                >
                                                    {totalProductos}
                                                </h2>

                                            </div>

                                            <div className="icon-circle">
                                                📦
                                            </div>

                                        </div>

                                    </Card.Body>

                                </Card>

                            </Col>

                        </Row>

                        {/* TABLA */}

                        <Card className="border-0 rounded-4 shadow-lg table-card">

                            <Card.Body className="p-4">

                                <div className="d-flex justify-content-between align-items-center mb-4">

                                    <div>

                                        <h4 className="fw-bold mb-1">
                                            Historial de Ventas
                                        </h4>

                                        <p className="text-muted mb-0">
                                            Últimos registros almacenados
                                        </p>

                                    </div>

                                </div>

                                <Table responsive hover className="align-middle custom-table">

                                    <thead>

                                        <tr>

                                            <th>ID</th>
                                            <th>Producto</th>
                                            <th>Categoría</th>
                                            <th>Cantidad</th>
                                            <th>Total</th>
                                            <th>Estado</th>

                                        </tr>

                                    </thead>

                                    <tbody>

                                        {ventas.map((venta) => (

                                            <tr key={venta.id_venta}>

                                                <td>
                                                    <span className="fw-semibold">
                                                        #{venta.id_venta}
                                                    </span>
                                                </td>

                                                <td>

                                                    <div className="d-flex align-items-center gap-2">

                                                        {venta.producto?.url_imagen ? (

                                                            <img
                                                                src={venta.producto.url_imagen}
                                                                alt={venta.producto.nombre_producto}
                                                                style={{
                                                                    width: "50px",
                                                                    height: "50px",
                                                                    objectFit: "cover",
                                                                    borderRadius: "12px"
                                                                }}
                                                            />

                                                        ) : (

                                                            <div
                                                                className="bg-light d-flex align-items-center justify-content-center"
                                                                style={{
                                                                    width: "50px",
                                                                    height: "50px",
                                                                    borderRadius: "12px"
                                                                }}
                                                            >
                                                                📦
                                                            </div>

                                                        )}

                                                        <span className="fw-semibold">
                                                            {venta.producto?.nombre_producto || "Sin producto"}
                                                        </span>

                                                    </div>

                                                </td>

                                                <td>

                                                    <Badge bg="primary" className="px-3 py-2 rounded-pill">

                                                        {venta.producto?.categoria_producto || "Sin categoría"}

                                                    </Badge>

                                                </td>

                                                <td>

                                                    <Badge bg="info" className="px-3 py-2 rounded-pill">
                                                        {venta.cantidad}
                                                    </Badge>

                                                </td>

                                                <td className="fw-bold text-success">

                                                    C$ {Number(venta.total).toFixed(2)}

                                                </td>

                                                <td>

                                                    <Badge bg="success" className="px-3 py-2 rounded-pill">
                                                        Completada
                                                    </Badge>

                                                </td>

                                            </tr>

                                        ))}

                                    </tbody>

                                </Table>

                            </Card.Body>

                        </Card>

                    </>

                )}

            </Container>

            {/* ESTILOS */}

            <style>{`

  .dashboard-bg{
    min-height:100vh;
    background:
      linear-gradient(135deg,#0b1120,#111827,#1e293b);
  }

  .kpi-card{
    overflow:hidden;
    transition:.3s;
    border:none;
  }

  .kpi-card:hover{
    transform:translateY(-6px);
  }

  .ingresos-card{
    background:linear-gradient(135deg,#0f766e,#14b8a6);
  }

  .ventas-card{
    background:linear-gradient(135deg,#1d4ed8,#3b82f6);
  }

  .productos-card{
    background:linear-gradient(135deg,#4338ca,#6366f1);
  }


  .icon-circle{
    width:62px;
    height:62px;
    border-radius:18px;
    background:rgba(255,255,255,.12);
    display:flex;
    align-items:center;
    justify-content:center;
    font-size:1.6rem;
    backdrop-filter:blur(6px);
  }

  .table-card{
    background:#ffffff;
    border:1px solid #e2e8f0;
  }

  .custom-table thead{
    background:#f8fafc;
  }

  .custom-table thead th{
    border:none;
    padding:16px;
    color:#0f172a;
    font-weight:700;
    font-size:.95rem;
  }

  .custom-table tbody td{
    padding:16px;
    border-color:#e2e8f0;
    vertical-align:middle;
  }

  .custom-table tbody tr{
    transition:.2s ease;
  }

  .custom-table tbody tr:hover{
    background:#f8fafc;
  }

  .badge{
    font-size:.85rem;
    font-weight:600;
  }

  h1,h2,h3,h4,h5{
    letter-spacing:-0.5px;
  }

`}</style>

        </div>
    );
};

export default DashboardVentas;