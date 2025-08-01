import React from "react";
import styled from "styled-components";

type CardProps = {
  title: string;
  value: string;
};

const CardContainer = styled.div`
  background: #ffffff; /* agora branco */
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  min-width: 250px;
  flex: 1;
`;

const Title = styled.h4`
  margin-bottom: 0.5rem;
  color: #444;
  font-weight: 500;
`;

const Value = styled.p`
  font-size: 1.8rem;
  font-weight: bold;
  color: #2c2c54;
`;

const Card = ({ title, value }: CardProps) => {
  return (
    <CardContainer>
      <Title>{title}</Title>
      <Value>{value}</Value>
    </CardContainer>
  );
};

export default Card;
