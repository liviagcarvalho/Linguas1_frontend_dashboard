import React from "react";
import styled from "styled-components";
import { FaBars } from "react-icons/fa";

const TopbarContainer = styled.div`
  width: 100%;
  background: #1e1e2f;
  color: #fff;
  padding: 1.5rem 2rem;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
`;

const LeftGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Title = styled.h1`
  font-size: 1.8rem;
  font-weight: bold;
  color: #fafafa;
  margin: 0;
`;

const FiltersGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;

const FilterItem = styled.div`
  display: flex;
  align-items: center;
`;

const Label = styled.label`
  font-size: 0.9rem;
  margin-right: 0.5rem;
`;

const Input = styled.input`
  padding: 0.3rem 0.5rem;
  border-radius: 6px;
  border: none;
`;

const Select = styled.select`
  padding: 0.3rem 0.5rem;
  border-radius: 6px;
  border: none;
`;

const MenuButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
`;

type Props = {
  tipoSelecionado: string;
  onTipoChange: (tipo: string) => void;
  dataInicio: string;
  dataFim: string;
  onDataChange: (inicio: string, fim: string) => void;
  tiposDisponiveis: string[];
  onToggleSidebar: () => void; // ✅ novo prop
};

const Topbar = ({
  tipoSelecionado,
  onTipoChange,
  dataInicio,
  dataFim,
  onDataChange,
  tiposDisponiveis,
  onToggleSidebar,
}: Props) => {
  return (
    <TopbarContainer>
      <LeftGroup>
        <MenuButton onClick={onToggleSidebar}>
          <FaBars />
        </MenuButton>
        <Title>Dashboard LinguaLab</Title>
      </LeftGroup>

      <FiltersGroup>
        <FilterItem>
          <Label>Tipo de Aula:</Label>
          <Select value={tipoSelecionado} onChange={(e) => onTipoChange(e.target.value)}>
            <option value="">Todas</option>
            {tiposDisponiveis.map((tipo) => (
              <option key={tipo} value={tipo}>
                {tipo}
              </option>
            ))}
          </Select>
        </FilterItem>

        <FilterItem>
          <Label>Início:</Label>
          <Input
            type="date"
            value={dataInicio}
            onChange={(e) => onDataChange(e.target.value, dataFim)}
          />
        </FilterItem>

        <FilterItem>
          <Label>Fim:</Label>
          <Input
            type="date"
            value={dataFim}
            onChange={(e) => onDataChange(dataInicio, e.target.value)}
          />
        </FilterItem>
      </FiltersGroup>
    </TopbarContainer>
  );
};

export default Topbar;

