import React from 'react';
import type { Product } from '../../modals/ProductResponseModal';
import { t } from 'i18next';

interface ProductInfoProps {
  product: Product;
}

export const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {
  return (
    <div className="product-info-grid">
      <div className="info-item">
        <span className="info-label">{t("CATEGORY")}:</span>
        <span className="info-value">{product.category}</span>
      </div>
      <div className="info-item">
        <span className="info-label">{t("SKU")}:</span>
        <span className="info-value">{product.sku}</span>
      </div>
      <div className="info-item">
        <span className="info-label">{t("WEIGHT")}:</span>
        <span className="info-value">{product.weight}g</span>
      </div>
      <div className="info-item">
        <span className="info-label">{t("DIMENSIONS")}:</span>
        <span className="info-value">
          {product.dimensions.width} x {product.dimensions.height} x {product.dimensions.depth} cm
        </span>
      </div>
      <div className="info-item">
        <span className="info-label">{t("WARRANTY")}:</span>
        <span className="info-value">{product.warrantyInformation}</span>
      </div>
      <div className="info-item">
        <span className="info-label">{t("SHIPPING")}:</span>
        <span className="info-value">{product.shippingInformation}</span>
      </div>
    </div>
  );
};
