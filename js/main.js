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

        //////////////////////////////////////////////////// додати мінімум і максимум


        var color = d3.scaleLinear().domain([0, 10])
            .range(['#70B5DC', '#0075B4']);


        function nested_geojson(data) {

            var nested = d3.nest()
                .key(function (d) {
                    return "" + d.Latitude + "," + d.Longitude
                })
                .entries(data);


            var geojson = nested.map(function (d) {
                var a = d.key.split(",");
                return {
                    type: "Feature",
                    properties: d,
                    geometry: {
                        type: "Point",
                        coordinates: [+a[1], +a[0]]
                    }
                }
            })

            return geojson

        }


        geojsonLayer = L.geoJson(nested_geojson(data), {
            style: function (feature) {
                var sumCut = 0;
                feature.properties.values.forEach(function (d) {
                    sumCut += +d.was_cut;
                })
                return {color: color(sumCut)};
            },
            pointToLayer: function (feature, latlng) {
                var sumNumber = 0;
                feature.properties.values.forEach(function (d) {
                    sumNumber += +d.number
                })

                if (sumNumber < 3) {
                    sumNumber = 3;
                }
                if (sumNumber > 15) {
                    sumNumber = 15;
                }
                return new L.CircleMarker(latlng, {radius: sumNumber, fillOpacity: 0.75});
            }
        });

        geojsonLayer = L.geoJson(nested_geojson(data), {
            style: function (feature) {
                var sumCut = 0;
                feature.properties.values.forEach(function (d) {
                    sumCut += +d.was_cut;
                })
                return {color: color(sumCut)};
            },
            pointToLayer: function (feature, latlng) {
                var sumNumber = 0;
                feature.properties.values.forEach(function (d) {
                    sumNumber += +d.number
                })

                if (sumNumber < 3) {
                    sumNumber = 3;
                }
                if (sumNumber > 15) {
                    sumNumber = 15;
                }
                return new L.CircleMarker(latlng, {radius: sumNumber, fillOpacity: 0.75});
            }
        });

        geojsonLayerBranch = L.geoJson(nested_geojson(branch), {
            style: function (feature) {
                var sumCut = 0;
                feature.properties.values.forEach(function (d) {
                    sumCut += +d.was_cut;
                })
                return {color: color(sumCut)};
            },
            pointToLayer: function (feature, latlng) {
                var sumNumber = 0;
                feature.properties.values.forEach(function (d) {
                    sumNumber += +d.number
                })

                if (sumNumber < 3) {
                    sumNumber = 3;
                }
                if (sumNumber > 15) {
                    sumNumber = 15;
                }
                return new L.CircleMarker(latlng, {radius: sumNumber, fillOpacity: 0.75});
            }
        });

        geojsonLayerPlanted = L.geoJson(nested_geojson(planted), {
            style: {color: "green"},
            pointToLayer: function (feature, latlng) {
                var sumNumber = 0;
                feature.properties.values.forEach(function (d) {
                    sumNumber += +d.number
                })

                if (sumNumber < 3) {
                    sumNumber = 3;
                }
                if (sumNumber > 15) {
                    sumNumber = 15;
                }
                return new L.CircleMarker(latlng, {radius: sumNumber, fillOpacity: 0.75});
            }
        });


        mymap.addLayer(geojsonLayer);


        var overlayMaps = {
            "Зрубування дерев": geojsonLayer,
            "Обрізання дерев": geojsonLayerBranch,
            "Висадження нових дерев": geojsonLayerPlanted
        };

        L.control.layers(overlayMaps).addTo(mymap);


    })