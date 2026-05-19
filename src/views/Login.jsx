import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../database/supabaseconfig";
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

    <div
      className="d-flex flex-column justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #1e3c72, #2a5298)",
      }}
    >

      <h2
        style={{
          color: "#ffffff",
          fontWeight: "700",
          fontSize: "2.3rem",
          marginBottom: "10px",
          textShadow: "0 3px 10px rgba(0,0,0,0.3)",
        }}
      >
        Iniciar Sesión
      </h2>

      <p
        style={{
          color: "#dbeafe",
          fontSize: "1rem",
          marginBottom: "25px",
        }}
      >
        Bienvenido de nuevo, por favor ingresa tus credenciales para continuar.
      </p>

      <FormularioLogin />

    </div>

  );

};

export default Login;