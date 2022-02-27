import { Component } from '@angular/core';
import { IFullGitHistory } from './modules/full-git-history/interfaces/full-git-history.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'git-stat-visualizer';
  commits: {
    [name: string]: number;
  } = {};

  onParsedGitHistoryUploaded(parsedGitHistory: IFullGitHistory) {
    parsedGitHistory.commits.forEach((commit) => {
      if (!this.commits[commit.committer.user.name]) {
        this.commits[commit.committer.user.name] = 0;
      }

      this.commits[commit.committer.user.name]++;
    });
  }
}
