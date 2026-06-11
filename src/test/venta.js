const productosVenta = [
  {
    id_producto: 1,
    nombre_producto: "Coca Cola",
    precio_venta: 40,
    stock: 20,
  },
  {
    id_producto: 2,
    nombre_producto: "Galletas",
    precio_venta: 15,
    stock: 30,
  },
  {
    id_producto: 3,
    nombre_producto: "Arroz",
    precio_venta: 15,
    stock: 50,
  },
];

const datosPruebaVenta = [
  {
    id_producto: 1,
    producto: "Coca Cola",
    cantidad: 2,
    precio: 40,
    total: 80,
    resultadoEsperado: "valido",
  },
  {
    id_producto: 2,
    producto: "Galletas",
    cantidad: 3,
    precio: 15,
    total: 45,
    resultadoEsperado: "valido",
  },
  {
    id_producto: 3,
    producto: "Arroz",
    cantidad: 1,
    precio: 15,
    total: 15,
    resultadoEsperado: "valido",
  },
];

const ventaInvalida = {
  id_producto: 1,
  producto: "Coca Cola",
  cantidad: 999,
  precio: 40,
  total: 39960,
  resultadoEsperado: "no valido",
};

function prepararInventario(productos = productosVenta) {
  return productos.map((producto) => ({ ...producto }));
}

function validarDetalleVenta(detalle, inventario) {
  const errores = [];
  const producto = inventario.find(
    (item) => item.id_producto === Number(detalle.id_producto)
  );
  const cantidad = Number(detalle.cantidad);
  const precio = Number(detalle.precio);

  if (!producto) {
    errores.push("El producto seleccionado no existe");
  }

  if (!Number.isInteger(cantidad) || cantidad <= 0) {
    errores.push("La cantidad debe ser un numero entero mayor que cero");
  }

  if (!Number.isFinite(precio) || precio <= 0) {
    errores.push("El precio debe ser un numero mayor que cero");
  }

  if (producto && cantidad > producto.stock) {
    errores.push("La cantidad supera el stock disponible");
  }

  return {
    valido: errores.length === 0,
    errores,
    producto,
  };
}

function calcularTotalVenta(detalle) {
  return Number(detalle.cantidad) * Number(detalle.precio);
}

function registrarVenta(detalle, tablas) {
  const validacion = validarDetalleVenta(detalle, tablas.inventario);

  if (!validacion.valido) {
    return {
      registrado: false,
      errores: validacion.errores,
      venta: null,
      detalleVenta: null,
      hechoVenta: null,
    };
  }

  const total = calcularTotalVenta(detalle);
  const idVenta = tablas.ventas.length + 1;
  const productoInventario = validacion.producto;

  const venta = {
    id_venta: idVenta,
    total,
    estado: "Registrada",
  };

  const detalleVenta = {
    id_detalle_venta: tablas.detalleVentas.length + 1,
    id_venta: idVenta,
    id_producto: productoInventario.id_producto,
    nombre_producto: productoInventario.nombre_producto,
    cantidad: Number(detalle.cantidad),
    precio: Number(detalle.precio),
    total,
  };

  const hechoVenta = {
    id_venta: idVenta,
    producto: productoInventario.nombre_producto,
    cantidad: Number(detalle.cantidad),
    total,
  };

  productoInventario.stock -= Number(detalle.cantidad);
  tablas.ventas.push(venta);
  tablas.detalleVentas.push(detalleVenta);
  tablas.hechoVentas.push(hechoVenta);

  return {
    registrado: true,
    errores: [],
    venta,
    detalleVenta,
    hechoVenta,
  };
}

function prepararTablasVenta() {
  return {
    inventario: prepararInventario(),
    ventas: [],
    detalleVentas: [],
    hechoVentas: [],
  };
}

module.exports = {
  calcularTotalVenta,
  datosPruebaVenta,
  prepararInventario,
  prepararTablasVenta,
  productosVenta,
  registrarVenta,
  validarDetalleVenta,
  ventaInvalida,
};
