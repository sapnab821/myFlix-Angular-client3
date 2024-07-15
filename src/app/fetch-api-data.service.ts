import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { tap, take } from 'rxjs';

/**
   * Base URL of the API.
   */

const apiUrl = `https://sbmovie-flix-81059d891de6.herokuapp.com/`;

/**
 * Injectable service for fetching data from the API.
 */

@Injectable({
  providedIn: 'root'
})


/**
   * Constructs a new FetchApiDataService with the HttpClient injected.
   * @param http - The injected HttpClient.
   */


export class UserRegistrationService {
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) { }


  /**
   * Registers a new user.
   * @param userDetails - The details of the user to be registered.
   * @returns An observable with the registration response.
   */

  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe
      (
        catchError(this.handleError)
      );
  }


  /**
   * Logs in a user.
   * @param userDetails - The user credentials.
   * @returns An observable with the login response.
   */


  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + `login?username=${userDetails.username}&password=${userDetails.password}`, userDetails)
      //return this.http.post(apiUrl + 'login', userDetails).pipe(
      .pipe(catchError(this.handleError)
      );
  }



  /**
   * Retrieves all movies.
   * @returns An observable with all movies.
   */

  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies', {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Extracts response data from HTTP response.
   * @param res - The HTTP response.
   * @returns Extracted response data.
   */

  private extractResponseData(res: Response | Object): any {
    const body = res;
    return body || {};
  }

  /**
  * Retrieves details of a specific movie.
  * @param Title - The title of the movie.
  * @returns An observable with the movie details.
  */

  getOneMovie(Title: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies' + Title, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Retrieves details of a specific director.
   * @param Name - The name of the director.
   * @returns An observable with the director details.
   */


  public getDirector(Name: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/director/' + Name, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Retrieves details of a specific genre.
   * @param genreName - The name of the genre.
   * @returns An observable with the genre details.
   */

  public getGenre(genreName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/genres/' + genreName, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Retrieves user details.
   * @returns An observable with the user details.
   */

  public getLocalUser(): any {
    const user = localStorage.getItem('user');
    if (user && this.isJsonString(user)) {
      return JSON.parse(user);
    } else {
      console.log('Invalid user data in local storage:', user);
      return null;
    }
  }

  /**
   * Creates function to parse .
   * @returns An JSON.parse(str).
   */

  private isJsonString(str: string): boolean {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }

  /**
   * Retrieves favorite movies of a user.
   * @param userId - The username of the user.
   * @returns An observable with the user's favorite movies.
   */

  getFavoriteMovies(userId: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'users/' + userId + 'FavoriteMovies', {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Adds a movie to a user's favorite movies.
   * @param movieId - The name of the movie to be added.
   * @param userId - The username of the user.
   * @returns An observable with the response after adding the movie to favorites.
   */

  addFavoriteMovie(userId: number, movieId: number): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.post(apiUrl + 'users/' + userId + '/movies/' + movieId, movieId, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
  * Deletes a movie from a user's favorite movies.
  * @param movieId - The name of the movie to be removed.
  * @param userId - The username of the user.
  * @returns An observable with the response after deleting the movie from favorites.
  */

  deleteFavoriteMovie(userId: string, movieId: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.delete(apiUrl + 'users/' + userId + '/movies/' + movieId, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Updates user details.
   * @param userDetails - The updated user object.
   * @returns An observable with the updated user details.
   */

  public editUserProfile(userDetails: any,): Observable<any> {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    console.log(userDetails);
    console.log(user);
    return this.http.put(apiUrl + 'users/' + user.Username, userDetails, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Deletes a user.
   * @param Username - the Username
   * @returns An observable with the response after deleting the user.
   */

  deleteUser(Username: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.delete(apiUrl + 'users/' + Username, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Handles HTTP errors.
   * @param error - The HTTP error response.
   * @returns An observable with an error message.
   */

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }

}    
