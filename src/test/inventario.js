const datosPruebaInventario = [
  {
    nombre_producto: "Prueba A",
    stock_inicial: 20,
    ajuste_stock: 5,
    stock_final: 25,
    estado: "Valido",
    resultadoEsperado: "Pass",
  },
  {
    nombre_producto: "Prueba A",
    stock_inicial: 30,
    ajuste_stock: -3,
    stock_final: 27,
    estado: "Valido",
    resultadoEsperado: "Pass",
  },
  {
    nombre_producto: "Prueba B",
    stock_inicial: 50,
    ajuste_stock: -1,
    stock_final: 49,
    estado: "Valido",
    resultadoEsperado: "Pass",
  },
];

const movimientoInventarioInvalido = {
  id_producto: 1,
  ajuste_stock: -999,
  resultadoEsperado: "Fail",
};

function validarProductoInventario(producto) {
  const errores = [];
  const stockInicial = Number(producto.stock_inicial);

  if (!producto.nombre_producto?.trim()) {
    errores.push("El nombre del producto es obligatorio");
  }

  if (!Number.isInteger(stockInicial) || stockInicial < 0) {
    errores.push("El stock inicial debe ser un numero entero mayor o igual que cero");
  }

  return {
    valido: errores.length === 0,
    errores,
  };
}

function registrarProductoInventario(producto, tablaInventario) {
  const validacion = validarProductoInventario(producto);

  if (!validacion.valido) {
    return {
      registrado: false,
      errores: validacion.errores,
      producto: null,
    };
  }

  const productoRegistrado = {
    id_producto: tablaInventario.length + 1,
    nombre_producto: producto.nombre_producto.trim(),
    stock: Number(producto.stock_inicial),
  };

  tablaInventario.push(productoRegistrado);

  return {
    registrado: true,
    errores: [],
    producto: productoRegistrado,
  };
}

function aplicarMovimientoStock(tablaInventario, tablaMovimientos, movimiento) {
  const producto = tablaInventario.find(
    (item) => item.id_producto === Number(movimiento.id_producto)
  );
  const ajusteStock = Number(movimiento.ajuste_stock);

  if (!producto) {
    return {
      aplicado: false,
      errores: ["El producto no existe en inventario"],
      movimiento: null,
    };
  }

  if (!Number.isInteger(ajusteStock) || ajusteStock === 0) {
    return {
      aplicado: false,
      errores: ["El ajuste de stock debe ser un entero diferente de cero"],
      movimiento: null,
    };
  }

  if (producto.stock + ajusteStock < 0) {
    return {
      aplicado: false,
      errores: ["El movimiento deja el stock en negativo"],
      movimiento: null,
    };
  }

  producto.stock += ajusteStock;

  const movimientoRegistrado = {
    id_movimiento: tablaMovimientos.length + 1,
    id_producto: producto.id_producto,
    nombre_producto: producto.nombre_producto,
    ajuste_stock: ajusteStock,
    stock_resultante: producto.stock,
  };

  tablaMovimientos.push(movimientoRegistrado);

  return {
    aplicado: true,
    errores: [],
    movimiento: movimientoRegistrado,
  };
}

function consultarInventarioPorId(tablaInventario, idProducto) {
  return (
    tablaInventario.find((producto) => producto.id_producto === Number(idProducto)) ||
    null
  );
}

function buscarInventarioPorNombre(tablaInventario, nombreBuscado) {
  const busqueda = nombreBuscado.trim().toLowerCase();

  return tablaInventario.filter((producto) =>
    producto.nombre_producto.toLowerCase().includes(busqueda)
  );
}

function obtenerListadoInventario(tablaInventario) {
  return [...tablaInventario];
}

function prepararTablasInventario(productos = datosPruebaInventario) {
  const tablaInventario = [];
  const tablaMovimientos = [];

  productos.forEach((producto) => {
    const registro = registrarProductoInventario(producto, tablaInventario);

    if (registro.registrado) {
      aplicarMovimientoStock(tablaInventario, tablaMovimientos, {
        id_producto: registro.producto.id_producto,
        ajuste_stock: producto.ajuste_stock,
      });
    }
  });

  return {
    tablaInventario,
    tablaMovimientos,
  };
}

module.exports = {
  aplicarMovimientoStock,
  buscarInventarioPorNombre,
  consultarInventarioPorId,
  datosPruebaInventario,
  movimientoInventarioInvalido,
  obtenerListadoInventario,
  prepararTablasInventario,
  registrarProductoInventario,
  validarProductoInventario,
};
