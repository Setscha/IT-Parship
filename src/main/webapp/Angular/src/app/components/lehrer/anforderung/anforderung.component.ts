import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatSnackBar} from '@angular/material';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {RestService} from "../../../services/rest.service";
import {Anforderung} from "../../../models/anforderung";
import {forEach} from "../../../../../node_modules/@angular/router/src/utils/collection";

@Component({
  selector: 'app-anforderung',
  templateUrl: './anforderung.component.html',
  styleUrls: ['./anforderung.component.scss']
})
export class AnforderungComponent implements OnInit {

  @Input()
  anforderung: any;

  @Input()
  projektLink: any;

  @Input()
  kompetenzPool: any;

  @Output()
  changeAnforderungOutput = new EventEmitter<any>();

  @Output()
  deleteAnforderungOutput = new EventEmitter<any>();

  anforderungForm: FormGroup;

  changeAnforderung = () => {
    this.anforderung.isEnabled = !this.anforderung.isEnabled;
  }

  saveAnforderung = () => {
    if (this.anforderung.kompetenz.beschreibung !== '' && this.anforderung.ausmass !== null && this.anforderung.ausmass > 0) {
      //console.log({id: this.anforderung.id, name: this.anforderung.name, prio: this.anforderung.prio});
      this.anforderung.isEnabled = false;
      /*this.changeAnforderungOutput.emit({
        id: this.anforderung.id,
        name: this.anforderung.name,
        prio: this.anforderung.prio,
        isEnabled: true
      });*/

      let anf = new Anforderung(this.anforderung);

      this.kompetenzPool.subscribe(res=> {
        res.entities.forEach(k => {
          //console.log(k);
          if(k.beschreibung === this.anforderung.kompetenz.beschreibung){
            anf.kompetenz = k._links.self.href;
            console.log("gefunden " + anf.kompetenz);
            console.log(anf);

            this.rest.speichern(anf).subscribe(() => {
              console.log("Das WILL IHC SEHEN ");
              console.log(this.anforderung);
              this.openSnackBar('Anforderung wurde gespeichert!', 'OK', 2000);

            });
          }
        })
      });


      //this.anforderung._links.projekt = this.projektLink;
      console.log("!!!!!!!!!!!!!!!!");
      console.log(anf.kompetenz);

    }
  }

  //TODO: anforderungen properties fixen, irgendwas mit id falls die nicht gibt

  deleteAnforderung = () => {
    //this.deleteAnforderungOutput.emit({anforderung: this.anforderung});

    console.log(this.anforderung._links);
    this.rest.loeschen(this.anforderung).subscribe(() => {
      this.ngOnInit();
    });
  }

  constructor(private snackBar: MatSnackBar, private rest: RestService) { }

  openSnackBar(message: string, action: string, duration: number) {
    this.snackBar.open(message, action, {
      duration: duration
    });
  }

  ngOnInit() {

    if(!this.anforderung){
      this.anforderung = {kompetenz: {beschreibung: ''}}
    }
    if(this.anforderung && !this.anforderung.kompetenz){
      this.anforderung.kompetenz = {beschreibung: ''};
    }

    this.anforderungForm = new FormGroup({
      'prior': new FormControl(this.anforderung.prio, [
        Validators.required,
      ])
    });
  }
}
