import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "authSlice",
  initialState: [],
  reducers: {
    register: (state, action) => {
      try {
        fetch("/api/userdb", {
          method: "POST",
          headers: {
            "Content-Type": "Application/json",
          },
          body: JSON.stringify(action.payload),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
          });
      } catch (err) {}
    },
  },
});

export const { register } = authSlice.actions;
export default authSlice.reducer;
