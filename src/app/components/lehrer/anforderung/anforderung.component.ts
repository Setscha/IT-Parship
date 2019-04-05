import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatSnackBar} from '@angular/material';
import {FormControl, FormGroup, Validators} from '@angular/forms';

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

  anforderungForm: FormGroup;

  changeAnforderung = () => {
    if (this.anforderung.isDisabled) {
      this.anforderung.isDisabled = false;
    }
  }

  saveAnforderung = () => {
    if (this.anforderung.name !== '' && this.anforderung.prio !== null && this.anforderung.prio > 0) {
      this.changeAnforderung();
      console.log({id: this.anforderung.id, name: this.anforderung.name, prio: this.anforderung.prio});
      this.anforderung.isDisabled = true;
      this.changeAnforderungOutput.emit({
        id: this.anforderung.id,
        name: this.anforderung.name,
        prio: this.anforderung.prio,
        isDisabled: true
      });
      this.openSnackBar('Anforderung wurde gespeichert!', 'OK', 2000);
    }
  }

  deleteAnforderung = () => {
    if (this.anforderung.name !== '') {
      this.deleteAnforderungOutput.emit({id: this.anforderung.id, name: this.anforderung.name, prio: this.anforderung.prio});
      this.openSnackBar('Anforderung wurde gelöscht!', 'OK', 2000);
    }
  }

  constructor(private snackBar: MatSnackBar) { }

  openSnackBar(message: string, action: string, duration: number) {
    this.snackBar.open(message, action, {
      duration: duration
    });
  }

  ngOnInit() {

    this.anforderungForm = new FormGroup({
      'prior': new FormControl(this.anforderung.prio, [
        Validators.required,
      ])
    });
  }
}
