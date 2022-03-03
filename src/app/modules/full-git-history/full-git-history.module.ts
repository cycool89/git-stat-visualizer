import { NgModule } from '@angular/core';
import { UploadFullGitHistoryComponent } from './components/upload-full-git-history/upload-full-git-history.component';
import { CommitCountRaceComponent } from './components/commit-count-race/commit-count-race.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UploadGitMailmapComponent } from './components/upload-git-mailmap/upload-git-mailmap.component';

@NgModule({
  declarations: [
    UploadFullGitHistoryComponent,
    UploadGitMailmapComponent,
    CommitCountRaceComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    UploadFullGitHistoryComponent,
    UploadGitMailmapComponent,
    CommitCountRaceComponent
  ]
})
export class FullGitHistoryModule {
}
