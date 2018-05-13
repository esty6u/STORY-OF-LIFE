import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainPageParentComponent } from './main-page-parent.component';

describe('MainPageParentComponent', () => {
  let component: MainPageParentComponent;
  let fixture: ComponentFixture<MainPageParentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainPageParentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainPageParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
