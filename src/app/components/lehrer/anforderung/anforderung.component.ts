import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-anforderung',
  templateUrl: './anforderung.component.html',
  styleUrls: ['./anforderung.component.scss']
})
export class AnforderungComponent implements OnInit {

  @Input()
  id: number;

  @Input()
  name: string;

  @Input()
  prio: number;

  @Input()
  kompetenzPool: any;

  @Output()
  changeAnforderungOutput = new EventEmitter<any>();

  @Output()
  deleteAnforderungOutput = new EventEmitter<any>();


  isDisabled: boolean = true;

  changeAnforderung = () => {
    if (this.isDisabled) {
      this.isDisabled = false;
    } else {
      this.changeAnforderungOutput.emit( {id: this.id, name: this.name, prio: this.prio} );
      this.isDisabled = true;
      console.log({id: this.id, name: this.name, prio: this.prio});
    }
  }

  deleteAnforderung = () => {
    this.deleteAnforderungOutput.emit( {id: this.id, name: this.name, prio: this.prio} );
  }

  constructor() { }

  ngOnInit() {
  }

}
