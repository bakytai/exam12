import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../store/type';
import { deleteImageRequest, fetchImagesRequest } from '../store/image.actions';
import { Observable } from 'rxjs';
import { Image } from '../models/image.model';

@Component({
  selector: 'app-user-gallery',
  templateUrl: './user-gallery.component.html',
  styleUrls: ['./user-gallery.component.sass']
})
export class UserGalleryComponent implements OnInit {
  userId!: string;
  images: Observable<Image[]>;
  loading: Observable<boolean>;
  error: Observable<null | string>;

  constructor(private route: ActivatedRoute, private store: Store<AppState>) {
    this.images = store.select(state => state.images.images);
    this.loading = store.select(state => state.images.fetchLoading);
    this.error = store.select(state => state.images.fetchError);
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.userId = params['id']
    })
    this.store.dispatch(fetchImagesRequest({id: this.userId}));
  }


  openDialog() {

  }

  deleteImg(id: string) {
    this.store.dispatch(deleteImageRequest({id}))
  }
}
