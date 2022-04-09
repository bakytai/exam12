import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { GalleryComponent } from './gallery/gallery.component';
import { FormComponent } from './form/form.component';
import { UserGalleryComponent } from './user-gallery/user-gallery.component';

const routes: Routes = [
  {path: '', component: GalleryComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'new/post', component: FormComponent},
  {path: 'users/:id', component: UserGalleryComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
