import * as d3 from 'd3';
import { Component, Input, OnInit } from '@angular/core';
import { IFullGitHistory } from '../../interfaces/full-git-history.interface';

@Component({
  selector: 'app-commit-count-race',
  templateUrl: './commit-count-race.component.html',
  styleUrls: ['./commit-count-race.component.scss']
})
export class CommitCountRaceComponent implements OnInit {

  @Input() gitHistory?: IFullGitHistory;

  margin = {top: 20, right: 30, bottom: 40, left: 90};
  width = 800 - this.margin.left - this.margin.right;
  height = 400 - this.margin.top - this.margin.bottom;

  private svg?: d3.Selection<SVGGElement, unknown, HTMLElement, any>;
  private x?: d3.ScaleLinear<number, number, never>;
  private y?: d3.ScaleBand<string>;

  constructor() { }

  ngOnInit(): void {

    // TODO after each commit
    // Look at user's name and store uniquelly
    // Increment commit count for that name
    // Change x axis max value
    // Sort by commit count DESC
    // Add / change user commit count data on bars
    //

    this.svg = d3.select("#commitCountRaceSVG")
      .append("svg")
      .attr("width", this.width + this.margin.left + this.margin.right)
      .attr("height", this.height + this.margin.top + this.margin.bottom)
      .append("g")
      .attr("transform",
        "translate(" + this.margin.left + "," + this.margin.top + ")");

    // Add X axis
    this.x = d3.scaleLinear()
      .domain([0, 13000])
      .range([ 0, this.width]);
    this.svg.append("g")
      .attr("transform", "translate(0," + this.height + ")")
      .call(d3.axisBottom(this.x))
      .selectAll("text")
      .attr("transform", "translate(-10,0) rotate(-45)")
      .style("text-anchor", "end");

    // Y axis
    this.y = d3.scaleBand()
      .range([ 0, this.height ])
      .domain(this.gitHistory?.commits?.map(
        (d) => {
          return d.committer?.user?.name || '';
      }) || []).padding(.1);

    this.svg.append("g")
      .call(d3.axisLeft(this.y))

    //Bars
    this.svg.selectAll("myRect")
      .data(this.gitHistory?.commits || [])
      .enter()
      .append("rect")
      .attr("x", this.x(0) )
      .attr("y", (d) => {
        return this.y?.(d.committer?.user?.name || '') || '';
      })
      .attr("width", (d) => {
        return this.x?.(1122) || 0;
      })
      .attr("height", this.y.bandwidth() )
      .attr("fill", "#69b3a2")
  }

}
