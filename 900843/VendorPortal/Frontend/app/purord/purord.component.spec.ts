import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurordComponent } from './purord.component';

describe('PurordComponent', () => {
  let component: PurordComponent;
  let fixture: ComponentFixture<PurordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
