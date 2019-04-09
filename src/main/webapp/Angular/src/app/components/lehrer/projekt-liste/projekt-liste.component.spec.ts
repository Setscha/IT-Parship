import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjektListeComponent } from './projekt-liste.component';

describe('ProjektListeComponent', () => {
  let component: ProjektListeComponent;
  let fixture: ComponentFixture<ProjektListeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjektListeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjektListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
