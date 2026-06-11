const {
  aplicarMovimientoStock,
  buscarInventarioPorNombre,
  consultarInventarioPorId,
  datosPruebaInventario,
  movimientoInventarioInvalido,
  obtenerListadoInventario,
  prepararTablasInventario,
  registrarProductoInventario,
} = require("./inventario.js");

describe("INVENTARIO-0010 - Control de Stock", () => {
  test("ejecuta la operacion principal y actualiza el stock correctamente", () => {
    const tablaInventario = [];
    const tablaMovimientos = [];

    datosPruebaInventario.forEach((producto) => {
      const registro = registrarProductoInventario(producto, tablaInventario);
      const movimiento = aplicarMovimientoStock(tablaInventario, tablaMovimientos, {
        id_producto: registro.producto.id_producto,
        ajuste_stock: producto.ajuste_stock,
      });

      expect(registro.registrado).toBe(true);
      expect(movimiento.aplicado).toBe(true);
      expect(movimiento.movimiento).toEqual(
        expect.objectContaining({
          nombre_producto: producto.nombre_producto,
          ajuste_stock: producto.ajuste_stock,
          stock_resultante: producto.stock_final,
        })
      );
    });
  });

  test("guarda los movimientos de inventario correctamente", () => {
    const { tablaMovimientos } = prepararTablasInventario();

    expect(tablaMovimientos).toHaveLength(3);
    expect(tablaMovimientos).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          nombre_producto: "Prueba A",
          ajuste_stock: 5,
          stock_resultante: 25,
        }),
        expect.objectContaining({
          nombre_producto: "Prueba A",
          ajuste_stock: -3,
          stock_resultante: 27,
        }),
        expect.objectContaining({
          nombre_producto: "Prueba B",
          ajuste_stock: -1,
          stock_resultante: 49,
        }),
      ])
    );
  });

  test("verifica que la base de datos coincide con el stock esperado", () => {
    const { tablaInventario } = prepararTablasInventario();

    datosPruebaInventario.forEach((producto, index) => {
      const productoInventario = consultarInventarioPorId(tablaInventario, index + 1);

      expect(productoInventario).toEqual(
        expect.objectContaining({
          nombre_producto: producto.nombre_producto,
          stock: producto.stock_final,
        })
      );
    });
  });

  test("muestra correctamente los datos en el listado de inventario", () => {
    const { tablaInventario } = prepararTablasInventario();
    const listadoInventario = obtenerListadoInventario(tablaInventario);

    expect(listadoInventario).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ nombre_producto: "Prueba A", stock: 25 }),
        expect.objectContaining({ nombre_producto: "Prueba A", stock: 27 }),
        expect.objectContaining({ nombre_producto: "Prueba B", stock: 49 }),
      ])
    );
  });

  test("retorna encontrado para los productos del inventario", () => {
    const { tablaInventario } = prepararTablasInventario();

    const resultados = ["Prueba A", "Prueba A", "Prueba B"].map((nombre) => {
      const coincidencias = buscarInventarioPorNombre(tablaInventario, nombre);

      return coincidencias.length > 0 ? "Encontrado" : "No encontrado";
    });

    expect(resultados).toEqual(["Encontrado", "Encontrado", "Encontrado"]);
  });

  test("rechaza movimientos que dejan el stock en negativo", () => {
    const { tablaInventario, tablaMovimientos } = prepararTablasInventario();
    const resultado = aplicarMovimientoStock(
      tablaInventario,
      tablaMovimientos,
      movimientoInventarioInvalido
    );

    expect(resultado.aplicado).toBe(false);
    expect(resultado.movimiento).toBeNull();
    expect(resultado.errores).toEqual(["El movimiento deja el stock en negativo"]);
  });
});
