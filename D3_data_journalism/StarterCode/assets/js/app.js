// @TODO: YOUR CODE HERE!

//console.log("Oki")


var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
var svg = d3.select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

  // Import Data
d3.csv("assets/data/data.csv")
  .then(function(indicatorsData) {

    // Step 1: Parse Data/Cast as numbers
    // ==============================
    indicatorsData.forEach( d => {
      d.poverty = +d.poverty;
      d.age = +d.age;
      d.healthcare = +d.healthcare;
      d.smokes = +d.smokes;
      d.abbr = d.abbr;
    });
    // Step 2: Create scale functions
    // ==============================
    var xLinearScale = d3.scaleLinear()
      .domain([9, d3.max(indicatorsData, d => d.poverty)])
      .range([0, width]);

    var yLinearScale = d3.scaleLinear()
      .domain([0, d3.max(indicatorsData, d => d.healthcare)])
      .range([height, 0]);

    // Step 3: Create axis functions
    // ==============================
    let xAxis = d3.axisBottom(xLinearScale);
    let yAxis = d3.axisLeft(yLinearScale);

    // Step 4: Append Axes to the chart
    // ==============================
    chartGroup.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(xAxis);

    chartGroup.append("g")
      .call(yAxis);

    // Step 5: Create Circles
    // ==============================
    let circlesGroup = chartGroup.selectAll("circle")
    .data(indicatorsData)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d.poverty))
    .attr("cy", d => yLinearScale(d.healthcare))
    .attr("r", "8")
    .attr("fill", "blue")
    .attr("stroke-width", "1")
    .attr("stroke", "black")
    .attr("opacity", ".65");

    var textGroup = chartGroup.selectAll("text")
    .data(indicatorsData)
    .enter()
    .append("text")
    .style("fill", "black")
    .attr('x',d => xLinearScale(d.poverty))
    .attr('y',d => yLinearScale(d.healthcare))
    .attr("dy", ".30em") 
    .attr("text-anchor", "middle")
    .text(d => d.abbr);
    console.log(indicatorsData)

     chartGroup.append("text")
     .attr("dx",function(d){return -1})
     .text(function(d) { return d.abbr;})


    // Step 6: Initialize tool tip
    // ==============================
    //let toolTip = d3.tip()
    //   .attr("class", "tooltip")
    //   .offset([80, -60])
    //   .html(function(d) {
    //     return (`${d.abbr}<br>Poverty: ${d.poverty}<br>Healthcare: ${d.healthcare}`);
    //   });

    // Step 7: Create tooltip in the chart
     // ==============================
    // chartGroup.call(toolTip);

    // Step 8: Create event listeners to display and hide the tooltip
    // ==============================
    // circlesGroup.on("click", d => {
    //   toolTip.show(d, this);
    //}).on("mouseout", (d, i) => {
    //   toolTip.hide(d);
    //});

    // Create axes labels
    chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - 43)
      .attr("x", 0 -275)
      .attr("dy", "1em")
      .attr("class", "axisText")
      .text("Lacks Healthcare (%)");

    chartGroup.append("text")
      .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
      .attr("class", "axisText")
      .text("In Poverty (%)");
  });