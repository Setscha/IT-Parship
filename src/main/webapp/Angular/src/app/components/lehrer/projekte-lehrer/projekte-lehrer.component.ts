import {Component, OnInit} from '@angular/core';
import {EditProjektDialogComponent} from '../edit-projekt-dialog/edit-projekt-dialog.component';
import {MatDialog, MatSnackBar} from '@angular/material';
import {RestService} from "../../../services/rest.service";
import {Projekt} from "../../../models/projekt";

@Component({
  selector: 'app-projekte-lehrer',
  templateUrl: './projekte-lehrer.component.html',
  styleUrls: ['./projekte-lehrer.component.scss']
})
export class ProjekteLehrerComponent implements OnInit {

  projekte = [
   // new Projekt(1, 'IT-Parship', 'Das ist die tolle Deskription von IT-Parhsip: Dem Besten Pojekt der 4BI', 5, [new Anforderung(0, 'Programmieren', 1, true), new Anforderung(1, 'Filmen', 5, true), new Anforderung(2, 'Schneiden', 2, true)]),
   // new Projekt(2, 'SmartFeedback', 'Das ist die tolle Deskription von SmartFeedback: Dem zweit Besten Pojekt der 4BI', 6, [new Anforderung(0, 'Programmieren', 1, true), new Anforderung(1, 'Filmen', 5, true), new Anforderung(2, 'Schneiden', 2, true)])
  ];

  laden = true;

  editProjekt = (p) => {
    //console.log(p.projekt);
    this.rest.speichern(p.projekt).subscribe(() => {
      this.ngOnInit();
    });
  };

  deleteProjekt = (p) => {
    console.log(p.projekt);
    this.rest.loeschen(p.projekt).subscribe(() => {
      this.ngOnInit();
    });
  };

  addProjekt = () => {
    const dialogRef = this.dialog.open(EditProjektDialogComponent, {
      data: {
        action: 'erstellen'
      },
      width: '40%'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      if (typeof result !== 'undefined') {
        this.rest.speichern().subscribe(() => {
          this.ngOnInit();
        });
      } else {
        //this.projekte.splice(this.projekte.length - 1, 1);
      }
    });
  }

  constructor(private snackBar: MatSnackBar, public dialog: MatDialog, private rest: RestService) { }

  ngOnInit() {
    this.laden = true;
    this.projekte = this.rest.seiteLaden(
      Projekt,
      0,
      undefined,
      undefined
    );
  }

}

