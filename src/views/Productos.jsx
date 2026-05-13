import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Spinner } from "react-bootstrap";
import { supabase } from "../database/supabaseconfig";
import ModalRegistroProducto from "../components/productos/ModalRegistroProducto";
import ModalEliminacionProducto from "../components/productos/ModalEliminacionProducto";
import ModalEdicionProducto from "../components/productos/ModalEdicionProducto";
import TablaProducto from "../components/productos/TablaProducto";
import CuadroBusquedas from "../components/busquedas/cuadroBusquedas";
import Paginacion from "../components/ordenamiento/Paginacion";
import NotificacionOperacion from "../components/NotificacionOperacion";
import TarjetasProductos from "../components/productos/TarjetaProducto";

const Productos = () => {

  const [productos, setProductos] = useState([]);
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [textoBusqueda, setTextoBusqueda] = useState("");
  const [cargando, setCargando] = useState(true);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [mostrarModalEdicion, setMostrarModalEdicion] = useState(false);
  const [mostrarModalEliminacion, setMostrarModalEliminacion] = useState(false);
  const [registrosPorPagina, establecerRegistrosPorPagina] = useState(5);
  const [paginaActual, establecerPaginaActual] = useState(1);


  const [toast, setToast] = useState({
    mostrar: false,
    mensaje: "",
    tipo: "",
  });

  const [productoAEliminar, setProductoAEliminar] = useState(null);

  const [nuevoProducto, setNuevoProducto] = useState({
    nombre_producto: "",
    descripcion_producto: "",
    categoria_producto: "",
    precio_venta: "",
    archivo: null,
  });

  const [productoEditar, setProductoEditar] = useState({
    id_producto: "",
    nombre_producto: "",
    descripcion_producto: "",
    categoria_producto: "",
    precio_venta: "",
    url_imagen: "",
    archivo: null,
  });


  const productosPaginados = productosFiltrados.slice(
    (paginaActual - 1) * registrosPorPagina,
    paginaActual * registrosPorPagina
  );


  useEffect(() => {
    cargarProductos();
    cargarCategorias();
  }, []);

  useEffect(() => {

    if (!textoBusqueda.trim()) {
      setProductosFiltrados(productos);
    } else {

      const textoLower = textoBusqueda.toLowerCase().trim();

      const filtrados = productos.filter((prod) => {

        const nombre = prod.nombre_producto?.toLowerCase() || "";
        const descripcion = prod.descripcion_producto?.toLowerCase() || "";
        const precio = prod.precio_venta?.toString() || "";

        return (
          nombre.includes(textoLower) ||
          descripcion.includes(textoLower) ||
          precio.includes(textoLower)
        );

      });

      setProductosFiltrados(filtrados);
    }

  }, [textoBusqueda, productos]);


  const cargarProductos = async () => {

    try {

      setCargando(true);

      const { data, error } = await supabase
        .from("productos")
        .select("*")
        .order("id_producto", { ascending: true });

      if (error) throw error;

      setProductos(data || []);
      setProductosFiltrados(data || []);

    } catch (err) {

      console.error("Error al cargar productos:", err);

      setToast({
        mostrar: true,
        mensaje: "Error al cargar productos",
        tipo: "error",
      });

    } finally {
      setCargando(false);
    }

  };


  const cargarCategorias = async () => {

    try {

      const { data, error } = await supabase
        .from("categorias")
        .select("*")
        .order("id_categoria", { ascending: true });

      if (error) throw error;

      setCategorias(data || []);

    } catch (err) {
      console.error("Error al cargar categorías:", err);
    }

  };


  const manejarBusqueda = (e) => {
    setTextoBusqueda(e.target.value);
  };


  const manejoCambioInput = (e) => {

    const { name, value } = e.target;

    setNuevoProducto((prev) => ({
      ...prev,
      [name]: value,
    }));

  };

  const manejoCambioInputEdicion = (e) => {

    const { name, value } = e.target;

    setProductoEditar((prev) => ({
      ...prev,
      [name]: value,
    }));

  };


  const manejoCambioArchivo = (e) => {

    const archivo = e.target.files[0];

    if (archivo && archivo.type.startsWith("image/")) {

      setNuevoProducto((prev) => ({
        ...prev,
        archivo,
      }));

    } else {
      alert("Selecciona una imagen válida");
    }

  };

  const manejoCambioArchivoActualizar = (e) => {

    const archivo = e.target.files[0];

    if (archivo && archivo.type.startsWith("image/")) {

      setProductoEditar((prev) => ({
        ...prev,
        archivo,
      }));

    } else {
      alert("Selecciona una imagen válida");
    }

  };


  const abrirModalEdicion = (producto) => {
    setProductoEditar(producto);
    setMostrarModalEdicion(true);
  };

  const abrirModalEliminacion = (producto) => {
    setProductoAEliminar(producto);
    setMostrarModalEliminacion(true);
  };


  const agregarProducto = async () => {

    try {

      if (
        !nuevoProducto.nombre_producto.trim() ||
        !nuevoProducto.categoria_producto ||
        !nuevoProducto.precio_venta ||
        !nuevoProducto.archivo
      ) {

        setToast({
          mostrar: true,
          mensaje: "Completa todos los campos obligatorios",
          tipo: "advertencia",
        });

        return;
      }

      setMostrarModal(false);

      const nombreArchivo = `${Date.now()}_${nuevoProducto.archivo.name}`;

      const { error: uploadError } = await supabase.storage
        .from("imagenes_productos")
        .upload(nombreArchivo, nuevoProducto.archivo);

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from("imagenes_productos")
        .getPublicUrl(nombreArchivo);

      const urlPublica = urlData.publicUrl;

      const { error } = await supabase.from("productos").insert([
        {
          nombre_producto: nuevoProducto.nombre_producto,
          descripcion_producto: nuevoProducto.descripcion_producto || null,
          categoria_producto: nuevoProducto.categoria_producto,
          precio_venta: parseFloat(nuevoProducto.precio_venta),
          url_imagen: urlPublica,
        },
      ]);

      if (error) throw error;

      setNuevoProducto({
        nombre_producto: "",
        descripcion_producto: "",
        categoria_producto: "",
        precio_venta: "",
        archivo: null,
      });

      setToast({
        mostrar: true,
        mensaje: "Producto registrado correctamente",
        tipo: "exito",
      });

      await cargarProductos();

    } catch (err) {

      console.error(err);

      setToast({
        mostrar: true,
        mensaje: "Error al registrar producto",
        tipo: "error",
      });

    }

  };


  const actualizarProducto = async () => {

    try {

      if (
        !productoEditar.nombre_producto.trim() ||
        !productoEditar.categoria_producto ||
        !productoEditar.precio_venta
      ) {

        setToast({
          mostrar: true,
          mensaje: "Completa los campos obligatorios",
          tipo: "advertencia",
        });

        return;
      }

      setMostrarModalEdicion(false);

      let datosActualizados = {
        nombre_producto: productoEditar.nombre_producto,
        descripcion_producto: productoEditar.descripcion_producto || null,
        categoria_producto: productoEditar.categoria_producto,
        precio_venta: parseFloat(productoEditar.precio_venta),
        url_imagen: productoEditar.url_imagen,
      };

      if (productoEditar.archivo) {

        const nombreArchivo = `${Date.now()}_${productoEditar.archivo.name}`;

        const { error: uploadError } = await supabase.storage
          .from("imagenes_productos")
          .upload(nombreArchivo, productoEditar.archivo);

        if (uploadError) throw uploadError;

        const { data: urlData } = supabase.storage
          .from("imagenes_productos")
          .getPublicUrl(nombreArchivo);

        datosActualizados.url_imagen = urlData.publicUrl;
      }

      const { error } = await supabase
        .from("productos")
        .update(datosActualizados)
        .eq("id_producto", productoEditar.id_producto);

      if (error) throw error;

      setToast({
        mostrar: true,
        mensaje: "Producto actualizado correctamente",
        tipo: "exito",
      });

      await cargarProductos();

    } catch (err) {

      console.error(err);

      setToast({
        mostrar: true,
        mensaje: "Error al actualizar producto",
        tipo: "error",
      });

    }

  };


  const eliminarProducto = async () => {

    if (!productoAEliminar) return;

    try {

      setMostrarModalEliminacion(false);

      const { error } = await supabase
        .from("productos")
        .delete()
        .eq("id_producto", productoAEliminar.id_producto);

      if (error) throw error;

      setToast({
        mostrar: true,
        mensaje: "Producto eliminado correctamente",
        tipo: "exito",
      });

      await cargarProductos();

    } catch (err) {

      console.error(err);

      setToast({
        mostrar: true,
        mensaje: "Error al eliminar producto",
        tipo: "error",
      });

    }

  };


  return (

    <Container className="mt-3">

      <Row className="align-items-center mb-3">

        <Col>
          <h3 className="mb-0">
            <i className="bi bi-box-seam me-2"></i>
            Productos
          </h3>
        </Col>

        <Col className="text-end">
          <Button onClick={() => setMostrarModal(true)}>
            <i className="bi bi-plus-lg"></i>
            <span className="ms-2">Nuevo Producto</span>
          </Button>
        </Col>

      </Row>

      <hr />

      <Row className="mb-4">

        <Col md={6} lg={5}>

          <CuadroBusquedas
            textoBusqueda={textoBusqueda}
            manejarCambioBusqueda={manejarBusqueda}
            placeholder="Buscar producto..."
          />

        </Col>

      </Row>

      {cargando && (

        <Row className="text-center my-5">

          <Col>

            <Spinner animation="border" variant="success" />

            <p className="mt-3 text-muted">
              Cargando productos...
            </p>

          </Col>

        </Row>

      )}

      {!cargando && productosFiltrados.length === 0 && (

        <Row className="text-center">

          <Col>
            <p className="text-muted">
              No hay productos registrados
            </p>
          </Col>

        </Row>

      )}

      <Row>

        <Col xs={12} className="d-none d-lg-block">

          <TablaProducto
            productos={productosPaginados}
            categorias={categorias}
            abrirModalEdicion={abrirModalEdicion}
            abrirModalEliminacion={abrirModalEliminacion}
          />

        </Col>

        <Col xs={12} className="d-lg-none">

          <TarjetasProductos
            productos={productosFiltrados}
            categorias={categorias}
            abrirModalEdicion={abrirModalEdicion}
            abrirModalEliminacion={abrirModalEliminacion}
          />

        </Col>

      </Row>

      <hr />

      {productosFiltrados.length > 0 && (

        <Paginacion
          registrosPorPagina={registrosPorPagina}
          totalRegistros={productosFiltrados.length}
          paginaActual={paginaActual}
          establecerPaginaActual={establecerPaginaActual}
          establecerRegistrosPorPagina={establecerRegistrosPorPagina}
        />

      )}

      <ModalRegistroProducto
        mostrarModal={mostrarModal}
        setMostrarModal={setMostrarModal}
        nuevoProducto={nuevoProducto}
        manejoCambioInput={manejoCambioInput}
        manejoCambioArchivo={manejoCambioArchivo}
        agregarProducto={agregarProducto}
        categorias={categorias}
      />

      <ModalEdicionProducto
        mostrarModalEdicion={mostrarModalEdicion}
        setMostrarModalEdicion={setMostrarModalEdicion}
        productoEditar={productoEditar}
        manejoCambioInputEdicion={manejoCambioInputEdicion}
        manejoCambioArchivoActualizar={manejoCambioArchivoActualizar}
        actualizarProducto={actualizarProducto}
        categorias={categorias}
      />

      <ModalEliminacionProducto
        mostrarModalEliminacion={mostrarModalEliminacion}
        setMostrarModalEliminacion={setMostrarModalEliminacion}
        eliminarProducto={eliminarProducto}
        producto={productoAEliminar}
      />

      <NotificacionOperacion
        mostrar={toast.mostrar}
        mensaje={toast.mensaje}
        tipo={toast.tipo}
        onCerrar={() =>
          setToast({
            ...toast,
            mostrar: false,
          })
        }
      />

    </Container>

  );

};

export default Productos;