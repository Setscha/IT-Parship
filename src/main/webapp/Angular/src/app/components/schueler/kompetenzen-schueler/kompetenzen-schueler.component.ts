import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-kompetenzen-schueler',
  templateUrl: './kompetenzen-schueler.component.html',
  styleUrls: ['./kompetenzen-schueler.component.scss']
})
export class KompetenzenSchuelerComponent implements OnInit {

  qualifikationen = [
      new Qualifikation(1, 'Audio', 10),
      new Qualifikation(2, 'Vidio', 8),
      new Qualifikation(3, 'Fotoio', 4),

  ];

  constructor() { }

  ngOnInit() {
  }

}

class Qualifikation {
  id: number;
  kompetenz: string;
  ausmass: number;

  constructor(id: number, kompetenz: string, ausmass: number) {
    this.id = id;
    this.kompetenz = kompetenz;
    this.ausmass = ausmass;
  }
}
