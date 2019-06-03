export class Qualifikation {

  static path = "qualifikationen";
  ausmass: number;
  beschreibung: string;
  person: string;
  kompetenz: string;
  _links: [];
  etag: any;

  constructor(values: object) {
    this.beschreibung = values['beschreibung'];
    this.ausmass = values['ausmass'];
    this._links = values['_links'];
    this.person = values['_links']['person']['href'].replace(/\{.*\}$/, "");
    this.kompetenz = values['_links']['kompetenz']['href'].replace(/\{.*\}$/, "");
    this.etag = values['etag'];
  }
}
