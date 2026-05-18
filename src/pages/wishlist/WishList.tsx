import React from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../storage/Store";
import { ProductCard } from "../../components/common/ProductCard";
import { HeartOutlined } from "@ant-design/icons";
import { removeWishItem } from "../../storage/WishList";
import "../../pages/products/style/products.css"
import { useTranslation } from "react-i18next";

export const WishList: React.FC = () => {
  const { t } = useTranslation();
  const wishListItems = useSelector((state: RootState) => state.WishListItem);
  const dispatch = useDispatch<AppDispatch>();

  const handleClick = (_id: number) => {};

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
            {t("YOUR_FAVOURITE_IS_EMPTY")}
          </span>
          <span>
            {t("BROWSE_PRODUCTS_TO_ADD_ITEMS_TO_YOUR_FAVOURITE")}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div >
      <h1 className="dashboard-heading">{t("WISH_LIST")}</h1>
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
