const {
  categoriasProducto,
  datosPruebaProducto,
  obtenerListadoProductos,
  productoInvalido,
  registrarProducto,
  validarProducto,
} = require("./producto.js");

describe("PRODUCTO-001 - Registro de productos", () => {
  let tablaProducto;

  beforeEach(() => {
    tablaProducto = [];
  });

  test("registra productos validos y los almacena en la tabla Producto", () => {
    datosPruebaProducto.forEach((producto) => {
      const resultado = registrarProducto(producto, tablaProducto, categoriasProducto);

      expect(resultado.registrado).toBe(true);
      expect(resultado.errores).toHaveLength(0);
      expect(resultado.producto).toEqual(
        expect.objectContaining({
          nombre_producto: producto.nombre_producto,
          categoria_producto: producto.categoria_producto,
          precio_venta: producto.precio_venta,
          stock: producto.stock,
        })
      );
    });

    expect(tablaProducto).toHaveLength(3);
    expect(tablaProducto.map((producto) => producto.nombre_producto)).toEqual([
      "Coca Cola",
      "Galletas",
      "Arroz",
    ]);
  });

  test("muestra los productos registrados en el listado de productos", () => {
    datosPruebaProducto.forEach((producto) => {
      registrarProducto(producto, tablaProducto, categoriasProducto);
    });

    const listadoProductos = obtenerListadoProductos(tablaProducto);

    expect(listadoProductos).toHaveLength(3);
    expect(listadoProductos).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          nombre_producto: "Coca Cola",
          nombre_categoria: "Bebidas",
          precio_venta: 40,
          stock: 20,
        }),
        expect.objectContaining({
          nombre_producto: "Galletas",
          nombre_categoria: "Snacks",
          precio_venta: 15,
          stock: 30,
        }),
        expect.objectContaining({
          nombre_producto: "Arroz",
          nombre_categoria: "Abarrotes",
          precio_venta: 15,
          stock: 50,
        }),
      ])
    );
  });

  test("rechaza datos no validos y no los almacena", () => {
    const validacion = validarProducto(productoInvalido, categoriasProducto);
    const resultado = registrarProducto(productoInvalido, tablaProducto, categoriasProducto);

    expect(validacion.valido).toBe(false);
    expect(resultado.registrado).toBe(false);
    expect(resultado.producto).toBeNull();
    expect(resultado.errores).toEqual(
      expect.arrayContaining([
        "El nombre del producto es obligatorio",
        "La categoria seleccionada no existe",
        "El precio debe ser un numero mayor que cero",
        "El stock debe ser un numero entero mayor o igual que cero",
      ])
    );
    expect(tablaProducto).toHaveLength(0);
  });
});
