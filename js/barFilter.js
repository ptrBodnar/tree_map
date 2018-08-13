/**
 * Created by ptr_bodnar on 26.07.18.
 */

 function createBar(data, branch, planted) {

   d3.selectAll(".bars *").remove();

    data = data
        .filter(function(d){return d.date_UTF !== "NotYet" && d.date_UTF !== "1"})
        .filter(function(d){return d.date_UTF});

    var barChartData = d3.nest()
        .key(function(d) {return d.date_UTF.slice(3)})
        .sortKeys(d3.ascending)
        .rollup(function(v) { return d3.sum(v, function(d) { return +d.number }); })
        .entries(data);

    barChartData.forEach(function (d) {
        d.key = swapMonthAndYear(d.key);
    });

    console.log(barChartData);
    

    var margin = {top: 20, right: 20, bottom: 30, left: 40},
        width = 460 - margin.left - margin.right,
        height = 150 - margin.top - margin.bottom;

// set the ranges
    var x = d3.scaleBand()
        .range([0, width])
        .padding(0.25);
    var y = d3.scaleLinear()
        .range([height, 0]);

    var svg = d3.select(".bars").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .attr("class", "filter")
        .append("g")
        .attr("transform",
            "tsranslate(" + margin.left + "," + margin.top + ")");

    var parseInputDate = d3.timeParse("%y.%m");
    var formatInputDate = d3.timeFormat("%y.%m");

    //
    var dateToTick = d3.timeFormat("%b %Y");
    var outputDateFormat = function(str) {return dateToTick(parseInputDate(str)); };
    //

    // barChartData.forEach(function(d){d.key=parseDate(d.key)});
    // barChartData.map(function(d){return d.key})

    var minMonth = d3.min(barChartData.map(function(d){return d.key}));
    var x_domain = [];

    for (var i = 0; i < 12; i++) {
        x_domain.push(addMonths(minMonth, i));
    }

    console.log("x_domain");
    console.log(x_domain);

    x.domain(x_domain);
    y.domain([0, d3.max(barChartData, function(d) { return d.value; })]);

// append the rectangles for the bar chart
    svg.selectAll(".bar")
        .data(barChartData)
        .enter().append("rect")
        .attr("class", "bar")
        // .attr("class", function (d) {
        //    return d.key
        // })
        .attr("x", function(d) { return x(d.key); })
        .attr("width", x.bandwidth())
        .attr("y", function(d) { return y(d.value); })
        .attr("height", function(d) { return height - y(d.value); })
        .attr("fill", "white")
        .attr("position", "centered")
        .on("click", function (d) {
            returnColors();
            geojsonLayer.setStyle(function(feature){
                if (!(feature.properties.date_UTF.split(".")[1] === d.key.split(".")[1]))
                    return {fillColor: 'rgba(0,0,0,0)'}
            });
            geojsonLayerBranch.setStyle(function(feature){
                if (!(feature.properties.date_UTF.split(".")[1] === d.key.split(".")[1]))
                    return {fillColor: 'rgba(0,0,0,0)'}
            });
            geojsonLayerPlanted.setStyle(function(feature){
                if (!(feature.properties.date_UTF.split(".")[1] === d.key.split(".")[1]))
                    return {fillColor: 'rgba(0,0,0,0)'}
            });
        });

    d3.select(".button").on("click", function () {
        returnColors();
    });
    

    

    function returnColors() {

        geojsonLayer.setStyle(function(feature){
            return styleForLayer(feature);
        });
        geojsonLayerBranch.setStyle(function (feature) {
            if (feature.properties.was_cut == 'true') {
                return {fillColor: "#ac3f00", color: "rgba(0, 0, 0, 0);"}; 
            }
            else {
                return {fillColor: "#33981b",  color: "rgba(0, 0, 0, 0);"} ;
            }
        });

        geojsonLayerPlanted.setStyle(function(feature){
            return styleForLayer(feature);
        });
    }


// add the x Axis
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).tickFormat(outputDateFormat));

// add the y Axis
    svg.append("g")
        .call(d3.axisLeft(y));

    function addMonths(str, n) {
        return moment(str, "YY.MM").add(n, "month").format("YY.MM");
    }

    function swapMonthAndYear(str) {
        var a = str.split(".");
        return a[1] + "." + a[0];
    }
} 
