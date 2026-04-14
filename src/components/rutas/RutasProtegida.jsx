import { Navigate, Outlet } from "react-router-dom";

import { supabase }  from "../../assets/database/supabaseconfig";
import { useEffect, useState } from "react";


const RutaProtegida = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const verificarSesion = async () => {
      const { data } = await supabase.auth.getSession();
      setUsuario(data.session);
      setCargando(false);
    };

    verificarSesion();
  }, []);

  if (cargando) return <p>Cargando...</p>;

  if (!usuario) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default RutaProtegida;