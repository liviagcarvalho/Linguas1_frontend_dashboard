import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

type Cliente = {
  Cidade: string;
};

type Props = {
  dados: Cliente[];
};

const COLORS = ["#6366f1", "#818cf8", "#a5b4fc", "#c7d2fe", "#e0e7ff"];

const GraficoPorCidade = ({ dados }: Props) => {
  const agrupado = Object.values(
    dados.reduce((acc: any, curr) => {
      const cidade = curr.Cidade;
      acc[cidade] = acc[cidade] || { cidade, quantidade: 0 };
      acc[cidade].quantidade += 1;
      return acc;
    }, {})
  );

  return (
    <ResponsiveContainer width="100%" height={400}>
    <PieChart>
        <Pie
        data={agrupado}
        dataKey="quantidade"
        nameKey="cidade"
        outerRadius={140} // Aumentado
        label
        labelLine
        >
        {agrupado.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
        </Pie>
        <Tooltip />
    </PieChart>
    </ResponsiveContainer>

  );
};

export default GraficoPorCidade;

