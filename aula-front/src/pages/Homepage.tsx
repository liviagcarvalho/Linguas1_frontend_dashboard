// import React, { useEffect, useState, useMemo } from "react";
// import styled from "styled-components";
// import Sidebar from "../components/Sidebar";
// import Card from "../components/Card";
// import Topbar from "../components/Topbar";
// //import FaturamentoPorCidade from "../components/FaturamentoPorCidade";
// import { isAfter, isBefore, parseISO } from "date-fns";
// import {
//   BarChart,
//   Bar,
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   CartesianGrid,
//   ResponsiveContainer,
// } from "recharts";

// type Aula = {
//   date: string;
//   id_cliente: string;
//   tipo: string;
//   price: number;
// };


// type Cliente = {
//   ID_Cliente: string;
//   NPS: number;
// };

// const Content = styled.div`
//   padding: 2rem;
//   background: #fafafa;
//   min-height: 100vh;
// `;

// const CardsRow = styled.div`
//   display: flex;
//   flex-wrap: wrap;
//   gap: 2rem;
//   margin-bottom: 3rem;
// `;

// const ChartsGrid = styled.div`
//   display: grid;
//   grid-template-columns: 1fr 1fr;
//   gap: 2rem;

//   @media (max-width: 1000px) {
//     grid-template-columns: 1fr;
//   }
// `;

// const ChartContainer = styled.div`
//   background: #fff;
//   padding: 1.5rem;
//   border-radius: 12px;
//   box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
// `;

// const ChartTitle = styled.h2`
//   margin-bottom: 1rem;
// `;

