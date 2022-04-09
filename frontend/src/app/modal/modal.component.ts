import { Component, Inject, OnInit } from '@angular/core';
import { Image } from '../models/image.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
export interface DialogData {
  image: string
}

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.sass']
})
export class ModalComponent implements OnInit {
  url = 'http://localhost:8000/uploads/';
  urlImg!: string;
  image!: Image;
  constructor(public dialogRef: MatDialogRef<ModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit(): void {
    const name = this.data.image;
    this.urlImg = `${this.url}${name}`;
  }

}
