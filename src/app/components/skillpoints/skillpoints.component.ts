import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-skillpoints',
  templateUrl: './skillpoints.component.html',
  styleUrls: ['./skillpoints.component.scss']
})
export class SkillpointsComponent implements OnInit {



  kompetenzen = ["ich", "du", "lel"];

  constructor() { }

  ngOnInit() {
  }

}
