import * as d3 from 'd3';
import { Component, Input, OnInit } from '@angular/core';
import { ICommitRace } from './interfaces/commit-race.interface';

@Component({
  selector: 'app-commit-count-race',
  templateUrl: './commit-count-race.component.html',
  styleUrls: ['./commit-count-race.component.scss']
})
export class CommitCountRaceComponent implements OnInit {
  lastDate!: Date;
  speed: number = 5;
  multiplier: number = 1;
  private fontSize!: number;
  private rectProperties!: { padding: number; height: number };
  private container!: d3.Selection<SVGGElement, {key: string, value: number}[], HTMLElement, any>;
  private widthScale!: d3.ScaleLinear<number, number, never>;
  private axisTop!: d3.Selection<any, unknown, HTMLElement, any>;
  get gitHistory(): ICommitRace[] {
    return this._gitHistory;
  }

  @Input()
  set gitHistory(value: ICommitRace[]) {
    this._gitHistory = value;
  }

  private _gitHistory: ICommitRace[] = [];

  get gitMailmap(): string[][] {
    return this._gitMailmap;
  }

  @Input()
  set gitMailmap(value: string[][]) {
    this._gitMailmap = value;
  }

  private _gitMailmap: string[][] = [];

  private width = 0;
  private height = 0;
  private ticker = 50;

  private svg!: d3.Selection<SVGGElement, unknown, HTMLElement, any>;

  private unknownEmails: string[] =[];

  public commitCount!: {
    [userName: string]: number;
  };

  public commitData!: {
    [userName: string]: {
      count: number;
      color: string;
    };
  };

  constructor() {
  }

  ngOnInit() {
  }

  // https://medium.com/analytics-vidhya/building-racing-bar-chart-in-d3js-d89b71cd3439
  async draw() {
    this.commitCount = {};
    this.commitData = {};
    this.unknownEmails = [];
    this.svg = this.createSvg();
    this.width = this.svg.node()?.clientWidth || 0;
    this.height = this.svg.node()?.clientHeight || 0;

    this.fontSize = 16;
    this.rectProperties = { height: 20, padding: 3 };
    this.container?.remove();
    // @ts-ignore
    this.container = this.svg.append('g')
      .classed('container', true)
      .style('transform', 'translateY(25px)');


    this.widthScale = d3.scaleLinear();
    this.axisTop?.remove();
    this.axisTop = this.svg
      .append('g')
      .classed('axis', true)
      .style('transform', 'translate(10px, 20px)')
      .call(d3.axisTop(this.widthScale));

    let i = 0;
    for (const commit of this.gitHistory) {
      this.processEachCommit(commit);
      if (i % (this.speed * this.multiplier) === 0) {
        this.update(commit);
        await new Promise<void>(done => setTimeout(() => done(), this.ticker));
      }
      i++;
    }
    console.log(this.unknownEmails);
  }

  private update = (commit: ICommitRace) => {
    const presentData = Object.keys(this.commitCount)
      .map(key => ({key, value: this.commitCount[key]}));
    this.widthScale.domain([0, Math.max(...Object.values(this.commitCount))])
      .range([0, this.width - this.fontSize - 200]);

    this.axisTop
      .transition()
      .duration(this.ticker / 1.2)
      .ease(d3.easeLinear)
      .call(d3.axisTop(this.widthScale));

    const sortedRange = [...presentData]
      .sort((a,b) => b.value - a.value)

    this.container
      .selectAll('text')
      .data(presentData)
      .enter()
      .append('text');

    this.container
      .selectAll('text')
      .text(d => {
        // @ts-ignore
        return `${ d.key } ${ d.value }`;
      })
      .transition()
      .delay(this.ticker)
      .attr('x', d => {
        // @ts-ignore
        return this.widthScale(d.value) + this.fontSize;
      })
      .attr('y', (d,i) => {
        // @ts-ignore
        const indexInSortedRange = sortedRange.findIndex(e => e.key === d.key);
        const rectHeight = this.rectProperties.height + this.rectProperties.padding;
        return indexInSortedRange * rectHeight + this.fontSize;
      })

    this.container
      .selectAll('rect')
      .data(presentData)
      .enter()
      .append('rect');

    this.container
      .selectAll('rect')
      .attr('x', 10)
      .style('stroke', '#999999')
      .transition()
      .delay(this.ticker)
      .style('fill', (d) => {
        // @ts-ignore
        return this.commitData[d.key].color;
      }).attr('y', (d,i) => {
        // @ts-ignore
        const indexInSortedRange = sortedRange.findIndex(e => e.key === d.key);
        const rectHeight = this.rectProperties.height + this.rectProperties.padding;

        return indexInSortedRange * rectHeight;
      })
      .attr('width', d => {
        // @ts-ignore
        return d.value <= 0 ? 0 : this.widthScale(d.value);
      })
      .attr('height', 20);
  }

  private processEachCommit(commit: ICommitRace): void {
    const uniqueName: string | undefined = this.gitMailmap.find((entryRow) => {
      return entryRow.some((entry) => entry.toLowerCase() === commit.email.toLowerCase());
    })?.[0];

    if (!uniqueName) this.unknownEmails.push(commit.email);

    if (!this.commitCount[uniqueName || commit.name]) {
      var randomColor = Math.floor(Math.random()*16777215).toString(16);
      this.commitCount[uniqueName || commit.name] = 0;
      this.commitData[uniqueName || commit.name] = {
        color: '#' + randomColor,
        count: 0
      }
    }
    this.lastDate = new Date(commit.date);
    this.commitCount[uniqueName || commit.name]++;
    this.commitData[uniqueName || commit.name].count++;
  }

  private createSvg(): d3.Selection<SVGGElement, unknown, HTMLElement, any> {
    return d3.select('#commitCountRaceSVG');
  }
}
