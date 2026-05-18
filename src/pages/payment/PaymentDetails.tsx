import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./../payment/style/payments.css";
import { 
  ArrowLeftOutlined, 
  CheckCircleFilled, 
  InfoCircleOutlined, 
  QuestionCircleOutlined,
  CreditCardOutlined
} from "@ant-design/icons";
import { t } from "i18next";

interface PaymentState {
  subtotal: number;
  gst: number;
  platformCharges: number;
  deliveryCharges: number;
  discount: number;
  totalPayable: number;
}

export const PaymentDetails: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const paymentData = location.state as PaymentState;

  const [paymentMethod, setPaymentMethod] = useState("card");
  const [saveDetails, setSaveDetails] = useState(true);
  const [recurring, setRecurring] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    cardholderName: "",
    cardNumber: "",
    expiryDate: "",
    ccv: "",
    poNumber: ""
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Fallback values if state is missing
  const {
    subtotal = 0,
    gst = 0,
    platformCharges = 0,
    deliveryCharges = 0,
    discount = 0,
    totalPayable = 0
  } = paymentData || {};

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Formatting logic
    let formattedValue = value;
    if (name === "cardNumber") {
      formattedValue = value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim().slice(0, 19);
    } else if (name === "expiryDate") {
      formattedValue = value.replace(/\D/g, '').replace(/(.{2})/g, '$1/').trim().slice(0, 5);
      if (formattedValue.endsWith('/')) formattedValue = formattedValue.slice(0, -1);
    } else if (name === "ccv") {
      formattedValue = value.replace(/\D/g, '').slice(0, 3);
    }

    setFormData({ ...formData, [name]: formattedValue });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.cardholderName.trim()) newErrors.cardholderName = "Cardholder name is required";
    
    const cleanCardNumber = formData.cardNumber.replace(/\s/g, '');
    if (!cleanCardNumber) {
      newErrors.cardNumber = "Card number is required";
    } else if (cleanCardNumber.length !== 16) {
      newErrors.cardNumber = "Card number must be 16 digits";
    }

    if (!formData.expiryDate) {
      newErrors.expiryDate = "Required";
    } else if (!/^\d{2}\/\d{2}$/.test(formData.expiryDate)) {
      newErrors.expiryDate = "MM/YY";
    }

    if (!formData.ccv) {
      newErrors.ccv = "Required";
    } else if (formData.ccv.length !== 3) {
      newErrors.ccv = "3 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleConfirmOrder = () => {
    if (validateForm()) {
      setIsProcessing(true);
      // Simulate processing delay for premium feel
      setTimeout(() => {
        setIsProcessing(false);
        setIsSubmitted(true);
      }, 1500);
    }
  };

  if (isSubmitted) {
    return (
      <div className="payment-page-wrapper">
        <div className="success-container">
          <div className="success-card">
            {/* Animated Particles */}
            <div className="particles-container">
              <div className="particle p1"></div>
              <div className="particle p2"></div>
              <div className="particle p3"></div>
              <div className="particle p4"></div>
            </div>

            {/* GPay Success Animation */}
            <div className="success-animation-wrapper">
              <div className="ripple ripple-1"></div>
              <div className="ripple ripple-2"></div>
              <div className="checkmark-circle">
                <svg className="checkmark-svg" viewBox="0 0 52 52">
                  <path d="M14.1 27.2l7.1 7.2 16.7-16.8" />
                </svg>
              </div>
            </div>

            <h1>Order Confirmed!</h1>
            <p>Your payment of <strong>${totalPayable.toFixed(2)}</strong> has been processed successfully.</p>
            
            <div className="order-number-box">
              <span>Order Number</span>
              <strong>#DH-{Math.floor(100000 + Math.random() * 900000)}</strong>
            </div>

            <div className="success-actions">
              <button className="confirm-order-btn" onClick={() => navigate("/dashboard")}>
                Go to Dashboard
              </button>
              <div className="return-link" onClick={() => navigate("/orders")}>
                View My Orders
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="payment-page-wrapper">
      <div className="payment-content-container">
        
        {/* Left Side - Payment Form */}
        <div className="payment-form-section">
          {/* Breadcrumbs */}
          <div className="checkout-steps">
            <span className="step completed"><CheckCircleFilled /> Add funds</span>
            <span className="step-separator"></span>
            <span className="step active">Checkout details</span>
            <span className="step-separator"></span>
            <span className="step">Confirm your order</span>
          </div>

          <div className="payment-card">
            <div className="form-group">
              <label>{t("PO_NUMBER")} <span className="optional-tag">{t("OPTIONAL")}</span></label>
              <input 
                type="text" 
                name="poNumber"
                value={formData.poNumber}
                onChange={handleInputChange}
                placeholder="13984535" 
                className="payment-input" 
              />
            </div>

            <div className="payment-method-selector">
              <h3>{t("PAYMENT_METHOD")}</h3>
              <div className="method-grid">
                <div 
                  className={`method-item ${paymentMethod === "card" ? "active" : ""}`}
                  onClick={() => setPaymentMethod("card")}
                >
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png" alt="Mastercard" />
                  {paymentMethod === "card" && <CheckCircleFilled className="select-badge" />}
                </div>
                <div 
                  className={`method-item ${paymentMethod === "visa" ? "active" : ""}`}
                  onClick={() => setPaymentMethod("visa")}
                >
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png" alt="Visa" />
                  {paymentMethod === "visa" && <CheckCircleFilled className="select-badge" />}
                </div>
                <div 
                  className={`method-item ${paymentMethod === "amex" ? "active" : ""}`}
                  onClick={() => setPaymentMethod("amex")}
                >
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/American_Express_logo_%282018%29.svg/1200px-American_Express_logo_%282018%29.svg.png" alt="Amex" />
                  {paymentMethod === "amex" && <CheckCircleFilled className="select-badge" />}
                </div>
                <div 
                  className={`method-item ${paymentMethod === "paypal" ? "active" : ""}`}
                  onClick={() => setPaymentMethod("paypal")}
                >
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/PayPal_logo_2014.svg/1200px-PayPal_logo_2014.svg.png" alt="PayPal" />
                  {paymentMethod === "paypal" && <CheckCircleFilled className="select-badge" />}
                </div>
              </div>
            </div>

            <div className="card-details-form">
              <div className="form-group">
                <label>{t("CARDHOLDER_NAME")}</label>
                <input 
                  type="text" 
                  name="cardholderName"
                  value={formData.cardholderName}
                  onChange={handleInputChange}
                  placeholder="Simon Petrikov" 
                  className={`payment-input ${errors.cardholderName ? 'error' : ''}`} 
                />
                {errors.cardholderName && <span className="error-text">{errors.cardholderName}</span>}
              </div>

              <div className="form-row">
                <div className="form-group flex-2">
                  <label>{t("CARD_NUMBER")}</label>
                  <div className="input-with-icon">
                    <input 
                      type="text" 
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      placeholder="1234 5678 2585 2496" 
                      className={`payment-input ${errors.cardNumber ? 'error' : ''}`} 
                    />
                    <CreditCardOutlined className="input-icon" />
                  </div>
                  {errors.cardNumber && <span className="error-text">{errors.cardNumber}</span>}
                </div>
                <div className="form-group flex-1">
                  <label>{t("DATE")}</label>
                  <input 
                    type="text" 
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleInputChange}
                    placeholder="10/25" 
                    className={`payment-input text-center ${errors.expiryDate ? 'error' : ''}`} 
                  />
                  {errors.expiryDate && <span className="error-text">{errors.expiryDate}</span>}
                </div>
                <div className="form-group flex-1">
                  <label>{t("CCV")} <QuestionCircleOutlined className="label-icon" /></label>
                  <input 
                    type="password" 
                    name="ccv"
                    value={formData.ccv}
                    onChange={handleInputChange}
                    placeholder="000" 
                    className={`payment-input text-center ${errors.ccv ? 'error' : ''}`} 
                  />
                  {errors.ccv && <span className="error-text">{errors.ccv}</span>}
                </div>
              </div>

              <div className="info-message">
                <InfoCircleOutlined />
                <span>{t("CCV_DESCRIPTION")}</span>
              </div>

              <div className="checkbox-group">
                <input 
                  type="checkbox" 
                  id="save-details" 
                  checked={saveDetails} 
                  onChange={() => setSaveDetails(!saveDetails)} 
                />
                <label htmlFor="save-details">{t("SAVE_PAYMENT_DETAILS")}</label>
              </div>
            </div>

            <div className="recurring-section">
              <div className="recurring-header">
                <div className="recurring-title">
                  <span>{t("ENABLE_RECURRING_PAYMENTS")}</span>
                  <span className="recommended-badge">{t("HIGHLY_RECOMMENDED")}</span>
                </div>
                <div 
                  className={`toggle-switch ${recurring ? "active" : ""}`}
                  onClick={() => setRecurring(!recurring)}
                >
                  <div className="switch-handle"></div>
                </div>
              </div>
              <p className="recurring-desc">
                {t("NEVER_RUN_OUT_OF_BALANCE_DESCRIPTION")}
              </p>
              <div className="recurring-controls disabled">
                <div className="form-group">
                  <label>{t("WHEN_MY_BALANCE_IS_BELOW")}</label>
                  <div className="select-placeholder">€ 10.00</div>
                </div>
                <div className="form-group">
                  <label>{t("AUTOMATIC_RE_RECHARGE")}</label>
                  <div className="select-placeholder">€ 100.00</div>
                </div>
              </div>
            </div>

            <div className="return-link" onClick={() => navigate("/orders")}>
              <ArrowLeftOutlined /> {t("RETURN_TO_ORDERS")}
            </div>
          </div>
        </div>

        {/* Right Side - Summary */}
        <div className="payment-summary-section">
          <div className="summary-card">
            <h3>{t("ORDER_SUMMARY")}</h3>
            
            <div className="summary-row">
              <span>{t("SUBTOTAL")}:</span>
              <span className="summary-amount">${subtotal.toFixed(2)}</span>
            </div>

            <div className="summary-row">
              <span>{t("GST")} Tax (18%):</span>
              <span className="summary-amount">+${gst.toFixed(2)}</span>
            </div>

            <div className="summary-row">
              <span>{t("PLATFORM_CHARGES")}:</span>
              <span className="summary-amount">+${platformCharges.toFixed(2)}</span>
            </div>

            {deliveryCharges > 0 && (
              <div className="summary-row">
                <span>{t("DELIVERY_CHARGES")}:</span>
                <span className="summary-amount">+${deliveryCharges.toFixed(2)}</span>
              </div>
            )}

            {discount > 0 && (
              <div className="summary-row" style={{ color: "var(--success)" }}>
                <span>{t("DISCOUNT_COUPON")}:</span>
                <span className="summary-amount" style={{ color: "var(--success)" }}>-${discount.toFixed(2)}</span>
              </div>
            )}

            <div className="summary-divider"></div>

            <div className="summary-total">
              <div className="total-text">
                <span className="total-label">{t("TOTAL_PAYABLE")}:</span>
                <span className="vat-label">(Incl. Tax)</span>
              </div>
              <span className="total-amount-large">${totalPayable.toFixed(2)}</span>
            </div>

            <div className="top-up-preview">
              <div className="top-up-info">
                <span className="top-up-label">{t("FINAL_AMOUNT")}</span>
                <span className="top-up-sub">{t("SECURE_CHECKOUT")}</span>
              </div>
              <span className="top-up-value">${totalPayable.toFixed(2)}</span>
            </div>

            <button 
              className={`confirm-order-btn ${isProcessing ? 'processing' : ''}`} 
              onClick={handleConfirmOrder}
              disabled={isProcessing}
            >
              {isProcessing ? t("PROCESSING_TRANSACTION") : t("CONFIRM_ORDER")}
            </button>
          </div>

          <div className="testimonial-box">
            <p>
              {t("CONFIRM_ORDER_DESCRIPTION")}
            </p>
            <div className="testimonial-author">
              <div className="author-avatar">FH</div>
              <div className="author-info">
                <span className="author-name">Frank Hoen</span>
                <span className="author-title">Founder, Amber Alert</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
