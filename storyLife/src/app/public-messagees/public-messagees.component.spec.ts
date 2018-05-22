import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicMessageesComponent } from './public-messagees.component';

describe('PublicMessageesComponent', () => {
  let component: PublicMessageesComponent;
  let fixture: ComponentFixture<PublicMessageesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicMessageesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicMessageesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
