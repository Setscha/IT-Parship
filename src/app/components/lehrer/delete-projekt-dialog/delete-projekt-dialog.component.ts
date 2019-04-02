import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {DialogData} from '../../../DialogData';
import {EditProjektDialogComponent} from '../edit-projekt-dialog/edit-projekt-dialog.component';

@Component({
  selector: 'app-delete-projekt-dialog',
  templateUrl: './delete-projekt-dialog.component.html',
  styleUrls: ['./delete-projekt-dialog.component.scss']
})
export class DeleteProjektDialogComponent implements OnInit {

  name = this.data.name;

  constructor(
    public dialogRef: MatDialogRef<EditProjektDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  delete() {
    // Save new Title or Description
    this.dialogRef.close({delete: true});
  }

  ngOnInit() {
  }

}
