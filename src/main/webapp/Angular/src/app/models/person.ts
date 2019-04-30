export class Person {

  path = "personen";
  username: string;
  displayName: string;
  projekt: string;
  qualifikationen: [];

  constructor(values: object) {
    this.username = values['username'];
    this.displayName = values['displayName'];
    this.projekt = values['projekt'];
    this.qualifikationen = values['qualifikationen'];
  }
}
