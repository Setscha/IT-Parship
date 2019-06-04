import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {DialogData} from '../../../DialogData';

@Component({
  selector: 'app-edit-projekt-dialog',
  templateUrl: './edit-projekt-dialog.component.html',
  styleUrls: ['./edit-projekt-dialog.component.scss']
})
export class EditProjektDialogComponent implements OnInit {

  name = this.data.name;
  description = this.data.description;
  maxSchueler = this.data.maxSchueler;

  constructor(
    public dialogRef: MatDialogRef<EditProjektDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  ngOnInit() {
  }

  save() {
    // Save new Title or Description
    if (this.name.length > 3 && this.description.length > 3 && this.maxSchueler > 1) {
      this.dialogRef.close({name: this.name, beschreibung: this.description, maxSchueler: this.maxSchueler});
    }
  }

}
