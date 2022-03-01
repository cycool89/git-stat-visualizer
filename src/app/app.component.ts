import * as gitHistoryData from '../assets/git-repo-stat.json';

import { Component } from '@angular/core';
import { IFullGitHistory } from './modules/full-git-history/interfaces/full-git-history.interface';
import { ICommitRace } from './modules/full-git-history/components/commit-count-race/interfaces/commit-race.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'git-stat-visualizer';
  gitHistory: IFullGitHistory = gitHistoryData as unknown as IFullGitHistory;
  commitRaceData: ICommitRace[] = [];

  onParsedGitHistoryUploaded(parsedGitHistory: IFullGitHistory) {
    this.gitHistory = parsedGitHistory;

    this.commitRaceData = parsedGitHistory.commits.map((commit): ICommitRace => {
      return {
        name: commit.committer.user.name,
        email: commit.committer.user.email,
        date: new Date(commit.committer.date)
      }
    });
  }
}
