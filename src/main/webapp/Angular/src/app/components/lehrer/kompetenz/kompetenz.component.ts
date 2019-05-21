import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {RestService} from "../../../services/rest.service";

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
    this.kompetenz.beschreibung = this.neueBeschreibung;
    this.rest.speichern(this.kompetenz).subscribe(() => {
      this.edited.emit(true);
    });
  }

  deleteKompetenz(kompetenz) {
    this.rest.loeschen(kompetenz).subscribe(() => {
      this.edited.emit(true);
    });
  }

}
