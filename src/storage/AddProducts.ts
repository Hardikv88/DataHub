import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "../modals/ProductResponseModal";


type AddCardState = {
  items: Product[];
};

const initialState: AddCardState = {
  items:[],
};

const addCardItem = createSlice({
  name: "addCardItem",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<Product>) => {
        console.log('itemPsuh',action.payload);
        state.items.push(action.payload)
    },
    removeItem: (state, action: PayloadAction<number>) => {
      // we'll remove item by id
      state.items = state.items.filter(item => item.id !== action.payload);
    },
},
});


export const { addItem, removeItem} = addCardItem.actions;

export default addCardItem.reducer;