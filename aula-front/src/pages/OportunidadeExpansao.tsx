// import React, { useEffect, useState } from "react";
// import styled from "styled-components";
// import Sidebar from "../components/Sidebar";
// import Topbar from "../components/Topbar";

// type Cliente = {
//   ID_Cliente: number;
//   Cidade: string;
//   Renda_anual: number;
//   Education: string;
//   NPS: number;
//   Aulas: string;
//   Num_Aulas: number;
//   Ano_de_nascimento: number;
//   faixa_idade: string;
// };

// type Aula = {
//   date: string;
//   id_cliente: number;
//   tipo: string;
//   price: number;
// };

// const Content = styled.div`
//   padding: 2rem;
//   background: #fafafa;
//   min-height: 100vh;
// `;

// const Section = styled.div`
//   margin-bottom: 3rem;
// `;

// const OportunidadeExpansao = () => {
//   const [clientes, setClientes] = useState<Cliente[]>([]);
//   const [aulas, setAulas] = useState<Aula[]>([]);
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [tipoSelecionado, setTipoSelecionado] = useState("");
//   const [dataInicio, setDataInicio] = useState("2000-01-01");
//   const [dataFim, setDataFim] = useState("2100-12-31");

//   useEffect(() => {
//     const fetchDados = async () => {
//       const [resClientes, resAulas] = await Promise.all([
//         fetch("http://localhost:8000/base"),
//         fetch("http://localhost:8000/aulas"),
//       ]);
//       const dadosClientes = await resClientes.json();
//       const dadosAulas = await resAulas.json();

//       setClientes(dadosClientes);
//       setAulas(
//         dadosAulas.map((a: any) => ({
//           ...a,
//           price: Number(a.price),
//         }))
//       );
//     };

//     fetchDados();
//   }, []);

//   return (
//     <>
//       <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

//       <Topbar
//         tipoSelecionado={tipoSelecionado}
//         onTipoChange={setTipoSelecionado}
//         dataInicio={dataInicio}
//         dataFim={dataFim}
//         onDataChange={(inicio, fim) => {
//           setDataInicio(inicio);
//           setDataFim(fim);
//         }}
//         tiposDisponiveis={[...new Set(aulas.map((a) => a.tipo))]}
//         onToggleSidebar={() => setSidebarOpen(true)}
//       />

//       <Content>
//         <Section>
//           <h2 style={{ textAlign: "center", fontWeight: "bold" }}>
//             Oportunidades de Expansão e Prioridades Estratégicas
//           </h2>
//           {/* Aqui você pode adicionar os gráficos e análises desejadas */}
//           <p style={{ textAlign: "center", marginTop: "2rem" }}>
//             Em breve: gráficos de gaps de mercado, cidades de alta renda e baixa penetração, e análise de intenção vs conversão.
//           </p>
//         </Section>
//       </Content>
//     </>
//   );
// };

// export default OportunidadeExpansao;


import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

import MotivosMaisLucrativos from "../components/MotivosMaisLucrativos";

import ConversaoPorMotivo from "../components/ConversaoPorMotivo";

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
  Motivo: string;
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

const OportunidadeExpansao = () => {
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
        tiposDisponiveis={[...new Set(aulas.map((a) => a.tipo))]}
        onToggleSidebar={() => setSidebarOpen(true)}
      />

      <Content>
        <Section>
          <h2 style={{ textAlign: "center", fontWeight: "bold" }}>
            Oportunidades de Expansão e Prioridades Estratégicas
          </h2>
        </Section>

        <Section>
          <GridSection>
            <MotivosMaisLucrativos clientes={clientes} aulas={aulas} />
          </GridSection>
        </Section>

        <Section>
          <GridSection>
            <ConversaoPorMotivo clientes={clientes} />
          </GridSection>
        </Section>
      </Content>
    </>
  );
};

export default OportunidadeExpansao;

