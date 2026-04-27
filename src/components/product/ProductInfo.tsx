import React from 'react';
import type { Product } from '../../modals/ProductResponseModal';

interface ProductInfoProps {
  product: Product;
}

export const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {
  return (
    <div className="product-info-grid">
      <div className="info-item">
        <span className="info-label">Category:</span>
        <span className="info-value">{product.category}</span>
      </div>
      <div className="info-item">
        <span className="info-label">SKU:</span>
        <span className="info-value">{product.sku}</span>
      </div>
      <div className="info-item">
        <span className="info-label">Weight:</span>
        <span className="info-value">{product.weight}g</span>
      </div>
      <div className="info-item">
        <span className="info-label">Dimensions:</span>
        <span className="info-value">
          {product.dimensions.width} x {product.dimensions.height} x {product.dimensions.depth} cm
        </span>
      </div>
      <div className="info-item">
        <span className="info-label">Warranty:</span>
        <span className="info-value">{product.warrantyInformation}</span>
      </div>
      <div className="info-item">
        <span className="info-label">Shipping:</span>
        <span className="info-value">{product.shippingInformation}</span>
      </div>
    </div>
  );
};
