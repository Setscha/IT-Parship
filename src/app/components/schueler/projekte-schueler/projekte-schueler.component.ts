import { Component, OnInit } from '@angular/core';
import {Anforderung} from '../../../anforderung';

@Component({
  selector: 'app-projekte-schueler',
  templateUrl: './projekte-schueler.component.html',
  styleUrls: ['./projekte-schueler.component.scss']
})
export class ProjekteSchuelerComponent implements OnInit {

  projekte = [
      new Projekt(
        'IT-Parship',
        'Das ist die tolle Deskription von IT-Parship: Dem besten Pojekt der 4BI',
        5,
        [
          new Anforderung(0, 'Programmieren', 1),
          new Anforderung(1, 'Filmen', 5),
          new Anforderung(2, 'Schneiden', 2)]),
      new Projekt(
          'SmartFeedback',
          'as ist die tolle Deskription von SmartFeedback: Dem zweit Besten Pojekt der 4BI',
          5,
          [
            new Anforderung(0, 'Programmieren', 1),
            new Anforderung(1, 'Filmen', 5),
            new Anforderung(2, 'Schneiden', 2)])
  ];

  constructor() { }

  ngOnInit() {
  }

}

class Projekt {
  public title: string;
  public description: string;
  public students: number;
  public anforderungen: Anforderung[];

  constructor(title, descr, students, anforderungen) {
    this.title = title;
    this.description = descr;
    this.students = students;
    this.anforderungen = anforderungen;
  }

}
