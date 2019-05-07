import { Component, OnInit } from '@angular/core';
import { RestService } from "../../../services/rest.service";
import { Projekt } from "../../../models/projekt";
import {map} from "rxjs/internal/operators";

@Component({
  selector: 'app-projekte-schueler',
  templateUrl: './projekte-schueler.component.html',
  styleUrls: ['./projekte-schueler.component.scss']
})
export class ProjekteSchuelerComponent implements OnInit {

  projekte;

  constructor(private rest: RestService) { }

  ngOnInit() {
    this.projekte = this.rest.seiteLaden(
      Projekt,
      0,
      undefined,
      undefined
    );
  }

  del(projekt) {
    this.rest.loeschen(projekt).subscribe(() => {
      this.ngOnInit();
    });
  }

}
