import { UserRegistrationService } from '../fetch-api-data.service';
import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss'],
  //standalone: false


})
export class UserLoginFormComponent implements OnInit {

  /**
   * Object holding user data for login
   * @property {any} userData - The user's data
   * 
   */

  @Input()


  userData: any = {};

  /**
 * Creates an instance of UserLoginFormComponent.
 * @param fetchApiDataService - API data fetching service.
 * @param dialogRef - Angular Material dialog reference.
 * @param snackBar - Angular Material snackbar service.
 * @param router - Angular Router service.
 */

  constructor(
    public FetchApiDataService: UserRegistrationService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    private router: Router
  ) { }

  /**
     * Lifecycle hook that is called after data-bound properties of a directive are initialized.
     */

  ngOnInit(): void {
  }
  /**
     * Logs in the user by sending the user data to the backend.
     * On success, stores user data and token in local storage, closes the dialog, shows a success message, and navigates to the movies page.
     * On failure, shows an error message.
     */


  loginUser(): void {
    this.FetchApiDataService.userLogin(this.userData).subscribe({
      next: (result: any) => {
        // Logic for a successful user registration goes here! (To be implemented)
        this.dialogRef.close(); // This will close the modal on success!
        console.log(result);
        this.snackBar.open('User logged in successfully!', 'OK', {
          duration: 2000
        });
        localStorage.setItem('user', JSON.stringify(result.user));
        localStorage.setItem('token', result.token);
        // Navigate to the 'movies' route upon successful login
        this.router.navigate(['movies']);
      },
      error: (error: any) => {
        console.error(error);
        // Show a user-friendly message for unsuccessful login attempts
        this.snackBar.open('Login failed. Please check your credentials.', 'OK', {
          duration: 2000
        });
      }
    })

  }
};
