import * as d3 from 'd3';
import { Component, Input, OnInit } from '@angular/core';
import { IFullGitHistory } from '../../interfaces/full-git-history.interface';

@Component({
  selector: 'app-commit-count-race',
  templateUrl: './commit-count-race.component.html',
  styleUrls: ['./commit-count-race.component.scss']
})
export class CommitCountRaceComponent implements OnInit {
  get gitHistory(): IFullGitHistory {
    return this._gitHistory;
  }

  @Input()
  set gitHistory(value: IFullGitHistory) {
    this._gitHistory = value;
  }

  private _gitHistory!: IFullGitHistory;

  margin = { top: 20, right: 30, bottom: 40, left: 90 };
  width = 800 - this.margin.left - this.margin.right;
  height = 800 - this.margin.top - this.margin.bottom;

  private svg!: d3.Selection<SVGGElement, unknown, HTMLElement, any>;
  private xScaler!: d3.ScaleLinear<number, number, never>;
  private yScaler!: d3.ScaleBand<string>;

  constructor() {
  }

  ngOnInit(): void {
    // TODO after each commit
    // Look at user's name and store uniquelly
    // Increment commit count for that name
    // Change x axis max value
    // Sort by commit count DESC
    // Add / change user commit count data on bars
    //
    this.svg = this.createSvg();
    this.xScaler = this.createXScaler();
    this.svg.append('g')
      .attr('transform', 'translate(0,' + this.height + ')')
      .call(d3.axisBottom(this.xScaler))
      .selectAll('text')
      .attr('transform', 'translate(-10,0) rotate(-45)')
      .style('text-anchor', 'end');

    this.yScaler = this.createYScaler();

    this.svg.append('g')
      .call(d3.axisLeft(this.yScaler));

    this.addBars();
  }

  private createSvg(): d3.Selection<SVGGElement, unknown, HTMLElement, any> {
    return d3.select('#commitCountRaceSVG')
      .append('svg')
      .attr('width', this.width + this.margin.left + this.margin.right)
      .attr('height', this.height + this.margin.top + this.margin.bottom)
      .append('g')
      .attr('transform',
        'translate(' + this.margin.left + ',' + this.margin.top + ')');
  }

  private createXScaler(maxWidth = 0): d3.ScaleLinear<number, number, never> {
    return d3.scaleLinear()
      .domain([0, maxWidth])
      .range([0, this.width]);
  }

  private createYScaler(): d3.ScaleBand<string> {
    return d3.scaleBand()
      .range([0, this.height])
      .domain(this._gitHistory.commits.map(
        (d) => {
          return d.committer.user.name || '';
        }) || []).padding(.1);
  }

  private addBars(): void {
    const count: {
      [userName: string]: number;
    } = {};
    let max = 0;

    this.svg.selectAll('myRect')
      .data(this._gitHistory.commits || [])
      .enter()
      .each(d => {
        if (!count[d.committer.user.name]) {
          count[d.committer.user.name] = 0;
        }
        count[d.committer.user.name]++;

        if (count[d.committer.user.name] > max) {
          max = count[d.committer.user.name];
        }

        this.xScaler = this.createXScaler(max);
      })
      .append('rect')
      .attr('x', this.xScaler(0))
      .attr('y', (d) => {
        return this.yScaler(d.committer.user.name || '') || '';
      })
      .attr('width', (d) => {
        return this.xScaler(count[d.committer.user.name]) || 0;
      })
      .attr('height', this.yScaler.bandwidth())
      .attr('fill', '#69b3a2');
  }
}
