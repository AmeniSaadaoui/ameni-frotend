import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPointeuseComponent } from './list-pointeuse.component';

describe('ListPointeuseComponent', () => {
  let component: ListPointeuseComponent;
  let fixture: ComponentFixture<ListPointeuseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPointeuseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListPointeuseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
