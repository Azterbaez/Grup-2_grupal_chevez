import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Encabezado from "./components/navegacion/Encabezado";

import Inicio from "./views/Inicio";
import Login from "./views/Login";
import Categorias from "./views/Categorias";
import Catalogo from "./views/Catalogo";
import Productos from "./views/Productos";
import Proveedores from "./views/Proveedores";
import RutaProtegida from "./components/rutas/RutasProtegida";
import Pagina404 from "./views/pagina404";
import './App.css';

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
                              <Route path="/" element={<RutaProtegida><Inicio /></RutaProtegida>} />
                              <Route path="/Categorias" element={<RutaProtegida><Categorias /></RutaProtegida>} />
                              <Route path="/Catalogo" element={<Catalogo />} />
                              <Route path="/Productos" element={<RutaProtegida><Productos /></RutaProtegida>} />
                              <Route path="/Proveedores" element={<RutaProtegida><Proveedores /></RutaProtegida>} />
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