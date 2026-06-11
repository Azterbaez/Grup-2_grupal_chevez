const datosPruebaCliente = [
  {
    nombre_cliente: "Prueba A",
    telefono: "8888-0001",
    direccion: "Direccion de prueba A",
    estado: "Valido",
    resultadoEsperado: "Pass",
  },
  {
    nombre_cliente: "Prueba A",
    telefono: "8888-0002",
    direccion: "Direccion de prueba A duplicada",
    estado: "Valido",
    resultadoEsperado: "Pass",
  },
  {
    nombre_cliente: "Prueba B",
    telefono: "8888-0003",
    direccion: "Direccion de prueba B",
    estado: "Valido",
    resultadoEsperado: "Pass",
  },
];

function validarCliente(cliente) {
  const errores = [];

  if (!cliente.nombre_cliente?.trim()) {
    errores.push("El nombre del cliente es obligatorio");
  }

  if (!cliente.telefono?.trim()) {
    errores.push("El telefono del cliente es obligatorio");
  }

  if (!cliente.direccion?.trim()) {
    errores.push("La direccion del cliente es obligatoria");
  }

  return {
    valido: errores.length === 0,
    errores,
  };
}

function registrarCliente(cliente, tablaClientes) {
  const validacion = validarCliente(cliente);

  if (!validacion.valido) {
    return {
      registrado: false,
      errores: validacion.errores,
      cliente: null,
    };
  }

  const clienteRegistrado = {
    id_cliente: tablaClientes.length + 1,
    nombre_cliente: cliente.nombre_cliente.trim(),
    telefono: cliente.telefono.trim(),
    direccion: cliente.direccion.trim(),
  };

  tablaClientes.push(clienteRegistrado);

  return {
    registrado: true,
    errores: [],
    cliente: clienteRegistrado,
  };
}

function eliminarCliente(tablaClientes, idCliente) {
  const posicionCliente = tablaClientes.findIndex(
    (cliente) => cliente.id_cliente === Number(idCliente)
  );

  if (posicionCliente === -1) {
    return {
      eliminado: false,
      errores: ["El cliente no existe"],
      cliente: null,
    };
  }

  const [clienteEliminado] = tablaClientes.splice(posicionCliente, 1);

  return {
    eliminado: true,
    errores: [],
    cliente: clienteEliminado,
  };
}

function consultarClientePorId(tablaClientes, idCliente) {
  return (
    tablaClientes.find((cliente) => cliente.id_cliente === Number(idCliente)) ||
    null
  );
}

function buscarClientesPorNombre(tablaClientes, nombreBuscado) {
  const busqueda = nombreBuscado.trim().toLowerCase();

  return tablaClientes.filter((cliente) =>
    cliente.nombre_cliente.toLowerCase().includes(busqueda)
  );
}

function obtenerListadoClientes(tablaClientes) {
  return [...tablaClientes];
}

function prepararTablaClientes(clientes = datosPruebaCliente) {
  const tablaClientes = [];

  clientes.forEach((cliente) => {
    registrarCliente(cliente, tablaClientes);
  });

  return tablaClientes;
}

module.exports = {
  buscarClientesPorNombre,
  consultarClientePorId,
  datosPruebaCliente,
  eliminarCliente,
  obtenerListadoClientes,
  prepararTablaClientes,
  registrarCliente,
  validarCliente,
};
