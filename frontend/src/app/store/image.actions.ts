import { createAction, props } from '@ngrx/store';
import { Image, ImageData } from '../models/image.model';

export const fetchImagesRequest = createAction(
  '[Image] Fetch Request',
  props<{id: string}>()
  );
export const fetchImagesSuccess = createAction(
  '[Image] Fetch Success',
  props<{images: Image[]}>()
);
export const fetchImagesFailure = createAction(
  '[Image] Fetch Failure',
  props<{error: string}>()
);

export const createImageRequest = createAction(
  '[Image] Create Request',
  props<{imageData:ImageData}>()
);
export const createImageSuccess = createAction(
  '[Image] Create Success'
);
export const createImageFailure = createAction(
  '[Image] Create Failure',
  props<{error: string}>()
);

export const deleteImageRequest = createAction(
  '[Image] Delete Request',
  props<{id: string, }>()
);
export const deleteImageSuccess = createAction(
  '[Image] Delete Success'
);
export const deleteImageFailure = createAction(
  '[Image] Delete Failure',
  props<{error: string}>()
);

