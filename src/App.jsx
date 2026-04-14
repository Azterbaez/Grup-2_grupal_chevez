import {usestate } from 'react'
import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom';

import Encabezado from "./components/navegacion/Encabezado";

import Inicio from "./views/Inicio";
import Login from "./views/Login";
import Categorias from "./views/Categorias";
import Catalogo from "./views/Catalogo";
import Productos from "./views/Productos";
import Proveedores from "./views/Proveedores";
import RutaProtegida from "./components/rutas/RutasProtegida";
import Pagina404 from "./views/pagina404";

import './App.css'
// <  > //
const App = () => {
    return (
       <Router> 

      <Encabezado /> 
      <main className="margen-superior-main">
         <Routes> 
             <Route paht="/Login" element={ <Login /> }/>

            <Route paht="/" element={ <RutaProtegida><Inicio /> </RutaProtegida> } />
            <Route paht="/Categorias" element={ <RutaProtegida><Categorias /> </RutaProtegida> } />
            <Route paht="/Catalogo" element={ <RutaProtegida><Catalogo /> </RutaProtegida> } />
            <Route paht="/Productos" element={ <RutaProtegida><Productos /> </RutaProtegida> } />
            <Route paht="/Proveedores" element={ <RutaProtegida><Proveedores /> </RutaProtegida> } />

            <Route paht="*" element={ <Pagina404 /> }/>
              

      </Routes> 
      </main>  
       </Router> 
    );
}

export default App;

