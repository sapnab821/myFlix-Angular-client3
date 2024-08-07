import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';




// Component Imports

import { DirectorInfoComponent } from '../director-info/director-info.component';
import { GenreInfoComponent } from '../genre-info/genre-info.component';
import { MovieSynopsisComponent } from '../movie-synopsis/movie-synopsis.component';


/**
 * Component for user profile management.
 */
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})

export class UserProfileComponent implements OnInit {


  /** Input for user data. */

  /*@Input() userData = { Username: '', Email: '', Birthday: '', _id: '' };
  formUserData = { Username: '', Email: '', Birthday: '', _id: '' };*/

  /** Input data for updating user information. */
  @Input()
  userData: any = {};
  formUserData: any = {};
  /*userData = { Username: '', Password: '', Email: '', Birthday: '', UserId: Object, FavoriteMovies:[] };
  formUserData = { Username: '', Email: '', Password: '', Birthday: '', UserId: Object, FavoriteMovies: []
   };
*/
  /*

  userData: any = {};
 */
  favoriteMovies: any[] = [];

  user: any = {};
  movies: any[] = [];
  favoritemovie: any[] = [];
  favoriteMoviesIDs: any[] = [];

  @Output() updateUserEvent = new EventEmitter<any>();

  /**
* Creates an instance of UserProfileComponent.
* @param fetchApiData - API data fetching service.
* @param dialogRef - Angular Material dialog ref
* @param dialog - Angular Material dialog service.
* @param snackBar - Angular Material snackbar service.
* @param router - Angular Router service.
*/


  constructor(
    public fetchApiData: UserRegistrationService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<UserProfileComponent>,
    public snackBar: MatSnackBar,
    public router: Router
  ) {
    this.userData = JSON.parse(localStorage.getItem("user") || "");
  }
  /**
     * Lifecycle hook that is called after data-bound properties of a directive are initialized.
     */

  ngOnInit(): void {

    this.user = JSON.parse(localStorage.getItem("user")!);

    this.favoritemovie = this.user?.FavoriteMovies;

    this.getMovies();

    /**
         * opens movie page
         */

  }

  openHome(): void {
    this.router.navigate(['movies']);
  }

  /**
       * Gets movies.
       */

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((result: any) => {
      if (Array.isArray(result)) {
        this.movies = result;
      }

      this.getFavMovies();
      return this.movies;
    });
  }

  /**
     * Fetches user's favorite movies.
     */
  getFavMovies(): void {

    if (this.user) {
      this.favoriteMoviesIDs = this.user.FavoriteMovies;
    }

    this.favoritemovie = this.favoriteMoviesIDs.map(id => this.movies.find(movie => movie._id == id))
  }



  /**
     * Checks if a movie is in the user's favorite movies list.
     * @param movie - The movie to check.
     * @returns True if the movie is a favorite, otherwise false.
     */

  isFav(movie: any): boolean {

    return this.favoriteMoviesIDs.includes(movie._id);
  }


  /**
     * Toggles a movie in the user's favorite movies list.
     * @param movie - The movie to toggle.
     */

  toggleFav(movie: any): void {
    const isFavorite = this.isFav(movie);
    isFavorite
      ? this.deleteFavMovies(movie)
      : this.addFavMovies(movie);
  }

  /**
     * Adds a movie to the user's favorite movies list.
     * @param movie - The movie to add.
     */

  addFavMovies(movie: any): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user) {
      this.fetchApiData.addFavoriteMovie(user._id, movie._id).subscribe((result) => {
        localStorage.setItem('user', JSON.stringify(result));
        this.favoritemovie = this.user?.FavoriteMovies;
        this.getFavMovies(); // Refresh favorite movies after adding a new one
        this.snackBar.open(`${movie.movieName} has been added to your favorites`, 'OK', {
          duration: 1000,
        });
      });
    }
  }

  /**
     * Deletes a movie from the user's favorite movies list.
     * @param movie - The movie to remove from favorites.
     */

  deleteFavMovies(movie: any): void {
    let user = localStorage.getItem('user');
    if (user) {
      let parsedUser = JSON.parse(user);
      this.userData.Username = parsedUser.Username;
      this.fetchApiData.deleteFavoriteMovie(parsedUser._id, movie._id).subscribe((result) => {
        localStorage.setItem('user', JSON.stringify(result));
        this.favoritemovie = this.user?.FavoriteMovies;
        // Remove the movie ID from the favoritemovie array
        this.favoriteMoviesIDs = this.favoriteMoviesIDs.filter((id) => id !== movie._id);
        // Fetch the user's favorite movies again to update the movie list
        this.getFavMovies();
        // Show a snack bar message
        this.snackBar.open(`${movie.movieName} has been removed from your favorites`, 'OK', {
          duration: 1000,
        });
      });
    }
  }

  /**
      * Updates user's profile
      * 
      */

  updateUser(): void {
    this.fetchApiData.editUserProfile(this.formUserData).subscribe((resp) => {
      //let user= JSON.parse(localStorage.getItem('user'));
      console.log('User update success:', resp);
      localStorage.setItem('user', JSON.stringify(resp));
      this.snackBar.open('User updated successfully!', 'OK', {
        duration: 2000,
      });

    },
      (error) => {
        console.log('Error updating user:', error);
        this.snackBar.open('Failed to update user', 'OK', {
          duration: 2000,
        });
      }
    )
  }





  /**
   * Deletes the user's account after confirmation.
   * @returns Promise<void>
   */


  deleteUser(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (confirm('are you sure?')) {
      this.fetchApiData.deleteUser(this.user.Username).subscribe((result) => {
        console.log(result);
        localStorage.clear();
      });

      this.snackBar.open(
        'You have successfully deleted your account',
        'OK',
        {
          duration: 2000,
        }
      );
      this.router.navigate(['welcome']);

    };

  }


  /**
     * Opens a dialog to view genre information.
     * @param genre - The genre.
     * @param description - The description of the genre.
     */
  openGenreDialog(genre: string, description: string): void {
    this.dialog.open(GenreInfoComponent, {
      data: {
        genre: genre,
        description: description
      },
      width: '500px',
    });
  }

  /**
    * Opens a dialog to view director information.
    * @param director - The director's name.
    * @param bio - The director's biography.
    * @param birthdate - The director's birthdate.
    */
  openDirectorDialog(director: string, bio: string, birthdate: string): void {
    this.dialog.open(DirectorInfoComponent, {
      data: {
        director: director,
        bio: bio,
        birthdate: birthdate,
      },
      width: '500px',
    });
  }

  /**
   * Opens a dialog to view movie synopsis information.
   * @param movieName - The name of the movie.
   * @param description - The synopsis of the movie.
   */
  openSynopsisDialog(movieName: string, description: string): void {
    this.dialog.open(MovieSynopsisComponent, {
      data: {
        movieName: movieName,
        description: description
      },
      width: '500px',
    });
  }


}