import { Component, OnInit } from '@angular/core';
import {RestService} from "../../../services/rest.service";

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.scss']
})
export class MatchComponent implements OnInit {

  constructor(private rest: RestService) { }

  ngOnInit() {
  }

  match() {
    this.rest.match().subscribe(d => {
      console.log(d);
    });
  }

}
