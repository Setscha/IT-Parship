import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KompetenzenSchuelerComponent } from './kompetenzen-schueler.component';

describe('KompetenzenSchuelerComponent', () => {
  let component: KompetenzenSchuelerComponent;
  let fixture: ComponentFixture<KompetenzenSchuelerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KompetenzenSchuelerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KompetenzenSchuelerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
