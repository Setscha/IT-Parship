import {Kompetenz} from "./kompetenz";

export class Anforderung {

  static path = "anforderungen";
  ausmass: number;
  kompetenz: Kompetenz;
  _links: [];
  etag: any;

  constructor(values: object) {
    this.ausmass = values['ausmass'];
    this.kompetenz = values['kompetenz'];
    this._links = values['_links'] || {};
    this.etag = values['etag'];
  }
}
