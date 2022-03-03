import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadFullGitHistoryComponent } from './upload-full-git-history.component';

describe('UploadFullGitHistoryComponent', () => {
  let component: UploadFullGitHistoryComponent;
  let fixture: ComponentFixture<UploadFullGitHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadFullGitHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadFullGitHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
