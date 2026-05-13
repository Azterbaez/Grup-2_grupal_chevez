import { useState, useEffect } from "react";
import {
    Modal,
    Button,
    Form,
    Spinner,
    Row,
    Col,
    Image,
    Alert,
    Card,
    Badge,
} from "react-bootstrap";

import { supabase } from "../../database/supabaseconfig";

const ModalRegistroVenta = ({
    mostrarModal,
    setMostrarModal,
    cargarVentas,
}) => {

    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(false);
    const [errorFormulario, setErrorFormulario] = useState("");

    const [formulario, setFormulario] = useState({
        id_producto: "",
        cantidad: 1,
        precio: 0,
        total: 0,
    });

    useEffect(() => {

        if (mostrarModal) {
            cargarProductos();
        }

    }, [mostrarModal]);

    const cargarProductos = async () => {

        try {

            const { data, error } = await supabase
                .from("productos")
                .select("*")
                .order("nombre_producto", { ascending: true });

            if (error) throw error;

            setProductos(data || []);

        } catch (error) {

            console.error("Error al cargar productos:", error);

        }

    };

    const productoSeleccionado = productos.find(
        (producto) =>
            producto.id_producto === Number(formulario.id_producto)
    );

    const manejarProducto = (e) => {

        const id = Number(e.target.value);

        const producto = productos.find(
            (p) => p.id_producto === id
        );

        const precio = Number(producto?.precio_venta || 0);

        setFormulario((prev) => ({
            ...prev,
            id_producto: id,
            precio,
            total: precio * prev.cantidad,
        }));

    };

    const manejarCantidad = (e) => {

        const cantidad = Number(e.target.value) || 1;

        setFormulario((prev) => ({
            ...prev,
            cantidad,
            total: cantidad * Number(prev.precio || 0),
        }));

    };

    const guardarVenta = async () => {

        try {

            setErrorFormulario("");

            if (!formulario.id_producto) {

                setErrorFormulario(
                    "Debes seleccionar un producto"
                );

                return;
            }

            if (formulario.cantidad <= 0) {

                setErrorFormulario(
                    "La cantidad debe ser mayor a 0"
                );

                return;
            }

            setCargando(true);

            const { error } = await supabase
                .from("ventas")
                .insert([
                    {
                        id_producto: formulario.id_producto,
                        cantidad: formulario.cantidad,
                        total: formulario.total,
                    },
                ]);

            if (error) throw error;

            if (productoSeleccionado?.stock !== undefined) {

                const nuevoStock =
                    Number(productoSeleccionado.stock) -
                    Number(formulario.cantidad);

                await supabase
                    .from("productos")
                    .update({
                        stock: nuevoStock,
                    })
                    .eq(
                        "id_producto",
                        formulario.id_producto
                    );

            }

            setFormulario({
                id_producto: "",
                cantidad: 1,
                precio: 0,
                total: 0,
            });

            setMostrarModal(false);

            cargarVentas();

        } catch (error) {

            console.error(
                "Error al registrar venta:",
                error
            );

            setErrorFormulario(
                "Ocurrió un error al registrar la venta"
            );

        } finally {

            setCargando(false);

        }

    };

    return (

        <Modal
            show={mostrarModal}
            onHide={() => setMostrarModal(false)}
            centered
            size="lg"
        >

            <Modal.Header
                closeButton
                className="border-0 pb-0"
            >

                <Modal.Title className="fw-bold text-success">
                    <i className="bi bi-cart-check me-2"></i>
                    Registrar Venta
                </Modal.Title>

            </Modal.Header>

            <Modal.Body className="pt-2">

                {errorFormulario && (

                    <Alert
                        variant="danger"
                        className="rounded-3 shadow-sm"
                    >

                        <i className="bi bi-exclamation-circle me-2"></i>

                        {errorFormulario}

                    </Alert>

                )}

                <Row className="g-4">

                    {/* IMAGEN */}

                    <Col md={5}>

                        <Card className="border-0 shadow-sm rounded-4 overflow-hidden">

                            <div
                                className="bg-light d-flex align-items-center justify-content-center"
                                style={{
                                    height: "320px",
                                }}
                            >

                                {productoSeleccionado?.url_imagen ? (

                                    <Image
                                        src={
                                            productoSeleccionado.url_imagen
                                        }
                                        fluid
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            objectFit: "cover",
                                        }}
                                    />

                                ) : (

                                    <div className="text-center">

                                        <i
                                            className="bi bi-image text-muted"
                                            style={{
                                                fontSize: "5rem",
                                            }}
                                        ></i>

                                        <p className="text-muted mt-2">
                                            Vista previa
                                        </p>

                                    </div>

                                )}

                            </div>

                            {productoSeleccionado && (

                                <Card.Body>

                                    <h5 className="fw-bold">
                                        {
                                            productoSeleccionado.nombre_producto
                                        }
                                    </h5>

                                    <Badge bg="success">
                                        Producto seleccionado
                                    </Badge>

                                </Card.Body>

                            )}

                        </Card>

                    </Col>

                    {/* FORMULARIO */}

                    <Col md={7}>

                        <Card className="border-0 shadow-sm rounded-4">

                            <Card.Body>

                                <Form>

                                    {/* PRODUCTO */}

                                    <Form.Group className="mb-4">

                                        <Form.Label className="fw-semibold">
                                            Producto
                                        </Form.Label>

                                        <Form.Select
                                            value={formulario.id_producto}
                                            onChange={manejarProducto}
                                            size="lg"
                                            className="shadow-sm"
                                        >

                                            <option value="">
                                                Selecciona un producto
                                            </option>

                                            {productos.map((producto) => (

                                                <option
                                                    key={producto.id_producto}
                                                    value={producto.id_producto}
                                                >

                                                    {producto.nombre_producto}
                                                    {" - "}
                                                    C${" "}
                                                    {parseFloat(
                                                        producto.precio_venta || 0
                                                    ).toFixed(2)}

                                                </option>

                                            ))}

                                        </Form.Select>

                                    </Form.Group>

                                    {/* CANTIDAD */}

                                    <Form.Group className="mb-4">

                                        <Form.Label className="fw-semibold">
                                            Cantidad
                                        </Form.Label>

                                        <Form.Control
                                            type="number"
                                            min="1"
                                            value={formulario.cantidad}
                                            onChange={manejarCantidad}
                                            size="lg"
                                            className="shadow-sm"
                                        />

                                    </Form.Group>

                                    <Row>

                                        {/* PRECIO */}

                                        <Col md={6}>

                                            <Form.Group className="mb-4">

                                                <Form.Label className="fw-semibold">
                                                    Precio Unitario
                                                </Form.Label>

                                                <Form.Control
                                                    value={`C$ ${parseFloat(formulario.precio || 0).toFixed(2)}`}
                                                    disabled
                                                    size="lg"
                                                    className="fw-semibold bg-light"
                                                />

                                            </Form.Group>

                                        </Col>

                                        {/* TOTAL */}

                                        <Col md={6}>

                                            <Form.Group className="mb-4">

                                                <Form.Label className="fw-semibold">
                                                    Total
                                                </Form.Label>

                                                <Form.Control
                                                    value={`C$ ${parseFloat(formulario.total || 0).toFixed(2)}`}
                                                    disabled
                                                    size="lg"
                                                    className="fw-bold text-success bg-light"
                                                />

                                            </Form.Group>

                                        </Col>

                                    </Row>

                                </Form>

                            </Card.Body>

                        </Card>

                    </Col>

                </Row>

            </Modal.Body>

            <Modal.Footer className="border-0 pt-0">

                <Button
                    variant="outline-secondary"
                    onClick={() =>
                        setMostrarModal(false)
                    }
                >
                    Cancelar
                </Button>

                <Button
                    variant="success"
                    onClick={guardarVenta}
                    disabled={cargando}
                    className="px-4"
                >

                    {cargando ? (

                        <>
                            <Spinner
                                animation="border"
                                size="sm"
                                className="me-2"
                            />

                            Guardando...

                        </>

                    ) : (

                        <>
                            <i className="bi bi-check-circle me-2"></i>
                            Guardar Venta
                        </>

                    )}

                </Button>

            </Modal.Footer>

        </Modal>

    );

};

export default ModalRegistroVenta;