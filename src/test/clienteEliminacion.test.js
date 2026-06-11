const {
  buscarClientesPorNombre,
  consultarClientePorId,
  datosPruebaCliente,
  eliminarCliente,
  obtenerListadoClientes,
  prepararTablaClientes,
} = require("./cliente.js");

describe("CLIENTE-0018 - Eliminacion de clientes", () => {
  let tablaClientes;

  beforeEach(() => {
    tablaClientes = prepararTablaClientes();
  });

  test("ejecuta la operacion principal de eliminacion correctamente", () => {
    const clienteAEliminar = consultarClientePorId(tablaClientes, 1);
    const resultado = eliminarCliente(tablaClientes, clienteAEliminar.id_cliente);

    expect(resultado.eliminado).toBe(true);
    expect(resultado.errores).toHaveLength(0);
    expect(resultado.cliente).toEqual(
      expect.objectContaining({
        id_cliente: 1,
        nombre_cliente: "Prueba A",
        telefono: "8888-0001",
        direccion: "Direccion de prueba A",
      })
    );
  });

  test("guarda el cambio y la tabla Clientes ya no contiene el registro eliminado", () => {
    eliminarCliente(tablaClientes, 2);

    const clienteEliminado = consultarClientePorId(tablaClientes, 2);
    const listadoClientes = obtenerListadoClientes(tablaClientes);

    expect(clienteEliminado).toBeNull();
    expect(listadoClientes).toHaveLength(datosPruebaCliente.length - 1);
    expect(listadoClientes).not.toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id_cliente: 2,
          telefono: "8888-0002",
        }),
      ])
    );
  });

  test("muestra correctamente el listado despues de eliminar un cliente", () => {
    eliminarCliente(tablaClientes, 3);

    const listadoClientes = obtenerListadoClientes(tablaClientes);

    expect(listadoClientes).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          nombre_cliente: "Prueba A",
          telefono: "8888-0001",
          direccion: "Direccion de prueba A",
        }),
        expect.objectContaining({
          nombre_cliente: "Prueba A",
          telefono: "8888-0002",
          direccion: "Direccion de prueba A duplicada",
        }),
      ])
    );
    expect(listadoClientes).not.toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          nombre_cliente: "Prueba B",
          telefono: "8888-0003",
        }),
      ])
    );
  });

  test("retorna encontrado solo para los clientes que permanecen almacenados", () => {
    eliminarCliente(tablaClientes, 3);

    const resultados = [
      buscarClientesPorNombre(tablaClientes, "Prueba A").length > 0
        ? "Encontrado"
        : "No encontrado",
      consultarClientePorId(tablaClientes, 2) ? "Encontrado" : "No encontrado",
      consultarClientePorId(tablaClientes, 3) ? "Encontrado" : "No encontrado",
    ];

    expect(resultados).toEqual(["Encontrado", "Encontrado", "No encontrado"]);
  });

  test("rechaza la eliminacion de un cliente inexistente", () => {
    const resultado = eliminarCliente(tablaClientes, 999);

    expect(resultado.eliminado).toBe(false);
    expect(resultado.cliente).toBeNull();
    expect(resultado.errores).toEqual(["El cliente no existe"]);
    expect(tablaClientes).toHaveLength(3);
  });
});
