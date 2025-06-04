import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Lazyloading1Component } from './lazyloading1.component';

describe('Lazyloading1Component', () => {
  let component: Lazyloading1Component;
  let fixture: ComponentFixture<Lazyloading1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Lazyloading1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Lazyloading1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
