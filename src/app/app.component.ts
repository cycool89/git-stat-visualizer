import * as gitHistoryData from '../assets/git-repo-stat.json';

import { Component, OnInit } from '@angular/core';
import { IFullGitHistory } from './modules/full-git-history/interfaces/full-git-history.interface';
import { ICommitRace } from './modules/full-git-history/components/commit-count-race/interfaces/commit-race.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'git-stat-visualizer';
  gitHistory!: IFullGitHistory;
  commitRaceData: ICommitRace[] = [];
  mailMap: string[][] = [];

  ngOnInit() {
  }

  onParsedGitHistoryUploaded(parsedGitHistory: IFullGitHistory) {
    this.gitHistory = parsedGitHistory;

    this.commitRaceData = parsedGitHistory.commits.reverse().map((commit): ICommitRace => {
      return {
        name: commit.committer.user.name,
        email: commit.committer.user.email,
        date: new Date(commit.committer.date)
      }
    });
  }

  onParsedGitMailmapUploaded(parsedMailmap: string[][]) {
    this.mailMap = parsedMailmap;
  }
}
