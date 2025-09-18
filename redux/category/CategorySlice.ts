import { createSlice } from "@reduxjs/toolkit";
import {
  addCategories,
  deleteCategroy,
  fetchCategories,
  updateCategories,
} from "./CategoryThunk";

interface CategorySlice {
  categories: ICategoryDb[];
  loading: "idle" | "pending" | "succeeded" | "failed";
}

const initialState = {
  categories: [],
  loading: "idle",
} satisfies CategorySlice as CategorySlice;

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(fetchCategories.rejected, (state) => {
      state.loading = "failed";
    });
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.categories = action.payload;
    });

    builder.addCase(addCategories.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(addCategories.rejected, (state) => {
      state.loading = "failed";
    });
    builder.addCase(addCategories.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.categories = [action.payload, ...state.categories];
    });

    builder.addCase(updateCategories.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(updateCategories.rejected, (state) => {
      state.loading = "failed";
    });
    builder.addCase(updateCategories.fulfilled, (state, action) => {
      const updatedCategory = action.payload;
      state.loading = "succeeded";
      state.categories = state.categories.map((cat) => {
        if (cat.id === updatedCategory.id) return updatedCategory;
        return cat;
      });
    });

    builder.addCase(deleteCategroy.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(deleteCategroy.rejected, (state) => {
      state.loading = "failed";
    });
    builder.addCase(deleteCategroy.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.categories = state.categories.filter(
        (cat) => cat.id !== action.payload.id,
      );
    });
  },
});

export default categorySlice.reducer;
