import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLinkedUsersComponent } from './add-linked-users.component';

describe('AddLinkedUsersComponent', () => {
  let component: AddLinkedUsersComponent;
  let fixture: ComponentFixture<AddLinkedUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddLinkedUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLinkedUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
