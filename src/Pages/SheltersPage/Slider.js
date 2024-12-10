import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';


export const Slider = () => {
  const slides = [
    { id: 1, title: 'Shelter 1', image: `${process.env.PUBLIC_URL}/images/shelter.jpg` },
    { id: 2, title: 'Shelter 2', image: `${process.env.PUBLIC_URL}/images/shelter.jpg` },
    { id: 3, title: 'Shelter 3', image: `${process.env.PUBLIC_URL}/images/shelter.jpg` },
  ];

  return (
    <Swiper
      effect="coverflow"
      grabCursor={true}
      centeredSlides={true}
      slidesPerView="auto"
      coverflowEffect={{
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
      }}
      navigation
      pagination={{ clickable: true }}
      loop={true}
      className="slider-container"
      >
      {slides.map((slide) => (
        <SwiperSlide key={slide.id} className="slider-slide">
          <div className="slide-content">
            <img src={slide.image} alt={slide.title} />
            <h2>{slide.title}</h2>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};