import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import cesta from '../../assets/cesta.png';
import consultarVendas from '../../assets/Consultar Vendas.png';
import Sidebar from "../../components/sidebar";
import './styles.css';

function Venda() {
  const itensMock = [
    { codigo_barras: "001", nome: "Cabeceira Estofada", preco_unitario: 25.90 },
    { codigo_barras: "002", nome: "Feijão 1kg", preco_unitario: 7.50 },
    { codigo_barras: "003", nome: "Açúcar 1kg", preco_unitario: 4.20 },
    { codigo_barras: "004", nome: "Macarrão 500g", preco_unitario: 3.80 },
  ];

  const [cpf, setCpf] = useState("");
  const [formaPagamento, setFormaPagamento] = useState("");
  const [itensSelecionados, setItensSelecionados] = useState([]);
  const [mostrarProdutos, setMostrarProdutos] = useState(false);
  const [busca, setBusca] = useState("");
  const navigate = useNavigate();

  const itensFiltrados = itensMock.filter((item) =>
  item.nome.toLowerCase().includes(busca.toLowerCase())
);

  const adicionarItem = (item, quantidade) => {
    const itemComQuantidade = { ...item, quantidade: Number(quantidade) };
    setItensSelecionados([...itensSelecionados, itemComQuantidade]);
  };

  const atualizarQuantidade = (index, novaQuantidade) => {
    const itensAtualizados = [...itensSelecionados];
    itensAtualizados[index].quantidade = Number(novaQuantidade);
    setItensSelecionados(itensAtualizados);
  };

  const removerItem = (index) => {
    const itensAtualizados = itensSelecionados.filter((_, i) => i !== index);
    setItensSelecionados(itensAtualizados);
  };

  const calcularTotal = () => {
    return itensSelecionados
      .reduce((total, item) => total + item.quantidade * item.preco_unitario, 0)
      .toFixed(2);
  };

  const resetarCampos = () => {
    setCpf("");
    setFormaPagamento("");
    setItensSelecionados([]);
    setMostrarProdutos(false);
  };

  const cadastrarVenda = (cpfCliente, formaPag, valorTotal) => {
    alert(
      `Venda cadastrada!\nCPF: ${cpfCliente}\nPagamento: ${formaPag}\nTotal: R$ ${valorTotal}`
    );
    resetarCampos();
  };

  return (
    <div className="venda-container">
      <Sidebar />
      <div className="venda-content">
        {/* esquerda */}
        <div className="venda-left">
          <h1 className="title-venda"> Venda </h1>
            <div className="tabela-itens">
              <div className="title-lista">
                LISTA DE COMPRAS
              </div>
                <table>
                  <thead>
                    <tr className="cabecalho-tabela">
                      <th>Produto</th>
                      <th>Qtd.</th>
                      <th>Valor</th>
                      <th>🗑️</th>
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
                              className="input-quantidade"
                            />
                          </td>
                          <td>{`R$ ${item.preco_unitario.toFixed(2)}`}</td>
                          <td>
                            <button onClick={() => removerItem(index)} className="btn-remover">
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

              <h3 className="total">Total: R$ {calcularTotal()}</h3>
            </div>

            {/* direita */}
            <div className="venda-right">
              <div className="botoes-superiores">
                <button className="btn-produto" onClick={() => setMostrarProdutos((prev) => !prev)}>
                  <img src={cesta} alt="Produto" className="icone" />
                </button>

                <button className="btn-vendas" onClick={() => navigate("/lista-vendas")}>
                  <img src={consultarVendas} alt="Consultar Vendas" className="icone" />
                </button>
              </div>

              {mostrarProdutos && (
                <div className="lista-produtos">
                  <h2>Selecione um Produto</h2>

                  {/* Barra de pesquisa */}
                  <input
                    type="text"
                    placeholder="Buscar produto..."
                    value={busca}
                    onChange={(e) => setBusca(e.target.value)}
                    className="input-pesquisa"
                    style={{ marginBottom: "10px", padding: "5px", width: "100%" }}
                  />

                  <table>
                    <thead>
                      <tr className="cabecalho-tabela">
                        <th>Produto</th>
                        <th>Valor</th>
                        <th>Qnt.</th>
                        <th>Adicionar</th>
                      </tr>
                    </thead>
                    <tbody>
                      {itensFiltrados.length > 0 ? (
                        itensFiltrados.map((item) => (
                          <tr key={item.codigo_barras}>
                            <td>{item.nome}</td>
                            <td>{`R$ ${item.preco_unitario.toFixed(2)}`}</td>
                            <td>
                              <input
                                type="number"
                                min="1"
                                defaultValue="1"
                                className="input-quantidade"
                                id={`quantidade-${item.codigo_barras}`}
                              />
                            </td>
                            <td>
                              <button
                                onClick={() => {
                                  const quantidade = parseInt(
                                    document.getElementById(`quantidade-${item.codigo_barras}`).value,
                                    10
                                  );
                                  adicionarItem(item, quantidade);
                                }}
                              >
                                +
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="4">Nenhum produto encontrado</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}

              <div className="info-cliente">
                <h2>Informações do Cliente</h2>
                <input
                  type="text"
                  placeholder="CPF"
                  value={cpf}
                  onChange={(e) => setCpf(e.target.value)}
                  className="input-cpf"
                />
                <button className="btn-adicionar-cliente">Adicionar Cliente</button>
              </div>

              <div className="info-pagamento">
                <h2>Pagamento</h2>
                <select
                  value={formaPagamento}
                  onChange={(e) => setFormaPagamento(e.target.value)}
                >
                  <option value="">Selecione a forma de pagamento</option>
                  <option value="cartao">Cartão</option>
                  <option value="pix">PIX</option>
                  <option value="dinheiro">Dinheiro</option>
                </select>
              </div>

              <div className="botoes-acao">
                <button onClick={resetarCampos} className="btn-cancelar">
                  Cancelar
                </button>
                <button
                  className="btn-confirmar"
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
