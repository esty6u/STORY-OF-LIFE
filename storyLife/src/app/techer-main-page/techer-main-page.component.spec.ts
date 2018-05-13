import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TecherMainPageComponent } from './techer-main-page.component';

describe('TecherMainPageComponent', () => {
  let component: TecherMainPageComponent;
  let fixture: ComponentFixture<TecherMainPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TecherMainPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TecherMainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
