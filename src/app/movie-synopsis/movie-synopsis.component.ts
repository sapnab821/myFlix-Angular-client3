import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

/**
 * Component for displaying movie synopsis in a dialog.
 */

@Component({
  selector: 'app-movie-synopsis',
  templateUrl: './movie-synopsis.component.html',
  styleUrl: './movie-synopsis.component.scss'
})
export class MovieSynopsisComponent implements OnInit {

    /**
   * Creates an instance of MovieSynopsisComponent.
   * @param dialogRef - Angular Material dialog reference.
   * @param data - Data injected into the dialog.
   *               Contains movie title and description.
   */
  
  constructor(
    public dialog: MatDialogRef<MovieSynopsisComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      Title: string;
      Description: string;
    }
  ) { }
 /**
   * Lifecycle hook that is called after data-bound properties of a directive are initialized.
   */
  
  ngOnInit(): void {
    
  }
  

}
