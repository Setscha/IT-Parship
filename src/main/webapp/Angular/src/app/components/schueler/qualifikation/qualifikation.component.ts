import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-qualifikation',
  templateUrl: './qualifikation.component.html',
  styleUrls: ['./qualifikation.component.scss']
})
export class QualifikationComponent implements OnInit {

  @Input()
  qualifikation: any;

  constructor() { }

  ngOnInit() {
  }

}
