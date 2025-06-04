import React from 'react';
import slider1 from '@/assets/silderTemp/slider1.jpeg'
import slider2 from '@/assets/silderTemp/slider2.jpg';

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Pagination, Navigation } from 'swiper/modules';
import Image from 'next/image';

const width = window.innerWidth;
const height = window.innerHeight;

const HomeSlider = () => {
  return (
    <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
            <Image src={slider1} alt="img1" width={width} height={height/2}
            style= {{
                objectFit:"cover"
            }}/>
        </SwiperSlide>
        <SwiperSlide>
            <Image src={slider2} alt="img2" width={width} height={height/2}
            style= {{
                objectFit:"cover"
            }}/>
        </SwiperSlide>
        
      </Swiper>
  )
}

export default HomeSlider