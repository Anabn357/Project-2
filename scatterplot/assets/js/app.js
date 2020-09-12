// The code for the chart is wrapped inside a function
// that automatically resizes the chart
function makeResponsive() {

  // if the SVG area isn't empty when the browser loads, remove it
  // and replace it with a resized version of the chart
  var svgArea = d3.select("body").select("svg");
  if (!svgArea.empty()) {
    svgArea.remove();
  }
  
  // SVG wrapper dimensions are determined by the current width
  // and height of the browser window.
  var svgWidth = window.innerWidth/1.8;
  var svgHeight = window.innerHeight/1.5;
  
  var margin = {
    top: 20,
    right: 40,
    bottom: 80,
    left: 100
  };
  
  var height = svgHeight - margin.top - margin.bottom;
  var width = svgWidth - margin.left - margin.right;
  
  // Create an SVG wrapper, append an SVG group that will hold our chart,
  // and shift the latter by left and top margins.
  var svg = d3
    .select("#scatter")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);
  
  // Append an SVG group
  var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);
  
  // Initial Params
  var chosenXAxis = "poverty";
  
  // function used for updating x-scale var upon click on axis label
  function xScale(census_data, chosenXAxis) {
    // create scales
    var xLinearScale = d3.scaleLinear()
      .domain([d3.min(census_data, d => d[chosenXAxis]) - 0.5, 
        d3.max(census_data, d => d[chosenXAxis]) + 0.5])
      .range([0, width]);
    return xLinearScale;
  }
  
  // function used for updating xAxis var upon click on axis label
  function renderAxes(newXScale, xAxis) {
    var bottomAxis = d3.axisBottom(newXScale);
    xAxis.transition()
      .duration(1000)
      .call(bottomAxis);
    return xAxis;
  }
  
  // function used for updating circles group with a transition to
  // new circles
  function renderCircles(circlesGroup, newXScale, chosenXAxis) {
  
    circlesGroup.transition()
      .duration(1000)
      .attr("cx", d => newXScale(d[chosenXAxis])+20);
  
    return circlesGroup;
  }
  
  function updateToolTip(chosenXAxis, circlesGroup) {
  
    var label;
  
    if (chosenXAxis === "poverty") {
      label = "Pverty: ";
    }
    else {
      label = "income: ";
    }
  
    var toolTip = d3.tip()
      .attr("class", "tooltip")
      .offset([80, -60])
      .html(function(d) {
        return (`${d.state}<br>${label} ${d[chosenXAxis]}<br>Healthcare: ${d.healthcareHigh}`);
      });
  
    circlesGroup.call(toolTip);
  
    circlesGroup.on("mouseover", function(data) {
      toolTip.show(data);
    })
      // onmouseout event
      .on("mouseout", function(data) {
        toolTip.hide(data);
      });
  
    return circlesGroup;
  }
  
  
  // Retrieve data from the CSV file and execute everything below
  (async function(){
    var census_data = await d3.csv("assets/data/data.csv").catch(err => console.log(err))
    console.log(census_data)
    // parse data
    census_data.forEach(function(data) {
    data.CriticScore = +data.CriticScore ;
    data.GameScore = +data.GameScore ;
    data.Global_Sales = +data.Global_Sales;
    });
    
    // xLinearScale function above csv import
    var xLinearScale = xScale(census_data, chosenXAxis);
  
    // Create y scale function
    var yLinearScale = d3.scaleLinear()
      .domain([3, d3.max(census_data, d => d.Global_Sales)])
      .range([height, 0]);
  
    // Create initial axis functions
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);
  
    // append x axis
    var xAxis = chartGroup.append("g")
      .classed("x-axis", true)
      .attr("transform", `translate(0, ${height})`)
      .call(bottomAxis);
  
    // append y axis
    chartGroup.append("g")
      .call(leftAxis);
  
    // append initial circles
    var circlesGroup = chartGroup.selectAll("circle")
      .data(census_data)
      .enter()
      .append("circle")
      .attr("cx", d => xLinearScale(d[chosenXAxis]))
      .attr("cy", d => yLinearScale(d.Global_Sales))
      .attr("r", 15 )
      .attr("fill", "Darkblue");
  
  
    chartGroup.selectAll("html")
      .data(census_data)
      .enter()
      .append("text")
      .attr("x", d => xLinearScale(d.CriticScore))
      .attr("y", d => yLinearScale(d.Global_Sales)+3)
      .attr("font-size", "13px")
      .attr("text-anchor", "middle")
      .attr("startOffset", "50%")
      .attr("font-weight", "bold")
      //.text(d => d.abbr)
      .classed("text_abbr",true)
      .attr("fill", "white");
  
    // Create group for two x-axis labels
    var labelsGroup = chartGroup.append("g")
      .attr("transform", `translate(${width / 2}, ${height + 20})`);
  
    var povertyLabel = labelsGroup.append("text")
      .attr("x", 0)
      .attr("y", 20)
      .attr("value", "poverty") // value to grab for event listener
      .classed("active", true)
      .text("In Poverty (%)");
  
    var incomeLabel = labelsGroup.append("text")
      .attr("x", 0)
      .attr("y", 40)
      .attr("value", "income") // value to grab for event listener
      .classed("inactive", true)
      .text("Household Income (Median)");
      
  
    // append y axis
    chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left+40)
      .attr("x", 0 - (height / 2))
      .attr("dy", "1em")
      .classed("active",true)
      .text("Global Sales (%)")
      .attr("font-weight", "bold");
      
  circlesGroup = updateToolTip(chosenXAxis, circlesGroup);
  
    // x axis labels event listener
    labelsGroup.selectAll("text")
      .on("click", function() {
        // get value of selection
        var value = d3.select(this).attr("value");
        if (value !== chosenXAxis) {
  
          // replaces chosenXAxis with value
          chosenXAxis = value;
  
          // console.log(chosenXAxis)
  
          // functions here found above csv import
          // updates x scale for new data
          xLinearScale = xScale(census_data, chosenXAxis);
  
          chartGroup.selectAll(".text_abbr")
          .remove();
  
          chartGroup.selectAll("html")
          .data(census_data)
          .enter()
          .append("text")
          .attr("x", d => xLinearScale(d[chosenXAxis])+20.5)
          .attr("y", d => yLinearScale(d.Global_Sales)+3)
          .attr("font-size", "13px")
          .attr("text-anchor", "middle")
          .attr("startOffset", "50%")
          .attr("font-weight", "bold")
          //.text(d => d.abbr)
          //.classed("text_abbr",true)
          .attr("fill", "white");
  
          // updates x axis with transition
          xAxis = renderAxes(xLinearScale, xAxis);
  
          // updates circles with new x values
          circlesGroup = renderCircles(circlesGroup, xLinearScale, chosenXAxis);
          circlesGroup = updateToolTip(chosenXAxis, circlesGroup);
          // updates tooltips with new info
          // circlesGroup = updateToolTip(chosenXAxis, circlesGroup);
  
          // changes classes to change bold text
          if (chosenXAxis === "poverty") {
            povertyLabel
              .classed("active", true)
              .classed("inactive", false);
            incomeLabel
              .classed("active", false)
              .classed("inactive", true);
          }
          else {
            povertyLabel
              .classed("active", false)
              .classed("inactive", true);
            incomeLabel
              .classed("active", true)
              .classed("inactive", false);
          }
        }
      });
  
  })()
  }
  
  // When the browser loads, makeResponsive() is called.
  makeResponsive();
  
  // When the browser window is resized, responsify() is called.
  d3.select(window).on("resize", makeResponsive);

