import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjekteAdminComponent } from './projekte-admin.component';

describe('ProjekteAdminComponent', () => {
  let component: ProjekteAdminComponent;
  let fixture: ComponentFixture<ProjekteAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjekteAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjekteAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
