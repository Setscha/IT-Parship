export class Projekt {

  path = "projekte";
  id: string;
  beschreibung: string;
  max_schueler: number;
  name: string;

  constructor(values: object) {
    this.id = values['id'];
    this.name = values['name'];
    this.beschreibung = values['beschreibung'];
    this.max_schueler = values['max_schueler'];
  }
}
