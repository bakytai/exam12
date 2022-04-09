import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../store/type';
import { deleteImageRequest, fetchImagesRequest } from '../store/image.actions';
import { Observable } from 'rxjs';
import { Image } from '../models/image.model';
import { ModalComponent } from '../modal/modal.component';
import { MatDialog } from '@angular/material/dialog';

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

  constructor(private route: ActivatedRoute, private store: Store<AppState>,public dialog: MatDialog) {
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


  openDialog(imageStr: string) {
    const dialogRef = this.dialog.open(ModalComponent,{
      data: {image: imageStr},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  deleteImg(id: string) {
    this.store.dispatch(deleteImageRequest({id}))
  }
}
