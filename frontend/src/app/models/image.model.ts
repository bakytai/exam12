import { User } from './user.model';

export class Image {
  constructor(
    public _id: string,
    public user: User,
    public title: string,
    public image: string,
  ) {}
}

export interface ImageData {
  [key: string]: any;
  title: string;
  image: File;
}
