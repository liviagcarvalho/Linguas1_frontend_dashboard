import React, { useEffect, useState } from "react";
import styled from "styled-components";

type Cliente = {
  Motivo: string;
  Num_Aulas: number;
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

const ConversaoPorMotivo = ({ clientes }: { clientes: Cliente[] }) => {
  const [dados, setDados] = useState<{ motivo: string; mediaAulas: number }[]>([]);

  useEffect(() => {
    const motivos = [...new Set(clientes.map((c) => c.Motivo))];

    const resultado = motivos.map((motivo) => {
      const grupo = clientes.filter((c) => c.Motivo === motivo);
      const media = grupo.reduce((s, c) => s + c.Num_Aulas, 0) / grupo.length;
      return { motivo, mediaAulas: media };
    });

    setDados(resultado.sort((a, b) => b.mediaAulas - a.mediaAulas));
  }, [clientes]);

  return (
    <CardContainer>
      <Titulo>Conversão por Motivo de Entrada</Titulo>
      <Tabela>
        <thead>
          <tr>
            <th>Motivo</th>
            <th>Média de Aulas</th>
          </tr>
        </thead>
        <tbody>
          {dados.map((d, i) => (
            <tr key={i}>
              <td>{d.motivo}</td>
              <td>{d.mediaAulas.toFixed(1)}</td>
            </tr>
          ))}
        </tbody>
      </Tabela>
    </CardContainer>
  );
};

export default ConversaoPorMotivo;

