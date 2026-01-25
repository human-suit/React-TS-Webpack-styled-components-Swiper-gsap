import React, { forwardRef, useImperativeHandle, useRef } from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const SliderOuterWrapper = styled.div`
  position: relative;
  width: 1050px;
  margin-left: 60px;
`;

const SliderWrapper = styled.div`
  height: 220px;
  overflow: visible;
`;

const SlideContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 160px;
  border-radius: 12px;
  padding: 15px;
  text-align: left;
  box-sizing: border-box;
`;

const SlideTitle = styled.h3`
  margin-bottom: 10px;
  color: #3877ee;
`;

const SlideDescription = styled.p`
  color: #42567a;
`;

const NextButton = styled.div`
  position: absolute;
  top: 40%;
  right: -100px; // кнопка справа
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  background: #fff;
  border-radius: 50%;
  color: #3877ee;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 20px;
  font-weight: bold;
  z-index: 10;
`;

export interface SimpleSliderRef {
  slideTo: (index: number) => void;
  slideNext: () => void;
}

export interface SimpleSliderProps {
  slides: { title: string; description: string }[];
  currentStep: number;
  onSlideChange: (index: number) => void;
}

export const SimpleSlider = forwardRef<SimpleSliderRef, SimpleSliderProps>(
  ({ slides, currentStep, onSlideChange }, ref) => {
    const swiperRef = useRef<any>(null);

    useImperativeHandle(ref, () => ({
      slideTo: (index: number) => swiperRef.current?.slideTo(index),
      slideNext: () => swiperRef.current?.slideNext(),
    }));

    return (
      <SliderOuterWrapper>
        <SliderWrapper>
          <Swiper
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            onSlideChange={(swiper) => onSlideChange(swiper.activeIndex)}
            slidesPerView="auto"
            spaceBetween={20}
          >
            {slides.map((slide, index) => (
              <SwiperSlide
                key={index}
                style={{
                  width: index === 1 ? 400 : 300,
                  display: "flex",
                }}
              >
                <SlideContent>
                  <SlideTitle>{slide.title}</SlideTitle>
                  <SlideDescription>{slide.description}</SlideDescription>
                </SlideContent>
              </SwiperSlide>
            ))}
          </Swiper>
        </SliderWrapper>

        <NextButton onClick={() => swiperRef.current?.slideNext()}>
          &gt;
        </NextButton>
      </SliderOuterWrapper>
    );
  },
);
