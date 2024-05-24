import { Component, Input, OnInit } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';


// Component Imports
/*
import { DirectorInfoComponent } from '../director-info/director-info.component';
import { GenreInfoComponent } from '../genre-info/genre-info.component';
import { MovieSynopsisComponent } from '../movie-synopsis/movie-synopsis.component';
*/
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
  @Input() userData = { Username: '', Email: '', Birthday: '', UserId: '' };
  formUserData = { Username: '', Email: '', Birthday: '', UserId: '' };

  user: any = {};
  movies: any[] = [];
  favoritemovie: any[] = [];
  favoriteMoviesIDs: any[] = [];
  
  /**
     * Constructs the UserProfileComponent.
     * @param fetchApiData - The service for fetching API data.
     * @param dialog - The dialog service for displaying dialogs.
     * @param snackBar - The snack bar service for displaying notifications.
     * @param router - The router service for navigation.
     */
  constructor(
    public fetchApiData: UserRegistrationService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    public router: Router
  ) { }
/** Lifecycle hook called after component initialization. */  ngOnInit(): void {
    
  }



  
     // Fetches user profile data.
     
     public getProfile(): void {
      this.fetchApiData.getUser().subscribe((result: any) => {
        //console.log('result:', result);
        this.user = result;
        this.userData.Username = this.user.Username;
        this.userData.Email = this.user.Email;
        if (this.user.Birthday) {
          let Birthday = new Date(this.user.Birthday);
          if (!isNaN(Birthday.getTime())) {
            this.userData.Birthday = Birthday.toISOString().split('T')[0];
          }
        }
        this.formUserData = { ...this.userData };
        //this.favoriteMoviesIDs = this.user.favoritemovie;
  
        //this.fetchApiData.getAllMovies().subscribe((movies: any[]) => {
         // this.favoritemovie = movies.filter((movie: any) => this.favoriteMoviesIDs.includes(movie._id));
        });
      };
    }
