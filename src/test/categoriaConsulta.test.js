const {
  buscarCategoriasPorNombre,
  consultarCategoriaPorId,
  obtenerListadoCategorias,
  prepararTablaCategorias,
} = require("./categoria.js");

describe("CATEGORIA-0014 - Consulta de categorias", () => {
  let tablaCategorias;

  beforeEach(() => {
    tablaCategorias = prepararTablaCategorias();
  });

  test("visualiza todas las categorias registradas", () => {
    const listadoCategorias = obtenerListadoCategorias(tablaCategorias);

    expect(listadoCategorias).toHaveLength(3);
    expect(listadoCategorias).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ nombre_categoria: "Prueba A" }),
        expect.objectContaining({ nombre_categoria: "Prueba B" }),
      ])
    );
  });

  test("consulta categoria por nombre y retorna resultados encontrados", () => {
    const resultadoBusqueda = buscarCategoriasPorNombre(tablaCategorias, "Prueba A");

    expect(resultadoBusqueda).toHaveLength(2);
    expect(resultadoBusqueda).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          nombre_categoria: "Prueba A",
          descripcion_categoria: "Categoria de prueba A",
        }),
        expect.objectContaining({
          nombre_categoria: "Prueba A",
          descripcion_categoria: "Categoria de prueba A duplicada",
        }),
      ])
    );
  });

  test("verifica que la informacion consultada coincide con la tabla Categorias", () => {
    const categoriaConsultada = consultarCategoriaPorId(tablaCategorias, 3);

    expect(categoriaConsultada).toEqual(
      expect.objectContaining({
        id_categoria: 3,
        nombre_categoria: "Prueba B",
        descripcion_categoria: "Categoria de prueba B",
      })
    );
  });

  test("actualiza la visualizacion al consultar diferentes categorias", () => {
    const primeraCategoria = consultarCategoriaPorId(tablaCategorias, 1);
    const segundaCategoria = consultarCategoriaPorId(tablaCategorias, 2);
    const terceraCategoria = consultarCategoriaPorId(tablaCategorias, 3);

    expect(primeraCategoria.nombre_categoria).toBe("Prueba A");
    expect(segundaCategoria.nombre_categoria).toBe("Prueba A");
    expect(terceraCategoria.nombre_categoria).toBe("Prueba B");
    expect([primeraCategoria, segundaCategoria, terceraCategoria]).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ descripcion_categoria: "Categoria de prueba A" }),
        expect.objectContaining({
          descripcion_categoria: "Categoria de prueba A duplicada",
        }),
        expect.objectContaining({ descripcion_categoria: "Categoria de prueba B" }),
      ])
    );
  });

  test("retorna encontrado para los datos de prueba consultados", () => {
    const resultados = ["Prueba A", "Prueba A", "Prueba B"].map((nombre) => {
      const coincidencias = buscarCategoriasPorNombre(tablaCategorias, nombre);

      return coincidencias.length > 0 ? "Encontrado" : "No encontrado";
    });

    expect(resultados).toEqual(["Encontrado", "Encontrado", "Encontrado"]);
  });
});
