export class Seite {

   constructor(konstruktor, data) {

    // Daten den Properties zuweisen
    Object.assign(this, data);

    // Anonyme Objekte in Entities umwandeln
    this['entities'] = data[konstruktor.path]
      .map(obj => new konstruktor(obj));

    // Unerwünschte Properties entfernen
    delete this['_embedded'];
    delete this[konstruktor.path];

    // Hilfsvariable erzeugen
    this['vorige'] = this['page']['number'] - 1;
    this['naechste']= this['page']['number'] + 1;
    this['erste'] = 0;
    this['letzte'] = this['page']['totalPages']-1;

    this['istErste'] = this['page']['number'] <= this['erste'];
    this['istLetzte'] = this['page']['number'] >= this['letzte'];

    // Properties schreibschützen
    //Object.keys(properties).forEach(k => Object.defineProperty(this, k, {writable: false}));
  }

}
