import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnvironmensComponent } from './environmens.component';

describe('EnvironmensComponent', () => {
  let component: EnvironmensComponent;
  let fixture: ComponentFixture<EnvironmensComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnvironmensComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnvironmensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
