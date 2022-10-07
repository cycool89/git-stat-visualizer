import * as gitHistoryData from '../assets/git-repo-stat.json';

import { Component, OnInit } from '@angular/core';
import { IFullGitHistory } from './modules/full-git-history/interfaces/full-git-history.interface';
import { ICommitRace } from './modules/full-git-history/components/commit-count-race/interfaces/commit-race.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'git-stat-visualizer';
  gitHistory!: IFullGitHistory;
  commitRaceData: ICommitRace[] = [];
  mailMap: string[][] = [];

  ngOnInit() {}

  onParsedGitHistoryUploaded(parsedGitHistory: IFullGitHistory) {
    this.gitHistory = parsedGitHistory;

    this.commitRaceData = parsedGitHistory.commits
      .reverse()
      .map((commit): ICommitRace => {
        return {
          name: commit.author.user.name,
          email: commit.author.user.email,
          date: new Date(commit.author.date),
          message: commit.message,
        };
      }).sort((commitA, commitB) => {
        return commitA.date.getTime() - commitB.date.getTime();
      }).filter((commit, index, array) => {
        const notSameDate = array[index - 1]?.date.getTime() !== commit.date.getTime();
        const notSameMessage = array[index - 1]?.message !== commit.message;
        return notSameDate && notSameMessage;
      });
  }

  onParsedGitMailmapUploaded(parsedMailmap: string[][]) {
    this.mailMap = parsedMailmap;
  }
}
