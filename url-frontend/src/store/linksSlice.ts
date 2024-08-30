import {createSlice} from '@reduxjs/toolkit';

export interface LinksState {
  createLoading: boolean;
}

export const initialState: LinksState = {
  createLoading: false,
};

export const linksSlice = createSlice({
  name: "links",
  initialState,
  reducers: {},
  extraReducers: (builder) => {

  },
  selectors: {

  },
});

export const linksReducer = linksSlice.reducer;
export const {

} = linksSlice.selectors;