import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Image, ImageData } from '../models/image.model';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class ImagesService {

  constructor(private http: HttpClient) { }

  getImages(id: string) {
    return this.http.get<Image[]>(environment.apiUrl + `/images?user=${id}`).pipe(
      map(response => {
        return response.map(data => {
          return new Image(data._id,data.user,data.title,data.image);
        });
      })
    );
  }

  createPost(imageData: ImageData) {
    const formData = new FormData();
    Object.keys(imageData).forEach(key => {
      if (imageData[key] !== null) {
        formData.append(key, imageData[key]);
      }
    });
    return this.http.post(environment.apiUrl + '/images', formData);
  }

  deletePost(id: string) {
    return this.http.delete(environment.apiUrl + `/images/${id}`)
  }
}
