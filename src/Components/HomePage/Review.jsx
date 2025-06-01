import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";

import review1 from "../HomePage/Assets/Review1.png";
import review2 from "../HomePage/Assets/Review2.png";
import review3 from "../HomePage/Assets/Review3.png";
import reviewprofile1 from "../HomePage/Assets/reviewprofile1.png";
import reviewprofile2 from "../HomePage/Assets/reviewprofile2.png";

export default function Review() {
  const testimonials = [
    {
      id: 1,
      name: "Dianne Russell",
      role: "Manager Director",
      rating: 4.6,
      review:
        "Through this website I can get a house with the type and specifications I want very easily, without a complicated process.",
      image: review1,
      avatar: reviewprofile1,
    },
    {
      id: 2,
      name: "John Doe",
      role: "Real Estate Agent",
      rating: 4.8,
      review:
        "This platform made finding my dream home so much easier! I love how detailed the listings are and how simple the process is.",
      image: review2,
      avatar: reviewprofile2,
    },
    {
      id: 3,
      name: "Sarah Johnson",
      role: "Property Consultant",
      rating: 4.7,
      review:
        "A fantastic experience! The site offers comprehensive details and the best user experience for property search.",
      image: review3,
      avatar: reviewprofile1,
    },
    {
      id: 4,
      name: "Emily Smith",
      role: "Investor",
      rating: 4.9,
      review:
        "Highly recommended for property buyers. The seamless experience and great selection make it stand out.",
      image: review1,
      avatar: reviewprofile2,
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4">
      <h1 className="text-red-500 text-center">See Our Reviews</h1>
      <p className="text-center text-sm sm:text-lg md:text-xl font-semibold mb-6">
        What Our Users Say About Us
      </p>
      <Swiper
        modules={[Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        breakpoints={{
          480: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="mySwiper"
      >
        {testimonials.map((testimonial) => (
          <SwiperSlide key={testimonial.id} className="relative">
            <div className="relative overflow-hidden rounded-lg">
              <img
                src={testimonial.image}
                alt="Modern House"
                className="w-full h-72 sm:h-80 md:h-96 object-cover rounded-lg"
              />
            </div>
            <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 w-11/12 bg-white shadow-lg rounded-xl p-4 sm:p-6">
              <h2 className="font-bold text-sm sm:text-lg text-gray-900">
                Best! I Got The House I Wanted Through Hounter
              </h2>
              <p className="text-gray-600 mt-2 text-xs sm:text-sm">
                {testimonial.review}
              </p>
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-3">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-10 h-10 sm:w-14 sm:h-14 lg:w-20 lg:h-20 rounded-full"
                  />
                  <div>
                    <p className="text-xs sm:text-sm font-semibold text-gray-800">
                      {testimonial.name}
                    </p>
                    <p className="text-xs text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-yellow-500 text-lg">★</span>
                  <span className="text-gray-900 font-semibold">
                    {testimonial.rating}
                  </span>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="flex justify-center items-center mt-4 space-x-2">
        <span className="h-2 w-2 bg-gray-400 rounded-full"></span>
        <span className="h-2 w-2 bg-red-500 rounded-full"></span>
        <span className="h-2 w-2 bg-gray-400 rounded-full"></span>
      </div>
    </div>
  );
}
