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
        let quali = new Qualifikation(k);
        Object.assign(quali,
              {
                ausmass: 0,
                person: this.user._links.person.href.replace(/\{.*\}$/, ""),
                kompetenz: k._links.self.href.replace(/\{.*\}$/, "")
              });
        delete quali._links;
        delete quali.etag;
        return quali;
      });
      if (this.user.qualifikationen) {
        this.user.qualifikationen = this.user.qualifikationen.map(q => {
          Object.assign(q,
                {
                  person: {href: this.user._links.person.href.replace(/\{.*\}$/, "")},
                  kompetenz: {href: q._links.kompetenz.href.replace(/\{.*\}$/, "")}
                });
          return new Qualifikation(q);
        });
        this.qualifikationen = this.mergeWithQualifikationen(this.qualifikationen, this.user.qualifikationen);
      }
      // console.log(this.qualifikationen);
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
      this.rest.speichern(qualifikation).subscribe();
    });
  }

}
