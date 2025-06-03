import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgOnDestroyComponent } from './ng-on-destroy.component';

describe('NgOnDestroyComponent', () => {
  let component: NgOnDestroyComponent;
  let fixture: ComponentFixture<NgOnDestroyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgOnDestroyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgOnDestroyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
