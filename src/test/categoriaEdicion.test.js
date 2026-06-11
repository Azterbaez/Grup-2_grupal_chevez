const {
  consultarCategoriaPorId,
  datosEdicionCategoria,
  editarCategoria,
  obtenerListadoCategorias,
  prepararTablaCategorias,
} = require("./categoria.js");

describe("CATEGORIA-0015 - Edicion de categorias", () => {
  let tablaCategorias;

  beforeEach(() => {
    tablaCategorias = prepararTablaCategorias();
  });

  test("ejecuta la operacion principal de edicion correctamente", () => {
    datosEdicionCategoria.forEach((datosEdicion) => {
      const resultado = editarCategoria(
        tablaCategorias,
        datosEdicion.id_categoria,
        datosEdicion
      );

      expect(resultado.actualizado).toBe(true);
      expect(resultado.errores).toHaveLength(0);
      expect(resultado.categoria).toEqual(
        expect.objectContaining({
          id_categoria: datosEdicion.id_categoria,
          nombre_categoria: datosEdicion.nombre_categoria,
          descripcion_categoria: datosEdicion.descripcion_categoria,
        })
      );
    });
  });

  test("guarda la informacion editada y coincide con la tabla Categorias", () => {
    datosEdicionCategoria.forEach((datosEdicion) => {
      editarCategoria(tablaCategorias, datosEdicion.id_categoria, datosEdicion);
    });

    datosEdicionCategoria.forEach((datosEdicion) => {
      const categoriaGuardada = consultarCategoriaPorId(
        tablaCategorias,
        datosEdicion.id_categoria
      );

      expect(categoriaGuardada).toEqual(
        expect.objectContaining({
          nombre_categoria: datosEdicion.nombre_categoria,
          descripcion_categoria: datosEdicion.descripcion_categoria,
        })
      );
    });
  });

  test("muestra correctamente las categorias editadas en el listado", () => {
    datosEdicionCategoria.forEach((datosEdicion) => {
      editarCategoria(tablaCategorias, datosEdicion.id_categoria, datosEdicion);
    });

    const listadoCategorias = obtenerListadoCategorias(tablaCategorias);

    expect(listadoCategorias).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          nombre_categoria: "Prueba A",
          descripcion_categoria: "Categoria editada A",
        }),
        expect.objectContaining({
          nombre_categoria: "Prueba A",
          descripcion_categoria: "Categoria editada A duplicada",
        }),
        expect.objectContaining({
          nombre_categoria: "Prueba B",
          descripcion_categoria: "Categoria editada B",
        }),
      ])
    );
  });

  test("retorna encontrado al consultar las categorias editadas", () => {
    datosEdicionCategoria.forEach((datosEdicion) => {
      editarCategoria(tablaCategorias, datosEdicion.id_categoria, datosEdicion);
    });

    const resultados = datosEdicionCategoria.map((datosEdicion) => {
      const categoria = consultarCategoriaPorId(
        tablaCategorias,
        datosEdicion.id_categoria
      );

      return categoria ? "Encontrado" : "No encontrado";
    });

    expect(resultados).toEqual(["Encontrado", "Encontrado", "Encontrado"]);
  });
});
