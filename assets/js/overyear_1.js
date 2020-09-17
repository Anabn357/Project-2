// Load platform data
d3.csv("Resources/grouped_platforms.csv").then(function(data) {
    var vgData = data;
    console.log(vgData);

    // Format platform datatypes
    vgData.forEach(function(data) {
    // data.Year = +data.Year;
    data.Rank = +data.Rank
    data.NA_Sales = +data.NA_Sales * 1000000;
    data.EU_Sales = +data.EU_Sales * 1000000;
    data.JP_Sales = +data.JP_Sales * 1000000;
    data.Other_Sales = +data.Other_Sales * 1000000;
    data.Global_Sales = +data.Global_Sales * 1000000;
    });

    // Format platform titles
    for (i = 0; i < vgData.length; i++) {
        switch (true) {
            case (vgData[i].Platform === "2600"):
                vgData[i].Platform = "Atari 2600";
                break;
            case (vgData[i].Platform === "3DS"):
                vgData[i].Platform = "Nintendo 3DS";
                break;
            case (vgData[i].Platform === "DC"):
                vgData[i].Platform = "Sega Dreamcast";
                break;
            case (vgData[i].Platform === "DS"):
                vgData[i].Platform = "Nintendo DS";
                break;
            case (vgData[i].Platform === "GB"):
                vgData[i].Platform = "Nintendo Game Boy";
                break;
            case (vgData[i].Platform === "GBA"):
                vgData[i].Platform = "Nintendo Game Boy Advance";
                break;
            case (vgData[i].Platform === "GC"):
                vgData[i].Platform = "Nintendo GameCube";
                break;
            case (vgData[i].Platform === "GEN"):
                vgData[i].Platform = "Sega Genesis";
                break;
            case (vgData[i].Platform === "GG"):
                vgData[i].Platform = "Sega Game Gear";
                break;
            case (vgData[i].Platform === "N64"):
                vgData[i].Platform = "Nintendo 64";
                break;
            case (vgData[i].Platform === "NES"):
                vgData[i].Platform = "Nintendo Entertainment System";
                break;
            case (vgData[i].Platform === "NG"):
                vgData[i].Platform = "Neo Geo";
                break;
            case (vgData[i].Platform === "PCFX"):
                vgData[i].Platform = "PC-FX";
                break;
            case (vgData[i].Platform === "PS"):
                vgData[i].Platform = "Sony PlayStation";
                break;
            case (vgData[i].Platform === "PS2"):
                vgData[i].Platform = "Sony PlayStation 2";
                break;
            case (vgData[i].Platform === "PS3"):
                vgData[i].Platform = "Sony PlayStation 3";
                break;
            case (vgData[i].Platform === "PS4"):
                vgData[i].Platform = "Sony PlayStation 4";
                break;
            case (vgData[i].Platform === "PSP"):
                vgData[i].Platform = "Sony PlayStation Portable";
                break;
            case (vgData[i].Platform === "PSV"):
                vgData[i].Platform = "Sony PlayStation Vita";
                break;
            case (vgData[i].Platform === "SAT"):
                vgData[i].Platform = "Sega Saturn";
                break;
            case (vgData[i].Platform === "SCD"):
                vgData[i].Platform = "Sega CD";
                break;
            case (vgData[i].Platform === "SNES"):
                vgData[i].Platform = "Super Nintendo Entertainment System";
                break;
            case (vgData[i].Platform === "TG16"):
                vgData[i].Platform = "TurboGrafx-16";
                break;
            case (vgData[i].Platform === "WS"):
                vgData[i].Platform = "Bandai WonderSwan";
                break;
            case (vgData[i].Platform === "Wii"):
                vgData[i].Platform = "Nintendo Wii";
                break;
            case (vgData[i].Platform === "WiiU"):
                vgData[i].Platform = "Nintendo Wii U";
                break;
            case (vgData[i].Platform === "X360"):
                vgData[i].Platform = "Microsoft Xbox 360";
                break;
            case (vgData[i].Platform === "XB"):
                vgData[i].Platform = "Microsoft Xbox";
                break;
            case (vgData[i].Platform === "XOne"):
                vgData[i].Platform = "Microsoft Xbox One";
                break;
        };
    };

    // Push platform data to new array
    var totalPlatforms = [];
    for (i = 0; i < vgData.length; i++) {
        totalPlatforms.push(vgData[i].Platform);
    };
    
    // Extract unique platform values
    function findUnique(value, index, self) {
        return self.indexOf(value) === index;
    };
    var platformDropdownList = totalPlatforms.filter(findUnique);

    // Add a call to action as first item in platform array
    platformDropdownList.unshift("Choose a gaming platform");

    // Create platform dropdown menu
    platformDropdownList.forEach(function(item) {
        var option = document.createElement("option");
        option.text = item;
        option.id = item;
        document.getElementById("selDataset").appendChild(option);
    });

    // Create event listener for dropdown menu change
    document.getElementById("selDataset").onchange = function() {
        var platformData = [];
        var platformDataYear = [];
        var platformDataGlobalSales = [];
        var platformSelection = d3.select("#selDataset option:checked").text();
        for (i = 0; i < vgData.length; i++) {
            if (vgData[i].Platform === platformSelection) {
                platformData.push(vgData[i]);
                platformDataYear.push(vgData[i].Year);
                platformDataGlobalSales.push(vgData[i].Global_Sales);
            };
        };

        // Format platform financial data for platform trace hovertext
        function MFormatter(num) {
            return Math.abs(num) > 999999 ? Math.sign(num)*((Math.abs(num)/1000000).toFixed(1)) + "M" : Math.sign(num)*Math.abs(num)
        };

        // Load game data
        d3.csv("Resources/grouped_years_platforms_names.csv").then(function(data) {
            var groupedNamesData = data;

            // Format game datatypes
            groupedNamesData.forEach(function(data) {
                data.Rank = +data.Rank
                data.NA_Sales = +data.NA_Sales * 1000000;
                data.EU_Sales = +data.EU_Sales * 1000000;
                data.JP_Sales = +data.JP_Sales * 1000000;
                data.Other_Sales = +data.Other_Sales * 1000000;
                data.Global_Sales = +data.Global_Sales * 1000000;
                });
        
            // Format platform titles
            groupedNamesData.forEach(function(data) {
                switch (true) {
                case (data.Platform === "2600"):
                    data.Platform = "Atari 2600";
                    break;
                case (data.Platform === "3DS"):
                    data.Platform = "Nintendo 3DS";
                    break;
                case (data.Platform === "DC"):
                    data.Platform = "Sega Dreamcast";
                    break;
                case (data.Platform === "DS"):
                    data.Platform = "Nintendo DS";
                    break;
                case (data.Platform === "GB"):
                    data.Platform = "Nintendo Game Boy";
                    break;
                case (data.Platform === "GBA"):
                    data.Platform = "Nintendo Game Boy Advance";
                    break;
                case (data.Platform === "GC"):
                    data.Platform = "Nintendo GameCube";
                    break;
                case (data.Platform === "GEN"):
                    data.Platform = "Sega Genesis";
                    break;
                case (data.Platform === "GG"):
                    data.Platform = "Sega Game Gear";
                    break;
                case (data.Platform === "N64"):
                    data.Platform = "Nintendo 64";
                    break;
                case (data.Platform === "NES"):
                    data.Platform = "Nintendo Entertainment System";
                    break;
                case (data.Platform === "NG"):
                    data.Platform = "Neo Geo";
                    break;
                case (data.Platform === "PCFX"):
                    data.Platform = "PC-FX";
                    break;
                case (data.Platform === "PS"):
                    data.Platform = "Sony PlayStation";
                    break;
                case (data.Platform === "PS2"):
                    data.Platform = "Sony PlayStation 2";
                    break;
                case (data.Platform === "PS3"):
                    data.Platform = "Sony PlayStation 3";
                    break;
                case (data.Platform === "PS4"):
                    data.Platform = "Sony PlayStation 4";
                    break;
                case (data.Platform === "PSP"):
                    data.Platform = "Sony PlayStation Portable";
                    break;
                case (data.Platform === "PSV"):
                    data.Platform = "Sony PlayStation Vita";
                    break;
                case (data.Platform === "SAT"):
                    data.Platform = "Sega Saturn";
                    break;
                case (data.Platform === "SCD"):
                    data.Platform = "Sega CD";
                    break;
                case (data.Platform === "SNES"):
                    data.Platform = "Super Nintendo Entertainment System";
                    break;
                case (data.Platform === "TG16"):
                    data.Platform = "TurboGrafx-16";
                    break;
                case (data.Platform === "WS"):
                    data.Platform = "Bandai WonderSwan";
                    break;
                case (data.Platform === "Wii"):
                    data.Platform = "Nintendo Wii";
                    break;
                case (data.Platform === "WiiU"):
                    data.Platform = "Nintendo Wii U";
                    break;
                case (data.Platform === "X360"):
                    data.Platform = "Microsoft Xbox 360";
                    break;
                case (data.Platform === "XB"):
                    data.Platform = "Microsoft Xbox";
                    break;
                case (data.Platform === "XOne"):
                    data.Platform = "Microsoft Xbox One";
                    break;
                };
            });

            // Extract game data for selected platform
            var gameYears = [];
            var gameNames = [];
            var gameSales = [];

            for (i = 0; i < groupedNamesData.length; i++) {
                if (groupedNamesData[i].Platform === platformSelection) {
                    gameYears.push(groupedNamesData[i].Year);
                    gameNames.push(groupedNamesData[i].Name);
                    gameSales.push(groupedNamesData[i].Global_Sales);
                };
            };

            // Combine game data for marker sizing and hovertext
            var gameMarkerData = [];
            var gameHoverData = [];
            for (i = 0; i < gameNames.length; i++) {
                gameMarkerData.push(gameYears[i], gameNames[i], gameSales[i]);
                gameHoverData.push("<b>" + `${gameNames[i]}` + ": </b>" + "$" + MFormatter(`${gameSales[i]}`));
            };

            // Load mean global sales data
            d3.csv("Resources/grouped_years_mean.csv").then(function(data) {
                var groupedYearsMean = data;

                // Format game data
                groupedYearsMean.forEach(function(data) {
                // data.Year = +data.Year;
                data.Rank = +data.Rank
                data.NA_Sales = +data.NA_Sales * 1000000;
                data.EU_Sales = +data.EU_Sales * 1000000;
                data.JP_Sales = +data.JP_Sales * 1000000;
                data.Other_Sales = +data.Other_Sales * 1000000;
                data.Global_Sales = +data.Global_Sales * 1000000;
                });

                // Extract yearly means for selected platform's timeframe
                var meanSales = [];
                for (i = 0; i < platformDataYear.length; i++) {
                    for (j = 0; j < groupedYearsMean.length; j++) {
                        if (groupedYearsMean[j].Year === platformDataYear[i]) {
                            meanSales.push(groupedYearsMean[j].Global_Sales);
                        };
                    };
                };
                
                // Display mean sales data
                console.log(meanSales);

                d3.selectAll(".panel_title")
                    // .selectAll("text")
                    .append("text")
                    .text(`Global Sales: ${platformSelection}`)
                    .attr("class", "panel-title")
            
                // Clear chart if invalid option is chosen
                if (platformSelection === "Choose a gaming platform") {
                    d3.select("#platform")
                        .selectAll("div")
                        .remove();
                }else{
                    var platformTrace = {
                        x: platformDataYear,
                        y: platformDataGlobalSales,
                        name: "Platform Sales",
                        // text: formattedSales,
                        // hoverinfo: "text",
                        hovertemplate: "<b>Global Game Sales: </b>" + "$%{y}<extra></extra>",
                        fill: "tozeroy",
                        type: "scatter",
                        // mode: "lines+markers",
                        line: {
                            shape: 'spline',
                            color: "#35870e"
                        },
                        marker: {
                            color: "white",
                            size: 14,
                            line: {
                                color: "#35870e",
                                width: 2
                            }
                        }
                    };
                    var gameTrace = {
                        x: gameYears,
                        y: gameSales,
                        name: "Game Sales",
                        text: gameHoverData,
                        hoverinfo: "text",
                        type: "scatter",
                        mode: "markers",
                        marker: {
                            color: "#FFFFFF",
                            size: 8,
                            line: {
                                color: "indigo",
                                width: 2
                            }
                        }
                    };
                    var meanTrace = {
                        x: platformDataYear,
                        y: meanSales,
                        name: "Average Sales (All Platforms)",
                        // text: gameHoverData,
                        // hoverinfo: "text",
                        hoverinfo: "skip",
                        type: "scatter",
                        mode: "lines",
                        line: {
                            color: "yellow",
                            shape: "spline",
                            dash: "dot",
                            // size: 20,
                            width: 2,
                        }
                    };
                    var platformLayout = {
                        title: {
                            text: "Global Sales: " + `${platformSelection}`,
                            font: {
                                family: "Helvetica",
                                size: 34,
                                color: "yellow"
                            }
                        },
                        autosize: true,
                        height: 600,
                        margin: {
                            l: 50,
                            r: 50,
                            b: 100,
                            t: 100,
                            pad: 5
                        },
                        hovermode: "closest",
                        plot_bgcolor: "#181818",
                        paper_bgcolor: "#181818",
                        xaxis: {
                            showgrid: true,
                            zeroline: false,
                            gridcolor: "#767171",
                            tickfont: {
                                color: "#FFFFFF",
                            },
                            // mirror: "ticks",
                            // tickcolor: "#FFFFFF",
                            // range: ["1980", "2020"],
                            type: "date"
                        },
                        yaxis: {
                            showgrid: true,
                            zeroline: false,
                            gridcolor: "#767171",
                            // tickformat: "$",
                            tickfont: {
                                color: "#FFFFFF",
                            },
                            // mirror: "ticks",
                        //     range: [minGlobalSales, maxGlobalSales],
                        //     type: "linear"
                        },
                        legend: {
                            font: {
                                color: "#FFFFFF"
                            }
                        }
                    };
                    var finalTraceData = [platformTrace, gameTrace, meanTrace];
                    Plotly.newPlot("platform", finalTraceData, platformLayout);
                };
            });
        });
    };
});