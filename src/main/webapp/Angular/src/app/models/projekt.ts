export class Projekt {

  static path = "projekte";
  beschreibung: string;
  max_schueler: number;
  name: string;
  anforderungen: [];
  _links: [];
  etag: any;

  constructor(values: object) {
    this.name = values['name'];
    this.beschreibung = values['beschreibung'];
    this.max_schueler = values['maxSchueler'];
    this.anforderungen = values['anforderungen'];
    this._links = values['_links'];
    this.etag = values['etag'];
  }
}
