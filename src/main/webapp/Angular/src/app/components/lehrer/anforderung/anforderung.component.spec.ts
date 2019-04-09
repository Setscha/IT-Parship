import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnforderungComponent } from './anforderung.component';

describe('AnforderungComponent', () => {
  let component: AnforderungComponent;
  let fixture: ComponentFixture<AnforderungComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnforderungComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnforderungComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
