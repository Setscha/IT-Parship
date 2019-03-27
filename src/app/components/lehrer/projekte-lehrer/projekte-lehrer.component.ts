import {Component, Input, OnInit} from '@angular/core';
import {forEach} from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-projekte-lehrer',
  templateUrl: './projekte-lehrer.component.html',
  styleUrls: ['./projekte-lehrer.component.scss']
})
export class ProjekteLehrerComponent implements OnInit {

  projekte = [
    [
      'IT-Parship',
      'Das ist die tolle Deskription von IT-Parhsip: Dem Besten Pojekt der 4BI',
      5,
      [new Anforderung(0, 'Programmieren', 1), new Anforderung(1, 'Filmen', 5), new Anforderung(2, 'Schneiden', 2)]
    ],
    [
      'SmartFeedback',
      'Das ist die tolle Deskription von SmartFeedback: Dem zweit Besten Pojekt der 4BI',
      5,
      [new Anforderung(0, 'Programmieren', 1), new Anforderung(1, 'Filmen', 5), new Anforderung(2, 'Schneiden', 2)]
    ]
  ];

  editDescription = (p) => {
    this.projekte.forEach(p1 => {
      if (p1[0] === p.name) {
        p1[1] = p.description;
      }
    });
    console.log(this.projekte);
  }

  constructor() { }

  ngOnInit() {
  }

}

class Anforderung {
  id: number;
  name: string;
  prio: number;

  constructor(id: number, name: string, prio: number) {
    this.id = id;
    this.name = name;
    this.prio = prio;
  }
}
