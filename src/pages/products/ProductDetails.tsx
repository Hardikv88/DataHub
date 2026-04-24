import { HeartOutlined } from "@ant-design/icons";
import { GLOBAL_TEXT } from "../../constants/Strings";

export const ProductDetails: React.FC = () => {
  

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


};