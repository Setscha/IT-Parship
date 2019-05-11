import { Component, OnInit } from '@angular/core';
import {RestService} from "../../../services/rest.service";
import {Kompetenz} from "../../../models/kompetenz";
import {Observable} from "rxjs/index";

@Component({
  selector: 'app-kompetenzen',
  templateUrl: './kompetenzen.component.html',
  styleUrls: ['./kompetenzen.component.scss']
})
export class KompetenzenComponent implements OnInit {

  kompetenzen: Observable<any>;
  kompetenzName: string = '';

  constructor(private rest: RestService) { }

  ngOnInit() {
    this.kompetenzen = this.rest.seiteLaden(Kompetenz, 0, undefined, undefined);
  }

  addKompetenz() {
    this.rest.speichern(new Kompetenz({beschreibung: this.kompetenzName})).subscribe(() => {
     this.ngOnInit();
     this.kompetenzName = '';
    });
  }

  deleteKompetenz(kompetenz) {
    this.rest.loeschen(kompetenz).subscribe(() => {
      this.ngOnInit();
    });
  }

  editKompetenz(kompetenz) {
    kompetenz.beschreibung = 'Test';
    this.rest.speichern(kompetenz).subscribe(() => {
      this.ngOnInit();
    });
  }

}
