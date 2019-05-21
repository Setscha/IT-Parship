import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KompetenzComponent } from './kompetenz.component';

describe('KompetenzComponent', () => {
  let component: KompetenzComponent;
  let fixture: ComponentFixture<KompetenzComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KompetenzComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KompetenzComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
