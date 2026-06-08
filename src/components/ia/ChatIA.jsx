import React, { useState, useRef, useEffect } from "react";
import { Modal, Button, Form, Spinner, Table } from "react-bootstrap";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { supabase } from "../../database/supabaseconfig";

const ChatIA = ({ mostrar, onCerrar }) => {
  const [mensajes, setMensajes] = useState([]);
  const [entrada, setEntrada] = useState("");
  const [cargando, setCargando] = useState(false);
  const finChatRef = useRef(null);

  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

  const contextoBaseDatos = `
Sistema de ventas.

Tablas disponibles:

- categorias (
    id_categoria,
    nombre_categoria,
    descripcion_categoria
)

- clientes (
    id_cliente,
    nombre_cliente,
    telefono,
    direccion
)

- productos (
    id_producto,
    nombre_producto,
    descripcion_producto,
    categoria_producto,
    precio_venta,
    url_imagen,
    stock
)

- empleados (
    id_empleado,
    nombre_empleado,
    apellido_empleado,
    email,
    celular,
    pin,
    tipo_empleado
)

- ventas (
    id_venta,
    cantidad,
    total,
    fecha,
    id_cliente,
    id_empleado,
    metodo_pago
)

- detalle_venta (
    id_detalle,
    id_venta,
    id_producto,
    cantidad,
    precio,
    subtotal
)

Relaciones:

- ventas.id_cliente → clientes.id_cliente
- ventas.id_empleado → empleados.id_empleado
- detalle_venta.id_venta → ventas.id_venta
- detalle_venta.id_producto → productos.id_producto

IMPORTANTE:
- clientes NO tiene apellido_cliente.
- clientes NO tiene celular.
- ventas usa fecha, NO fecha_venta.
- detalle_venta se llama detalle_venta, NO detalles_ventas.
- detalle_venta usa precio, NO precio_unitario.
- Usa únicamente columnas existentes.
`;

  const enviarConsulta = async () => {
    if (!entrada.trim()) return;

    const mensajeUsuario = {
      tipo: "usuario",
      contenido: entrada,
    };

    setMensajes((prev) => [...prev, mensajeUsuario]);

    const consultaActual = entrada;
    setEntrada("");
    setCargando(true);

    try {
      const modelo = genAI.getGenerativeModel({
        model: "gemini-2.5-flash",
      });

      const prompt = `
Eres un experto en PostgreSQL.

${contextoBaseDatos}

REGLAS OBLIGATORIAS:

- Comprende errores ortográficos del usuario.
- Genera únicamente consultas SELECT.
- Nunca generes INSERT.
- Nunca generes UPDATE.
- Nunca generes DELETE.
- Nunca generes DROP.
- Nunca inventes tablas.
- Nunca inventes columnas.
- Usa únicamente tablas y columnas existentes en el esquema.
- Devuelve EXCLUSIVAMENTE un JSON válido.
- No uses markdown.
- No uses bloques \`\`\`json.
- No agregues texto antes ni después del JSON.

Formato obligatorio:

{
  "explicacion": "Explicación breve",
  "consulta_sql": "SELECT ...",
  "columnas": ["columna1", "columna2"]
}

Consulta del usuario:

"${consultaActual}"
`;

      const resultado = await modelo.generateContent(prompt);

      let texto = resultado.response.text().trim();

      texto = texto
        .replace(/```json/gi, "")
        .replace(/```/g, "")
        .trim();

      let respuestaIA;

      try {
        respuestaIA = JSON.parse(texto);
      } catch {
        const match = texto.match(/\{[\s\S]*\}/);

        if (!match) {
          throw new Error(
            `No se pudo interpretar la respuesta.\n${texto}`
          );
        }

        respuestaIA = JSON.parse(match[0]);
      }

      if (!respuestaIA.consulta_sql) {
        throw new Error("La consulta no se generó correctamente.");
      }

      let sqlLimpio = respuestaIA.consulta_sql.trim();
      sqlLimpio = sqlLimpio.replace(/;\s*$/, "");
      sqlLimpio = sqlLimpio.replace(/\)\s*\)/g, ")");
      sqlLimpio = sqlLimpio.replace(/,\s*\)/g, ")");

      const { data, error } = await supabase.rpc("ejecutar_consulta_segura", {
        query_sql: sqlLimpio,
      });

      if (error) {
        throw new Error(`Error en la consulta: ${error.message}`);
      }

      let datosExtraidos = [];

      if (Array.isArray(data)) {
        datosExtraidos = data.map((item) =>
          item?.datos ? item.datos : item
        );
      }

      const columnas =
        respuestaIA.columnas?.length > 0
          ? respuestaIA.columnas
          : datosExtraidos.length > 0
            ? Object.keys(datosExtraidos[0])
            : [];

      const mensajeRespuesta = {
        tipo: "ia",
        explicacion:
          respuestaIA.explicacion || "Consulta ejecutada correctamente",
        columnas,
        datos: datosExtraidos,
      };

      setMensajes((prev) => [...prev, mensajeRespuesta]);
    } catch (error) {
      setMensajes((prev) => [
        ...prev,
        {
          tipo: "ia",
          explicacion:
            error.message || "Ocurrió un error al procesar la consulta.",
          error: true,
        },
      ]);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    finChatRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [mensajes]);

  return (
    <Modal
      show={mostrar}
      onHide={onCerrar}
      size="xl"
      centered
      backdrop="static"
      className="modal-consultas"
    >
      <Modal.Header closeButton>
        <Modal.Title>Consultas de datos</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ height: "68vh", overflowY: "auto" }}>
        <div className="d-flex flex-column h-100">
          <div className="flex-grow-1 overflow-auto mb-3 pe-1">
            {mensajes.length === 0 && (
              <div className="text-center chat-area-vacia mt-4">
                <h5>Pregunta en lenguaje natural</h5>
                <p className="small mb-2">
                  El sistema traduce tu pregunta a una consulta y muestra los
                  resultados en tabla.
                </p>
                <ul className="text-start">
                  <li>Ventas totales del mes actual</li>
                  <li>Productos con menor stock</li>
                  <li>Clientes con más compras</li>
                  <li>Ventas por empleado</li>
                </ul>
              </div>
            )}

            {mensajes.map((msg, index) => (
              <div
                key={index}
                className={`mb-3 d-flex ${
                  msg.tipo === "usuario" ? "justify-content-end" : ""
                }`}
              >
                <div
                  className={`chat-burbuja ${
                    msg.tipo === "usuario"
                      ? "chat-burbuja-usuario"
                      : "chat-burbuja-asistente"
                  } ${msg.error ? "border-danger" : ""}`}
                >
                  <strong>
                    {msg.tipo === "usuario" ? "Tu consulta" : "Resultado"}
                  </strong>
                  {msg.tipo === "usuario" ? (
                    <p className="mb-0">{msg.contenido}</p>
                  ) : (
                    msg.explicacion
                  )}

                  {msg.datos && msg.datos.length > 0 && (
                    <Table
                      striped
                      bordered
                      hover
                      size="sm"
                      responsive
                      className="mt-3 mb-0 bg-white"
                    >
                      <thead>
                        <tr>
                          {msg.columnas.map((col, i) => (
                            <th key={i}>{col.replace(/_/g, " ")}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {msg.datos.map((fila, i) => (
                          <tr key={i}>
                            {msg.columnas.map((col, j) => (
                              <td key={j}>{fila[col]}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  )}
                </div>
              </div>
            ))}

            {cargando && (
              <div className="text-center py-3 text-secondary small">
                <Spinner animation="border" size="sm" className="me-2" />
                Procesando…
              </div>
            )}
            <div ref={finChatRef} />
          </div>

          <Form
            className="chat-input-bar"
            onSubmit={(e) => {
              e.preventDefault();
              enviarConsulta();
            }}
          >
            <div className="d-flex gap-2">
              <Form.Control
                value={entrada}
                onChange={(e) => setEntrada(e.target.value)}
                placeholder="Ej.: ventas de la última semana por empleado"
                disabled={cargando}
              />
              <Button
                type="submit"
                variant="primary"
                disabled={cargando || !entrada.trim()}
              >
                Enviar
              </Button>
            </div>
          </Form>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ChatIA;
