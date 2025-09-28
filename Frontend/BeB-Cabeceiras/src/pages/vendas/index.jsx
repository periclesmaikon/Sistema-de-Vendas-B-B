import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import cesta from '../../assets/cesta.png';
import consultarVendas from '../../assets/Consultar Vendas.png';
import Sidebar from "../../components/sidebar";
import './styles.css';

function Venda() {
  // Mock de produtos
  const itensMock = [
    { codigo_barras: "001", nome: "Cama Premium", preco_unitario: 2500.00 },
    { codigo_barras: "002", nome: "Lençol de Algodão", preco_unitario: 150.00 },
    { codigo_barras: "003", nome: "Cabeceira Estofada", preco_unitario: 800.00 },
    { codigo_barras: "004", nome: "Cama Simples", preco_unitario: 900.00 },
    { codigo_barras: "005", nome: "Travesseiro de Plumas", preco_unitario: 120.00 },
    { codigo_barras: "006", nome: "Edredom Casal", preco_unitario: 350.00 },
    { codigo_barras: "007", nome: "Colchão Ortopédico", preco_unitario: 1800.00 },
    { codigo_barras: "008", nome: "Cobertor Microfibra", preco_unitario: 200.00 },
    { codigo_barras: "009", nome: "Protetor de Colchão", preco_unitario: 100.00 },
    { codigo_barras: "010", nome: "Almofada Decorativa", preco_unitario: 80.00 },
  ];

  // Mock de clientes
  const clientesMock = [
    { nome: "João Silva", cpf: "111.111.111-11" },
    { nome: "Maria Souza", cpf: "222.222.222-22" },
    { nome: "Pedro Santos", cpf: "333.333.333-33" },
  ];

  const [clienteSelecionado, setClienteSelecionado] = useState("");
  const [formaPagamento, setFormaPagamento] = useState("");
  const [valorPago, setValorPago] = useState("");
  const [itensSelecionados, setItensSelecionados] = useState([]);
  const [mostrarProdutos, setMostrarProdutos] = useState(false);
  const [busca, setBusca] = useState("");
  const navigate = useNavigate();

  const itensFiltrados = itensMock.filter((item) =>
    item.nome.toLowerCase().includes(busca.toLowerCase())
  );

  const adicionarItem = (item, quantidade) => {
    const indexExistente = itensSelecionados.findIndex(
      (i) => i.codigo_barras === item.codigo_barras
    );

    if (indexExistente !== -1) {
      // Se o item já existe, atualiza a quantidade
      const itensAtualizados = [...itensSelecionados];
      itensAtualizados[indexExistente].quantidade += Number(quantidade);
      setItensSelecionados(itensAtualizados);
    } else {
      // Se não existe, adiciona novo item
      const itemComQuantidade = { ...item, quantidade: Number(quantidade) };
      setItensSelecionados([...itensSelecionados, itemComQuantidade]);
    }
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
    setClienteSelecionado("");
    setFormaPagamento("");
    setValorPago("");
    setItensSelecionados([]);
    setMostrarProdutos(false);
  };

  const cadastrarVenda = (cliente, formaPag, valorTotal) => {
    toast.success(`Venda Cadastrada!`, {
            position: "top-center",
            autoClose: 2000,
          });
    resetarCampos();
  };

  return (
    <div className="venda-container">
      <Sidebar />
      <div className="venda-content">
        {/* Coluna 1 - Lista de Compras */}
        <div className="venda-left">
          <h1 className="title-venda"> Venda </h1>
          <div className="tabela-itens">
            <div className="title-lista">LISTA DE COMPRAS</div>
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
                          onChange={(e) =>
                            atualizarQuantidade(index, e.target.value)
                          }
                          className="input-quantidade"
                        />
                      </td>
                      <td>{`R$ ${item.preco_unitario.toFixed(2)}`}</td>
                      <td>
                        <button
                          onClick={() => removerItem(index)}
                          className="btn-remover"
                        >
                          🗑️
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

        {/* Coluna 2 - Botões + Produtos */}
        <div className="venda-middle">
          <div className="botoes-superiores">
            <button
              className="btn-produto"
              onClick={() => setMostrarProdutos((prev) => !prev)}
            >
              <img src={cesta} alt="Produto" className="icone" />
            </button>

            <button
              className="btn-vendas"
              onClick={() => navigate("/lista-vendas")}
            >
              <img src={consultarVendas} alt="Consultar Vendas" className="icone" />
            </button>
          </div>

          {mostrarProdutos && (
            <div className="lista-produtos">
              <h2 className="title-produtos">Selecione um Produto</h2>

              {/* Barra de pesquisa */}
              <input
                type="text"
                placeholder="🔎Buscar produto"
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                className="input-pesquisa"
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
                        <td>{`R$${item.preco_unitario.toFixed(2)}`}</td>
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
                            className="btn-adicionar"
                            onClick={() => {
                              const quantidade = parseInt(
                                document.getElementById(
                                  `quantidade-${item.codigo_barras}`
                                ).value,
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
        </div>

        {/* Coluna 3 - Info cliente + Pagamento */}
        <div className="venda-right">
          <div className="select-info">
            <h2 className="title-produtos">Cliente</h2>
            <select
              value={clienteSelecionado}
              onChange={(e) => {
                const valor = e.target.value;
                if (valor === "cadastrar") {
                  navigate("/cadastrarCliente");
                } else {
                  setClienteSelecionado(valor);
                }
              }}
            >
              <option hidden value="">Selecione o cliente</option>
              <option value="nenhum">Nenhum cliente</option>
              <option value="cadastrar">Cadastrar cliente</option>
              {clientesMock.map((cliente, index) => (
                <option key={index} value={`${cliente.nome} - ${cliente.cpf}`}>
                  {cliente.nome} - {cliente.cpf}
                </option>
              ))}
            </select>
          </div>

          <div className="select-info">
            <h2 className="title-produtos">Pagamento</h2>
            <select
              value={formaPagamento}
              onChange={(e) => setFormaPagamento(e.target.value)}
            >
              <option hidden value="">Selecione a forma de pagamento</option>
              <option value="cartao">Cartão</option>
              <option value="pix">PIX</option>
              <option value="dinheiro">Dinheiro</option>
            </select>
          </div>

          <div className="select-info">
            <h2 className="title-produtos">Valor Pago</h2>
            <input
              type="number"
              min="0"
              step="0.01"
              placeholder="Digite o valor pago"
              value={valorPago}
              onChange={(e) => setValorPago(e.target.value)}
              className="input-valor-pago"
            />
          </div>

          <div className="botoes-acao">
            <button onClick={resetarCampos} className="btn-cancelar">
              Cancelar
            </button>
            <button
              className="btn-confirmar"
              onClick={() =>
                cadastrarVenda(clienteSelecionado, formaPagamento, calcularTotal())
              }
            >
              Confirmar
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Venda;