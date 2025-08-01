import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import GraficoPorCidade from "../components/GraficoPorCidade";
import GraficoPorEducacao from "../components/GraficoPorEducacao";
import GraficoPorIdade from "../components/GraficoPorIdade";

type Cliente = {
  ID_Cliente: number;
  Cidade: string;
  Renda_anual: number;
  Education: string;
  NPS: number;
  Aulas: string;
  Num_Aulas: number;
  Ano_de_nascimento: number;
  faixa_idade: string;
};

type Aula = {
  date: string;
  id_cliente: number;
  tipo: string;
  price: number;
};

const Content = styled.div`
  padding: 2rem;
  background: #fafafa;
  min-height: 100vh;
`;

const Section = styled.div`
  margin-bottom: 3rem;
`;

const GridSection = styled.div`
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
`;

const CardContainer = styled.div`
  flex: 1;
  min-width: 300px;
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`;

const TituloGrafico = styled.h2`
  text-align: center;
  font-weight: bold;
  margin-bottom: 1rem;
  font-size: 1.2rem;
`;

const Clientes = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [aulas, setAulas] = useState<Aula[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [tipoSelecionado, setTipoSelecionado] = useState("");
  const [dataInicio, setDataInicio] = useState("2000-01-01");
  const [dataFim, setDataFim] = useState("2100-12-31");

  useEffect(() => {
    const fetchDados = async () => {
      const [resClientes, resAulas] = await Promise.all([
        fetch("http://localhost:8000/base"),
        fetch("http://localhost:8000/aulas"),
      ]);
      const dadosClientes = await resClientes.json();
      const dadosAulas = await resAulas.json();

      setClientes(dadosClientes);
      setAulas(
        dadosAulas.map((a: any) => ({
          ...a,
          price: Number(a.price),
        }))
      );
    };

    fetchDados();
  }, []);

  return (
    <>
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <Topbar
        tipoSelecionado={tipoSelecionado}
        onTipoChange={setTipoSelecionado}
        dataInicio={dataInicio}
        dataFim={dataFim}
        onDataChange={(inicio, fim) => {
          setDataInicio(inicio);
          setDataFim(fim);
        }}
        tiposDisponiveis={[]}
        onToggleSidebar={() => setSidebarOpen(true)}
      />

      <Content>
        <Section>
          <TituloGrafico>Distribuição por Cidade</TituloGrafico>
          <GraficoPorCidade dados={clientes} />
        </Section>

        <GridSection>
          <CardContainer>
            <TituloGrafico>Perfil por Educação</TituloGrafico>
            <GraficoPorEducacao dados={clientes} />
          </CardContainer>

          <CardContainer>
            <TituloGrafico>Média de Aulas e Gasto por Faixa de Idade</TituloGrafico>
            <GraficoPorIdade clientes={clientes} aulas={aulas} />
          </CardContainer>
        </GridSection>
      </Content>
    </>
  );
};

export default Clientes;

