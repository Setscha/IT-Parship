import {Component, Input, OnInit} from '@angular/core';

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
      [new Anforderung('Programmieren', 1), new Anforderung('Filmen', 5), new Anforderung('Schneiden', 2)]
    ],
    [
      'SmartFeedback',
      'Das ist die tolle Deskription von SmartFeedback: Dem zweit Besten Pojekt der 4BI',
      5,
      [new Anforderung('Programmieren', 1), new Anforderung('Filmen', 5), new Anforderung('Schneiden', 2)]
    ]
  ];

  constructor() { }

  ngOnInit() {
  }

}

class Anforderung {
  name: string;
  prio: number;

  constructor(name: string, prio: number) {
    this.name = name;
    this.prio = prio;
  }
}
