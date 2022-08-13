import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  restaurant: {
    id: null,
    imgUrl: null,
    title: null,
    rating: null,
    gener: null,
    address: null,
    short_description: null,
    dishes: null,
    long: null,
    lat: null,
  },
};

export const restaurantSlice = createSlice({
  name: "restaurant",
  initialState,
  reducers: {
    setRestaurant(state, { payload }) {
      state.restaurant = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setRestaurant } = restaurantSlice.actions;
export const selectedRestaurant = (state) => state.restaurant.restaurant;
export default restaurantSlice.reducer;
