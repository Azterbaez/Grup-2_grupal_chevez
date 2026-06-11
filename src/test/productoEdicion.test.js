const {
  consultarProductoPorId,
  datosEdicionProducto,
  editarProducto,
  obtenerListadoProductos,
  prepararTablaProducto,
} = require("./producto.js");

describe("PRODUCTO-0011 - Edicion de productos", () => {
  let tablaProducto;

  beforeEach(() => {
    tablaProducto = prepararTablaProducto();
  });

  test("ejecuta la operacion principal de edicion correctamente", () => {
    datosEdicionProducto.forEach((datosEdicion) => {
      const resultado = editarProducto(
        tablaProducto,
        datosEdicion.id_producto,
        datosEdicion
      );

      expect(resultado.actualizado).toBe(true);
      expect(resultado.errores).toHaveLength(0);
      expect(resultado.producto).toEqual(
        expect.objectContaining({
          id_producto: datosEdicion.id_producto,
          nombre_producto: datosEdicion.nombre_producto,
          categoria_producto: datosEdicion.categoria_producto,
          precio_venta: datosEdicion.precio_venta,
          stock: datosEdicion.stock,
        })
      );
    });
  });

  test("almacena la informacion editada y coincide con la tabla Producto", () => {
    datosEdicionProducto.forEach((datosEdicion) => {
      editarProducto(tablaProducto, datosEdicion.id_producto, datosEdicion);
    });

    datosEdicionProducto.forEach((datosEdicion) => {
      const productoGuardado = consultarProductoPorId(
        tablaProducto,
        datosEdicion.id_producto
      );

      expect(productoGuardado).toEqual(
        expect.objectContaining({
          nombre_producto: datosEdicion.nombre_producto,
          categoria_producto: datosEdicion.categoria_producto,
          precio_venta: datosEdicion.precio_venta,
          stock: datosEdicion.stock,
        })
      );
    });
  });

  test("muestra correctamente los productos editados en el listado", () => {
    datosEdicionProducto.forEach((datosEdicion) => {
      editarProducto(tablaProducto, datosEdicion.id_producto, datosEdicion);
    });

    const listadoProductos = obtenerListadoProductos(tablaProducto);

    expect(listadoProductos).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          nombre_producto: "Prueba A",
          nombre_categoria: "Bebidas",
          precio_venta: 40,
          stock: 20,
        }),
        expect.objectContaining({
          nombre_producto: "Prueba A",
          nombre_categoria: "Snacks",
          precio_venta: 15,
          stock: 30,
        }),
        expect.objectContaining({
          nombre_producto: "Prueba B",
          nombre_categoria: "Abarrotes",
          precio_venta: 15,
          stock: 50,
        }),
      ])
    );
  });

  test("retorna encontrado al consultar los productos editados", () => {
    datosEdicionProducto.forEach((datosEdicion) => {
      editarProducto(tablaProducto, datosEdicion.id_producto, datosEdicion);
    });

    const resultados = datosEdicionProducto.map((datosEdicion) => {
      const producto = consultarProductoPorId(tablaProducto, datosEdicion.id_producto);

      return producto ? "Encontrado" : "No encontrado";
    });

    expect(resultados).toEqual(["Encontrado", "Encontrado", "Encontrado"]);
  });
});
