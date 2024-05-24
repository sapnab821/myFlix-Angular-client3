// src/app/movie-card/movie-card.component.ts
import { Component, OnInit } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service'
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { MovieSynopsisComponent } from '../movie-synopsis/movie-synopsis.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
  
})




export class MovieCardComponent {
  movies: any[] = [];
  constructor(public fetchApiData: UserRegistrationService,
    public dialog: MatDialog,
   
  
      private router: Router
   
  ) { }

ngOnInit(): void {
  this.getMovies();
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
        Description: description
      },
      width: '500px',
    });
  }
}

