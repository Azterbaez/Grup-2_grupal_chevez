const datosPruebaCategoria = [
  {
    nombre_categoria: "Prueba A",
    descripcion_categoria: "Categoria de prueba A",
    estado: "Valido",
    resultadoEsperado: "Pass",
  },
  {
    nombre_categoria: "Prueba A",
    descripcion_categoria: "Categoria de prueba A duplicada",
    estado: "Valido",
    resultadoEsperado: "Pass",
  },
  {
    nombre_categoria: "Prueba B",
    descripcion_categoria: "Categoria de prueba B",
    estado: "Valido",
    resultadoEsperado: "Pass",
  },
];

const categoriaInvalida = {
  nombre_categoria: "",
  descripcion_categoria: "",
  estado: "No valido",
  resultadoEsperado: "Fail",
};

const datosEdicionCategoria = [
  {
    id_categoria: 1,
    nombre_categoria: "Prueba A",
    descripcion_categoria: "Categoria editada A",
    estado: "Valido",
    resultadoEsperado: "Pass",
  },
  {
    id_categoria: 2,
    nombre_categoria: "Prueba A",
    descripcion_categoria: "Categoria editada A duplicada",
    estado: "Valido",
    resultadoEsperado: "Pass",
  },
  {
    id_categoria: 3,
    nombre_categoria: "Prueba B",
    descripcion_categoria: "Categoria editada B",
    estado: "Valido",
    resultadoEsperado: "Pass",
  },
];

function validarCategoria(categoria) {
  const errores = [];

  if (!categoria.nombre_categoria?.trim()) {
    errores.push("El nombre de la categoria es obligatorio");
  }

  if (!categoria.descripcion_categoria?.trim()) {
    errores.push("La descripcion de la categoria es obligatoria");
  }

  return {
    valido: errores.length === 0,
    errores,
  };
}

function registrarCategoria(categoria, tablaCategorias) {
  const validacion = validarCategoria(categoria);

  if (!validacion.valido) {
    return {
      registrado: false,
      errores: validacion.errores,
      categoria: null,
    };
  }

  const categoriaRegistrada = {
    id_categoria: tablaCategorias.length + 1,
    nombre_categoria: categoria.nombre_categoria.trim(),
    descripcion_categoria: categoria.descripcion_categoria.trim(),
  };

  tablaCategorias.push(categoriaRegistrada);

  return {
    registrado: true,
    errores: [],
    categoria: categoriaRegistrada,
  };
}

function editarCategoria(tablaCategorias, idCategoria, nuevosDatos) {
  const posicionCategoria = tablaCategorias.findIndex(
    (categoria) => categoria.id_categoria === Number(idCategoria)
  );

  if (posicionCategoria === -1) {
    return {
      actualizado: false,
      errores: ["La categoria no existe"],
      categoria: null,
    };
  }

  const categoriaActualizada = {
    ...tablaCategorias[posicionCategoria],
    ...nuevosDatos,
  };
  const validacion = validarCategoria(categoriaActualizada);

  if (!validacion.valido) {
    return {
      actualizado: false,
      errores: validacion.errores,
      categoria: null,
    };
  }

  tablaCategorias[posicionCategoria] = {
    ...categoriaActualizada,
    nombre_categoria: categoriaActualizada.nombre_categoria.trim(),
    descripcion_categoria: categoriaActualizada.descripcion_categoria.trim(),
  };

  return {
    actualizado: true,
    errores: [],
    categoria: tablaCategorias[posicionCategoria],
  };
}

function obtenerListadoCategorias(tablaCategorias) {
  return [...tablaCategorias];
}

function consultarCategoriaPorId(tablaCategorias, idCategoria) {
  return (
    tablaCategorias.find(
      (categoria) => categoria.id_categoria === Number(idCategoria)
    ) || null
  );
}

function buscarCategoriasPorNombre(tablaCategorias, nombreBuscado) {
  const busqueda = nombreBuscado.trim().toLowerCase();

  return tablaCategorias.filter((categoria) =>
    categoria.nombre_categoria.toLowerCase().includes(busqueda)
  );
}

function prepararTablaCategorias(categorias = datosPruebaCategoria) {
  const tablaCategorias = [];

  categorias.forEach((categoria) => {
    registrarCategoria(categoria, tablaCategorias);
  });

  return tablaCategorias;
}

module.exports = {
  buscarCategoriasPorNombre,
  categoriaInvalida,
  consultarCategoriaPorId,
  datosEdicionCategoria,
  datosPruebaCategoria,
  editarCategoria,
  obtenerListadoCategorias,
  prepararTablaCategorias,
  registrarCategoria,
  validarCategoria,
};
