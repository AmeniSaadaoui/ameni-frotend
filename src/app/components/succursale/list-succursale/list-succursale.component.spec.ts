import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSuccursaleComponent } from './list-succursale.component';

describe('ListSuccursaleComponent', () => {
  let component: ListSuccursaleComponent;
  let fixture: ComponentFixture<ListSuccursaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListSuccursaleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListSuccursaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
