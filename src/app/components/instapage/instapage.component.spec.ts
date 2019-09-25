import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstapageComponent } from './instapage.component';

describe('InstapageComponent', () => {
  let component: InstapageComponent;
  let fixture: ComponentFixture<InstapageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstapageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstapageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
