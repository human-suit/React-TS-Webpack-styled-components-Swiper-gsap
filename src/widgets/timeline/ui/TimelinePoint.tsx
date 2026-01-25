import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import gsap from "gsap";
import { TimelineStep } from "../data/steps";

interface TimelinePointsProps {
  steps: TimelineStep[];
  circleSize: number;
  activeIndex: number;
  onPointClick: (index: number) => void;
}

const Circle = styled.div<{ size: number }>`
  position: relative;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  pointer-events: none;
  z-index: 10;
`;

const PointWrapper = styled.div<{ x: number; y: number }>`
  position: absolute;
  left: ${({ x }) => x}px;
  top: ${({ y }) => y}px;
  transform: translate(-50%, -50%);
  pointer-events: auto;
`;

const PointDot = styled.div<{ $active: boolean; $hover: boolean }>`
  width: ${({ $active, $hover }) => ($active || $hover ? "32px" : "10px")};
  height: ${({ $active, $hover }) => ($active || $hover ? "32px" : "10px")};
  border-radius: 50%;
  background: ${({ $active, $hover }) =>
    $active ? "#3877EE" : $hover ? "#ef5da8" : "#ccc"};
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition:
    width 0.25s ease,
    height 0.25s ease,
    background 0.25s ease;
`;

const Tooltip = styled.div<{ $visible: boolean }>`
  position: absolute;
  left: 36px;
  top: 50%;
  transform: translateY(-50%);
  background: #3877ee;
  color: #fff;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  white-space: nowrap;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transition: opacity 0.25s ease;
  pointer-events: none;
`;

export const TimelinePoints: React.FC<TimelinePointsProps> = ({
  steps,
  circleSize,
  activeIndex,
  onPointClick,
}) => {
  const pointRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const radius = circleSize / 2;
  const layoutOffset = Math.PI / 6; // 30° вправо от центра верха

  const startAngle = -Math.PI / 2 + layoutOffset;

  return (
    <Circle size={circleSize}>
      {steps.map((step, i) => {
        const angle = startAngle + (i / steps.length) * 2 * Math.PI;
        const x = radius + radius * Math.cos(angle);
        const y = radius + radius * Math.sin(angle);

        const isActive = i === activeIndex;
        const isHover = i === hoverIndex;
        const showIndex = isActive || isHover;

        const tooltipTitle =
          step.facts?.[0]?.title ?? `${step.years[0]}–${step.years[1]}`;

        return (
          <PointWrapper key={i} x={x} y={y}>
            <PointDot
              ref={(el) => {
                pointRefs.current[i] = el;
              }}
              $active={isActive}
              $hover={isHover}
              onMouseEnter={() => setHoverIndex(i)}
              onMouseLeave={() => setHoverIndex(null)}
              onClick={() => onPointClick(i)}
            >
              {showIndex && i}
            </PointDot>
            <Tooltip $visible={showIndex}>{tooltipTitle}</Tooltip>
          </PointWrapper>
        );
      })}
    </Circle>
  );
};
