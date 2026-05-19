import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Encabezado from "./components/navegacion/Encabezado";

import Login from "./views/Login";
import Inicio from "./views/Inicio";
import Clientes from "./views/Clientes";
import Productos from "./views/Productos";
import Categorias from "./views/Categorias";
import Ventas from "./views/Ventas";
import Catalogo from "./views/Catalogo";
import RutaProtegida from "./components/rutas/RutasProtegida";
import Pagina404 from "./views/pagina404";

import "./App.css";

const App = () => {
  return (
    <Router>
      <Routes>

        <Route path="/login" element={<Login />} />


        <Route
          path="/*"
          element={
            <>
              <Encabezado />
              <main className="margen-superior-main">
                <Routes>

                  {/* Redirección inicial */}

                  <Route
                    path="/inicio"
                    element={
                      <RutaProtegida>
                        <Inicio />
                      </RutaProtegida>
                    }
                  />

                  <Route
                    path="/"
                    element={
                      <RutaProtegida>
                        <Clientes />
                      </RutaProtegida>
                    }
                  />


                  <Route
                    path="/catalogo"
                    element={
                      <RutaProtegida>
                        <Catalogo />
                      </RutaProtegida>
                    }
                  />

                  <Route
                    path="/categorias"
                    element={
                      <RutaProtegida>
                        <Categorias />
                      </RutaProtegida>
                    }
                  />

                  <Route
                    path="/clientes"
                    element={
                      <RutaProtegida>
                        <Clientes />
                      </RutaProtegida>
                    }
                  />

                  <Route
                    path="/ventas"
                    element={
                      <RutaProtegida>
                        <Ventas />
                      </RutaProtegida>
                    }
                  />

                  <Route
                    path="/Productos"
                    element={
                      <RutaProtegida>
                        <Productos />
                      </RutaProtegida>
                    }
                  />


                  {/* 404 */}
                  <Route path="*" element={<Pagina404 />} />

                </Routes>
              </main>
            </>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;