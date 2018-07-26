/**
 * Created by ptr_bodnar on 16.07.18.
 */
var mymap = L.map('mapid').setView([48.51, 32.25], 13);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.dark',
    accessToken: 'pk.eyJ1IjoicHRyYmRyIiwiYSI6ImNqZG12dWdtYzBwdzgyeHAweDFueGZrYTYifQ.ZJ2tgs6E94t3wBwFOyRSBQ'
}).addTo(mymap);


d3.queue()
    .defer(d3.csv, "data/cleaned_tree.csv")
    .defer(d3.csv, "data/branch.csv")
    .defer(d3.csv, "data/tree_planted.csv")
    .await(function (err, data, branch, planted) {
        if (err) throw err;


        createMap(data, branch, planted);
        createBar(data);
        


    })