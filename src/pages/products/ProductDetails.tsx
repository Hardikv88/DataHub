import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  HeartOutlined,
  HeartFilled,
  ShoppingCartOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { Rate, Spin, Alert, Breadcrumb } from "antd";
import { productService } from "../../services/productService";
import type { Product } from "../../modals/ProductResponseModal";
import type { RootState } from "../../storage/Store";
import { addItem, removeItem } from "../../storage/AddProducts";
import { wishItem, removeWishItem } from "../../storage/WishList";
import { ProductImageGallery } from "../../components/product/ProductImageGallery";
import { ProductInfo } from "../../components/product/ProductInfo";
import { ProductReviews } from "../../components/product/ProductReviews";
import "./ProductDetails.css";
import { GLOBAL_TEXT } from "../../constants/Strings";

export const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const cartItems = useSelector((state: RootState) => state.addItem.items);
  const wishItems = useSelector((state: RootState) => state.WishListItem.items);

  const isInCart = product
    ? cartItems.some((item) => item.id === product.id)
    : false;
  const isFavourite = product
    ? wishItems.some((item) => item.id === product.id)
    : false;

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      try {
        setLoading(true);
        setError(null);
        const data = await productService.getProductById(id);
        setProduct(data);
      } catch (err) {
        setError("Failed to fetch product details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const toggleCart = () => {
    if (!product) return;
    if (isInCart) {
      dispatch(removeItem(product.id));
    } else {
      dispatch(addItem(product));
    }
  };

  const toggleWishlist = () => {
    if (!product) return;
    if (isFavourite) {
      dispatch(removeWishItem(product.id));
    } else {
      dispatch(wishItem(product));
    }
  };

  if (loading) {
    return (
      <div className="product-details-centered">
        <Spin size="large" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="product-details-centered">
        <Alert
          message="Error"
          description={error || "Product not found"}
          type="error"
          showIcon
        />
        <button className="back-btn mt-4" onClick={() => navigate(-1)}>
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="product-details-container">
      <div className="breadcrumb-wrapper">
        <Breadcrumb
          items={[
            { title: <Link to="/dashboard">Home</Link> },
            { title: <Link to="/products">Products</Link> },
            { title: product.title },
          ]}
        />
      </div>

      <div className="product-details-top">
        {/* Left: Image Gallery */}
        <div className="product-image">
          <ProductImageGallery
            images={product.images || [product.thumbnail]}
            title={product.title}
          />
        </div>

        {/* Right: Details & Actions */}
        <div className="product-info">
          <div className="summary-header">
            <span className="product-brand">
              {product.brand || product.category}
            </span>
            <div className="stock-badge">
              <span
                className={`status-dot ${product.stock > 0 ? "in-stock" : "out-of-stock"}`}
              ></span>
              {product.availabilityStatus ||
                (product.stock > 0 ? GLOBAL_TEXT.IN_STOCK : GLOBAL_TEXT.OUT_OF_STOCK)}
            </div>
          </div>

          <h1 className="product-title">{product.title}</h1>

          <div className="product-rating-box">
            <Rate disabled allowHalf defaultValue={product.rating} />
            <span className="rating-count">
              ({product.reviews?.length || 0} reviews)
            </span>
          </div>

          <div className="product-price">
            <span className="current-price">${product.price.toFixed(2)}</span>
            {product.discountPercentage > 0 && (
              <span className="discount-badge">
                -{product.discountPercentage.toFixed(0)}%
              </span>
            )}
          </div>

          <div className="product-actions">
            <button
              className={`action-btn cart-btn ${isInCart ? "in-cart" : ""}`}
              onClick={toggleCart}
            >
              {isInCart ? <DeleteOutlined /> : <ShoppingCartOutlined />}
              <span>
                {isInCart
                  ? GLOBAL_TEXT.REMOVE_FROM_CART
                  : GLOBAL_TEXT.ADD_TO_CART}
              </span>
            </button>

            <button
              className={`action-btn wish-btn ${isFavourite ? "active" : ""}`}
              onClick={toggleWishlist}
            >
              {isFavourite ? <HeartFilled /> : <HeartOutlined />}
            </button>
          </div>
        </div>
      </div>

      <div className="product-details-bottom">
        <div className="details-section">
          <h3 className="section-title">{GLOBAL_TEXT.DESCRIPTION}</h3>
          <p className="product-description">{product.description}</p>
        </div>

        <div className="details-section">
          <h3 className="section-title">{GLOBAL_TEXT.PRODUCT_INFORMATION}</h3>
          <ProductInfo product={product} />
        </div>

        <div className="details-section">
          <h3 className="section-title">{GLOBAL_TEXT.CUSTOMER_REVIEWS}</h3>
          <ProductReviews reviews={product.reviews || []} />
        </div>
      </div>
    </div>
  );
};
