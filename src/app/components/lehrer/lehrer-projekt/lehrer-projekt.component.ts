import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {forEach} from '@angular/router/src/utils/collection';

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

  @Output()
  editDescriptionOutput = new EventEmitter<any>();

  desciptionDisabled: boolean = true;

  /**
   * Da muss man von der Datenbank alle Kompetenzen eineballern
   * NOCHT NICHT !!! kompetenzPool wird in Oninit Methode gefiltert, dass nur Kompetenzen im Anforderung-Select ausgwählt werden können, die noch keine Anforderung sind
   **/

   kompetenzPool = [
    new Kompetenz('Programmieren'),
    new Kompetenz('Schneiden'),
    new Kompetenz('Filmen'),
    new Kompetenz('Fotografieren'),
    new Kompetenz('Audio'),
    new Kompetenz('Schneuzen'),
    new Kompetenz('Webdev')
  ];

  editDescription = () => {
    if (this.desciptionDisabled) {
      this.desciptionDisabled = false;
    } else {
      this.desciptionDisabled = true;
    }
  }

  saveDescription = () => {
    this.editDescription();
    console.log(this.description);
    this.editDescriptionOutput.emit({name: this.name, description: this.description});
  }

  addAnforderung = () => {
    if (this.anforderungen.length === 0) {
      this.anforderungen.push(new Anforderung(0, '', 0));
      return;
    }
    if (this.anforderungen[this.anforderungen.length - 1].name !== '') {
      this.anforderungen.push(new Anforderung(this.anforderungen.length, '', 0));
      console.log(this.anforderungen[this.anforderungen.length - 1]);
    }
  }

  changeAnforderung = (a) => {
    // Anforderungen können von der Anforderungs Komponente nur geändert werden weil sie in dieser Komponente geadded werden
    // Da muss jetzt die Anforderung in der Datenbank geändert werden, dann bleibt alles gespeichert weils be jedem reload neu aus DB ausgelesen wird
    console.log(a.id);
    this.anforderungen[a.id] = new Anforderung(a.id, a.name, a.prio);
  }

  deleteAnforderung = (a) => {
    this.anforderungen = this.anforderungen.filter(x => x.id !== a.id);
  }

  constructor() { }

  ngOnInit() {

    /*this.kompetenzPool.forEach(k => {
      for (let i = 0; i < this.anforderungen.length - 1; i++) {
        if (k.name === this.anforderungen[i].name) {
          this.kompetenzPool = this.kompetenzPool.filter(t => t !== k);
        }
      }
    });*/

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

class Kompetenz {
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}

