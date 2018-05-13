/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AmIComponent } from './am-i.component';

describe('AmIComponent', () => {
  let component: AmIComponent;
  let fixture: ComponentFixture<AmIComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AmIComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AmIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
