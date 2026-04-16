import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Encabezado from "./components/navegacion/Encabezado";

import Login from "./views/Login";
import Clientes from "./views/Clientes";
import Productos from "./views/Productos";
import Tiempo from "./views/Tiempo";

import RutaProtegida from "./components/rutas/RutasProtegida";
import Pagina404 from "./views/pagina404";

import "./App.css";

const App = () => {
  return (
    <Router>
      <Routes>

        {/* 🔓 Ruta pública */}
        <Route path="/login" element={<Login />} />

        {/* 🔒 Rutas con Navbar */}
        <Route
          path="/*"
          element={
            <>
              <Encabezado />
              <main className="margen-superior-main">
                <Routes>
                  
                  {/* Redirección inicial */}
                  <Route
                    path="/"
                    element={
                      <RutaProtegida>
                        <Clientes />
                      </RutaProtegida>
                    }
                  />

                  <Route
                    path="/Clientes"
                    element={
                      <RutaProtegida>
                        <Clientes />
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

                  <Route
                    path="/Tiempo"
                    element={
                      <RutaProtegida>
                        <Tiempo />
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