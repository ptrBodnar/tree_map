/**
 * Created by ptr_bodnar on 16.07.18.
 */
var mymap = L.map('mapid').setView([48.51, 32.25], 13);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    minZoom: 13,
    maxZoom: 18,
    id: 'mapbox.dark',
    accessToken: 'pk.eyJ1IjoicHRyYmRyIiwiYSI6ImNqZG12dWdtYzBwdzgyeHAweDFueGZrYTYifQ.ZJ2tgs6E94t3wBwFOyRSBQ'
}).addTo(mymap);

var color = d3.scaleLinear().domain([0, 10])
    .range(['#ac3f00', '#33981b']);

function styleForLayer(feature) {

    // var totalTrees = 0;
    // feature.properties.values.forEach(function (d) {
    //     totalTrees += +d.number;
    // })
    if (feature.properties.was_cut == 'True') {
        return {fillColor: "#c90737", color: "rgba(0, 0, 0, 0);"};
    }
    else {
        return {fillColor: "#99bb06", color: "rgba(0, 0, 0, 0);"} ;
    }
}

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}


    d3.queue()
        .defer(d3.csv, "data/cleaned_tree_2.csv")
        .defer(d3.csv, "data/branch_2.csv")
        .defer(d3.csv, "data/tree_planted_2.csv")
        .await(function (err, data, branch, planted) {
            if (err) throw err;

            console.log(data);

            createMap(data, branch, planted);
            createBar(data, branch, planted);


        });







