import React from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../storage/Store";
import { ProductCard } from "../../components/common/ProductCard";
import { HeartOutlined } from "@ant-design/icons";
import { GLOBAL_TEXT } from "../../constants/Strings";
import { removeWishItem } from "../../storage/WishList";
import "../../pages/products/style/products.css"

export const WishList: React.FC = () => {
  const wishListItems = useSelector((state: RootState) => state.WishListItem);
  const dispatch = useDispatch<AppDispatch>();

  const handleClick = (id: number) => {};

  const btnWishListClick = (id: number) => {
    dispatch(removeWishItem(id));
  };

  if (wishListItems.items.length === 0) {
    return (
      <div
        style={{
          height: "60vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="custom-empty">
          <HeartOutlined style={{ fontSize: 48, color: "#6366f1" }} />

          <span style={{ fontSize: 16, fontWeight: 700 }}>
            {GLOBAL_TEXT.YOUR_FAVOURITE_IS_EMPTY}
          </span>
          <span>
            {GLOBAL_TEXT.BROWSE_PRODUCTS_TO_ADD_ITEMS_TO_YOUR_FAVOURITE}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div >
      <h1 className="dashboard-heading">{GLOBAL_TEXT.WISH_LIST}</h1>
      <div className="products-grid">
        {wishListItems.items.map((product) => (
          <ProductCard
            key={product.id}
            Product={product}
            isVisibleCart={true}
            btnCallBack={() => handleClick(product.id)}
            btnWishList={() => btnWishListClick(product.id)}
          />
        ))}
      </div>
    </div>
  );
};
