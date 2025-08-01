import React, { useState } from "react";
import styled from "styled-components";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

const Content = styled.div`
  padding: 2rem;
  background: #fafafa;
  min-height: 100vh;
`;

const Title = styled.h1`
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 2rem;
`;

const Clientes = () => {
  const [tipoSelecionado, setTipoSelecionado] = useState("");
  const [dataInicio, setDataInicio] = useState("2000-01-01");
  const [dataFim, setDataFim] = useState("2100-12-31");
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
        tiposDisponiveis={[]} // você pode preencher futuramente
        onToggleSidebar={() => setSidebarOpen(true)}
      />

      <Content>
        <Title>Painel de Clientes</Title>
        {/* Aqui você poderá adicionar cards, tabelas, gráficos etc */}
      </Content>
    </>
  );
};

export default Clientes;
