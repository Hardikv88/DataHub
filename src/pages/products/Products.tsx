import React, { useEffect, useState } from "react";
import { Pagination } from "antd";
import { BannerCarousel } from "../../components/common/BannerCarousel";
import { ProductCard } from "../../components/common/ProductCard";
import apiHelper from "../../services/ApiHelper";
import type {
  Product,
  ProductResponseModal,
} from "../../modals/ProductResponseModal";
import "./style/products.css";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../storage/Store";
import { addItem } from "../../storage/AddProducts";
import { removeWishItem, wishItem } from "../../storage/WishList";

const PAGE_SIZE = 6;

export const Products: React.FC = () => {
  const [isLoading, setLoading] = useState(false);
  const [productsData, setProductsData] = useState<Product[] | []>([]);
  const totalProducts = productsData.length;
  const totalPages = Math.ceil(totalProducts / PAGE_SIZE);
  const [currentPage, setCurrentPage] = useState(1);
  const startPosition = (currentPage - 1) * PAGE_SIZE;
  const endPosition = startPosition + PAGE_SIZE;

  const dispatch = useDispatch<AppDispatch>();
  const selectWishItems = useSelector(
    (state: RootState) => state.WishListItem.items,
  );

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      setLoading(true);
      const response = await apiHelper.get<ProductResponseModal>("/products?limit=194")
      setProductsData(response.data.products);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  const onPageChange = (n: number) => {
    console.log(n);
    setCurrentPage(n);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleClick = (data: Product) => {
    console.log(data);
    dispatch(addItem(data));
  };

  const btnWishListClick = (data: Product) => {
    console.log(data);

    console.log(data);
    if (selectWishItems.find((cardItems) => cardItems.id == data.id)) {
      dispatch(removeWishItem(data.id));
    } else {
      dispatch(wishItem(data));
    }
  };

  return (
    <div className="products-page">
      <h1 className="dashboard-heading">Products</h1>

      {/* Banner Carousel */}
      <BannerCarousel />

      {/* Product Grid */}
      <div className="products-grid">
        {productsData.slice(startPosition, endPosition).map((product) => (
          <ProductCard
            key={product.id}
            Product={product}
            isVisibleCart={false}
            btnCallBack={() => handleClick(product)}
            btnWishList={() => btnWishListClick(product)}
          />
        ))}
      </div>

      {/* Pagination */}
      <div className="products-pagination">
        <Pagination
          size="large"
          current={currentPage}
          total={totalPages * PAGE_SIZE} // 👈 IMPORTANT (see below)
          pageSize={PAGE_SIZE}
          showSizeChanger={false}
          onChange={(page) => onPageChange(page)}
        />
      </div>
    </div>
  );
};
