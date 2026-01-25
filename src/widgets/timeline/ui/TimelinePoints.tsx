import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
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
`;

const RotatingWrapper = styled.div<{ rotation: number }>`
  width: 100%;
  height: 100%;
  transform: rotate(${({ rotation }) => rotation}deg);
  transition: transform 0.5s ease;
`;

const PointWrapper = styled.div<{ x: number; y: number }>`
  position: absolute;
  left: ${({ x }) => x}px;
  top: ${({ y }) => y}px;
  transform: translate(-50%, -50%);
  pointer-events: auto;
`;

const PointDot = styled.div<{
  $active: boolean;
  $hover: boolean;
  rotation: number;
}>`
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
  const [rotation, setRotation] = useState(0);

  const radius = circleSize / 2;
  const layoutOffset = -60; // начальная точка на 1 часе

  useEffect(() => {
    const anglePerStep = 360 / steps.length;
    setRotation(-activeIndex * anglePerStep);
  }, [activeIndex, steps.length]);

  return (
    <Circle size={circleSize}>
      <RotatingWrapper rotation={rotation}>
        {steps.map((step, i) => {
          const angle = layoutOffset + (i / steps.length) * 360;
          const rad = (angle * Math.PI) / 180;
          const x = radius + radius * Math.cos(rad);
          const y = radius + radius * Math.sin(rad);

          const isActive = i === activeIndex;
          const isHover = i === hoverIndex;
          const tooltipTitle =
            step.facts?.[0]?.title ?? `${step.years[0]}–${step.years[1]}`;

          return (
            <PointWrapper key={i} x={x} y={y}>
              <PointDot
                ref={(el) => {
                  pointRefs.current[i] = el;
                }}
                style={{ transform: `rotate(${-rotation}deg)` }}
                $active={isActive}
                $hover={isHover}
                rotation={rotation}
                onMouseEnter={() => setHoverIndex(i)}
                onMouseLeave={() => setHoverIndex(null)}
                onClick={() => onPointClick(i)}
              >
                {(isActive || isHover) && i}
              </PointDot>
              <Tooltip
                style={{
                  left: `calc(100% + 8px)`, // справа от точки
                  top: `50%`,
                  transform: `translateY(-50%) rotate(${-rotation}deg)`,
                }}
                $visible={isActive || isHover}
              >
                {tooltipTitle}
              </Tooltip>
            </PointWrapper>
          );
        })}
      </RotatingWrapper>
    </Circle>
  );
};
