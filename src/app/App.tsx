import React, { useState, useRef } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { TimelineCircle } from "../widgets/timeline/ui/TimelineCircle";
import { TimelinePoints } from "../widgets/timeline/ui/TimelinePoints";
import { steps } from "../widgets/timeline/data/steps";
import {
  SimpleSlider,
  SimpleSliderRef,
} from "../widgets/timeline/ui/TimelineSlider";

const GlobalStyle = createGlobalStyle`
  * { margin:0; padding:0; box-sizing:border-box; }
  html, body, #root {
    width:100%;
    height:100%;
    font-family:"PT Sans", sans-serif;
    background: #E5E5E5;
  }
`;

const Container = styled.div`
  padding-top: 10vh;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(66, 86, 122, 0.2);
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  text-align: center;
  color: #42567a;
  font-weight: bold;
  font-size: 26px;
  margin-bottom: 40px;

  h1 {
    line-height: 1.2;
  }
  .title-main {
    display: block;
  }
  .title-sub {
    display: block;
    position: relative;
    left: 0;
  }

  @media (min-width: 768px) {
    flex-direction: row;
    gap: 60px;
    .title-sub {
      left: -100px;
    }
  }
`;

const Liner = styled.div`
  width: 5px;
  height: 15vh;
  background: linear-gradient(to bottom, #3877ee 0%, #ef5da8 100%);
  border-radius: 999px;
  @media (min-width: 768px) {
    height: 150px;
  }
`;

const Section = styled.div`
  margin-top: -150px;
  display: flex;
  justify-content: center;
  position: relative;
`;

const CircleWrapper = styled.div<{ size: number }>`
  position: relative;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
`;

const Controls = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  margin: 20px 0px 20px 60px;
`;

const StepCounter = styled.div`
  font-size: 18px;
  color: #42567a;
  font-weight: bold;
  margin: 20px 0px -10px 65px;
`;

const Button = styled.button`
  font-size: 18px;
  color: #42567a;
  background: #e5e5e5;
  width: 50px;
  height: 50px;
  border: 1px solid #42567a;
  border-radius: 50%;
  cursor: pointer;

  &:disabled {
    background: #eee;
    cursor: not-allowed;
  }
`;

const App = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const sliderRef = useRef<SimpleSliderRef>(null);

  const handlePrev = () => {
    const newStep = currentStep === 0 ? steps.length - 1 : currentStep - 1;
    setCurrentStep(newStep);
    sliderRef.current?.slideTo(0);
  };

  const handleNext = () => {
    const newStep = currentStep === steps.length - 1 ? 0 : currentStep + 1;
    setCurrentStep(newStep);
    sliderRef.current?.slideTo(0);
  };

  return (
    <>
      <GlobalStyle />
      <Container>
        <Header>
          <Liner />
          <h1>
            <span className="title-main">Исторические</span>
            <span className="title-sub">даты</span>
          </h1>
        </Header>

        <Section>
          <CircleWrapper size={500}>
            <TimelineCircle
              size={500}
              color="#3877EE"
              values={steps[currentStep].years}
            />

            <TimelinePoints
              steps={steps}
              circleSize={500}
              activeIndex={currentStep}
              onPointClick={(index) => {
                setCurrentStep(index);
                sliderRef.current?.slideTo(0);
              }}
            />
          </CircleWrapper>
        </Section>

        <StepCounter>
          {String(currentStep + 1).padStart(2, "0")}/
          {String(steps.length).padStart(2, "0")}
        </StepCounter>

        <Controls>
          <Button onClick={handlePrev}>&lt;</Button>
          <Button onClick={handleNext}>&gt;</Button>
        </Controls>

        <SimpleSlider
          ref={sliderRef}
          slides={steps[currentStep].facts.map((f) => ({
            title: `${f.year}`,
            description: f.description,
          }))}
          currentStep={0}
          onSlideChange={() => {}}
        />
      </Container>
    </>
  );
};

export default App;
