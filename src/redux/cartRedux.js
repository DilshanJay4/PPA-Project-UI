import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      state.quantity += 1;
      state.products.push(action.payload);
      state.total += action.payload.price * action.payload.quantity;
    },

    removeProduct: (state, action) => {
      // Find the index of the product to remove in the cart
      const productIndex = state.products.findIndex(
        (product) => product._id === action.payload
      );

      if (productIndex !== -1) {
        // Remove the product from the cart based on the index
        state.quantity -= state.products[productIndex].quantity;
        state.total -= state.products[productIndex].price * state.products[productIndex].quantity;
        state.products.splice(productIndex, 1);
      }

        // Check if the cart is now empty and reset quantity and total to 0
      if (state.products.length === 0) {
        state.quantity = 0;
        state.total = 0;
      }

    },

    increaseQuantity: (state, action) => {
      const productIndex = state.products.findIndex(
        (product) => product._id === action.payload
      );
      
      if (productIndex !== -1) {
        state.products[productIndex].quantity += 1;
        state.total += state.products[productIndex].price;
      }
    },

    decreaseQuantity: (state, action) => {
      const productIndex = state.products.findIndex(
        (product) => product._id === action.payload
      );
      
      if (productIndex !== -1) {
        if (state.products[productIndex].quantity > 1) {
          state.products[productIndex].quantity -= 1;
          state.total -= state.products[productIndex].price;
        }
      }
    },

  },
});

export const { addProduct, removeProduct, increaseQuantity, decreaseQuantity  } = cartSlice.actions;
export default cartSlice.reducer;