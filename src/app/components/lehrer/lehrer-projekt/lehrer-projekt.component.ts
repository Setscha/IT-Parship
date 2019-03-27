import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-lehrer-projekt',
  templateUrl: './lehrer-projekt.component.html',
  styleUrls: ['./lehrer-projekt.component.scss']
})
export class LehrerProjektComponent implements OnInit {

  @Input()
  name: string;

  @Input()
  description: string;

  @Input()
  anforderungen: any;

  @Input()
  maxSchueler: number;

  kompetenzPool = [
    new Kompetenz('Programmieren'),
    new Kompetenz('Schneiden'),
    new Kompetenz('Filmen'),
    new Kompetenz('Fotografieren'),
    new Kompetenz('Audio'),
    new Kompetenz('Schneuzen'),
    new Kompetenz('Webdev')
  ];

  addAnforderung = () => {
    console.log(this.anforderungen[this.anforderungen.length - 1].name);
    if (this.anforderungen[this.anforderungen.length - 1].name !== '') {
      this.anforderungen.push(new Anforderung('', 0));
    }
  }

  changeAnforderung = (name) => {
    this.kompetenzPool.forEach(k => {
      if (k.name === name) {
        this.kompetenzPool.splice();
      }
    });
  }

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

class Kompetenz {
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}

