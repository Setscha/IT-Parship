import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {RestService} from "../../../services/rest.service";
import {Qualifikation} from "../../../models/qualifikation";

@Component({
  selector: 'app-kompetenzen-schueler',
  templateUrl: './kompetenzen-schueler.component.html',
  styleUrls: ['./kompetenzen-schueler.component.scss']
})
export class KompetenzenSchuelerComponent implements OnInit {

  user;
  qualifikationen;

  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.user = this.auth.getUser();
    this.qualifikationen = this.user.qualifikationen.map(q => new Qualifikation(q));
  }

}
