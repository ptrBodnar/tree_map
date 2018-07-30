/**
 * Created by ptr_bodnar on 26.07.18.
 */

 function createBar(data, branch, planted) {

   d3.selectAll(".bars *").remove();

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

    var svg = d3.select(".bars").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .attr("class", "filter")
        .append("g")
        .attr("transform",
            "tsranslate(" + margin.left + "," + margin.top + ")");


    x.domain(barChartData.map(function(d) { return d.key; }));
    y.domain([0, d3.max(barChartData, function(d) { return d.value; })]);

    var color = d3.scaleLinear().domain([0, 10])
        .range(['#70B5DC', '#0075B4']);

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
        .attr("fill", "red")
        .attr("position", "centered")
        .on("click", function (d) {
            returnColors();
            geojsonLayer.setStyle(function(feature){
                if (!(feature.properties.values[0].date_UTF.split(".")[1] === d.key.slice(0,2)))
                    return {color: 'rgba(0,0,0,0)'}
            });
            geojsonLayerBranch.setStyle(function(feature){
                if (feature.properties.values[0].date_UTF.split(".")[1] === d.key.slice(0,2))
                    return {color: 'rgba(0,0,0,0)'}
            });
            geojsonLayerPlanted.setStyle(function(feature){
                if (feature.properties.values[0].date_UTF.split(".")[1] === d.key.slice(0,2))
                    return {color: 'rgba(0,0,0,0)'}
            });
        });

    d3.select(".button").on("click", function () {
        returnColors();
    })

    function returnColors() {
        var color = d3.scaleLinear().domain([0, 10])
        .range(['#70B5DC', '#0075B4']);

        geojsonLayer.setStyle(function(feature){
            var sumCut = 0;
            feature.properties.values.forEach(function (d) {
                sumCut += +d.was_cut;
            })
            return {color: color(sumCut)};
        });
        geojsonLayerBranch.setStyle(function(feature){
            var sumCut = 0;
            feature.properties.values.forEach(function (d) {
                sumCut += +d.was_cut;
            })
            return {color: color(sumCut)};
        });
        geojsonLayerPlanted.setStyle(function(feature){
            var sumCut = 0;
            feature.properties.values.forEach(function (d) {
                sumCut += +d.was_cut;
            })
            return {color: color(sumCut)};
        });
    }


// add the x Axis
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

// add the y Axis
    svg.append("g")
        .call(d3.axisLeft(y));

    
} 
