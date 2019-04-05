import { Component, OnInit } from '@angular/core';

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
        5),
      new Projekt(
          'SmartFeedback',
          'Das ist die tolle Deskription von SmartFeedback: Dem zweit Besten Pojekt der 4BI',
          5),
      new Projekt(
          'Kekoklicker',
          'Das schlechteste Projekt von allen',
          5)
  ];

  constructor() { }

  ngOnInit() {
  }

}

class Projekt {
  public title: string;
  public description: string;
  public students: number;

  constructor(title, descr, students) {
    this.title = title;
    this.description = descr;
    this.students = students;
  }

}
