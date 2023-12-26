import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filteredGroups: [],
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    FILTER_GROUPS(state, action) {
      const { groups, search } = action.payload;
      const tempGroups = groups.filter(
        (group) =>
          group.name.toLowerCase().includes(search.toLowerCase()) ||
          group.category.toLowerCase().includes(search.toLowerCase())
      );

      state.filteredGroups = tempGroups;
    },
  },
});

export const { FILTER_GROUPS } = filterSlice.actions;

export const selectFilteredGroups = (state) => state.filter.filteredGroups;

export default filterSlice.reducer;
