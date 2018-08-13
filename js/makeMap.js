/**
 * Created by ptr_bodnar on 26.07.18.
 */

function createMap(data, branch, planted) {
    d3.selectAll(".leaflet-interactive").remove();
    d3.selectAll(".leaflet-control-layers-toggle").remove();



    function nested_geojson(data) {

        window.result_list = [];

        function makeObjectCopy(n, obj) {
            for (var i = 0; i < n; i++) {
                result_list.push(obj);
            }
        }


        data.forEach(function(d) {
            // if (+d.number <= 1) {
            //     result_list.push(d)
            // }
            // else {
                makeObjectCopy(+d.number, d);
            // }
        });

        // result_list.forEach(function (obj) {
        //     if (obj.number > 1) {
        //         obj.Longitude = obj.Longitude + (getRandomArbitrary(-0.005,0.005));
        //         obj.Latitude = obj.Latitude + (getRandomArbitrary(-0.005,0.005));
        //     }
        // });

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

    var da = nested_geojson(data);
    var br = nested_geojson(branch);
    var pl = nested_geojson(planted);

    da.forEach(function (obj) {
            var coord = obj.geometry.coordinates;
            coord[1] = coord[1] + (getRandomArbitrary(-0.005,0.005));
            coord[0] = coord[0] + (getRandomArbitrary(-0.005,0.005));

        obj.properties["LatLon13"] = [+obj.properties.Longitude + (getRandomArbitrary(-0.005,0.005)),
            +obj.properties.Latitude + (getRandomArbitrary(-0.005,0.005))];

        obj.properties["LatLon14"] = [+obj.properties.Longitude + (getRandomArbitrary(-0.002,0.002)),
            +obj.properties.Latitude + (getRandomArbitrary(-0.002,0.002))];

        obj.properties["LatLon15"] = [+obj.properties.Longitude + (getRandomArbitrary(-0.0007,0.0007)),
            +obj.properties.Latitude + (getRandomArbitrary(-0.0007,0.0007))];

        obj.properties["LatLon16"] = [+obj.properties.Longitude + (getRandomArbitrary(-0.0006,0.0006)),
            +obj.properties.Latitude + (getRandomArbitrary(-0.0006,0.0006))];

        obj.properties["LatLon17"] = [+obj.properties.Longitude + (getRandomArbitrary(-0.001,0.001)),
            +obj.properties.Latitude + (getRandomArbitrary(-0.00001,0.0001))];

        obj.properties["LatLon18"] = [+obj.properties.Longitude + (getRandomArbitrary(-0.0001,0.0001)),
            +obj.properties.Latitude + (getRandomArbitrary(-0.0001,0.0001))];

    });


    br.forEach(function (obj) {
        var coord = obj.geometry.coordinates;
        coord[1] = coord[1] + (getRandomArbitrary(-0.005,0.005));
        coord[0] = coord[0] + (getRandomArbitrary(-0.005,0.005));

        obj.properties["LatLon13"] = [+obj.properties.Longitude + (getRandomArbitrary(-0.005,0.005)),
            +obj.properties.Latitude + (getRandomArbitrary(-0.005,0.005))];

        obj.properties["LatLon14"] = [+obj.properties.Longitude + (getRandomArbitrary(-0.002,0.002)),
            +obj.properties.Latitude + (getRandomArbitrary(-0.002,0.002))];

        obj.properties["LatLon15"] = [+obj.properties.Longitude + (getRandomArbitrary(-0.0007,0.0007)),
            +obj.properties.Latitude + (getRandomArbitrary(-0.0007,0.0007))];

        obj.properties["LatLon16"] = [+obj.properties.Longitude + (getRandomArbitrary(-0.0006,0.0006)),
            +obj.properties.Latitude + (getRandomArbitrary(-0.0006,0.0006))];

        obj.properties["LatLon17"] = [+obj.properties.Longitude + (getRandomArbitrary(-0.001,0.001)),
            +obj.properties.Latitude + (getRandomArbitrary(-0.00001,0.0001))];

        obj.properties["LatLon18"] = [+obj.properties.Longitude + (getRandomArbitrary(-0.0001,0.0001)),
            +obj.properties.Latitude + (getRandomArbitrary(-0.0001,0.0001))];

    });

    pl.forEach(function (obj) {
        var coord = obj.geometry.coordinates;
        coord[1] = coord[1] + (getRandomArbitrary(-0.005,0.005));
        coord[0] = coord[0] + (getRandomArbitrary(-0.005,0.005));

        obj.properties["LatLon13"] = [+obj.properties.Longitude + (getRandomArbitrary(-0.005,0.005)),
            +obj.properties.Latitude + (getRandomArbitrary(-0.005,0.005))];

        obj.properties["LatLon14"] = [+obj.properties.Longitude + (getRandomArbitrary(-0.002,0.002)),
            +obj.properties.Latitude + (getRandomArbitrary(-0.002,0.002))];

        obj.properties["LatLon15"] = [+obj.properties.Longitude + (getRandomArbitrary(-0.0007,0.0007)),
            +obj.properties.Latitude + (getRandomArbitrary(-0.0007,0.0007))];

        obj.properties["LatLon16"] = [+obj.properties.Longitude + (getRandomArbitrary(-0.0006,0.0006)),
            +obj.properties.Latitude + (getRandomArbitrary(-0.0006,0.0006))];

        obj.properties["LatLon17"] = [+obj.properties.Longitude + (getRandomArbitrary(-0.001,0.001)),
            +obj.properties.Latitude + (getRandomArbitrary(-0.00001,0.0001))];

        obj.properties["LatLon18"] = [+obj.properties.Longitude + (getRandomArbitrary(-0.0001,0.0001)),
            +obj.properties.Latitude + (getRandomArbitrary(-0.0001,0.0001))];

    });

    geojsonLayer = L.geoJson(da, {
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


    geojsonLayerBranch = L.geoJson(br, {
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


    geojsonLayerPlanted = L.geoJson(pl, {
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

    
    mymap.addLayer(geojsonLayer);

    

    overlayMaps = {
        "Зрубування дерев": geojsonLayer,
        "Обрізання дерев": geojsonLayerBranch,
        "Висадження нових дерев": geojsonLayerPlanted
    };

    L.control.layers(overlayMaps,null,{collapsed:false}).addTo(mymap);


    geojsonLayer.on("click", function (d) {

        d3.select("div.mystyle").style("display", "flex");
        d3.selectAll(".mystyle *").remove();

        d3.select(".mystyle").append("h3").text(
            "Інформація про дерево: "
        );

        d3.select(".mystyle").append("p").attr("class", "total").text(
            "Адреса: " + d.layer.feature.properties.tree_adress_shorten +
            " " + d.layer.feature.properties.tree_characteristics);

        var element = d3.select(".mystyle")
            .selectAll(".element")
            .data(d.layer.feature.properties)
            .enter()
            .append("div")
            .attr("class", "element");
    });


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

    // add Treeline legend 1
    var legend1 = L.control({position: 'topright'});

    legend1.onAdd = function (mymap) {

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

    legend1.addTo(mymap);


    // add  legend 2
    var legend2 = L.control({position: 'topright'});
    legend2.onAdd = function (mymap) {
        var div = L.DomUtil.create('div', 'info legend'),
            grades = ["#ac3f00", "#33981b"],
            labels = ["Обрізали гілки","Ще не обрізали"];
        // loop through our density intervals and generate a label with a colored square for each interval
        for (var i = 0; i < grades.length; i++) {
            div.innerHTML +=
                '<span class="dot" style="background:' + grades[i] + '"></span> ' + " " + labels[i] +'<br>';
        }
        return div;
    };

    // add  legend 3
    var legend3 = L.control({position: 'topright'});
    legend3.onAdd = function (mymap) {
        var div = L.DomUtil.create('div', 'info legend'),
            grades = ["#99bb06"],
            labels = ["Висаджені дерева"];
        // loop through our density intervals and generate a label with a colored square for each interval
        for (var i = 0; i < grades.length; i++) {
            div.innerHTML +=
                '<span class="dot" style="background:' + grades[i] + '"></span> ' + " " + labels[i] +'<br>';
        }
        return div;
    };

    mymap.on('baselayerchange', function (eventLayer) {
        // Switch to the Permafrost legend...
        if (eventLayer.name === 'Зрубування дерев') {
            this.removeControl(legend2);
            this.removeControl(legend3);
            legend1.addTo(this);
        }
        if (eventLayer.name === 'Обрізання дерев') {
            geojsonLayerBranch.setStyle(function (feature) {
                if (feature.properties.was_cut == 'true') {
                    return {fillColor: "#ac3f00", color: "rgba(0, 0, 0, 0);"};
                }
                else {
                    return {fillColor: "#33981b", color: "rgba(0, 0, 0, 0);"} ;
                }
            });
            this.removeControl(legend1);
            this.removeControl(legend3);
            legend2.addTo(this);
        }
        if (eventLayer.name === 'Висадження нових дерев') {
            this.removeControl(legend1);
            this.removeControl(legend2);
            legend3.addTo(this);
        }
    });


    // Тут я працюю над тим, щоб координати змінювались разом із зумом
    mymap.on('zoomend', function () {
        var currZoom = mymap.getZoom();

        geojsonLayer.eachLayer(function(layer){
            var coords = layer.feature.properties["LatLon" + currZoom];
            layer.setLatLng({
                lat: +coords[1],
                lng: +coords[0]
            }).redraw();
        });

        geojsonLayerBranch.eachLayer(function(layer){
            var currZoom = mymap.getZoom();
            var arbitr = {
                "13": [-0.005,0.005],
                "14": [-0.002,0.002],
                "15": [-0.0007,0.0007],
                "16": [-0.0004,0.0004],
                "17": [-0.0002,0.0002],
                "18": [-0.0001,0.0001]
            };
            layer.setLatLng({
                lat: +layer.feature.properties.Latitude + (getRandomArbitrary(arbitr["" + currZoom][0], arbitr["" + currZoom][1])),
                lng: +layer.feature.properties.Longitude + (getRandomArbitrary(arbitr["" + currZoom][0], arbitr["" + currZoom][1]))
            }).redraw();
        });


        geojsonLayerPlanted.eachLayer(function(layer){
            var currZoom = mymap.getZoom();
            var arbitr = {
                "13": [-0.005,0.005],
                "14": [-0.002,0.002],
                "15": [-0.0007,0.0007],
                "16": [-0.0004,0.0004],
                "17": [-0.0002,0.0002],
                "18": [-0.0001,0.0001]
            };
            layer.setLatLng({
                lat: +layer.feature.properties.Latitude + (getRandomArbitrary(arbitr["" + currZoom][0], arbitr["" + currZoom][1])),
                lng: +layer.feature.properties.Longitude + (getRandomArbitrary(arbitr["" + currZoom][0], arbitr["" + currZoom][1]))
            }).redraw();
        });
    });


}

