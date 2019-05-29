import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-main-nav-lehrer',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent {

  user;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(['(max-width: 800px)'])
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver,
              private auth: AuthService) {}

  ngOnInit() {
    this.user = this.auth.getUser();
  }

  logout() {
    this.auth.logout().subscribe(response => {
      if(response){
        window.location.href = "/";
      }
    });
  }

}
