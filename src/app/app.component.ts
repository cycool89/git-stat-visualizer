import * as gitHistoryData from '../assets/git-repo-stat.json';

import { Component } from '@angular/core';
import { IFullGitHistory } from './modules/full-git-history/interfaces/full-git-history.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'git-stat-visualizer';
  gitHistory: IFullGitHistory = gitHistoryData as unknown as IFullGitHistory;

  onParsedGitHistoryUploaded(parsedGitHistory: IFullGitHistory) {
    this.gitHistory = parsedGitHistory;
  }
}
