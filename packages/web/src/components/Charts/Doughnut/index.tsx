import React, { Component } from "react";
import * as d3 from "d3";

const colors = ["#8ce8ad", "#c981b2", "#f95d54"];

type DoughnutProps = {
  data: { name: string; value: string }[];
};

class DonutChart extends Component<DoughnutProps> {
  chRef: React.RefObject<HTMLInputElement>;

  constructor(props: DoughnutProps) {
    super(props);
    this.chRef = React.createRef();
  }

  componentDidMount(): any {
    this.drawChart();
  }

  // DrawChart
  drawChart(): any {
    const { data } = this.props;
    const svgContainer = d3.select(this.chRef.current).node();
    const width = svgContainer.getBoundingClientRect().width;
    const height = width;
    const margin = 15;
    const radius = Math.min(width, height) / 3 - margin;
    // legend Position
    const legendPosition = d3
      .arc()
      .innerRadius(radius * 2.3)
      .outerRadius(radius);

    // Create SVG
    const svg = d3
      .select(this.chRef.current)
      .append("svg")
      .attr("width", "100%")
      .attr("height", "100%")
      .attr("viewBox", "0 0 " + width + " " + width)
      //.attr('preserveAspectRatio','xMinYMin')
      .append("g")
      .attr(
        "transform",
        "translate(" +
          Math.min(width, height) / 2 +
          "," +
          Math.min(width, height) / 2 +
          ")"
      );

    const pie = d3.pie().value((d: { value: any }) => d.value);
    const data_ready = pie(data);

    // Donut partition
    svg
      .selectAll("whatever")
      .data(data_ready)
      .enter()
      .append("path")
      .attr(
        "d",
        d3
          .arc()
          .innerRadius(radius / 0.75) // This is the size of the donut hole
          .outerRadius(radius)
      )
      .attr("fill", (d: { index: any }) => colors[d.index])
      .attr("stroke", "#fff")
      .style("stroke-width", "2")
      .style("opacity", "0.8");

    // Legend group and legend name
    svg
      .selectAll("mySlices")
      .data(data_ready)
      .enter()
      .append("g")
      .attr("transform", (d: any) => `translate(${legendPosition.centroid(d)})`)
      .attr("class", "legend-g")
      .style("user-select", "none")
      .append("text")
      .text((d: { data: { name: any } }) => d.data.name)
      .style("text-anchor", "middle")
      .style("font-weight", "normal")
      .style("fill", "#333333")
      .style("font-size", 12)
      .style("font-family", "Lato,sans-serif");

    //Label for value
    svg
      .selectAll(".legend-g")
      .append("text")
      .text((d: { data: { value: any } }) => {
        return d.data.value;
      })
      .style("fill", " #000000")
      .style("font-size", 14)
      .style("text-anchor", "middle")
      .style("font-family", "Roboto Slab,serif")
      .style("font-weight", 500)
      .attr("y", 16);
  }

  render(): any {
    return <div ref={this.chRef}></div>;
  }
}

export default DonutChart;
