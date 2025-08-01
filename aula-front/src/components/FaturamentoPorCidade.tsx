import React, { useMemo } from "react";
import styled from "styled-components";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  LabelList,
} from "recharts";

type Aula = {
  cidade: string;
  price: number;
};

type Props = {
  dados: Aula[];
};

const ChartContainer = styled.div`
  background: #fff;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`;

const ChartTitle = styled.h2`
  margin-bottom: 1rem;
`;

const FaturamentoPorCidade = ({ dados }: Props) => {
  const dadosAgrupados = useMemo(() => {
    const mapa = new Map<string, number>();
    dados.forEach(({ cidade, price }) => {
      if (!cidade) return;
      mapa.set(cidade, (mapa.get(cidade) || 0) + price);
    });

    return Array.from(mapa.entries())
      .map(([cidade, faturamento]) => ({ cidade, faturamento }))
      .sort((a, b) => b.faturamento - a.faturamento);
  }, [dados]);

  return (
    <ChartContainer>
      <ChartTitle>Faturamento por Cidade</ChartTitle>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={dadosAgrupados}
          layout="vertical"
          margin={{ top: 20, right: 30, left: 80, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            type="number"
            tickFormatter={(value) =>
              `R$ ${value.toLocaleString("pt-BR", {
                minimumFractionDigits: 0,
              })}`
            }
          />
          <YAxis dataKey="cidade" type="category" width={100} />
          <Tooltip
            formatter={(value: number) =>
              `R$ ${value.toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
              })}`
            }
          />
          <Bar dataKey="faturamento" fill="#4c51bf">
            <LabelList
              dataKey="faturamento"
              position="right"
              formatter={(value: number) =>
                `R$ ${value.toLocaleString("pt-BR", {
                  maximumFractionDigits: 0,
                })}`
              }
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

export default FaturamentoPorCidade;
