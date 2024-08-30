import {createAsyncThunk} from '@reduxjs/toolkit';
import {Link, NewLink} from '../types';
import axiosApi from '../axiosApi';

export const createLink = createAsyncThunk<Link, NewLink>('links/create', async (link) => {
  const {data: newLink} = await axiosApi.post<Link>('/links', link);
  return newLink;
});