import { NgModule } from '@angular/core';
import { UploadFullGitHistoryComponent } from './components/upload-full-git-history/upload-full-git-history.component';
import { CommitCountRaceComponent } from './components/commit-count-race/commit-count-race.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    UploadFullGitHistoryComponent,
    CommitCountRaceComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    UploadFullGitHistoryComponent,
    CommitCountRaceComponent
  ]
})
export class FullGitHistoryModule {
}
