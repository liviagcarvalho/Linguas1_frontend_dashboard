import React, { useEffect, useState } from "react";
import styled from "styled-components";

type Cliente = {
  ID_Cliente: number;
  Motivo: string;
};

type Aula = {
  id_cliente: number;
  price: number;
};

const CardContainer = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  min-width: 300px;
  flex: 1;
`;

const Titulo = styled.h2`
  text-align: center;
  font-weight: bold;
  margin-bottom: 1rem;
  font-size: 1.2rem;
`;

const Tabela = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.95rem;

  th, td {
    padding: 0.6rem;
    text-align: center;
    border-bottom: 1px solid #eee;
  }

  th {
    background-color: #f4f4f4;
    font-weight: bold;
  }
`;

const MotivosMaisLucrativos = ({ clientes, aulas }: { clientes: Cliente[]; aulas: Aula[] }) => {
  const [dados, setDados] = useState<{ motivo: string; totalAulas: number; mediaReceita: number }[]>([]);

  useEffect(() => {
    const motivos = [...new Set(clientes.map((c) => c.Motivo))];

    const dadosAgrupados = motivos.map((motivo) => {
      const ids = clientes.filter((c) => c.Motivo === motivo).map((c) => c.ID_Cliente);
      const aulasMotivo = aulas.filter((a) => ids.includes(a.id_cliente));
      const totalAulas = aulasMotivo.length;
      const receitaTotal = aulasMotivo.reduce((sum, a) => sum + a.price, 0);
      const mediaReceita = totalAulas > 0 ? receitaTotal / totalAulas : 0;

      return { motivo, totalAulas, mediaReceita };
    });

    setDados(dadosAgrupados.sort((a, b) => b.mediaReceita - a.mediaReceita));
  }, [clientes, aulas]);

  return (
    <CardContainer>
      <Titulo>Motivos que Geram Mais Receita</Titulo>
      <Tabela>
        <thead>
          <tr>
            <th>Motivo</th>
            <th>Total de Aulas</th>
            <th>Receita Média (R$)</th>
          </tr>
        </thead>
        <tbody>
          {dados.map((d, i) => (
            <tr key={i}>
              <td>{d.motivo}</td>
              <td>{d.totalAulas.toLocaleString()}</td>
              <td>{d.mediaReceita.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </Tabela>
    </CardContainer>
  );
};

export default MotivosMaisLucrativos;
