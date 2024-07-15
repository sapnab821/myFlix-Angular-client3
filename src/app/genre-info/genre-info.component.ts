import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-genre-info',
  templateUrl: './genre-info.component.html',
  styleUrls: ['./genre-info.component.scss']
})

  /**
   * @description Creates an instance of GenreInfoComponent.
   * @param dialogRef - Angular Material dialog reference.
   * @param data - Data injected into the dialog.
   *               Contains genre's name and description.
   */

  
export class GenreInfoComponent {
  constructor(
    public dialogRef: MatDialogRef<GenreInfoComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      Name: string;
      Description: string;
    }
  ) { }

}