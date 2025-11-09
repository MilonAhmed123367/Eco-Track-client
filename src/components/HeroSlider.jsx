import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function HeroSlider() {
  const slides = [
    { id: 1, title: "Plastic-Free Challenge", subtitle: "Reduce single-use plastics this month", image: "https://i.postimg.cc/v85xKkVd/man-jumping-impossible-possible-cliff-sunset-background-business-concept-idea.jpg" },
    { id: 2, title: "Bike-to-Work Week", subtitle: "Skip the car, ride your bike", image: "https://i.postimg.cc/VvHNtqhm/Screenshot-2025-11-10-020142.png" },
    { id: 3, title: "Community Compost", subtitle: "Learn & share composting tips", image: "https://i.postimg.cc/wMRCWDv9/compost.jpg" },
  ];

  return (
    <div className="rounded-xl overflow-hidden">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        autoplay={{ delay: 3500, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation
      >
        {slides.map(s => (
          <SwiperSlide key={s.id}>
            <div className="relative h-64 md:h-96 flex items-center justify-center text-white">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${s.image})` }}
              />
              <div className="absolute inset-0 bg-black/70" />
              <div className="relative z-10 p-6 rounded text-center">
                <h2 className="text-2xl md:text-7xl font-bold ">{s.title}</h2>
                <p className="mt-2 text-4xl">{s.subtitle}</p>
              </div>
            </div>
          </SwiperSlide>

        ))}
      </Swiper>
    </div>
  );
}
