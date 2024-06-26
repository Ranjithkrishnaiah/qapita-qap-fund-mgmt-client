import * as d3 from "d3";
import { useCallback } from "react";

export function useDraw(props) {
  const ref = useCallback(
    (node) => {
      if (node !== null) {
        const { height, labels, colors } = props;
        const data = Array.isArray(props.data[0]) ? props.data : [props.data];
        const width = Math.min(props.width, node.getBoundingClientRect().width);
        const ticksStrokeWith = 1;
        const linesStrokeWith = 2;
        const xScaleHeight = 20;

        /** SVG **/
        d3.select(node).select("svg").remove();
        const svg = d3
          .select(node)
          .append("svg")
          .attr("viewBox", `0 0 ${width} ${height}`);

        const yScaleXRange =
          height - linesStrokeWith - ticksStrokeWith - xScaleHeight;

        /** Y - axis **/
        const yScale = d3
          .scaleLinear()
          .domain(
            d3.extent(
              data.reduce((m, d) => m.concat(d.map((n) => n * 1.24)), [])
            )
          )
          .range([yScaleXRange, 0]);

        /** Y-Axis Label */
        // svg
        //   .append("text")
        //   .attr("transform", "rotate(-90)")
        //   .attr("y", -6)
        //   .attr("x", 0 - height / 2)
        //   .attr("dy", "1em")
        //   .style("margin", "100em")
        //   .style("text-anchor", "middle")
        //   .text("Value (USD)");

        svg
          .append("g")
          .attr("class", "y axis")
          .call(d3.axisLeft(yScale).ticks(6))
          /** Grid Lines */
          .call((g) => {
            g.select(".domain").remove();
            g.selectAll("line")
              .attr("stroke-width", ticksStrokeWith)
              .attr("x2", width)
              .attr("x1", 0)
              .attr("x2", width)
              .attr("shape-rendering", "crispEdges");
          });

        /** X - axis **/
        const xScale = d3
          .scaleLinear()
          .domain([0, labels.length - 1])
          .range([0, width]);

        svg
          .append("g")
          .attr("class", "x axis")
          .call(d3.axisBottom(xScale).tickFormat((i) => labels[i]))
          .call((g) => {
            let maxWidth = 0;
            svg
              .select(".y.axis")
              .selectAll("text")
              .each((i, n, elem) => {
                const width = elem[n].getBoundingClientRect().width;
                maxWidth = Math.max(maxWidth, width);
              });
            const yPadding = maxWidth;

            const xAxisWidth = g.node().getBoundingClientRect().width;
            const diff = (xAxisWidth - width + linesStrokeWith * 2) / 2;

            svg
              .select(".y.axis")
              .attr("transform", `translate(${maxWidth + diff}, 0)`);

            xScale.range([diff + yPadding + diff, width - diff]);
            g.attr("transform", `translate(0, ${height - xScaleHeight})`);
            g.select(".domain").remove();
            g.selectAll("line").remove();
          })
          .selectAll(".tick")
          .data(labels)
          .join(".tick")
          .attr("transform", (d, i) => `translate(${xScale(i)}, 0)`);

        for (let i = 0; i < data.length; i++) {
          /** Dataset **/
          const dataset = d3
            .range(data[i].length)
            .map((n) => ({ y: data[i][n] }));
          /** Path **/
          const line = d3
            .line()
            .x((d, i) => xScale(i))
            .y((d) => yScale(d.y) + ticksStrokeWith)
            .curve(d3.curveMonotoneX);

          const globalClass = `dot-g-${i}`;

          svg
            .append("g")
            .attr("class", globalClass)
            .append("path")
            .attr("fill", "none")
            .datum(dataset)
            .attr("d", line)
            .attr("stroke", colors[i])
            .attr("stroke-width", linesStrokeWith);

          /** Dots **/
          svg
            .selectAll(`${globalClass} .dot`)
            .data(dataset)
            .join("circle")
            .attr("class", "dot") // Assign a class for styling
            .attr("cx", (d, index) => xScale(index))
            .attr("cy", (d) => yScale(d.y) + ticksStrokeWith)
            .attr("r", 5);
        }
      }
    },
    [props]
  );
  return [ref];
}
