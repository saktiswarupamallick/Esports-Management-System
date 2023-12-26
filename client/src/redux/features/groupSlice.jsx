// groupSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import groupService from "./groupService";
import { toast } from "react-toastify";

const initialState = {
  lowQuantityGroups: [],
  group: null,
  groups: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  totalStoreValue: 0,
  outOfStock: 0,
  category: [],
};

// Create New Group
export const createGroup = createAsyncThunk(
  "groups/create",
  async (formData, thunkAPI) => {
    try {
      return await groupService.createGroup(formData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get all groups
export const getGroups = createAsyncThunk(
  "groups/getAll",
  async (_, thunkAPI) => {
    try {
      return await groupService.getGroups();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete a Group
export const deleteGroup = createAsyncThunk(
  "groups/delete",
  async (id, thunkAPI) => {
    try {
      return await groupService.deleteGroup(id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get a Group
export const getGroup = createAsyncThunk(
  "groups/getGroup",
  async (id, thunkAPI) => {
    try {
      return await groupService.getGroup(id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Update Group
export const updateGroup = createAsyncThunk(
  "groups/updateGroup",
  async ({ id, formData }, thunkAPI) => {
    try {
      return await groupService.updateGroup(id, formData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const groupSlice = createSlice({
  name: "group",
  initialState,
  reducers: {
    CALC_STORE_VALUE(state, action) {
      const groups = action.payload;
      const array = [];
      groups.forEach((item) => {
        const { price, quantity } = item;
        const groupValue = price * quantity;
        array.push(groupValue);
      });
      const totalValue = array.reduce((a, b) => a + b, 0);
      state.totalStoreValue = totalValue;
    },
    CALC_OUTOFSTOCK(state, action) {
      const groups = action.payload;
      const array = [];
      groups.forEach((item) => {
        const { quantity } = item;
        array.push(quantity);
      });
      let count = 0;
      array.forEach((number) => {
        if (number === 0 || number === "0") {
          count += 1;
        }
      });
      state.outOfStock = count;
    },
    CALC_CATEGORY(state, action) {
      const groups = action.payload;
      const array = [];
      groups.forEach((item) => {
        const { category } = item;
        array.push(category);
      });
      const uniqueCategory = [...new Set(array)];
      state.category = uniqueCategory;
    },
  },
  extraReducers: (builder) => {
    builder
      // ... (other extra reducers)
      .addCase(createGroup.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createGroup.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        console.log(action.payload);
        state.groups.push(action.payload);
        toast.success("Group added successfully");
      })
      .addCase(createGroup.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      // ... (other extra reducers)
      .addCase(getGroups.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getGroups.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        console.log(action.payload);
        state.groups = action.payload;
        state.lowQuantityGroups = action.payload.filter(
          (group) => group.quantity < 20
        );
      })
      .addCase(getGroups.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      // ... (other extra reducers)
      .addCase(deleteGroup.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteGroup.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success("Group deleted successfully");
      })
      .addCase(deleteGroup.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      // ... (other extra reducers)
      .addCase(getGroup.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getGroup.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.group = action.payload;
      })
      .addCase(getGroup.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      // ... (other extra reducers)
      .addCase(updateGroup.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateGroup.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success("Group updated successfully");
        state.lowQuantityGroups = state.groups.filter(
          (group) => group.quantity < 20
        );
      })
      .addCase(updateGroup.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.payload;
        toast.error(action.payload);
      });
  },
});

export const { CALC_STORE_VALUE, CALC_OUTOFSTOCK, CALC_CATEGORY } =
  groupSlice.actions;

export const selectLowQuantityGroups = (state) => state.group.lowQuantityGroups;
export const selectIsLoading = (state) => state.group.isLoading;
export const selectGroup = (state) => state.group.group;
export const selectTotalStoreValue = (state) => state.group.totalStoreValue;
export const selectOutOfStock = (state) => state.group.outOfStock;
export const selectCategory = (state) => state.group.category;

export default groupSlice.reducer;
