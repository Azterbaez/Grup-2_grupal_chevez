const {
  buscarCategoriasPorNombre,
  consultarCategoriaPorId,
  datosPruebaCategoria,
  obtenerListadoCategorias,
  registrarCategoria,
} = require("./categoria.js");

describe("CATEGORIA-0013 - Registro de categorias", () => {
  let tablaCategorias;

  beforeEach(() => {
    tablaCategorias = [];
  });

  test("ejecuta la operacion principal y registra categorias validas", () => {
    datosPruebaCategoria.forEach((categoria) => {
      const resultado = registrarCategoria(categoria, tablaCategorias);

      expect(resultado.registrado).toBe(true);
      expect(resultado.errores).toHaveLength(0);
      expect(resultado.categoria).toEqual(
        expect.objectContaining({
          nombre_categoria: categoria.nombre_categoria,
          descripcion_categoria: categoria.descripcion_categoria,
        })
      );
    });

    expect(tablaCategorias).toHaveLength(3);
  });

  test("almacena correctamente la informacion en la tabla Categorias", () => {
    datosPruebaCategoria.forEach((categoria) => {
      registrarCategoria(categoria, tablaCategorias);
    });

    datosPruebaCategoria.forEach((categoria, index) => {
      const categoriaGuardada = consultarCategoriaPorId(tablaCategorias, index + 1);

      expect(categoriaGuardada).toEqual(
        expect.objectContaining({
          id_categoria: index + 1,
          nombre_categoria: categoria.nombre_categoria,
          descripcion_categoria: categoria.descripcion_categoria,
        })
      );
    });
  });

  test("muestra correctamente las categorias registradas en el listado", () => {
    datosPruebaCategoria.forEach((categoria) => {
      registrarCategoria(categoria, tablaCategorias);
    });

    const listadoCategorias = obtenerListadoCategorias(tablaCategorias);

    expect(listadoCategorias).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          nombre_categoria: "Prueba A",
          descripcion_categoria: "Categoria de prueba A",
        }),
        expect.objectContaining({
          nombre_categoria: "Prueba A",
          descripcion_categoria: "Categoria de prueba A duplicada",
        }),
        expect.objectContaining({
          nombre_categoria: "Prueba B",
          descripcion_categoria: "Categoria de prueba B",
        }),
      ])
    );
  });

  test("retorna encontrado al consultar las categorias registradas", () => {
    datosPruebaCategoria.forEach((categoria) => {
      registrarCategoria(categoria, tablaCategorias);
    });

    const resultados = datosPruebaCategoria.map((categoria) => {
      const coincidencias = buscarCategoriasPorNombre(
        tablaCategorias,
        categoria.nombre_categoria
      );

      return coincidencias.length > 0 ? "Encontrado" : "No encontrado";
    });

    expect(resultados).toEqual(["Encontrado", "Encontrado", "Encontrado"]);
  });
});
