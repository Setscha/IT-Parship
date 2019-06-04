import { Component } from '@angular/core';
import {AuthService} from "./services/auth.service";
import {RestService} from "./services/rest.service";
import {Person} from "./models/person";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'IT-Parship';
  istAngemeldet = false;

  constructor(private auth: AuthService, private rest: RestService) {

  }

  ngOnInit() {
    this.auth.istAngemeldet().subscribe(istAngemeldet => {
      this.istAngemeldet = istAngemeldet;
      console.log(istAngemeldet);
      if(istAngemeldet){
        this.rest.laden(Person, "http://localhost:8081/api/me", undefined);
      }
    });
  }

}
