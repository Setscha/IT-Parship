import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-main-nav-schueler',
  templateUrl: './main-nav-schueler.component.html',
  styleUrls: ['./main-nav-schueler.component.scss']
})
export class MainNavSchuelerComponent implements OnInit {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(['(max-width: 800px)'])
      .pipe(
          map(result => result.matches)
      );

  constructor(private breakpointObserver: BreakpointObserver) { }

  ngOnInit() {
  }

}
