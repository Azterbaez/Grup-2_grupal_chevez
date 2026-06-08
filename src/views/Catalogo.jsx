import React, { useEffect, useState, useMemo } from "react";
import { Container, Row, Col, Spinner, Alert, Form, Card,
} from "react-bootstrap";

import { supabase } from "../database/supabaseconfig";

import TarjetaCatalogo from "../components/catalogo/TarjetaCatalogo";
import CuadroBusquedas from "../components/busquedas/cuadroBusquedas";

const Catalogo = () => {

  const [productos, setProductos] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] =
    useState("todas");

  const [categorias, setCategorias] = useState([]);
  const [textoBusqueda, setTextoBusqueda] = useState("");

  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);


  const cargarDatos = async () => {

    try {

      setCargando(true);

      const [resProductos, resCategorias] =
        await Promise.all([

          supabase
            .from("productos")
            .select("*")
            .order("nombre_producto", {
              ascending: true,
            }),

          supabase
            .from("categorias")
            .select(
              "id_categoria, nombre_categoria"
            )
            .order("nombre_categoria", {
              ascending: true,
            }),

        ]);

      if (resProductos.error)
        throw resProductos.error;

      if (resCategorias.error)
        throw resCategorias.error;

      setProductos(resProductos.data || []);
      setCategorias(resCategorias.data || []);

    } catch (err) {

      console.error(
        "Error al cargar catálogo:",
        err.message
      );

      setError(
        "No se pudieron cargar los productos"
      );

    } finally {

      setCargando(false);

    }

  };

  useEffect(() => {
    cargarDatos();
  }, []);


  const productosFiltrados = useMemo(() => {

    let filtrados = productos || [];

    if (categoriaSeleccionada !== "todas") {

      filtrados = filtrados.filter(
        (prod) =>
          prod.categoria_producto ===
          Number(categoriaSeleccionada)
      );

    }

    if (textoBusqueda.trim() !== "") {

      const texto = textoBusqueda
        .toLowerCase()
        .trim();

      filtrados = filtrados.filter((prod) => {

        const nombre =
          prod.nombre_producto?.toLowerCase() || "";

        const descripcion =
          prod.descripcion_producto?.toLowerCase() ||
          "";

        return (
          nombre.includes(texto) ||
          descripcion.includes(texto)
        );

      });

    }

    return filtrados;

  }, [
    productos,
    categoriaSeleccionada,
    textoBusqueda,
  ]);

  const manejarCambioCategoria = (e) => {
    setCategoriaSeleccionada(e.target.value);
  };

  const manejarCambioBusqueda = (e) => {
    setTextoBusqueda(e.target.value);
  };

  const obtenerNombreCategoria = (
    idCategoria
  ) => {

    const categoria = categorias.find(
      (cat) =>
        cat.id_categoria === Number(idCategoria)
    );

    return (
      categoria?.nombre_categoria ||
      "Sin categoría"
    );

  };

  return (

    <Container className="mt-1 encabezado-vista py-1">

      {/* ENCABEZADO */}

      <Card className="border-0 shadow-sm rounded-4 mb-4">

        <Card.Body className="text-center py-4">

          <h2 className="fw-bold mb-2">
            Catálogo de Productos
          </h2>

          <p className="text-muted mb-0">
            Encuentra productos de belleza
          </p>

        </Card.Body>

      </Card>

      {/* FILTROS */}

      <Card className="border-0 shadow-sm rounded-4 mb-4">

        <Card.Body>

          <Row className="g-3 align-items-center">

            <Col md={4}>

              <Form.Select
                value={categoriaSeleccionada}
                onChange={manejarCambioCategoria}
                className="rounded-3 shadow-sm"
              >

                <option value="todas">
                  Todas las categorías
                </option>

                {categorias.map((cat) => (

                  <option
                    key={cat.id_categoria}
                    value={cat.id_categoria}
                  >

                    {cat.nombre_categoria}

                  </option>

                ))}

              </Form.Select>

            </Col>

            <Col md={8}>

              <CuadroBusquedas
                textoBusqueda={textoBusqueda}
                manejarCambioBusqueda={
                  manejarCambioBusqueda
                }
              />

            </Col>

          </Row>

        </Card.Body>

      </Card>

      {/* LOADING */}

      {cargando && (

        <div className="text-center my-5">

          <Spinner
            animation="border"
            variant="primary"
          />

          <p className="mt-3 text-muted">
            Cargando productos...
          </p>

        </div>

      )}

      {/* ERROR */}

      {error && (

        <Alert
          variant="danger"
          className="rounded-4 text-center"
        >

          {error}

        </Alert>

      )}

      {/* SIN RESULTADOS */}

      {!cargando &&
        productosFiltrados.length === 0 && (

          <Alert
            variant="light"
            className="text-center border rounded-4"
          >

            <i className="bi bi-search me-2"></i>

            No se encontraron productos

          </Alert>

        )}

      {/* PRODUCTOS */}

      {!cargando &&
        productosFiltrados.length > 0 && (

          <Row className="g-4">

            {productosFiltrados.map(
              (producto) => (

                <Col
                  xs={6}
                  sm={6}
                  md={4}
                  lg={3}
                  key={producto.id_producto}
                >

                  <TarjetaCatalogo
                    producto={producto}
                    categoriaNombre={obtenerNombreCategoria(
                      producto.categoria_producto
                    )}
                  />

                </Col>

              )
            )}

          </Row>

        )}

    </Container>

  );

};

export default Catalogo;