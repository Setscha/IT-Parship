import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjekteLehrerComponent } from './projekte-lehrer.component';

describe('ProjekteLehrerComponent', () => {
  let component: ProjekteLehrerComponent;
  let fixture: ComponentFixture<ProjekteLehrerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjekteLehrerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjekteLehrerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
