// HeroSlider.jsx
import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import AOS from "aos";
import "aos/dist/aos.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "animate.css";

export default function HeroSlider() {
  useEffect(() => {
    AOS.init({ duration: 1200, once: true });
  }, []);

  const slides = [
    {
      id: 1,
      title: "Plastic‑Free Challenge",
      subtitle: "Reduce single‑use plastics this month",
      image:
        "https://i.postimg.cc/v85xKkVd/man-jumping-impossible-possible-cliff-sunset-background-business-concept-idea.jpg",
    },
    {
      id: 2,
      title: "Bike‑to‑Work Week",
      subtitle: "Skip the car, ride your bike",
      image:
        "https://i.postimg.cc/VvHNtqhm/Screenshot-2025-11-10-020142.png",
    },
    {
      id: 3,
      title: "Community Compost",
      subtitle: "Learn & share composting tips",
      image: "https://i.postimg.cc/wMRCWDv9/compost.jpg",
    },
  ];

  return (
    <div className="w-full rounded-xl overflow-hidden mt-6 relative">
      <Swiper
        className="w-full"
        modules={[Autoplay, Pagination, Navigation]}
        autoplay={{ delay: 3500, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation
      >
        {slides.map((s) => (
          <SwiperSlide key={s.id} className="w-full">
            <div className="relative h-64 md:h-96 flex items-center justify-center w-full">
              {/* Background image */}
              <div
                className="absolute inset-0 bg-cover bg-center w-full transition-transform duration-700 hover:scale-105"
                style={{ backgroundImage: `url(${s.image})` }}
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/60 w-full" />

              {/* Slide content */}
              <div
                className="relative z-10 p-6 md:p-12 text-center animate__animated animate__fadeInUp"
                data-aos="fade-up"
              >
                <h2 className="text-2xl md:text-5xl font-extrabold text-white drop-shadow-lg animate__animated animate__bounceIn">
                  {s.title}
                </h2>
                <p className="mt-2 md:mt-4 text-lg md:text-2xl font-semibold text-white drop-shadow-md animate__animated animate__fadeIn animate__delay-1s">
                  {s.subtitle}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Optional floating decoration */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute w-16 h-16 bg-green-400 rounded-full animate__animated animate__fadeIn animate__infinite opacity-30 top-10 left-5"></div>
        <div className="absolute w-24 h-24 bg-blue-400 rounded-full animate__animated animate__fadeIn animate__infinite opacity-20 top-20 right-10"></div>
      </div>
    </div>
  );
}
