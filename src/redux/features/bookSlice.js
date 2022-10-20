import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  id: 0,
  title: "",
  author: "",
  publish_date: "",
  category_name: "",
  image_url: "",
  description: "",
  createdAt: "",
  updatedAt: "",
}

const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    details: (state, action) => {
      state.id = action.payload.id
      state.title = action.payload.title
      state.author = action.payload.author
      state.publish_date = action.payload.publish_date
      state.category_name = action.payload.category_name
      state.image_url = action.payload.image_url
      state.description = action.payload.description
      state.createdAt = action.payload.createdAt
      state.updatedAt = action.payload.updatedAt
    },
  },
})

export const { details } = bookSlice.actions

export default bookSlice.reducer
