import React, { useState } from 'react';

interface ProductImageGalleryProps {
  images: string[];
  title: string;
}

export const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({ images, title }) => {
  const [activeImage, setActiveImage] = useState(images[0] || '');

  return (
    <div className="product-gallery">
      <div className="product-gallery-main">
        <img src={activeImage} alt={title} className="product-gallery-img" />
      </div>
      {images.length > 1 && (
        <div className="product-gallery-thumbnails">
          {images.map((img, index) => (
            <div
              key={index}
              className={`product-gallery-thumb ${activeImage === img ? 'active' : ''}`}
              onClick={() => setActiveImage(img)}
            >
              <img src={img} alt={`${title} thumbnail ${index + 1}`} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
