import {Component, Input, OnInit} from '@angular/core';
import {Qualifikation} from "../../../models/qualifikation";

@Component({
  selector: 'app-qualifikation',
  templateUrl: './qualifikation.component.html',
  styleUrls: ['./qualifikation.component.scss']
})
export class QualifikationComponent implements OnInit {

  @Input()
  qualifikation: Qualifikation;

  constructor() { }

  ngOnInit() {
  }

}
