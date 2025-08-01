import React from "react";
import {
  BarChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Label,
} from "recharts";
import styled from "styled-components";

type Cliente = {
  ID_Cliente: number;
  faixa_idade: string;
  Num_Aulas: number;
};

type Aula = {
  id_cliente: number;
  price: number;
};

type Props = {
  clientes: Cliente[];
  aulas: Aula[];
};

const ChartContainer = styled.div`
  background: #fff;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`;

const GraficoPorIdade = ({ clientes, aulas }: Props) => {
  const clientesPorIdade: {
    [faixa: string]: { totalAulas: number; totalGasto: number; count: number };
  } = {};

  clientes.forEach((cliente) => {
    const faixa = cliente.faixa_idade || "Indefinido";
    const clienteAulas = aulas.filter((a) => a.id_cliente === cliente.ID_Cliente);
    const gasto = clienteAulas.reduce((acc, curr) => acc + curr.price, 0);

    if (!clientesPorIdade[faixa]) {
      clientesPorIdade[faixa] = { totalAulas: 0, totalGasto: 0, count: 0 };
    }

    clientesPorIdade[faixa].totalAulas += cliente.Num_Aulas;
    clientesPorIdade[faixa].totalGasto += gasto;
    clientesPorIdade[faixa].count += 1;
  });

  const dados = Object.entries(clientesPorIdade).map(
    ([faixa_idade, { totalAulas, totalGasto, count }]) => ({
      faixa_idade,
      media_aulas: totalAulas / count,
      media_gasto: totalGasto / count,
    })
  );

  return (
    <ChartContainer>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={dados}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="faixa_idade">
            <Label value="Faixa Etária" offset={-5} position="insideBottom" />
          </XAxis>
          <YAxis>
            <Label
              value="Médias"
              angle={-90}
              position="insideLeft"
              style={{ textAnchor: "middle" }}
            />
          </YAxis>
          <Tooltip />
          {/* <Legend /> ← Removido conforme solicitado */}
          <Bar dataKey="media_aulas" fill="#818cf8" name="Média de Aulas" />
          <Line
            type="monotone"
            dataKey="media_gasto"
            stroke="#4c51bf"
            name="Média de Gasto"
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

export default GraficoPorIdade;

