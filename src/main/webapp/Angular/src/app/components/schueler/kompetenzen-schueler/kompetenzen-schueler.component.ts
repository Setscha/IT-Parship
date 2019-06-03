import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {RestService} from "../../../services/rest.service";
import {Qualifikation} from "../../../models/qualifikation";
import {Kompetenz} from "../../../models/kompetenz";

@Component({
  selector: 'app-kompetenzen-schueler',
  templateUrl: './kompetenzen-schueler.component.html',
  styleUrls: ['./kompetenzen-schueler.component.scss']
})
export class KompetenzenSchuelerComponent implements OnInit {

  user;
  qualifikationen;

  constructor(private auth: AuthService,
              private rest: RestService) {
  }

  ngOnInit() {
    this.user = this.auth.getUser();

    this.rest.seiteLaden(Kompetenz, 0, undefined, undefined).subscribe(data => {
      this.qualifikationen = data['entities'].map(k => {
        Object.assign(k._links,
              {
                person: {href: this.user._links.person.href},
                kompetenz: {href: k._links.self.href}
              });
        return new Qualifikation(k);
      });
      if (this.user.qualifikationen) {
        this.user.qualifikationen = this.user.qualifikationen.map(q => {
          Object.assign(q._links,
                {
                  person: {href: this.user._links.person.href},
                  kompetenz: {href: q._links.kompetenz.href}
                });
          return new Qualifikation(q);
        });
        this.qualifikationen = this.mergeWithQualifikationen(this.qualifikationen, this.user.qualifikationen);
        console.log(this.user.qualifikationen);
      }
    });
  }

  mergeWithQualifikationen(kompetenzen, qualifikationen) {
    let ergebnis: Qualifikation[] = [];
    for (let kompetenz of kompetenzen) {
      let found = false;
      for (let qualifikation of qualifikationen) {
        if (qualifikation.beschreibung === kompetenz.beschreibung) {
          ergebnis.push(qualifikation);
          found = true;
          break;
        }
      }
      if (!found) ergebnis.push(kompetenz)
    }
    return ergebnis;
  }

  save() {
    this.qualifikationen.forEach(qualifikation => {
      console.log(qualifikation);
      this.rest.speichern(qualifikation).subscribe(() => {
        console.log("Done!");
      });
    });
  }

}
