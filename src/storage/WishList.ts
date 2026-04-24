import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "../modals/ProductResponseModal";


type WishListItemState = {
  items: Product[];
};

const initialState: WishListItemState = {
  items:[],
};

const WishListItem = createSlice({
  name: "WishListItem",
  initialState,
  reducers: {
    wishItem: (state, action: PayloadAction<Product>) => {
        console.log('itemPsuh',action.payload);
        state.items.push(action.payload)
    },
    removeWishItem: (state, action: PayloadAction<number>) => {
      // we'll remove item by id
      state.items = state.items.filter(item => item.id !== action.payload);
    },
},
});


export const { wishItem, removeWishItem} = WishListItem.actions;

export default WishListItem.reducer;