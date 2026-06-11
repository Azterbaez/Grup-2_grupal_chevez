const categoriasProducto = [
  { id_categoria: 1, nombre_categoria: "Bebidas" },
  { id_categoria: 2, nombre_categoria: "Snacks" },
  { id_categoria: 3, nombre_categoria: "Abarrotes" },
];

const datosPruebaProducto = [
  {
    nombre_producto: "Coca Cola",
    categoria_producto: 1,
    precio_venta: 40.0,
    stock: 20,
    resultadoEsperado: "valido",
  },
  {
    nombre_producto: "Galletas",
    categoria_producto: 2,
    precio_venta: 15.0,
    stock: 30,
    resultadoEsperado: "valido",
  },
  {
    nombre_producto: "Arroz",
    categoria_producto: 3,
    precio_venta: 15.0,
    stock: 50,
    resultadoEsperado: "valido",
  },
];

const productoInvalido = {
  nombre_producto: "",
  categoria_producto: "",
  precio_venta: -15,
  stock: "no numerico",
  resultadoEsperado: "no valido",
};

const datosEdicionProducto = [
  {
    id_producto: 1,
    nombre_producto: "Prueba A",
    categoria_producto: 1,
    precio_venta: 40,
    stock: 20,
    resultadoEsperado: "Pass",
  },
  {
    id_producto: 2,
    nombre_producto: "Prueba A",
    categoria_producto: 2,
    precio_venta: 15,
    stock: 30,
    resultadoEsperado: "Pass",
  },
  {
    id_producto: 3,
    nombre_producto: "Prueba B",
    categoria_producto: 3,
    precio_venta: 15,
    stock: 50,
    resultadoEsperado: "Pass",
  },
];

function validarProducto(producto, categorias = categoriasProducto) {
  const errores = [];
  const precio = Number(producto.precio_venta);
  const stock = Number(producto.stock);
  const categoriaExiste = categorias.some(
    (categoria) => categoria.id_categoria === Number(producto.categoria_producto)
  );

  if (!producto.nombre_producto?.trim()) {
    errores.push("El nombre del producto es obligatorio");
  }

  if (!categoriaExiste) {
    errores.push("La categoria seleccionada no existe");
  }

  if (!Number.isFinite(precio) || precio <= 0) {
    errores.push("El precio debe ser un numero mayor que cero");
  }

  if (!Number.isInteger(stock) || stock < 0) {
    errores.push("El stock debe ser un numero entero mayor o igual que cero");
  }

  return {
    valido: errores.length === 0,
    errores,
  };
}

function registrarProducto(producto, tablaProducto, categorias = categoriasProducto) {
  const validacion = validarProducto(producto, categorias);

  if (!validacion.valido) {
    return {
      registrado: false,
      errores: validacion.errores,
      producto: null,
    };
  }

  const categoria = categorias.find(
    (item) => item.id_categoria === Number(producto.categoria_producto)
  );

  const productoRegistrado = {
    id_producto: tablaProducto.length + 1,
    nombre_producto: producto.nombre_producto.trim(),
    categoria_producto: categoria.id_categoria,
    nombre_categoria: categoria.nombre_categoria,
    precio_venta: Number(producto.precio_venta),
    stock: Number(producto.stock),
  };

  tablaProducto.push(productoRegistrado);

  return {
    registrado: true,
    errores: [],
    producto: productoRegistrado,
  };
}

function editarProducto(tablaProducto, idProducto, nuevosDatos, categorias = categoriasProducto) {
  const posicionProducto = tablaProducto.findIndex(
    (producto) => producto.id_producto === Number(idProducto)
  );

  if (posicionProducto === -1) {
    return {
      actualizado: false,
      errores: ["El producto no existe"],
      producto: null,
    };
  }

  const productoActualizado = {
    ...tablaProducto[posicionProducto],
    ...nuevosDatos,
  };
  const validacion = validarProducto(productoActualizado, categorias);

  if (!validacion.valido) {
    return {
      actualizado: false,
      errores: validacion.errores,
      producto: null,
    };
  }

  const categoria = categorias.find(
    (item) => item.id_categoria === Number(productoActualizado.categoria_producto)
  );

  tablaProducto[posicionProducto] = {
    ...productoActualizado,
    nombre_producto: productoActualizado.nombre_producto.trim(),
    categoria_producto: categoria.id_categoria,
    nombre_categoria: categoria.nombre_categoria,
    precio_venta: Number(productoActualizado.precio_venta),
    stock: Number(productoActualizado.stock),
  };

  return {
    actualizado: true,
    errores: [],
    producto: tablaProducto[posicionProducto],
  };
}

function obtenerListadoProductos(tablaProducto) {
  return [...tablaProducto];
}

function buscarProductosPorNombre(tablaProducto, nombreBuscado) {
  const busqueda = nombreBuscado.trim().toLowerCase();

  return tablaProducto.filter((producto) =>
    producto.nombre_producto.toLowerCase().includes(busqueda)
  );
}

function consultarProductoPorId(tablaProducto, idProducto) {
  return (
    tablaProducto.find((producto) => producto.id_producto === Number(idProducto)) ||
    null
  );
}

function prepararTablaProducto(productos = datosPruebaProducto) {
  const tablaProducto = [];

  productos.forEach((producto) => {
    registrarProducto(producto, tablaProducto, categoriasProducto);
  });

  return tablaProducto;
}

module.exports = {
  buscarProductosPorNombre,
  categoriasProducto,
  consultarProductoPorId,
  datosEdicionProducto,
  datosPruebaProducto,
  editarProducto,
  obtenerListadoProductos,
  prepararTablaProducto,
  productoInvalido,
  registrarProducto,
  validarProducto,
};
