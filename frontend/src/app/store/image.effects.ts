import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ImagesService } from '../services/images.service';
import { HelpersService } from '../services/helpers.service';
import { AppState } from './type';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { catchError, mergeMap, of, tap, withLatestFrom } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  createImageFailure,
  createImageRequest,
  createImageSuccess, deleteImageFailure, deleteImageRequest, deleteImageSuccess,
  fetchImagesFailure,
  fetchImagesRequest,
  fetchImagesSuccess
} from './image.actions';

@Injectable()

export class ImagesEffects {
  fetchImages = createEffect(() => this.actions.pipe(
    ofType(fetchImagesRequest),
    mergeMap(({id}) => this.imageService.getImages(id).pipe(
      map(images => fetchImagesSuccess({images})),
      catchError(() => of(fetchImagesFailure({error: 'Something went wrong'})))
    ))
  ));

  createImage = createEffect(() => this.actions.pipe(
    ofType(createImageRequest),
    mergeMap(({imageData}) => this.imageService.createPost(imageData).pipe(
      map(() => createImageSuccess()),
      tap(() => {
        void this.router.navigate(['/']);
        this.helpers.openSnackbar('Post saved!');
      }),
      catchError(() => of(createImageFailure({error: 'Wrong Data'})))
    ))
  ));

  deleteImage = createEffect(() => this.actions.pipe(
    ofType(deleteImageRequest),
    withLatestFrom(this.store.select(state => state.users.user)),
    mergeMap(([{id}, user]) => this.imageService.deletePost(id).pipe(
      map(() => deleteImageSuccess()),
      tap(() => {
        if (user) {
          this.store.dispatch(fetchImagesRequest({id: user._id}))
        }
        this.helpers.openSnackbar('Post deleted!');
      }),
      catchError(() => of(deleteImageFailure({error: 'Wrong Data'})))
    ))
  ));

  constructor(
    private router: Router,
    private actions: Actions,
    private imageService: ImagesService,
    private helpers: HelpersService,
    private store: Store<AppState>
  ) {}
}
