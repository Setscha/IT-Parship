import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {RestService} from "../../../services/rest.service";
import {Kompetenz} from "../../../models/kompetenz";

@Component({
  selector: 'app-kompetenz',
  templateUrl: './kompetenz.component.html',
  styleUrls: ['./kompetenz.component.scss']
})
export class KompetenzComponent implements OnInit {

  @Input()
  kompetenz: any;

  neueBeschreibung = "";

  @Output()
  edited = new EventEmitter<boolean>();

  constructor(private rest: RestService) { }

  ngOnInit() {
  }

  editKompetenz() {
    this.rest.laden(Kompetenz, this.kompetenz['_links']['self']['href'], undefined).subscribe(k => {
      k.beschreibung = this.neueBeschreibung;
      this.rest.speichern(k).subscribe(() => {
        this.edited.emit(true);
      });
    });

  }

  deleteKompetenz() {
    this.rest.laden(Kompetenz, this.kompetenz['_links']['self']['href'], undefined).subscribe(k => {
      this.rest.loeschen(k).subscribe(() => {
        this.edited.emit(true);
      });
    });
  }

}
