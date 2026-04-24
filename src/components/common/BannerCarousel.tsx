import React from "react";
import { Carousel } from "antd";
import banner1 from "../../assets/images/banner-1.png";
import banner2 from "../../assets/images/banner-2.png";
import banner3 from "../../assets/images/banner-3.png";
import "../style/common.css";

const banners = [
  { id: 1, image: banner1, alt: "Summer Sale - Up to 50% Off" },
  { id: 2, image: banner2, alt: "New Arrivals - Shop Now" },
  { id: 3, image: banner3, alt: "Flash Deals - Limited Time" },
];

export const BannerCarousel: React.FC = () => {
  return (
    <div className="banner-carousel-wrapper">
      <Carousel autoplay autoplaySpeed={4000} dots effect="fade">
        {banners.map((banner) => (
          <div key={banner.id}>
            <div className="banner-slide">
              <img
                src={banner.image}
                alt={banner.alt}
                className="banner-image"
              />
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};
