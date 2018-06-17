import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadropComponent } from './uploadrop.component';

describe('UploadropComponent', () => {
  let component: UploadropComponent;
  let fixture: ComponentFixture<UploadropComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadropComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
