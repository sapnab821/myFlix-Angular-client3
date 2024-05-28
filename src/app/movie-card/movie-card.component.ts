// src/app/movie-card/movie-card.component.ts
import { Component, OnInit } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service'
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { MovieSynopsisComponent } from '../movie-synopsis/movie-synopsis.component';
import { GenreInfoComponent } from '../genre-info/genre-info.component';
import { DirectorInfoComponent } from '../director-info/director-info.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
  
})




export class MovieCardComponent implements OnInit {
  movies: any[] = [];

  genre: any = "";

  director: any = "";

  user: any = {};

  userData = { UserId: "", favoritemovie: [] }

  favoritemovie: any[] = [];

  public Username: string = "";
 
  constructor(public fetchApiData: UserRegistrationService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
  
      private router: Router
   
  ) { }

ngOnInit(): void {
 this.getMovies();
 this.Username = JSON.parse(localStorage.getItem("user")!).Username;
}

openProfile(): void {
  this.router.navigate(['profile']);
}

getMovies(): void {
  this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  openSynopsisDialog(title: string, description: string): void {
    this.dialog.open(MovieSynopsisComponent, {
      data: {
        Title: title,
        Description: description
      },
      width: '500px',
    });
  }

  openGenreDialog(name: string, description: string): void {
    this.dialog.open(GenreInfoComponent, {
      data: {
        Name: name,
        Description: description
      },
      width: '500px',
    });
  }

  openDirectorDialog(name: string, bio: string, birthday: number, death: string): void {
    this.dialog.open(DirectorInfoComponent, {
      data: {
        Name: name,
        Bio: bio,
        Birthday: birthday,
        Death: death
      },
      width: '500px',
    });
  }
  getFavorites(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      if (Array.isArray(resp)) {
        this.movies = resp;
        // Loop through each movie and push its ID into favoritemovie array
        this.movies.forEach((movie: any) => {
          this.favoritemovie.push(movie._id);
        });
      }
    });
  }

  /**
    * Checks if a movie is in the user's favorite list.
    * @param movie - The movie to check.
    * @returns True if the movie is in the favorite list, false otherwise.
    */
  isFav(movie: any): boolean {
    return this.favoritemovie.includes(movie._id);
  }

  /**
    * Toggles a movie in the user's favorite list.
    * @param movie - The movie to toggle.
    */
  toggleFav(movie: any): void {
    console.log('toggleFav called with movie:', movie);
    const isFavorite = this.isFav(movie);
    console.log('isFavorite:', isFavorite);
    isFavorite
      ? this.deleteFavMovies(movie)
      : this.addFavMovies(movie);
  }

  /**
     * Adds a movie to the user's favorite list.
     * @param movie - The movie to add to favorites.
     */
  addFavMovies(movie: any): void {
    let user = localStorage.getItem('user');
    if (user) {
      let parsedUser = JSON.parse(user);
      console.log('user:', parsedUser);
      this.userData.UserId = parsedUser._id;
      console.log('userData:', this.userData);
      this.fetchApiData.addFavoriteMovie(parsedUser.Username, movie._id).subscribe((resp) => {
        console.log('server response:', resp);
        localStorage.setItem('user', JSON.stringify(resp));
        // Add the movie ID to the favoritemovie array
        this.favoritemovie.push(movie._id);
        // Show a snack bar message
        this.snackBar.open(`${movie.Title} has been added to your favorites`, 'OK', {
          duration: 3000,
        });
      });
    }
  }

  /**
     * Deletes a movie from the user's favorite list.
     * @param movie - The movie to remove from favorites.
     */
  deleteFavMovies(movie: any): void {
    let user = localStorage.getItem('user');
    if (user) {
      let parsedUser = JSON.parse(user);
      this.fetchApiData.deleteFavoriteMovie(parsedUser.Username, movie._id).subscribe((resp) => {
        localStorage.setItem('user', JSON.stringify(resp));
        // Remove the movie ID from the favoritemovie array
        this.favoritemovie = this.favoritemovie.filter((_id) => _id !== movie._id);
        // Show a snack bar message
        this.snackBar.open(`${movie.Title} has been removed from your favorites`, 'OK', {
          duration: 3000,
        });
      });
    }
  }
}

