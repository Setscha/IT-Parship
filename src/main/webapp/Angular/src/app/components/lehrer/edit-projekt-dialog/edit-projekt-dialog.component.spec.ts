import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProjektDialogComponent } from './edit-projekt-dialog.component';

describe('EditProjektDialogComponent', () => {
  let component: EditProjektDialogComponent;
  let fixture: ComponentFixture<EditProjektDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditProjektDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProjektDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
