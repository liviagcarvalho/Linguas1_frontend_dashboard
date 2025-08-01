import React from "react";
import styled from "styled-components";

type Cliente = {
  ID_Cliente: number;
  Cidade: string;
  Renda_anual: number;
  Education: string;
  NPS: number;
  Aulas: string;
};

type Props = {
  dados: Cliente[];
};

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: white;
`;

const Th = styled.th`
  padding: 12px;
  background: #e5e7eb;
  text-align: left;
`;

const Td = styled.td`
  padding: 10px;
  border-bottom: 1px solid #ddd;
`;

const TabelaClientes = ({ dados }: Props) => {
  return (
    <Table>
      <thead>
        <tr>
          <Th>ID</Th>
          <Th>Cidade</Th>
          <Th>Renda</Th>
          <Th>Educação</Th>
          <Th>NPS</Th>
          <Th>Aulas</Th>
        </tr>
      </thead>
      <tbody>
        {dados.map((c) => (
          <tr key={c.ID_Cliente}>
            <Td>{c.ID_Cliente}</Td>
            <Td>{c.Cidade}</Td>
            <Td>R$ {Number(c.Renda_anual).toLocaleString("pt-BR")}</Td>
            <Td>{c.Education}</Td>
            <Td>{c.NPS}</Td>
            <Td>{c.Aulas}</Td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default TabelaClientes;

