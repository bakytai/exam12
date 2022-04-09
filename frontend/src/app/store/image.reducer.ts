import { ImageState } from './type';
import { createReducer, on } from '@ngrx/store';
import {
  createImageFailure,
  createImageRequest,
  createImageSuccess, deleteImageFailure, deleteImageRequest, deleteImageSuccess,
  fetchImagesFailure,
  fetchImagesRequest,
  fetchImagesSuccess
} from './image.actions';

const initialState: ImageState = {
  images: [],
  fetchLoading: false,
  fetchError: null,
  createLoading: false,
  createError: null,
  deleteLoading: false,
  deleteError: null,
};

export const imageReducer = createReducer(
  initialState,
  on(fetchImagesRequest, state => ({...state, fetchLoading: true})),
  on(fetchImagesSuccess, (state, {images}) => ({...state, fetchLoading: false, images})),
  on(fetchImagesFailure, (state, {error}) => ({
    ...state,
    fetchLoading: false,
    fetchError: error
  })),

  on(createImageRequest, state => ({...state, createLoading: true})),
  on(createImageSuccess, state => ({...state, createLoading: false})),
  on(createImageFailure, (state, {error}) => ({
    ...state,
    createLoading: false,
    createError: error})),

  on(deleteImageRequest, state => ({...state, deleteLoading: true})),
  on(deleteImageSuccess, state => ({...state, deleteLoading: false})),
  on(deleteImageFailure, (state, {error}) => ({
    ...state,
    deleteLoading: false,
    deleteError: error})),
)
