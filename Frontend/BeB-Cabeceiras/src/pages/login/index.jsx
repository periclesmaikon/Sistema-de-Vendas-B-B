import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "./styles.css";
import logo from "../../assets/large-logo.png"


function Login() {
  const usuarios = ["Bruna", "Vanessa"];
  const [usuarioSelecionado, setUsuarioSelecionado] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (usuarioSelecionado) {
      toast.success(`Bem-vindo(a) ${usuarioSelecionado}!`, {
        position: "top-center",
        autoClose: 1000,
      });
      localStorage.setItem("usuario", usuarioSelecionado);
      setTimeout(() => navigate("/vendas"), 1200); // espera o toast sumir
    } else {
      toast.error("Selecione um usuário primeiro!", {
        position: "top-center",
        autoClose: 1500,
      });
    }
  };

  return (
    <div className="page-container">
      {/* Coluna da imagem */}
      <div className="image-section">
        <img src={logo} alt="Logo grande" />
      </div>

      {/* Coluna do login */}
      <div className="login-section">
        <h1>LOGIN</h1>
        <select
          value={usuarioSelecionado}
          onChange={(e) => setUsuarioSelecionado(e.target.value)}
        >
          <option value="">Selecione um usuário</option>
          {usuarios.map((user, index) => (
            <option key={index} value={user}>
              {user}
            </option>
          ))}
        </select>
        <button onClick={handleLogin}>Entrar</button>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Login;