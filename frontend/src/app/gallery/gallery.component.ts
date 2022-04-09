import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../store/type';
import { Image } from '../models/image.model';
import { fetchImagesRequest } from '../store/image.actions';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.sass']
})
export class GalleryComponent implements OnInit {
  images: Observable<Image[]>
  loading: Observable<boolean>
  error: Observable<null | string>

  constructor(private store: Store<AppState>,public dialog: MatDialog) {
    this.images = store.select(state => state.images.images);
    this.loading = store.select(state => state.images.fetchLoading);
    this.error = store.select(state => state.images.fetchError);
  }

  ngOnInit(): void {
    this.store.dispatch(fetchImagesRequest({id: ''}));
  }

  openDialog(imageStr: string) {
    const dialogRef = this.dialog.open(ModalComponent,{
      data: {image: imageStr},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
