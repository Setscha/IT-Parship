export class Qualifikation {

  static path = "qualifikationen";
  ausmass: number;
  beschreibung: string;
  _links: [];
  etag: any;

  constructor(values: object) {
    this.beschreibung = values['beschreibung'];
    this.ausmass = values['ausmass'];
    this._links = values['_links'];
    this.etag = values['etag'];
  }
}
