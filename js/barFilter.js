/**
 * Created by ptr_bodnar on 26.07.18.
 */

 function createBar(data) {

    var barChartData = d3.nest()
        .key(function(d) { if (d.date_UTF === "") {return "notCutYet"} else {return d.date_UTF.slice(3)}})
        .rollup(function(v) { return d3.sum(v, function(d) { return +d.was_cut }); })
        .entries(data);

    var margin = {top: 20, right: 20, bottom: 30, left: 40},
        width = 660 - margin.left - margin.right,
        height = 200 - margin.top - margin.bottom;

// set the ranges
    var x = d3.scaleBand()
        .range([0, width])
        .padding(0.1);
    var y = d3.scaleLinear()
        .range([height, 0]);

    var svg = d3.select("body").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .attr("class", "filter")
        .append("g")
        .attr("transform",
            "tsranslate(" + margin.left + "," + margin.top + ")");


    x.domain(barChartData.map(function(d) { return d.key; }));
    y.domain([0, d3.max(barChartData, function(d) { return d.value; })]);

// append the rectangles for the bar chart
    svg.selectAll(".bar")
        .data(barChartData)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(d) { return x(d.key); })
        .attr("width", x.bandwidth())
        .attr("y", function(d) { return y(d.value); })
        .attr("height", function(d) { return height - y(d.value); })
        .attr("fill", "red")
        .attr("position", "centered");

// add the x Axis
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

// add the y Axis
    svg.append("g")
        .call(d3.axisLeft(y));


    d3.selectAll(".bar").on("click", function (data) {
        alert("g")
    })
} 
