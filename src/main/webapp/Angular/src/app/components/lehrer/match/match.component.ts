import { Component, OnInit } from '@angular/core';
import {RestService} from "../../../services/rest.service";
import {Projekt} from "../../../models/projekt";

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.scss']
})
export class MatchComponent implements OnInit {

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

  match() {
    this.rest.match().subscribe(d => {
      if(!d) return;
      this.projekte = this.rest.seiteLaden(
        Projekt,
        0,
        undefined,
        undefined
      );
    });
  }

}
