/**
 * Created by ptr_bodnar on 26.07.18.
 */

function createMap(data, branch, planted) {
    d3.selectAll(".leaflet-interactive").remove();
    //d3.selectAll(".leaflet-control-layers-toggle").remove();

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



    overlayMaps = {
        "Зрубування дерев": geojsonLayer,
        "Обрізання дерев": geojsonLayerBranch,
        "Висадження нових дерев": geojsonLayerPlanted
    };

    L.control.layers(overlayMaps).addTo(mymap);

    geojsonLayer.on("click", function (event) {
        var streets = [];
        var actNumber = [];

        console.log(event.layer.feature.properties.values);


        d3.select("div.mystyle").style("display", "flex")
        d3.selectAll(".mystyle *").remove();

        var totalTree = d3.sum(event.layer.feature.properties.values, function (d) {
            return +d.number
        });
        var totalCut = d3.sum(event.layer.feature.properties.values, function (d) {
            return +d.was_cut
        });


        d3.select(".mystyle").append("p").attr("class", "total").text("Загальна кількість дерев: "
            + totalTree + " " + "Зрубано: " + totalCut);

        var element = d3.select(".mystyle")
            .selectAll(".element")
            .data(event.layer.feature.properties.values)
            .enter()
            .append("div")
            .attr("class", "element");


        element.append("h4").text(function (d) {
            if (!streets.includes(d.tree_adress_shorten)) {
                streets.push(d.tree_adress_shorten)
                return d.tree_adress_shorten
            }
        })


        element.append("h5").text(function (d) {
            if (!actNumber.includes(d.act_number)) {
                actNumber.push(d.act_number)
                return d.act_number
            }
        })

        element.append("p").text(function (d) {
            totalTree += +d.number;
            totalCut += +d.was_cut;

            return d.tree_characteristics + " Заплановано: " + d.number + " Вже зрубано: " + d.was_cut
        })
    })


    mymap.on('baselayerchange', function (e) {
        addPopUp(e);
        if (e.name == 'Зрубування дерев') {
            createBar(data);
        }
        if (e.name == 'Обрізання дерев') {
            createBar(branch);
        }
        if (e.name == 'Висадження нових дерев') {
            createBar(planted);
        }

    });


}

