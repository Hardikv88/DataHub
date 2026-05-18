import React from "react";
import {
  ShoppingCartOutlined,
  HeartOutlined,
  HeartFilled,
  DeleteOutlined,
} from "@ant-design/icons";
import { Rate } from "antd";
import "../style/common.css";
import type { Product } from "../../modals/ProductResponseModal";
import { useSelector } from "react-redux";
import type { RootState } from "../../storage/Store";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import { t } from "i18next";

type ProductCardProps = {
  readonly Product: Product;
  readonly isVisibleCart: boolean;
  readonly btnCallBack?: () => void;
  readonly btnWishList?: () => void;
};

export const ProductCard: React.FC<ProductCardProps> = ({
  Product,
  isVisibleCart,
  btnCallBack,
  btnWishList,
}) => {
  const product = Product;
  const selectItems = useSelector((state: RootState) => state.addItem.items);
  const selectWishItems = useSelector(
    (state: RootState) => state.WishListItem.items,
  );
  const isFavourite = selectWishItems.some(
    (cardItems) => cardItems.id == product.id,
  );
  const isInCart = selectItems.some((cardItems) => cardItems.id == product.id);
  const navigate = useNavigate();

  const cardClick = () => {
    console.log("Click card view ");
    navigate(`/products/${product.id}`);
  };

  let cartButton;
  if (isVisibleCart) {
    cartButton = (
      <button
        className="product-card-btn"
        onClick={(e) => {
          e.stopPropagation();
          btnCallBack?.();
        }}
      >
        <DeleteOutlined style={{ fontSize: 18 }} />
      </button>
    );
  } else if (isInCart) {
    cartButton = (
       <Button bgColor="var(--accent-bg)" icon={<ShoppingCartOutlined />} onClick={(e) => {
          e.stopPropagation();
          btnCallBack?.();
        }}>{t("ADD_TO_CART")}</Button>
    );
  } else {
    cartButton = (
      <Button className="product-card-btn" icon={<ShoppingCartOutlined />} onClick={(e) => {
          e.stopPropagation();
          btnCallBack?.();
        }}>{t("ADD_TO_CART")}</Button>
    );
  }

  return (
    <button
      className="product-card"
      onClick={() => cardClick()}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          cardClick();
          e.preventDefault();
        }
      }}
      type="button"
    >
      <div className="product-card-image-wrapper">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="product-card-image"
        />
        <Button
          onClick={(e) => {
            e.stopPropagation();
            btnWishList?.();
          }}
          type="text"
          shape="circle"
          height="25"
          bgColor="var(--accent-bg)"
          className="product-card-category"
          icon={
            isFavourite ? (
              <HeartFilled
                style={{
                  fontSize: 18,
                  color: "#ff4d4f",
                }}
              />
            ) : (
              <HeartOutlined
                style={{
                  fontSize: 18,
                }}
              />
            )
          }
        />

        {/* <span className="product-card-category">{product.category}</span> */}
      </div>
      <div className="product-card-body">
        <h3 className="product-card-name">{product.title}</h3>
        <p className="product-card-desc">{product.description}</p>
        <div className="product-card-rating">
          <Rate disabled allowHalf defaultValue={product.rating} />
          <span className="review-count">({product.reviews.length})</span>
        </div>
        <div className="product-card-footer">
          <span className="product-card-price">
            ${product.price.toFixed(2)}
          </span>
          {cartButton}
        </div>
      </div>
    </button>
  );
};
