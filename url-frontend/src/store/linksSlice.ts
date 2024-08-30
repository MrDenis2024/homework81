import {createSlice} from '@reduxjs/toolkit';
import {createLink} from './linksThunks';
import {Link} from '../types';

export interface LinksState {
  createLoading: boolean;
  shortenLink: Link | null;
}

export const initialState: LinksState = {
  createLoading: false,
  shortenLink: null,
};

export const linksSlice = createSlice({
  name: "links",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createLink.pending, (state: LinksState) => {
      state.createLoading = true;
      state.shortenLink = null;
    }).addCase(createLink.fulfilled, (state: LinksState, {payload: link}) => {
      state.createLoading = false;
      state.shortenLink = link;
    }).addCase(createLink.rejected, (state: LinksState) => {
      state.createLoading = false;
    });
  },
  selectors: {
    selectorCreateLoading: (state: LinksState) => state.createLoading,
    selectorShortenLink: (state: LinksState) => state.shortenLink,
  },
});

export const linksReducer = linksSlice.reducer;
export const {
  selectorCreateLoading,
  selectorShortenLink,
} = linksSlice.selectors;