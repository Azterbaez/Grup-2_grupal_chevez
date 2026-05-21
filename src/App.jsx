import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Encabezado from "./components/navegacion/Encabezado";

import Login from "./views/Login";
import Inicio from "./views/Inicio";
import Clientes from "./views/Clientes";
import Productos from "./views/Productos";
import Categorias from "./views/Categorias";
import Ventas from "./views/Ventas";
import Catalogo from "./views/Catalogo";
import DashboardVentas from "./views/DashboardVentas";
import RutaProtegida from "./components/rutas/RutasProtegida";
import Pagina404 from "./views/pagina404";

import "./App.css";

const App = () => {

  return (

    <Router>

      <Routes>

        {/* LOGIN */}

        <Route
          path="/login"
          element={<Login />}
        />

        {/* SISTEMA */}

        <Route
          path="/*"
          element={
            <>

              <Encabezado />

              <main className="margen-superior-main">

                <Routes>

                  {/* INICIO */}

                  <Route
                    path="/"
                    element={
                      <RutaProtegida>
                        <Inicio />
                      </RutaProtegida>
                    }
                  />

                  {/* INICIO ALTERNATIVO */}

                  <Route
                    path="/inicio"
                    element={
                      <RutaProtegida>
                        <Inicio />
                      </RutaProtegida>
                    }
                  />

                    {/* DASHBOARD VENTAS */}
                    <Route
                      path="/dashboard-ventas"
                      element={
                        <RutaProtegida>
                          <DashboardVentas />
                        </RutaProtegida>
                      }
                    />  

                  {/* CLIENTES */}

                  <Route
                    path="/clientes"
                    element={
                      <RutaProtegida>
                        <Clientes />
                      </RutaProtegida>
                    }
                  />

                  {/* PRODUCTOS */}

                  <Route
                    path="/productos"
                    element={
                      <RutaProtegida>
                        <Productos />
                      </RutaProtegida>
                    }
                  />

                  {/* CATEGORÍAS */}

                  <Route
                    path="/categorias"
                    element={
                      <RutaProtegida>
                        <Categorias />
                      </RutaProtegida>
                    }
                  />

                  {/* VENTAS */}

                  <Route
                    path="/ventas"
                    element={
                      <RutaProtegida>
                        <Ventas />
                      </RutaProtegida>
                    }
                  />

                  {/* CATÁLOGO */}

                  <Route
                    path="/catalogo"
                    element={
                      <RutaProtegida>
                        <Catalogo />
                      </RutaProtegida>
                    }
                  />

                  {/* 404 */}

                  <Route
                    path="*"
                    element={<Pagina404 />}
                  />

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