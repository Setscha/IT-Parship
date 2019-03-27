import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-anforderung',
  templateUrl: './anforderung.component.html',
  styleUrls: ['./anforderung.component.scss']
})
export class AnforderungComponent implements OnInit {

  @Input()
  name: string;

  @Input()
  prio: number;

  @Output()
  changeAnforderungOutput = new EventEmitter<String>();



  isDisabled: boolean = true;

  changeAnforderung = () => {
    if (this.isDisabled) {
      this.isDisabled = false;
    } else {
      this.changeAnforderungOutput.emit(this.name);
      this.isDisabled = true;
    }
  }

  constructor() { }

  ngOnInit() {
  }

}