// const Homepage = () => {
//   const [aulas, setAulas] = useState<Aula[]>([]);
//   const [clientes, setClientes] = useState<Cliente[]>([]);
//   const [tipoSelecionado, setTipoSelecionado] = useState("");
//   const [dataInicio, setDataInicio] = useState("2000-01-01");
//   const [dataFim, setDataFim] = useState("2100-12-31");
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   useEffect(() => {
//     const fetchDados = async () => {
//       const [resAulas, resBase] = await Promise.all([
//         fetch("http://localhost:8000/aulas"),
//         fetch("http://localhost:8000/base"),
//       ]);
//       const dadosAulas = await resAulas.json();
//       const dadosBase = await resBase.json();

//       const aulasConvertidas = dadosAulas.map((aula: any) => ({
//         ...aula,
//         price: Number(aula.price),
//         date: aula.date,
//       }));

//       setAulas(aulasConvertidas);
//       setClientes(dadosBase);
//     };

//     fetchDados();
//   }, []);

//   const aulasFiltradas = useMemo(() => {
//     return aulas.filter((aula) => {
//       const matchTipo = tipoSelecionado ? aula.tipo === tipoSelecionado : true;
//       const matchData =
//         isAfter(parseISO(aula.date), parseISO(dataInicio)) &&
//         isBefore(parseISO(aula.date), parseISO(dataFim));
//       return matchTipo && matchData;
//     });
//   }, [aulas, tipoSelecionado, dataInicio, dataFim]);

//   const idsFiltrados = useMemo(() => new Set(aulasFiltradas.map((a) => a.id_cliente)), [aulasFiltradas]);

//   const npsFiltrado = useMemo(() => {
//     const npsValores = clientes
//       .filter((c) => idsFiltrados.has(c.ID_Cliente))
//       .map((c) => Number(c.NPS))
//       .filter((n) => !isNaN(n));

//     if (npsValores.length === 0) return 0;

//     return npsValores.reduce((acc, n) => acc + n, 0) / npsValores.length;
//   }, [clientes, idsFiltrados]);

//   const faturamentoTotal = aulasFiltradas.reduce((acc, aula) => acc + aula.price, 0);

//   const faturamentoPorTipo = useMemo(() => {
//     const tipoMap = new Map<string, number>();
//     aulasFiltradas.forEach((aula) => {
//       tipoMap.set(aula.tipo, (tipoMap.get(aula.tipo) || 0) + aula.price);
//     });
//     return Array.from(tipoMap.entries()).map(([tipo, faturamento]) => ({ tipo, faturamento }));
//   }, [aulasFiltradas]);

//   const faturamentoPorData = useMemo(() => {
//     const dataMap = new Map<string, number>();
//     aulasFiltradas.forEach((aula) => {
//       const dia = aula.date;
//       dataMap.set(dia, (dataMap.get(dia) || 0) + aula.price);
//     });
//     return Array.from(dataMap.entries())
//       .map(([date, faturamento]) => ({ date, faturamento }))
//       .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
//   }, [aulasFiltradas]);

//   const clientesAtivos = idsFiltrados.size;
//   const totalAulas = aulasFiltradas.length;

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
//         <CardsRow>
//           <Card
//             title="Faturamento Total"
//             value={`R$ ${faturamentoTotal.toLocaleString("pt-BR", {
//               minimumFractionDigits: 2,
//             })}`}
//           />
//           <Card title="NPS Médio" value={npsFiltrado.toFixed(2)} />
//           <Card title="Clientes Ativos" value={clientesAtivos.toString()} />
//           <Card title="Aulas Vendidas" value={totalAulas.toString()} />
//         </CardsRow>

//         <ChartsGrid>
//           <ChartContainer>
//             <ChartTitle>Faturamento por Tipo de Aula</ChartTitle>
//             <ResponsiveContainer width="100%" height={300}>
//               <BarChart data={faturamentoPorTipo}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="tipo" />
//                 <YAxis />
//                 <Tooltip
//                   formatter={(value: number) =>
//                     `R$ ${value.toLocaleString("pt-BR", {
//                       minimumFractionDigits: 2,
//                     })}`
//                   }
//                 />
//                 <Bar dataKey="faturamento" fill="#a5b4fc" />
//               </BarChart>
//             </ResponsiveContainer>
//           </ChartContainer>

//           <ChartContainer>
//             <ChartTitle>Evolução do Faturamento</ChartTitle>
//             <ResponsiveContainer width="100%" height={300}>
//               <LineChart data={faturamentoPorData}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="date" />
//                 <YAxis />
//                 <Tooltip
//                   formatter={(value: number) =>
//                     `R$ ${value.toLocaleString("pt-BR", {
//                       minimumFractionDigits: 2,
//                     })}`
//                   }
//                 />
//                 <Line type="monotone" dataKey="faturamento" stroke="#4c51bf" strokeWidth={2} />
//               </LineChart>
//             </ResponsiveContainer>
//           </ChartContainer>
//         </ChartsGrid>

//       </Content>
//     </>
//   );
// };

// export default Homepage;

import React, { useEffect, useState, useMemo } from "react";
import styled from "styled-components";
import Sidebar from "../components/Sidebar";
import Card from "../components/Card";
import Topbar from "../components/Topbar";
import FaturamentoPorCidade from "../components/FaturamentoPorCidade";
import { isAfter, isBefore, parseISO } from "date-fns";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

type Aula = {
  date: string;
  id_cliente: string;
  tipo: string;
  price: number;
};

type Cliente = {
  ID_Cliente: string;
  NPS: number;
  Cidade?: string;
};

const Content = styled.div`
  padding: 2rem;
  background: #fafafa;
  min-height: 100vh;
`;

const CardsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  margin-bottom: 3rem;
`;

const ChartsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;

  @media (max-width: 1000px) {
    grid-template-columns: 1fr;
  }
`;

const ChartContainer = styled.div`
  background: #fff;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`;

const ChartTitle = styled.h2`
  margin-bottom: 1rem;
`;

const FullWidthChartWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 4rem;
`;

const FullWidthChartContainer = styled.div`
  width: 100%;
  padding: 0 2rem;
`;

const Homepage = () => {
  const [aulas, setAulas] = useState<Aula[]>([]);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [tipoSelecionado, setTipoSelecionado] = useState("");
  const [dataInicio, setDataInicio] = useState("2000-01-01");
  const [dataFim, setDataFim] = useState("2100-12-31");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchDados = async () => {
      const [resAulas, resBase] = await Promise.all([
        fetch("http://localhost:8000/aulas"),
        fetch("http://localhost:8000/base"),
      ]);
      const dadosAulas = await resAulas.json();
      const dadosBase = await resBase.json();

      const aulasConvertidas = dadosAulas.map((aula: any) => ({
        ...aula,
        price: Number(aula.price),
        date: aula.date,
      }));

      setAulas(aulasConvertidas);
      setClientes(dadosBase);
    };

    fetchDados();
  }, []);

  const aulasFiltradas = useMemo(() => {
    return aulas.filter((aula) => {
      const matchTipo = tipoSelecionado ? aula.tipo === tipoSelecionado : true;
      const matchData =
        isAfter(parseISO(aula.date), parseISO(dataInicio)) &&
        isBefore(parseISO(aula.date), parseISO(dataFim));
      return matchTipo && matchData;
    });
  }, [aulas, tipoSelecionado, dataInicio, dataFim]);

  const idsFiltrados = useMemo(
    () => new Set(aulasFiltradas.map((a) => a.id_cliente)),
    [aulasFiltradas]
  );

  const npsFiltrado = useMemo(() => {
    const npsValores = clientes
      .filter((c) => idsFiltrados.has(c.ID_Cliente))
      .map((c) => Number(c.NPS))
      .filter((n) => !isNaN(n));

    if (npsValores.length === 0) return 0;

    return npsValores.reduce((acc, n) => acc + n, 0) / npsValores.length;
  }, [clientes, idsFiltrados]);

  const faturamentoTotal = aulasFiltradas.reduce((acc, aula) => acc + aula.price, 0);

  const faturamentoPorTipo = useMemo(() => {
    const tipoMap = new Map<string, number>();
    aulasFiltradas.forEach((aula) => {
      tipoMap.set(aula.tipo, (tipoMap.get(aula.tipo) || 0) + aula.price);
    });
    return Array.from(tipoMap.entries()).map(([tipo, faturamento]) => ({ tipo, faturamento }));
  }, [aulasFiltradas]);

  const faturamentoPorData = useMemo(() => {
    const dataMap = new Map<string, number>();
    aulasFiltradas.forEach((aula) => {
      const dia = aula.date;
      dataMap.set(dia, (dataMap.get(dia) || 0) + aula.price);
    });
    return Array.from(dataMap.entries())
      .map(([date, faturamento]) => ({ date, faturamento }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [aulasFiltradas]);

  const clientesAtivos = idsFiltrados.size;
  const totalAulas = aulasFiltradas.length;

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
        <CardsRow>
          <Card
            title="Faturamento Total"
            value={`R$ ${faturamentoTotal.toLocaleString("pt-BR", {
              minimumFractionDigits: 2,
            })}`}
          />
          <Card title="NPS Médio" value={npsFiltrado.toFixed(2)} />
          <Card title="Clientes Ativos" value={clientesAtivos.toString()} />
          <Card title="Aulas Vendidas" value={totalAulas.toString()} />
        </CardsRow>

        <ChartsGrid>
          <ChartContainer>
            <ChartTitle>Faturamento por Tipo de Aula</ChartTitle>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={faturamentoPorTipo}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="tipo" />
                <YAxis />
                <Tooltip
                  formatter={(value: number) =>
                    `R$ ${value.toLocaleString("pt-BR", {
                      minimumFractionDigits: 2,
                    })}`
                  }
                />
                <Bar dataKey="faturamento" fill="#a5b4fc" />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>

          <ChartContainer>
            <ChartTitle>Evolução do Faturamento</ChartTitle>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={faturamentoPorData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip
                  formatter={(value: number) =>
                    `R$ ${value.toLocaleString("pt-BR", {
                      minimumFractionDigits: 2,
                    })}`
                  }
                />
                <Line type="monotone" dataKey="faturamento" stroke="#4c51bf" strokeWidth={2} dot />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </ChartsGrid>

        {/* BLOCO DO GRÁFICO DE CIDADE CENTRALIZADO E FLUIDO */}
        <FullWidthChartWrapper>
          <FullWidthChartContainer>
            <FaturamentoPorCidade
              dados={aulasFiltradas.map((a) => {
                const cliente = clientes.find((c) => c.ID_Cliente === a.id_cliente);
                return { cidade: cliente?.Cidade || "", price: a.price };
              })}
            />
          </FullWidthChartContainer>
        </FullWidthChartWrapper>
      </Content>
    </>
  );
};

export default Homepage;
