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

  /**
 * Array to store all movies.
 */
  movies: any[] = [];
  /**
   * Information about the genre, director, user, and favorite movies.
   */
  genre: any = "";

  director: any = "";

  user: any = {};

  userData: any = {};

  favoritemovie: any[] = [];

  public Username: string = "";

  /**
* Constructor of the MovieCardComponent class.
* Initializes FetchApiDataService, MatDialog, and MatSnackBar.
* @param fetchApiData - Service for fetching data from the API.
* @param dialog - Service for opening dialogs.
* @param snackBar - Service for displaying snack bar notifications.
*/

  constructor(public fetchApiData: UserRegistrationService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,

    private router: Router

  ) { }

  /**
 * Lifecycle hook that is called after the component's view has been initialized.
 * Initializes the component by fetching user and movies.
 */

  ngOnInit(): void {
    this.getMovies();
    this.Username = JSON.parse(localStorage.getItem("user")!).Username;
  }

  openProfile(): void {
    this.router.navigate(['profile']);
  }

  logOut(): void {
    localStorage.clear();
    this.router.navigate(['welcome']);
  }

  /**
     * Fetches all movies from the database.
     */

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  /**
  * Opens dialog to display movie synopsis.
  * @param title - The name of the movie.
  * @param description - The description of the movie.
  */

  openSynopsisDialog(title: string, description: string): void {
    this.dialog.open(MovieSynopsisComponent, {
      data: {
        Title: title,
        Description: description
      },
      width: '500px',
    });
  }

  /**
  * Opens dialog to display genre information.
  * @param name - The name of the genre.
  */

  openGenreDialog(name: string, description: string): void {
    this.dialog.open(GenreInfoComponent, {
      data: {
        Name: name,
        Description: description
      },
      width: '500px',
    });
  }

  /**
   * Opens dialog to display director information.
   * @param name - The name of the director.
   */

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

  /**
 * Filters movies to display only favorites.
 */

  /**
 * Retrieves user's favorite movies from local storage.
 */


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
   * Checks if a movie is favorited by the user.
   * @param movie - The movie object.
   * @returns True if the movie is favorited, false otherwise.
   */

  isFav(movie: any): boolean {

    let userx = localStorage.getItem('user');
    let user = JSON.parse(userx);
    const userFavorite = user['FavoriteMovies'];
    console.log(userFavorite);
    return userFavorite.includes(movie._id);

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
 * Adds a movie to user's favorites.
 * @param movie - The movie object to be added.
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
  * Deletes a movie from user's favorites.
  * @param movie - The movie object to be removed.
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