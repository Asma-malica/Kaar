import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoodsrecptComponent } from './goodsrecpt.component';

describe('GoodsrecptComponent', () => {
  let component: GoodsrecptComponent;
  let fixture: ComponentFixture<GoodsrecptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoodsrecptComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GoodsrecptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
