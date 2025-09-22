import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Venda() {
  // dados fixos de produtos
  const itensMock = [
    { codigo_barras: "001", nome: "Arroz 5kg", preco_unitario: 25.90 },
    { codigo_barras: "002", nome: "Feijão 1kg", preco_unitario: 7.50 },
    { codigo_barras: "003", nome: "Açúcar 1kg", preco_unitario: 4.20 },
    { codigo_barras: "004", nome: "Macarrão 500g", preco_unitario: 3.80 },
  ];

  const [cpf, setCpf] = useState("");
  const [formaPagamento, setFormaPagamento] = useState("");
  const [itensSelecionados, setItensSelecionados] = useState([]);
  const [mostrarProdutos, setMostrarProdutos] = useState(false);
  const navigate = useNavigate();

  // Adiciona item à venda
  const adicionarItem = (item, quantidade) => {
    const itemComQuantidade = { ...item, quantidade: Number(quantidade) };
    setItensSelecionados([...itensSelecionados, itemComQuantidade]);
    setMostrarProdutos(false);
  };

  // Atualiza quantidade de um item selecionado
  const atualizarQuantidade = (index, novaQuantidade) => {
    const itensAtualizados = [...itensSelecionados];
    itensAtualizados[index].quantidade = Number(novaQuantidade);
    setItensSelecionados(itensAtualizados);
  };

  // Remove item
  const removerItem = (index) => {
    const itensAtualizados = itensSelecionados.filter((_, i) => i !== index);
    setItensSelecionados(itensAtualizados);
  };

  // Total
  const calcularTotal = () => {
    return itensSelecionados
      .reduce((total, item) => total + item.quantidade * item.preco_unitario, 0)
      .toFixed(2);
  };

  // Reset
  const resetarCampos = () => {
    setCpf("");
    setFormaPagamento("");
    setItensSelecionados([]);
    setMostrarProdutos(false);
  };

  // Confirmar venda (aqui só mostra um alert)
  const cadastrarVenda = (cpfCliente, formaPag, valorTotal) => {
    alert(
      `Venda cadastrada!\nCPF: ${cpfCliente}\nPagamento: ${formaPag}\nTotal: R$ ${valorTotal}`
    );
    resetarCampos();
  };

  return (
    <div style={{ display: "flex" }}>
      <div style={{ marginLeft: "250px", padding: "20px", flexGrow: "1", display: "flex" }}>
        {/* esquerda */}
        <div style={{ width: "50%", paddingRight: "20px", marginRight: "20px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <h1>Venda</h1>

          <div style={{ border: "1px solid #ccc", borderRadius: "5px", padding: "10px", flexGrow: 1, backgroundColor: '#d3d3d3' }}>
            <table border="1" style={{ width: "100%", textAlign: "center" }}>
              <thead>
                <tr style={{ backgroundColor: "#800000", color: "white" }}>
                  <th>Nome</th>
                  <th>Quantidade</th>
                  <th>Valor Unitário</th>
                  <th>Remover</th>
                </tr>
              </thead>
              <tbody>
                {itensSelecionados.length > 0 ? (
                  itensSelecionados.map((item, index) => (
                    <tr key={index}>
                      <td>{item.nome}</td>
                      <td>
                        <input
                          type="number"
                          value={item.quantidade}
                          min="1"
                          onChange={(e) => atualizarQuantidade(index, e.target.value)}
                          style={{ width: "60px", textAlign: "center" }}
                        />
                      </td>
                      <td>{`R$ ${item.preco_unitario.toFixed(2)}`}</td>
                      <td>
                        <button onClick={() => removerItem(index)} style={{ color: "red", cursor: "pointer" }}>
                          X
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4">Nenhum item selecionado</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <h3 style={{ marginTop: "20px" }}>Total: R$ {calcularTotal()}</h3>
        </div>

        {/* direita */}
        <div style={{ width: "50%", display: "flex", flexDirection: "column" }}>
          <div style={{ marginTop: "85px", display: "flex", justifyContent: "flex-start", gap: "20px" }}>
            <button
              style={{ backgroundColor: '#d3d3d3', border: 'none', padding: '10px', borderRadius: '5px', cursor: 'pointer' }}
              onClick={() => setMostrarProdutos(true)}
            >
              {/*<img src={cesta} alt="Produto" style={{ width: '100px', height: '100px' }} /> */}
            </button>

            <button
              style={{ padding: "10px", backgroundColor: "#d3d3d3", color: "black", border: "none", borderRadius: "5px", cursor: "pointer" }}
              onClick={() => navigate("/lista-vendas")}
            >
              {/*<img src={cesta} alt="Produto" style={{ width: '100px', height: '100px' }} /> */}
            </button>
          </div>

          {mostrarProdutos && (
            <div style={{ border: "1px solid #ccc", padding: "10px", borderRadius: '5px', backgroundColor: '#d3d3d3', marginTop: "20px" }}>
              <h2>Selecione um Produto</h2>
              <table border="1" style={{ width: "100%", textAlign: "center" }}>
                <thead>
                  <tr style={{ backgroundColor: "#800000", color: "white" }}>
                    <th>Nome</th>
                    <th>Preço</th>
                    <th>Quantidade</th>
                    <th>Adicionar</th>
                  </tr>
                </thead>
                <tbody>
                  {itensMock.map((item) => (
                    <tr key={item.codigo_barras}>
                      <td>{item.nome}</td>
                      <td>{`R$ ${item.preco_unitario.toFixed(2)}`}</td>
                      <td>
                        <input type="number" min="1" defaultValue="1" style={{ width: "60px", textAlign: "center" }} id={`quantidade-${item.codigo_barras}`} />
                      </td>
                      <td>
                        <button onClick={() => {
                          const quantidade = parseInt(document.getElementById(`quantidade-${item.codigo_barras}`).value, 10);
                          adicionarItem(item, quantidade);
                        }}>
                          Adicionar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div style={{ marginTop: "20px", border: "1px solid #ccc", padding: "10px", borderRadius: '5px', backgroundColor: '#d3d3d3' }}>
            <h2>Informações do Cliente</h2>
            <input
              type="text"
              placeholder="CPF"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              style={{ padding: "8px", marginRight: "10px" }}
            />
            <button style={{ padding: "8px", backgroundColor: "green", color: "white" }}>Adicionar Cliente</button>
          </div>

          <div style={{ marginTop: "20px", border: "1px solid #ccc", padding: "10px", borderRadius: '5px', backgroundColor: '#d3d3d3' }}>
            <h2>Pagamento</h2>
            <select
              value={formaPagamento}
              onChange={(e) => setFormaPagamento(e.target.value)}
              style={{ padding: "8px" }}
            >
              <option value="">Selecione a forma de pagamento</option>
              <option value="cartao">Cartão</option>
              <option value="pix">PIX</option>
              <option value="dinheiro">Dinheiro</option>
            </select>
          </div>

          <div style={{ marginTop: "20px", display: "flex", justifyContent: "space-between" }}>
            <button onClick={resetarCampos} style={{ padding: "10px", backgroundColor: "red", color: "white" }}>
              Cancelar
            </button>
            <button
              style={{ padding: "10px", backgroundColor: "green", color: "white" }}
              onClick={() => cadastrarVenda(cpf, formaPagamento, calcularTotal())}
            >
              Confirmar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Venda;
