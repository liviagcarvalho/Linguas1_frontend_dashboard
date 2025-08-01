import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Label,
} from "recharts";
import styled from "styled-components";

type Cliente = {
  Education: string;
};

type Props = {
  dados: Cliente[];
};

const ChartContainer = styled.div`
  background: #fff;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`;

const GraficoPorEducacao = ({ dados }: Props) => {
  const agrupado = Object.values(
    dados.reduce((acc: any, curr) => {
      const ed = curr.Education?.trim() || "Não informado";
      acc[ed] = acc[ed] || { education: ed, quantidade: 0 };
      acc[ed].quantidade += 1;
      return acc;
    }, {})
  );

  return (
    <ChartContainer>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={agrupado}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="education">
            <Label value="Nível Educacional" offset={-5} position="insideBottom" />
          </XAxis>
          <YAxis>
            <Label
              value="Quantidade de Clientes"
              angle={-90}
              position="insideLeft"
              style={{ textAnchor: "middle" }}
            />
          </YAxis>
          <Tooltip />
          <Bar dataKey="quantidade" fill="#6366f1" />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

export default GraficoPorEducacao;

