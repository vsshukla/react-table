import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Assuming axios is configured with the base URL elsewhere in your project

export const fetchData = createAsyncThunk("table/fetchData", async () => {
  const response = await axios.get("/data");
  return response.data;
});

export const updateData = createAsyncThunk("table/updateData", async (row) => {
  await axios.put(/data/`${row.id}`, row);
  return row;
});

export const deleteData = createAsyncThunk("table/deleteData", async (id) => {
  await axios.delete(/data/`${id}`);
  return id;
});

export const addData = createAsyncThunk("table/addData", async (row) => {
  const response = await axios.post("/data", row);
  return response.data;
});

const initialState = {
  data: [],
  editRowId: null,
  status: "idle",
  error: null,
};

const tableSlice = createSlice({
  name: "table",
  initialState,
  reducers: {
    startEdit: (state, action) => {
      state.editRowId = action.payload;
    },
    cancelEdit: (state) => {
      state.editRowId = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updateData.fulfilled, (state, action) => {
        state.data = state.data.map((row) =>
          row.id === action.payload.id ? action.payload : row
        );
        state.editRowId = null;
      })
      .addCase(deleteData.fulfilled, (state, action) => {
        state.data = state.data.filter((row) => row.id !== action.payload);
      })
      .addCase(addData.fulfilled, (state, action) => {
        state.data.push(action.payload);
      });
  },
});

export const { startEdit, cancelEdit } = tableSlice.actions;

export default tableSlice.reducer;
