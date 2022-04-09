import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { FacebookLoginProvider, SocialAuthServiceConfig, SocialLoginModule } from 'angularx-social-login';
import { CenteredCardComponent } from './ui/centered-card/centered-card.component';
import { MatCardModule } from '@angular/material/card';
import { FileInputComponent } from './ui/file-input/file-input.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { GalleryComponent } from './gallery/gallery.component';
import { FormComponent } from './form/form.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FlexModule } from '@angular/flex-layout';
import { AppStoreModule } from './app-store.module';
import { environment } from '../environments/environment';
import { AuthInterceptor } from './auth.interceptor';
import { ToolbarComponent } from './ui/toolbar/toolbar.component';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { HasRolesDirective } from './directives/has-roles.directive';
import { UserTypeDirective } from './directives/user-type.directive';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ValidateIdenticalDirective } from './directives/validate-identical.directive';

const socialConfig: SocialAuthServiceConfig = {
  autoLogin: false,
  providers: [
    {
      id: FacebookLoginProvider.PROVIDER_ID,
      provider: new FacebookLoginProvider(environment.fbAppId, {
        scope: 'email,public_profile'
      })
    }
  ]
}

@NgModule({
  declarations: [
    AppComponent,
    CenteredCardComponent,
    FileInputComponent,
    LoginComponent,
    RegisterComponent,
    GalleryComponent,
    FormComponent,
    ToolbarComponent,
    HasRolesDirective,
    UserTypeDirective,
    ValidateIdenticalDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    SocialLoginModule,
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    FlexModule,
    AppStoreModule,
    MatIconModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatSnackBarModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: 'SocialAuthServiceConfig', useValue: socialConfig }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
