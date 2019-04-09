import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KlassenAdminComponent } from './klassen-admin.component';

describe('KlassenAdminComponent', () => {
  let component: KlassenAdminComponent;
  let fixture: ComponentFixture<KlassenAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KlassenAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KlassenAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
