export class Kompetenz {

  static path = "kompetenzen";
  beschreibung: string;
  inUse: boolean;
  _links: [];
  etag: any;

  constructor(values: object) {
    this.beschreibung = values['beschreibung'];
    this.inUse = !!values['anforderungen'] || !!values['qualifikationen'];
    this._links = values['_links'];
    this.etag = values['etag'];
  }
}
