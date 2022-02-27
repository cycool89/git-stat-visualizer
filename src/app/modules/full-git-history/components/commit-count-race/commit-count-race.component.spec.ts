import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommitCountRaceComponent } from './commit-count-race.component';

describe('CommitCountRaceComponent', () => {
  let component: CommitCountRaceComponent;
  let fixture: ComponentFixture<CommitCountRaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommitCountRaceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommitCountRaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
