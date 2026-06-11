const {
  calcularTotalVenta,
  datosPruebaVenta,
  prepararTablasVenta,
  registrarVenta,
  ventaInvalida,
} = require("./venta.js");

describe("VENTA-003 - Registro de ventas", () => {
  let tablas;

  beforeEach(() => {
    tablas = prepararTablasVenta();
  });

  test("calcula el total automaticamente al ingresar cantidad y precio", () => {
    datosPruebaVenta.forEach((detalle) => {
      const totalCalculado = calcularTotalVenta(detalle);

      expect(totalCalculado).toBe(detalle.total);
    });
  });

  test("registra ventas validas correctamente", () => {
    datosPruebaVenta.forEach((detalle) => {
      const resultado = registrarVenta(detalle, tablas);

      expect(resultado.registrado).toBe(true);
      expect(resultado.errores).toHaveLength(0);
      expect(resultado.venta).toEqual(
        expect.objectContaining({
          total: detalle.total,
          estado: "Registrada",
        })
      );
    });

    expect(tablas.ventas).toHaveLength(3);
  });

  test("guarda los datos en Venta y DetalleVenta", () => {
    datosPruebaVenta.forEach((detalle) => {
      registrarVenta(detalle, tablas);
    });

    expect(tablas.ventas).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ id_venta: 1, total: 80 }),
        expect.objectContaining({ id_venta: 2, total: 45 }),
        expect.objectContaining({ id_venta: 3, total: 15 }),
      ])
    );
    expect(tablas.detalleVentas).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id_venta: 1,
          nombre_producto: "Coca Cola",
          cantidad: 2,
          precio: 40,
          total: 80,
        }),
        expect.objectContaining({
          id_venta: 2,
          nombre_producto: "Galletas",
          cantidad: 3,
          precio: 15,
          total: 45,
        }),
        expect.objectContaining({
          id_venta: 3,
          nombre_producto: "Arroz",
          cantidad: 1,
          precio: 15,
          total: 15,
        }),
      ])
    );
  });

  test("actualiza el stock despues de guardar la venta", () => {
    datosPruebaVenta.forEach((detalle) => {
      registrarVenta(detalle, tablas);
    });

    expect(tablas.inventario).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ nombre_producto: "Coca Cola", stock: 18 }),
        expect.objectContaining({ nombre_producto: "Galletas", stock: 27 }),
        expect.objectContaining({ nombre_producto: "Arroz", stock: 49 }),
      ])
    );
  });

  test("refleja los datos de venta en Hecho_Ventas para dashboard", () => {
    datosPruebaVenta.forEach((detalle) => {
      registrarVenta(detalle, tablas);
    });

    expect(tablas.hechoVentas).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          producto: "Coca Cola",
          cantidad: 2,
          total: 80,
        }),
        expect.objectContaining({
          producto: "Galletas",
          cantidad: 3,
          total: 45,
        }),
        expect.objectContaining({
          producto: "Arroz",
          cantidad: 1,
          total: 15,
        }),
      ])
    );
  });

  test("rechaza ventas no validas cuando la cantidad supera el stock", () => {
    const resultado = registrarVenta(ventaInvalida, tablas);

    expect(resultado.registrado).toBe(false);
    expect(resultado.venta).toBeNull();
    expect(resultado.detalleVenta).toBeNull();
    expect(resultado.hechoVenta).toBeNull();
    expect(resultado.errores).toEqual(["La cantidad supera el stock disponible"]);
    expect(tablas.ventas).toHaveLength(0);
    expect(tablas.detalleVentas).toHaveLength(0);
    expect(tablas.hechoVentas).toHaveLength(0);
  });
});
