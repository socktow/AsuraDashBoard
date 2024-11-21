import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import UserInfo from "./UserInfo";
import UserBalance from "./UserBalance";
import UserTrans from "./UserTrans";
import UserPayment from "./UserPayment";

const User = () => {
  return (
    <div className="px-4 py-4">
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        breakpoints={{
          768: {
            slidesPerView: 2, // Hiển thị 2 slide trên màn hình lớn
          },
          1024: {
            slidesPerView: 2,
          },
        }}
      >
        {/* Slide 1 */}
        <SwiperSlide>
          <div className="p-2 w-full bg-white rounded-xl h-svh">
            <UserInfo />
          </div>
        </SwiperSlide>
        {/* Slide 2 */}
        <SwiperSlide>
          <div className="p-4 w-full bg-white rounded-xl h-full">
            <UserBalance />
          </div>
        </SwiperSlide>
        {/* Slide 3 */}
        <SwiperSlide>
          <div className="p-4 w-full bg-white rounded-xl h-full">
            <UserTrans />
          </div>
        </SwiperSlide>
        {/* Slide 4 */}
        <SwiperSlide>
          <div className="p-4 w-full bg-white rounded-xl h-full">
            <UserPayment />
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default User;
