import React from "react";
import {
  ShoppingCartOutlined,
  HeartOutlined,
  HeartFilled,
  DeleteOutlined,
} from "@ant-design/icons";
import { Button, Rate } from "antd";
import "../style/common.css";
import type { Product } from "../../modals/ProductResponseModal";
import { useSelector } from "react-redux";
import type { RootState } from "../../storage/Store";
import { Navigate, useNavigate } from "react-router-dom";

type ProductCardProps = {
  readonly Product: Product;
  readonly isVisibleCart: Boolean;
  readonly isFavourite: Boolean;
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
  const selectWishItems = useSelector((state: RootState) => state.WishListItem.items);
  const isFavourite = selectWishItems.find((cardItems) => cardItems.id == product.id);
  const navigate = useNavigate();

  const cardClick = () => {
    console.log("Click card view ");
    navigate(`/products/${product.id}`)
  }


  return (
    <div className="product-card" onClick={() => cardClick()}>
      <div className="product-card-image-wrapper">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="product-card-image"
        />

        <Button
          onClick={btnWishList}
          type="text"
          shape="circle"
          className="product-card-category"
          icon={
            isFavourite ? <HeartFilled
              style={{
                fontSize: 20,
                color: "#ff4d4f",
              }}
            /> : <HeartOutlined
              style={{
                fontSize: 20,
              }}
            />
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
          {isVisibleCart ? (
            <button className="product-card-btn" onClick={btnCallBack}>
              <DeleteOutlined style={{ fontSize: 18 }} />
            </button>
          ) : selectItems.find((cardItems) => cardItems.id == product.id) ? (
            <button
              className="product-card-disable-btn"
              aria-label="Add to cart"
              onClick={btnCallBack}
            >
              <ShoppingCartOutlined />
              <span>Add to Cart</span>
            </button>
          ) : (
            <button
              className="product-card-btn"
              aria-label="Add to cart"
              onClick={btnCallBack}
            >
              <ShoppingCartOutlined />
              <span>Add to Cart</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
