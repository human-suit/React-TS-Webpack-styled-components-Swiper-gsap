import React from "react";
import styled from "styled-components";

interface TimelineCircleProps {
  size?: number;
  color?: string;
  values: [number, number];
}

const Circle = styled.div<{ size: number; color: string }>`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  border: 1px solid ${({ color }) => color};
  border-radius: 50%;
  position: absolute;
  inset: 0;
  margin: auto;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 90px;

  font-size: 180px;
  font-weight: bold;
  z-index: 1;
`;

const First = styled.span`
  color: #3877ee;
`;

const Second = styled.span`
  color: #ef5da8;
`;

export const TimelineCircle: React.FC<TimelineCircleProps> = ({
  size = 500,
  color = "#3877EE",
  values,
}) => {
  return (
    <Circle size={size} color={color}>
      <First>{values[0]}</First>
      <Second>{values[1]}</Second>
    </Circle>
  );
};
