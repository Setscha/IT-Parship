import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchuelerAdminComponent } from './schueler-admin.component';

describe('SchuelerAdminComponent', () => {
  let component: SchuelerAdminComponent;
  let fixture: ComponentFixture<SchuelerAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchuelerAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchuelerAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
