import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../../assets/large-logo.png"

function Sidebar() {
  const [nomeUsuario, setNomeUsuario] = useState("");
  const navigate = useNavigate();
  const location = useLocation(); // <-- pega rota atual

  useEffect(() => {
    const usuario = localStorage.getItem("usuario");
    if (usuario) {
      setNomeUsuario(usuario);
    }
  }, []);

  const sair = () => {
    localStorage.clear();
    navigate("/");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div
      style={{
        width: "240px",
        height: "100vh",
        backgroundColor: "#EADACB",
        fontSize: "18px"
      }}
    >
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "20px",
        }}
      >
        <div
        style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "20px",
            marginBottom: "50px",
        }}
        >
        <img
            src={logo}
            alt="Logo"
            style={{
            width: "200px",
            height: "auto",
            marginBottom: "10px",
            }}
        />

        {nomeUsuario && (
            <div
            style={{
                fontWeight: "bold",
                textTransform: "uppercase",
                fontSize: "19px",
                color: "#2E2E2E",
            }}
            onMouseEnter={e => e.currentTarget.style.transform = "translateY(-5px)"}
            onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
            >
            {nomeUsuario}
            </div>
        )}
        </div>

        <ul style={{ listStyleType: "none", padding: "0", margin: 25 }}>
          <li
          style={{ ...liStyle, ...(isActive("/vendas") && activeLi) }}
          onMouseEnter={e => e.currentTarget.style.transform = "translateY(-5px)"}
          onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
          >
            <Link to="/vendas" style={linkStyle}>VENDAS</Link>
          </li>

          <li
          style={{ ...liStyle, ...(isActive("/produtos") && activeLi) }}
          onMouseEnter={e => e.currentTarget.style.transform = "translateY(-5px)"}
          onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
          >
            <Link to="/produtos" style={linkStyle}>PRODUTOS</Link>
          </li>

          <li
          style={{ ...liStyle, ...(isActive("/usuarios") && activeLi) }}
          onMouseEnter={e => e.currentTarget.style.transform = "translateY(-5px)"}
          onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
          >
            <Link to="/usuarios" style={linkStyle}>USUÁRIOS</Link>
          </li>

          <li
          style={{ ...liStyle, ...(isActive("/caixa") && activeLi) }}
          onMouseEnter={e => e.currentTarget.style.transform = "translateY(-5px)"}
          onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
          >
            <Link to="/caixa" style={linkStyle}>CAIXA</Link>
          </li>

          <li
          style={{ ...liStyle, ...(isActive("/dashboard") && activeLi) }}
          onMouseEnter={e => e.currentTarget.style.transform = "translateY(-5px)"}
          onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
          >
            <Link to="/dashboard" style={linkStyle}>DASHBOARD</Link>
          </li>

          <li
          style={{...liStyle, paddingTop: "25px", justifyContent: "flex-end",  paddingRight: "20px"}}
          onMouseEnter={e => e.currentTarget.style.transform = "translateY(-5px)"}
          onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
          >
            <button
              onClick={sair}
              style={{...linkStyle, fontWeight: "bold", background: "none", border: "none", cursor: "pointer"}}>
              SAIR
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}

const linkStyle = {
  color: "#2E2E2E",
  textDecoration: "none",
};

const liStyle = {
  marginBottom: "20px",
  display: "flex",
  alignItems: "center",
  paddingLeft: "10px",
  transition: "transform 0.2s",
};

const activeLi = {
  borderLeft: "12px solid #F5F5F0",
  borderTopLeftRadius: "10px",
  borderBottomLeftRadius: "10px",
};

export default Sidebar;
