import * as d3 from 'd3';
import { Component, Input, OnInit } from '@angular/core';
import { ICommitRace } from './interfaces/commit-race.interface';

@Component({
  selector: 'app-commit-count-race',
  templateUrl: './commit-count-race.component.html',
  styleUrls: ['./commit-count-race.component.scss']
})
export class CommitCountRaceComponent implements OnInit {
  private fontSize!: number;
  private rectProperties!: { padding: number; height: number };
  private container!: d3.Selection<any, unknown, HTMLElement, any>;
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

  private width = 0;
  private height = 0;
  private ticker = 500;

  private svg!: d3.Selection<SVGGElement, unknown, HTMLElement, any>;
  private xScaler!: d3.ScaleLinear<number, number, never>;
  private yScaler!: d3.ScaleBand<string>;

  private commitCount!: {
    [userName: string]: number;
  };

  constructor() {
  }

  async ngOnInit() {
    await this.draw();
  }

  private createSvg(): d3.Selection<SVGGElement, unknown, HTMLElement, any> {
    return d3.select('#commitCountRaceSVG');
  }

  // https://medium.com/analytics-vidhya/building-racing-bar-chart-in-d3js-d89b71cd3439
  private async draw() {
    this.commitCount = {};
    this.svg = this.createSvg();
    this.width = this.svg.node()?.clientWidth || 0;
    this.height = this.svg.node()?.clientHeight || 0;

    this.fontSize = 16;
    this.rectProperties = { height: 20, padding: 10 };
    this.container = this.svg.append("g")
      .classed("container", true)
      .style("transform", "translateY(25px)");


    this.widthScale = d3.scaleLinear();
    this.axisTop = this.svg
      .append('g')
      .classed('axis', true)
      .style("transform", "translate(10px, 20px)")
      .call(d3.axisTop(this.widthScale));

    for (const commit of this.gitHistory) {
      this.update(commit);
      await new Promise<void>(done => setTimeout(() => done(), this.ticker));
    }
  }

  private update = (commit: ICommitRace) => {
    this.processEachCommit(commit);
    this.widthScale.domain([0, Math.max(...Object.values(this.commitCount))])
      .range([0, this.width - this.fontSize - 50])

    this.axisTop
      .transition()
      .duration(this.ticker / 1.2)
      .ease(d3.easeLinear)
      .call(d3.axisTop(this.widthScale))

    const sortedRange = [...Object.values(this.commitCount)].sort((a,b) => b - a)

    this.container
      .selectAll("text")
      .data(Object.values(this.commitCount))
      .enter()
      .append("text")

    this.container
      .selectAll("text")
      .text(d => d.key + " "+ d.value)
      .transition()
      .delay(500)
      .attr("x", d => this.widthScale(d.value) + this.fontSize)
      .attr("y", (d,i) => sortedRange.findIndex(e => e.key === d.key) * (rectProperties.height + rectProperties.padding) + fontSize)

    this.container
      .selectAll("rect")
      .data(presentData)
      .enter()
      .append("rect");

    this.container
      .selectAll("rect")
      .attr("x", 10)
      .transition()
      .delay(500)
      .attr("y", (d,i) => sortedRange.findIndex(e => e.key === d.key) * (rectProperties.height + rectProperties.padding))
      .attr("width", d => d.value <= 0? 0 : this.widthScale(d.value))
      .attr("height", 20);
  }

  private processEachCommit(commit: ICommitRace): void {
    if (!this.commitCount[commit.name]) {
      this.commitCount[commit.name] = 0;
    }
    this.commitCount[commit.name]++;
  }
}
