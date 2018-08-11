/**
 * Created by ptr_bodnar on 26.07.18.
 */

function createMap(data, branch, planted) {
    d3.selectAll(".leaflet-interactive").remove();
    d3.selectAll(".leaflet-control-layers-toggle").remove();
    


    function nested_geojson(data) {

        result_list = [];

        function makeObjectCopy(n, obj) {
            var results = [];
            for (var i = 0; i < n; i++) {
                result_list.push(obj);
            }
            //return results;
        }

        data.forEach(function(d) {
            if (+d.number <= 1) {
                result_list.push(d)
            }
            else {
                makeObjectCopy(+d.number, d);
                // copied_list.forEach(function (copy) {
                //     result_list.push(copy);
                // })
            }
        });

        result_list.forEach(function (obj) {

            obj["LatLon13"] = [+obj.Longitude + (getRandomArbitrary(-0.005,0.005)),
                +obj.Latitude + (getRandomArbitrary(-0.005,0.005))];

            obj["LatLon14"] = [+obj.Longitude + (getRandomArbitrary(-0.004,0.004)),
                                +obj.Latitude + (getRandomArbitrary(-0.004,0.004))];

            obj["LatLon15"] = [+obj.Longitude + (getRandomArbitrary(-0.003,0.003)),
                                +obj.Latitude + (getRandomArbitrary(-0.003,0.003))];

            obj["LatLon16"] = [+obj.Longitude + (getRandomArbitrary(-0.002,0.002)),
                                +obj.Latitude + (getRandomArbitrary(-0.002,0.002))];

            obj["LatLon17"] = [+obj.Longitude + (getRandomArbitrary(-0.001,0.001)),
                                +obj.Latitude + (getRandomArbitrary(-0.001,0.001))];

            obj["LatLon18"] = [+obj.Longitude + (getRandomArbitrary(-0.0005,0.0005)),
                                +obj.Latitude + (getRandomArbitrary(-0.0005,0.0005))];

            obj.Longitude = +obj.Longitude + (getRandomArbitrary(-0.005,0.005));

            obj.Latitude = +obj.Latitude + (getRandomArbitrary(-0.005,0.005));
        });
        


        var geojson = result_list.map(function (d) {
            return {
                type: "Feature",
                properties: d,
                geometry: {
                    type: "Point",
                    coordinates: [+d.Longitude, +d.Latitude]
                }
            }
        });

        return geojson

    }


    geojsonLayer = L.geoJson(nested_geojson(data), {
        style: function (feature) {
            return styleForLayer(feature)
        },
        pointToLayer: function (feature, latlng) {
            // var sumCut = 0;
            // feature.properties.values.forEach(function (d) {
            //     sumCut += +d.was_cut;
            // });
            // var sumNumber = 0;
            // feature.properties.values.forEach(function (d) {
            //     sumNumber += +d.number
            // })
            //
            // if (sumNumber < 3) {
            //     sumNumber = 3;
            // }
            // if (sumNumber > 15) {
            //     sumNumber = 15;
            // }
            return new L.CircleMarker(latlng, {radius: 4, fillOpacity: 0.75});
        }
    });

    console.log(geojsonLayer);

   
    geojsonLayerBranch = L.geoJson(nested_geojson(branch), {
        style: function (feature) {
            return styleForLayer(feature);
        },
        pointToLayer: function (feature, latlng) {
            // var sumNumber = 0;
            // feature.properties.values.forEach(function (d) {
            //     sumNumber += +d.number
            // })
            //
            // if (sumNumber < 3) {
            //     sumNumber = 3;
            // }
            // if (sumNumber > 15) {
            //     sumNumber = 15;
            // }
            return new L.CircleMarker(latlng, {radius: 4, fillOpacity: 0.75});
        }
    });

    geojsonLayerPlanted = L.geoJson(nested_geojson(planted), {
        style: function (feature) {
            return styleForLayer(feature);;
        },
        pointToLayer: function (feature, latlng) {
            // var sumNumber = 0;
            // feature.properties.values.forEach(function (d) {
            //     sumNumber += +d.number
            // })
            //
            // if (sumNumber < 3) {
            //     sumNumber = 3;
            // }
            // if (sumNumber > 15) {
            //     sumNumber = 15;
            // }
            return new L.CircleMarker(latlng, {radius: 4, fillOpacity: 0.75});
        }
    });

    
    mymap.addLayer(geojsonLayer);
    

    overlayMaps = {
        "Зрубування дерев": geojsonLayer,
        "Обрізання дерев": geojsonLayerBranch,
        "Висадження нових дерев": geojsonLayerPlanted
    };

    L.control.layers(overlayMaps,null,{collapsed:false}).addTo(mymap);

    geojsonLayer.on("click", function (event) {
        var streets = [];
        var actNumber = [];

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

    var legend = L.control({position: 'topright'});

    legend.onAdd = function (map) {


        var div = L.DomUtil.create('div', 'info legend'),
            grades = ["#c90737", "#99bb06"],
            labels = ["Зрубані дерева","Дерева які ще зрубають"];

        // loop through our density intervals and generate a label with a colored square for each interval
        for (var i = 0; i < grades.length; i++) {
            div.innerHTML +=
                '<span class="dot" style="background:' + grades[i] + '"></span> ' + " " + labels[i] +'<br>';
        }

        return div;
    };

    legend.addTo(mymap);


}

