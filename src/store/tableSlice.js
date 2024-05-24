import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [
    { id: 1, name: "John Doe", age: 28 },
    { id: 2, name: "Jane Smith", age: 34 },
  ],
  editRowId: null,
};

const tableSlice = createSlice({
  name: "table",
  initialState,
  reducers: {
    startEdit: (state, action) => {
      state.editRowId = action.payload;
    },
    saveEdit: (state, action) => {
      const { id, updatedRow } = action.payload;
      state.data = state.data.map((row) => (row.id === id ? updatedRow : row));
      state.editRowId = null;
    },
    cancelEdit: (state) => {
      state.editRowId = null;
    },
    deleteRow: (state, action) => {
      state.data = state.data.filter((row) => row.id !== action.payload);
    },
    addRow: (state, action) => {
      state.data.push(action.payload);
    },
  },
});

export const { startEdit, saveEdit, cancelEdit, deleteRow, addRow } =
  tableSlice.actions;

export default tableSlice.reducer;

// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// // Thunks for API interactions
// export const fetchData = createAsyncThunk("table/fetchData", async () => {
//   const response = await fetch("https://api.example.com/data");
//   const data = await response.json();
//   return data;
// });

// export const updateData = createAsyncThunk("table/updateData", async (row) => {
//   await fetch(`https://api.example.com/data/${row.id}`, {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(row),
//   });
//   return row;
// });

// export const deleteData = createAsyncThunk("table/deleteData", async (id) => {
//   await fetch(`https://api.example.com/data/${id}`, {
//     method: "DELETE",
//   });
//   return id;
// });

// export const addData = createAsyncThunk("table/addData", async (row) => {
//   const response = await fetch("https://api.example.com/data", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(row),
//   });
//   const data = await response.json();
//   return data;
// });

// const initialState = {
//   data: [],
//   editRowId: null,
//   status: "idle",
//   error: null,
// };

// const tableSlice = createSlice({
//   name: "table",
//   initialState,
//   reducers: {
//     startEdit: (state, action) => {
//       state.editRowId = action.payload;
//     },
//     cancelEdit: (state) => {
//       state.editRowId = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchData.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(fetchData.fulfilled, (state, action) => {
//         state.status = "succeeded";
//         state.data = action.payload;
//       })
//       .addCase(fetchData.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.error.message;
//       })
//       .addCase(updateData.fulfilled, (state, action) => {
//         state.data = state.data.map((row) =>
//           row.id === action.payload.id ? action.payload : row
//         );
//         state.editRowId = null;
//       })
//       .addCase(deleteData.fulfilled, (state, action) => {
//         state.data = state.data.filter((row) => row.id !== action.payload);
//       })
//       .addCase(addData.fulfilled, (state, action) => {
//         state.data.push(action.payload);
//       });
//   },
// });

// export const { startEdit, cancelEdit } = tableSlice.actions;

// export default tableSlice.reducer;
