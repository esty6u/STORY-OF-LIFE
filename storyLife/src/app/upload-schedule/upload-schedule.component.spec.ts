import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadScheduleComponent } from './upload-schedule.component';

describe('UploadScheduleComponent', () => {
  let component: UploadScheduleComponent;
  let fixture: ComponentFixture<UploadScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadScheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
