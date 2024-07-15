import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


/**
 *  displaying director information in a dialog.
 */
@Component({
  selector: 'app-director-info',
  templateUrl: './director-info.component.html',
  styleUrl: './director-info.component.scss'
})
export class DirectorInfoComponent implements OnInit {
  /**
   * Creates an instance of DirectorInfoComponent.
   * @param dialogRef - Angular Material dialog reference.
   * @param data - Data injected into the dialog.
   *               Contains director's name, bio, birth date, and death date.
   */

  constructor(
    public dialogRef: MatDialogRef<DirectorInfoComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      Name: string;
      Bio: string;
      Birthday: number;
      Death: string;
    }
  ) { }

  /**
    * Angular lifecycle hook called after component initialization.
    */
  ngOnInit(): void {

  }

}
