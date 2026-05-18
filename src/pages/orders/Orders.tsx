import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { AppDispatch, RootState } from "../../storage/Store";
import { removeItem } from "../../storage/AddProducts";
import { ProductCard } from "../../components/common/ProductCard";
import { ShoppingCartOutlined, LockOutlined, LoadingOutlined, UpOutlined, DownOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

export const Orders: React.FC = () => {
  const { t } = useTranslation();
  const cartItems = useSelector((state: RootState) => state.addItem);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleClick = (id: number) => {
    dispatch(removeItem(id));
  };

  const handleProceed = () => {
    setIsLoading(true);
    // Simulate minor delay then redirect with data
    setTimeout(() => {
      setIsLoading(false);
      navigate("/checkout", {
        state: {
          subtotal,
          gst,
          platformCharges,
          deliveryCharges,
          discount,
          totalPayable
        }
      });
    }, 800);
  };

  // Calculations
  const subtotal = cartItems.items.reduce((acc, item) => acc + item.price, 0);
  const gst = subtotal * 0.18;
  const platformCharges = subtotal > 0 ? 10 : 0;
  const deliveryCharges = subtotal > 0 && subtotal < 500 ? 40 : 0;
  const discount = cartItems.items.reduce((acc, item) => acc + (item.price * (item.discountPercentage / 100)), 0);
  const totalPayable = subtotal + gst + platformCharges + deliveryCharges - discount;

  if (cartItems.items.length === 0) {
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
          <ShoppingCartOutlined style={{ fontSize: 48, color: "#6366f1" }} />

          <span style={{ fontSize: 16, fontWeight: 700 }}>
            {t("YOUR_CART_IS_EMPTY")}
          </span>
          <span>{t("BROWSE_PRODUCTS_TO_ADD_ITEMS_TO_YOUR_CART")}</span>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "calc(100vh - 70px)" }}>
      <div style={{ flex: 1, padding: "0 24px 24px 24px" }}>
        <h1 className="dashboard-heading">{t("ORDERS")}</h1>
        <div className="products-grid">
          {cartItems.items.map((product) => (
            <ProductCard
              key={product.id}
              Product={product}
              isVisibleCart={true}
              btnCallBack={() => handleClick(product.id)}
            />
          ))}
        </div>
      </div>

      {/* Sticky Invoice & Payment Footer */}
      <footer className="invoice-footer">
        <div className="invoice-container">
          {/* Expand/Collapse Header */}
          <div 
            className="invoice-toggle-header" 
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <span className="toggle-text">
              {isExpanded ? t("HIDE_DETAILS") : t("VIEW_DETAILS")}
            </span>
            {isExpanded ? <DownOutlined /> : <UpOutlined />}
          </div>

          <div className={`invoice-details ${isExpanded ? 'expanded' : 'collapsed'}`}>
            <div className="invoice-item">
              <span  className="invoice-label">{t("SUBTOTAL")}</span>
              <span className="invoice-value">${subtotal.toFixed(2)}</span>
            </div>
            <div className="invoice-item">
              <span className="invoice-label">{t("GST_TAX")} (18%)</span>
              <span className="invoice-value">+${gst.toFixed(2)}</span>
            </div>
            <div className="invoice-item">
              <span className="invoice-label">{t("PLATFORM_CHARGES")}</span>
              <span className="invoice-value">+${platformCharges.toFixed(2)}</span>
            </div>
            {deliveryCharges > 0 && (
              <div className="invoice-item">
                <span className="invoice-label">{t("DELIVERY_CHARGES")}</span>
                <span className="invoice-value">+${deliveryCharges.toFixed(2)}</span>
              </div>
            )}
            {discount > 0 && (
              <div className="invoice-item" style={{ color: "var(--success)" }}>
                <span className="invoice-label">{t("DISCOUNT_COUPON")}</span>
                <span className="invoice-value" style={{ color: "var(--success)" }}>-${discount.toFixed(2)}</span>
              </div>
            )}
          </div>

          <div className="payment-action">
            <div className="total-payable">
              <span className="total-label">{t("TOTAL_PAYABLE")}</span>
              <span className="total-amount">${totalPayable.toFixed(2)}</span>
              <div className="secure-tag">
                <LockOutlined />
                <span>{t("SECURE_PAYMENT")}</span>
              </div>
            </div>

            <button 
              className="proceed-btn" 
              onClick={handleProceed}
              disabled={isLoading}
            >
              {isLoading ? <LoadingOutlined /> : null}
              {t("PROCEED_TO_BUY")}
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};
