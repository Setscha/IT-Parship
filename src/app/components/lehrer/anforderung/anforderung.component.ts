import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-anforderung',
  templateUrl: './anforderung.component.html',
  styleUrls: ['./anforderung.component.scss']
})
export class AnforderungComponent implements OnInit {

  @Input()
  anforderung: any;

  @Input()
  kompetenzPool: any;

  @Output()
  changeAnforderungOutput = new EventEmitter<any>();

  @Output()
  deleteAnforderungOutput = new EventEmitter<any>();


  changeAnforderung = () => {
    if (this.anforderung.isDisabled) {
      this.anforderung.isDisabled = false;
    } else {
      this.anforderung.isDisabled = true;
      this.openSnackBarChange();
    }
  }

  saveAnforderung = () => {
    if (this.anforderung.name !== '' && this.anforderung.prio !== null) {
      this.changeAnforderung();
      console.log({id: this.anforderung.id, name: this.anforderung.name, prio: this.anforderung.prio});
      this.changeAnforderungOutput.emit( {id: this.anforderung.id, name: this.anforderung.name, prio: this.anforderung.prio, isDisabled: true} );
    } else {
      this.openSnackBarError();
    }

  }

  deleteAnforderung = () => {
    this.deleteAnforderungOutput.emit( {id: this.anforderung.id, name: this.anforderung.name, prio: this.anforderung.prio} );
    this.openSnackBarDelete();
  }

  constructor(private snackBar: MatSnackBar) { }

  openSnackBarChange() {
    this.snackBar.open('Anforderung wurde gespeichert!', 'OK', {
      duration: 2000,
    });
  }
  openSnackBarError() {
    this.snackBar.open('Bitte Wählen Sie eine Kompetenz und eine Priorität aus!', 'OK', {
      duration: 4000,
    });
  }
  openSnackBarDelete() {
    this.snackBar.open('Anforderung wurde gelöscht!', 'OK', {
      duration: 2000,
    });
  }

  ngOnInit() {

    console.log(this.anforderung.isDisabled);

    if (this.anforderung.name === '') {
      this.anforderung.isDisabled = false;
    }
  }
}
