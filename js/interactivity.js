function addPopUp(e) {

    e.layer.on("click", function (d) {
        d3.select("div.mystyle").style("display", "flex")
        d3.selectAll(".mystyle *").remove();

        d3.select(".mystyle").append("h3").text(
            "Інформація про дерево: "
        );

        d3.select(".mystyle").append("p").attr("class", "total").text(
            "Адреса: " + d.layer.feature.properties.tree_adress_shorten);

        d3.select(".mystyle")
            .append("p")
            .attr("class", "tree")
            .attr("id", d.layer.feature.properties.tree_characteristics)
            .text("Вид дерева: " + d.layer.feature.properties.tree_characteristics)
            .on('mouseover', function (d) {
                var sel = this.id;
                geojsonLayer.setStyle(function (d) {
                    if (!(d.properties.tree_characteristics == sel)) {
                        return {fillOpacity: "0.1"};
                    }
                });
                geojsonLayerBranch.setStyle(function (d) {
                    if (!(d.properties.tree_characteristics == sel)) {
                        return {fillOpacity: "0.1"};
                    }
                });
                geojsonLayerPlanted.setStyle(function (d) {
                    if (!(d.properties.tree_characteristics == sel)) {
                        return {fillOpacity: "0.1"};
                    }
                })
            })
            .on('mouseout', function () {
                var sel = this.id;
                geojsonLayer.setStyle(function (d) {
                    if (!(d.properties.tree_characteristics == sel)) {
                        return {fillOpacity: "0.75"};
                    }
                });
                geojsonLayerBranch.setStyle(function (d) {
                    if (!(d.properties.tree_characteristics == sel)) {
                        return {fillOpacity: "0.75"};
                    }
                });
                geojsonLayerPlanted.setStyle(function (d) {
                    if (!(d.properties.tree_characteristics == sel)) {
                        return {fillOpacity: "0.75"};
                    }
                })
            });

            // var element = d3.select(".mystyle")
            //     .selectAll(".element")
            //     .data(event.layer.feature.properties)
            //     .enter()
            //     .append("div")
            //     .attr("class", "element");



        // if (e.name == 'Зрубування дерев') {
        //     var streets = [];
        //     var actNumber = [];


        //     d3.select("div.mystyle").style("display", "flex")
        //     d3.selectAll(".mystyle *").remove();
        //     //d3.selectAll(".legend *").remove();
        //
        //     // var totalTree = d3.sum(event.layer.feature.properties.values, function (d) {
        //     //     return +d.number
        //     // });
        //     // var totalCut = d3.sum(event.layer.feature.properties.values, function (d) {
        //     //     return +d.was_cut
        //     // });
        //
        //
        //     d3.select(".mystyle").append("p").attr("class", "total").text("Загальна кількість дерев: "
        //         + totalTree + " " + "Зрубано: " + totalCut);
        //
        //     var element = d3.select(".mystyle")
        //         .selectAll(".element")
        //         .data(event.layer.feature.properties.values)
        //         .enter()
        //         .append("div")
        //         .attr("class", "element");
        //
        //
        //     // element.append("h4").text(function (d) {
        //     //     if (!streets.includes(d.tree_adress_shorten)) {
        //     //         streets.push(d.tree_adress_shorten)
        //     //         return d.tree_adress_shorten
        //     //     }
        //     // });
        //
        //
        //     // element.append("h5").text(function (d) {
        //     //     if (!actNumber.includes(d.act_number)) {
        //     //         actNumber.push(d.act_number)
        //     //         return d.act_number
        //     //     }
        //     // });
        //
        //     element.append("p").text(function (d) {
        //         totalTree += +d.number;
        //         totalCut += +d.was_cut;
        //
        //         return d.tree_characteristics + " Заплановано: " + d.number + " Вже зрубано: " + d.was_cut
        //     });
        // }
        // if (e.name == 'Обрізання дерев') {
        //     var streets = [];
        //     var actNumber = [];
        //
        //
        //     d3.select("div.mystyle").style("display", "flex")
        //     d3.selectAll(".mystyle *").remove();
        //
        //     var totalTree = d3.sum(event.layer.feature.properties.values, function (d) {
        //         return +d.number
        //     });
        //     var totalCut = d3.sum(event.layer.feature.properties.values, function (d) {
        //         return +d.was_cut
        //     });
        //
        //
        //     d3.select(".mystyle").append("p").attr("class", "total").text("Загальна кількість дерев: "
        //         + totalTree + " " + "Зрубано: " + totalCut);
        //
        //     var element = d3.select(".mystyle")
        //         .selectAll(".element")
        //         .data(event.layer.feature.properties.values)
        //         .enter()
        //         .append("div")
        //         .attr("class", "element");
        //
        //
        //     element.append("h4").text(function (d) {
        //         if (!streets.includes(d.tree_adress_shorten)) {
        //             streets.push(d.tree_adress_shorten)
        //             return d.tree_adress_shorten
        //         }
        //     })
        //
        //
        //     element.append("h5").text(function (d) {
        //         if (!actNumber.includes(d.act_number)) {
        //             actNumber.push(d.act_number)
        //             return d.act_number
        //         }
        //     })
        //
        //     element.append("p").text(function (d) {
        //         totalTree += +d.number;
        //         totalCut += +d.was_cut;
        //
        //         return d.tree_characteristics + " Заплановано: " + d.number + " Вже зрубано: " + d.was_cut
        //     });
        // }
        // if (e.name == 'Висадження нових дерев') {
        //     var streets = [];
        //     var actNumber = [];
        //
        //
        //     d3.select("div.mystyle").style("display", "flex")
        //     d3.selectAll(".mystyle *").remove();
        //
        //     var totalTree = d3.sum(event.layer.feature.properties.values, function (d) {
        //         return +d.number
        //     });
        //     var totalCut = d3.sum(event.layer.feature.properties.values, function (d) {
        //         return +d.was_cut
        //     });
        //
        //
        //     d3.select(".mystyle").append("p").attr("class", "total").text("Загальна кількість дерев: "
        //         + totalTree + " " + "Зрубано: " + totalCut);
        //
        //     var element = d3.select(".mystyle")
        //         .selectAll(".element")
        //         .data(event.layer.feature.properties.values)
        //         .enter()
        //         .append("div")
        //         .attr("class", "element");
        //
        //
        //     element.append("h4").text(function (d) {
        //         if (!streets.includes(d.tree_adress_shorten)) {
        //             streets.push(d.tree_adress_shorten)
        //             return d.tree_adress_shorten
        //         }
        //     })
        //
        //
        //     element.append("h5").text(function (d) {
        //         if (!actNumber.includes(d.act_number)) {
        //             actNumber.push(d.act_number)
        //             return d.act_number
        //         }
        //     })
        //
        //     element.append("p").text(function (d) {
        //         totalTree += +d.number;
        //         totalCut += +d.was_cut;
        //
        //         return d.tree_characteristics + " Висадили: " + d.number
        //     });
        // }


    });
}


