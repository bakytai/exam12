import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../store/type';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.sass']
})
export class FormComponent implements OnInit {
  @ViewChild('f') form!: NgForm;
  error: Observable<string | null>;
  loading: Observable<boolean>;


  constructor(private store: Store<AppState>) {
    this.loading = store.select(state => state.images.createLoading);
    this.error = store.select(state => state.images.createError);
  }

  ngOnInit(): void {
  }

  onSubmit() {
    const imageData: ImageData = this.form.value;
    // this.store.dispatch(createImageRequest({imageData}))
  }
}
