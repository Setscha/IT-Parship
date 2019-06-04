import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatDialog, MatSnackBar} from '@angular/material';
import {EditProjektDialogComponent} from '../edit-projekt-dialog/edit-projekt-dialog.component';
import {DeleteProjektDialogComponent} from '../delete-projekt-dialog/delete-projekt-dialog.component';
import {Projekt} from "../../../models/projekt";
import {RestService} from "../../../services/rest.service";
import {Anforderung} from "../../../models/anforderung";

@Component({
  selector: 'app-lehrer-projekt',
  templateUrl: './lehrer-projekt.component.html',
  styleUrls: ['./lehrer-projekt.component.scss']
})
export class LehrerProjektComponent implements OnInit {

  @Input()
  projekt: Projekt;

  @Input()
  kompetenzPool: any;

  @Output()
  editProjektOutput = new EventEmitter<any>();

  @Output()
  deleteProjektOutput = new EventEmitter<any>();

  nAnforderungen: number;

  /**
   * Da muss man von der Datenbank alle Kompetenzen eineballern
   * NOCHT NICHT !!! kompetenzPool wird in Oninit Methode gefiltert, dass nur Kompetenzen im Anforderung-Select ausgwählt werden können, die noch keine Anforderung sind
   **/

  /* kompetenzPool = [
    new Kompetenz('Programmieren'),
    new Kompetenz('Audio'),
    new Kompetenz('Raspberry'),
    new Kompetenz('Video')
  ];*/

  editProjekt = () => {
    this.openDialog();
  }

  deleteProjekt = () => {
    const dialogRefDelete = this.dialog.open(DeleteProjektDialogComponent, {
      data: {
        name: this.projekt.name,
        description: this.projekt.beschreibung,
        maxSchueler: this.projekt.maxSchueler
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


    this.projekt.anforderungen.push(new Anforderung({}));
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
        maxSchueler: this.projekt.maxSchueler
      },
      width: '40%'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      if (typeof result !== 'undefined') {
        this.projekt.name = result.name;
        this.projekt.beschreibung = result.beschreibung;
        this.projekt.maxSchueler = result.maxSchueler;
        this.rest.speichern(this.projekt).subscribe(() => {
          this.ngOnInit();
        });
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

    /*this.kompetenzPool = this.rest.seiteLaden(
      Kompetenz,
      0,
      undefined,
      undefined
    );*/

  }

}

