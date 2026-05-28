import { useEffect, useState } from "react";

import {
    Container,
    Row,
    Col,
    Card,
    Spinner,
    Table,
    Badge,
    Button
} from "react-bootstrap";

import {
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Tooltip,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid
} from "recharts";

import * as XLSX from "xlsx";

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

    // =========================
    // DATOS GRÁFICOS
    // =========================

    const ventasPorCategoria = [];

    ventas.forEach((venta) => {

        const categoria =
            venta.producto?.categoria_producto || "Sin categoría";

        const existente = ventasPorCategoria.find(
            (item) => item.name === categoria
        );

        if (existente) {

            existente.total += Number(venta.total || 0);

        } else {

            ventasPorCategoria.push({
                name: categoria,
                total: Number(venta.total || 0)
            });
        }
    });

    const colores = [
        "#3b82f6",
        "#14b8a6",
        "#8b5cf6",
        "#f59e0b",
        "#ef4444"
    ];

    // =========================
    // EXPORTAR EXCEL
    // =========================

    const descargarExcel = () => {

        const datos = ventas.map((venta) => ({
            ID: venta.id_venta,
            Producto: venta.producto?.nombre_producto,
            Categoria: venta.producto?.categoria_producto,
            Cantidad: venta.cantidad,
            Total: venta.total
        }));

        const hoja = XLSX.utils.json_to_sheet(datos);

        const libro = XLSX.utils.book_new();

        XLSX.utils.book_append_sheet(
            libro,
            hoja,
            "Ventas"
        );

        XLSX.writeFile(
            libro,
            "Reporte_Ventas.xlsx"
        );
    };

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

                    <Button
                        onClick={descargarExcel}
                        className="mt-3 rounded-4 px-4 fw-semibold"
                        variant="success"
                    >
                        Descargar Excel
                    </Button>

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

                        {/* GRAFICOS */}

                        <Row className="g-4 mb-5">

                            <Col lg={7}>

                                <Card className="border-0 shadow-lg rounded-4 h-100">

                                    <Card.Body>

                                        <h4 className="fw-bold mb-4">
                                            Ventas por Categoría
                                        </h4>

                                        <ResponsiveContainer width="100%" height={320}>

                                            <BarChart data={ventasPorCategoria}>

                                                <CartesianGrid strokeDasharray="3 3" />

                                                <XAxis dataKey="name" />

                                                <YAxis />

                                                <Tooltip />

                                                <Bar
                                                    dataKey="total"
                                                    fill="#3b82f6"
                                                    radius={[10, 10, 0, 0]}
                                                />

                                            </BarChart>

                                        </ResponsiveContainer>

                                    </Card.Body>

                                </Card>

                            </Col>

                            <Col lg={5}>

                                <Card className="border-0 shadow-lg rounded-4 h-100">

                                    <Card.Body>

                                        <h4 className="fw-bold mb-4">
                                            Distribución de Ventas
                                        </h4>

                                        <ResponsiveContainer width="100%" height={320}>

                                            <PieChart>

                                                <Pie
                                                    data={ventasPorCategoria}
                                                    dataKey="total"
                                                    nameKey="name"
                                                    outerRadius={110}
                                                    label
                                                >

                                                    {ventasPorCategoria.map((_, index) => (

                                                        <Cell
                                                            key={index}
                                                            fill={
                                                                colores[
                                                                index % colores.length
                                                                ]
                                                            }
                                                        />

                                                    ))}

                                                </Pie>

                                                <Tooltip />

                                            </PieChart>

                                        </ResponsiveContainer>

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

                                                <td>#{venta.id_venta}</td>

                                                <td>
                                                    {venta.producto?.nombre_producto || "Sin producto"}
                                                </td>

                                                <td>
                                                    <Badge bg="primary">
                                                        {venta.producto?.categoria_producto || "Sin categoría"}
                                                    </Badge>
                                                </td>

                                                <td>{venta.cantidad}</td>

                                                <td className="fw-bold text-success">
                                                    C$ {Number(venta.total).toFixed(2)}
                                                </td>

                                                <td>
                                                    <Badge bg="success">
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

            <style>{`

            .dashboard-bg{
                min-height:100vh;
                background:
                linear-gradient(135deg,#0b1120,#111827,#1e293b);
            }

            .kpi-card{
                overflow:hidden;
                transition:.3s;
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
            }

            .table-card{
                background:#fff;
            }

            `}</style>

        </div>
    );
};

export default DashboardVentas;