import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCardHeader } from '@angular/material/card';
import { MatCardTitle } from '@angular/material/card';
import { MatCardContent } from '@angular/material/card';
import { MatCardActions } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';


import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { UserLoginFormComponent } from './user-login-form/user-login-form.component';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { RouterModule, Routes } from '@angular/router';

import { UserProfileComponent } from './user-profile/user-profile.component';
import { MovieSynopsisComponent } from './movie-synopsis/movie-synopsis.component';
import { GenreInfoComponent } from './genre-info/genre-info.component';


const appRoutes: Routes = [
  { path: 'welcome', component: WelcomePageComponent },
  { path: 'movies', component: MovieCardComponent },
  { path: 'profile', component: UserProfileComponent },
  { path: '', redirectTo: 'welcome', pathMatch: 'prefix' },
];


@NgModule({
  declarations: [
    AppComponent,
    UserRegistrationFormComponent,
    UserLoginFormComponent,
    MovieCardComponent,
    WelcomePageComponent,
    UserProfileComponent,
    MovieSynopsisComponent,
    GenreInfoComponent,
   
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    MatCardActions, 
    MatCardHeader,
    MatFormFieldModule,
    MatSnackBarModule,
    MatIconModule
  ],
 
  providers: [
    provideAnimationsAsync()
  ],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
