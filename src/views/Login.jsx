import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../assets/database/supabaseconfig";
import FormularioLogin from "../components/login/FormularioLogin";

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const verificarSesion = async () => {
      const { data } = await supabase.auth.getSession();

      if (data.session) {
        navigate("/");
      }
    };

    verificarSesion();
  }, []);

  return (
    <div>
      <h2>Iniciar Sesión</h2>
      <FormularioLogin />
    </div>
  );
};

export default Login;
