import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CusdelComponent } from './cusdel.component';

describe('CusdelComponent', () => {
  let component: CusdelComponent;
  let fixture: ComponentFixture<CusdelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CusdelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CusdelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
