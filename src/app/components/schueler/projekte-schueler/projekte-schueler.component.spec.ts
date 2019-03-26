import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjekteSchuelerComponent } from './projekte-schueler.component';

describe('ProjekteSchuelerComponent', () => {
  let component: ProjekteSchuelerComponent;
  let fixture: ComponentFixture<ProjekteSchuelerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjekteSchuelerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjekteSchuelerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
