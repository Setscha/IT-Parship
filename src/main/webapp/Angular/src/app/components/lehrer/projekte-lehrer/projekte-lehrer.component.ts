import {Component, OnInit} from '@angular/core';
import {EditProjektDialogComponent} from '../edit-projekt-dialog/edit-projekt-dialog.component';
import {MatDialog, MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-projekte-lehrer',
  templateUrl: './projekte-lehrer.component.html',
  styleUrls: ['./projekte-lehrer.component.scss']
})
export class ProjekteLehrerComponent implements OnInit {

  projekte = [
    new Projekt(1, 'IT-Parship', 'Das ist die tolle Deskription von IT-Parhsip: Dem Besten Pojekt der 4BI', 5, [new Anforderung(0, 'Programmieren', 1, true), new Anforderung(1, 'Filmen', 5, true), new Anforderung(2, 'Schneiden', 2, true)]),
    new Projekt(2, 'SmartFeedback', 'Das ist die tolle Deskription von SmartFeedback: Dem zweit Besten Pojekt der 4BI', 6, [new Anforderung(0, 'Programmieren', 1, true), new Anforderung(1, 'Filmen', 5, true), new Anforderung(2, 'Schneiden', 2, true)])
  ];

  editProjekt = (p) => {
    this.projekte.forEach(p1 => {
      if (p1[0] === p.name) {
        p1[1] = p.description;
      }
    });
    console.log(this.projekte);
  }

  deleteProjekt = (p) => {
    this.projekte = this.projekte.filter(x => x.id !== p.id);
  }

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
        if (result.name !== undefined || result.description !== undefined || result.maxSchueler !== undefined) {
          if (this.projekte.length === 0) {
            this.projekte.push(new Projekt(0, result.name, result.description, result.maxSchueler, []));
          } else {
            this.projekte.push(new Projekt(this.projekte[this.projekte.length - 1].id + 1, result.name, result.description, result.maxSchueler, []));
          }
        }
      } else {
        //this.projekte.splice(this.projekte.length - 1, 1);
      }
    });
  }

  constructor(private snackBar: MatSnackBar, public dialog: MatDialog) { }

  ngOnInit() {
  }

}

class Anforderung {
  id: number;
  name: string;
  prio: number;
  isDisabled: boolean;

  constructor(id: number, name: string, prio: number, isDisabled: boolean) {
    this.id = id;
    this.name = name;
    this.prio = prio;
    this.isDisabled = isDisabled;
  }
}

class Projekt {
  id: number;
  name: string;
  beschreibung: string;
  maxSchueler: number;
  anforderungen: any;

  constructor(id: number, name: string, beschreibung: string, maxSchueler: number, anforderungen: any) {
    this.id = id;
    this.name = name;
    this.beschreibung = beschreibung;
    this.maxSchueler = maxSchueler;
    this.anforderungen = anforderungen;
  }
}
