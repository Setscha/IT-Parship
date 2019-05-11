import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatDialog, MatSnackBar} from '@angular/material';
import {EditProjektDialogComponent} from '../edit-projekt-dialog/edit-projekt-dialog.component';
import {DeleteProjektDialogComponent} from '../delete-projekt-dialog/delete-projekt-dialog.component';
import {Projekt} from "../../../models/projekt";
import {RestService} from "../../../services/rest.service";

@Component({
  selector: 'app-lehrer-projekt',
  templateUrl: './lehrer-projekt.component.html',
  styleUrls: ['./lehrer-projekt.component.scss']
})
export class LehrerProjektComponent implements OnInit {

  @Input()
  projekt: Projekt;

  @Output()
  editProjektOutput = new EventEmitter<any>();

  @Output()
  deleteProjektOutput = new EventEmitter<any>();

  nAnforderungen: number;

  /**
   * Da muss man von der Datenbank alle Kompetenzen eineballern
   * NOCHT NICHT !!! kompetenzPool wird in Oninit Methode gefiltert, dass nur Kompetenzen im Anforderung-Select ausgwählt werden können, die noch keine Anforderung sind
   **/

   kompetenzPool = [
    new Kompetenz('Programmieren'),
    new Kompetenz('Audio'),
    new Kompetenz('Raspberry'),
    new Kompetenz('Video')
  ];

  editProjekt = () => {
    this.openDialog();
  }

  deleteProjekt = () => {
    const dialogRefDelete = this.dialog.open(DeleteProjektDialogComponent, {
      data: {
        name: this.projekt.name,
        description: this.projekt.beschreibung,
        maxSchueler: this.projekt.max_schueler
      },
      autoFocus: false
    });

    dialogRefDelete.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      if (typeof result !== 'undefined') {
        if (result.delete === true) {
          this.openSnackBar('Projekt gelöscht!');
          this.deleteProjektOutput.emit({projekt: this.projekt});
        }
      }
    });
  }

  addAnforderung = () => {
    /*if (this.nAnforderungen === 0) {
      this.projekt.anforderungen.push(new Anforderung(0, '', null, false));
      return;
    }
    if (this.projekt.anforderungen[this.nAnforderungen - 1].name !== '') {
      this.projekt.anforderungen.push(new Anforderung(this.projekt.anforderungen[this.nAnforderungen - 1].id + 1, '', null, false));
      console.log(this.projekt.anforderungen[this.nAnforderungen - 1]);
    }*/
  }

  changeAnforderung = (a) => {
    // Anforderungen können von der Anforderungs Komponente nur geändert werden weil sie in dieser Komponente geadded werden
    // Da muss jetzt die Anforderung in der Datenbank geändert werden, dann bleibt alles gespeichert weils be jedem reload neu aus DB ausgelesen wird
    /*
    console.log(a.id);

    for (let i = 0; i < this.nAnforderungen - 1; i++) {
      if (this.projekt.anforderungen[i].id === a.id) {
        this.projekt.anforderungen[i] = new Anforderung(a.id, a.name, a.prio, a.isDisabled);
      }
    }
    */
  };

  deleteAnforderung = (a) => {
    console.log(a.anforderung);
    this.rest.loeschen(a.anforderung).subscribe(() => {
      //this.ngOnInit();
    });

    /*
    this.projekt.anforderungen = this.projekt.anforderungen.filter(x => x.id !== a.id);
    if (this.nAnforderungen === 0) {
      this.addAnforderung();
    }*/
  };

  constructor(private snackBar: MatSnackBar, public dialog: MatDialog, private rest: RestService) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(EditProjektDialogComponent, {
      data: {
        name: this.projekt.name,
        description: this.projekt.beschreibung,
        maxSchueler: this.projekt.max_schueler
      },
      width: '40%'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      if (typeof result !== 'undefined') {
        if (this.projekt.name !== result.name || this.projekt.beschreibung !== result.description || this.projekt.max_schueler !== result.maxSchueler) {
          this.openSnackBar('Projekt aktualisiert!');
          this.projekt.name = result.name;
          this.projekt.beschreibung = result.description;
          this.projekt.max_schueler = result.maxSchueler;
          this.editProjektOutput.emit({projekt: this.projekt});
        }
      }
    });
  }

  openSnackBar(message) {
    this.snackBar.open(message, 'OK', {
      duration: 2000,
    });
  }

  ngOnInit() {

    this.nAnforderungen = this.projekt.anforderungen ? this.projekt.anforderungen.length : 0;

    if (this.nAnforderungen === 0) {
      this.addAnforderung();
    }

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

class Kompetenz {
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}
