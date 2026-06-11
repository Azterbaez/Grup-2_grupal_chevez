const {
  buscarProductosPorNombre,
  consultarProductoPorId,
  obtenerListadoProductos,
  prepararTablaProducto,
} = require("./producto.js");

describe("PRODUCTO-002 - Consulta de productos", () => {
  let tablaProducto;

  beforeEach(() => {
    tablaProducto = prepararTablaProducto();
  });

  test("visualiza todos los productos registrados", () => {
    const listadoProductos = obtenerListadoProductos(tablaProducto);

    expect(listadoProductos).toHaveLength(3);
    expect(listadoProductos).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ nombre_producto: "Coca Cola" }),
        expect.objectContaining({ nombre_producto: "Galletas" }),
        expect.objectContaining({ nombre_producto: "Arroz" }),
      ])
    );
  });

  test("busca producto por nombre y filtra correctamente el resultado", () => {
    const resultadoBusqueda = buscarProductosPorNombre(tablaProducto, "Coca");

    expect(resultadoBusqueda).toHaveLength(1);
    expect(resultadoBusqueda[0]).toEqual(
      expect.objectContaining({
        nombre_producto: "Coca Cola",
        nombre_categoria: "Bebidas",
        precio_venta: 40,
        stock: 20,
      })
    );
  });

  test("verifica que los datos del producto se muestran correctamente", () => {
    const productoConsultado = consultarProductoPorId(tablaProducto, 2);

    expect(productoConsultado).toEqual(
      expect.objectContaining({
        nombre_producto: "Galletas",
        nombre_categoria: "Snacks",
        precio_venta: 15,
        stock: 30,
      })
    );
  });

  test("consulta diferentes productos y mantiene informacion almacenada", () => {
    const cocaCola = consultarProductoPorId(tablaProducto, 1);
    const arroz = consultarProductoPorId(tablaProducto, 3);
    const listadoProductos = obtenerListadoProductos(tablaProducto);

    expect(cocaCola).toEqual(
      expect.objectContaining({
        nombre_producto: "Coca Cola",
        nombre_categoria: "Bebidas",
        precio_venta: 40,
        stock: 20,
      })
    );
    expect(arroz).toEqual(
      expect.objectContaining({
        nombre_producto: "Arroz",
        nombre_categoria: "Abarrotes",
        precio_venta: 15,
        stock: 50,
      })
    );
    expect(listadoProductos).toContainEqual(cocaCola);
    expect(listadoProductos).toContainEqual(arroz);
  });

  test("retorna una lista vacia cuando no encuentra el producto solicitado", () => {
    const resultadoBusqueda = buscarProductosPorNombre(tablaProducto, "Producto no existe");

    expect(resultadoBusqueda).toEqual([]);
  });
});
