
// Load genre data
d3.csv("../../Resources/grouped_years_genres.csv").then(function(data) {
    var yearsGenres = data;
    console.log(yearsGenres);

    // Format genre data
    yearsGenres.forEach(function(data) {
    // data.Year = +data.Year;
    data.Rank = +data.Rank
    data.NA_Sales = +data.NA_Sales * 1000000;
    data.EU_Sales = +data.EU_Sales * 1000000;
    data.JP_Sales = +data.JP_Sales * 1000000;
    data.Other_Sales = +data.Other_Sales * 1000000;
    data.Global_Sales = +data.Global_Sales * 1000000;
    });

    // Push year values to new array
    var totalYears = [];
    for (i = 0; i < yearsGenres.length; i++) {
        totalYears.push(yearsGenres[i].Year);
    };

    // Push genre values to new array
    var totalGenres = [];
    for (i = 0; i < yearsGenres.length; i++) {
        totalGenres.push(yearsGenres[i].Genre);
    };
    
    // Extract unique year values
    function findUnique(value, index, self) {
        return self.indexOf(value) === index;
    };
    var uniqueYears = totalYears.filter(findUnique);
    console.log(uniqueYears);

    var uniqueGenres = totalGenres.filter(findUnique);
    console.log(uniqueGenres);

    // Filter data by genre, extract global sales, and push to new arrays
    var actionArray = yearsGenres.filter(item => item.Genre === "Action");
    var actionSales = actionArray.map(item => item.Global_Sales);
    var fightingArray = yearsGenres.filter(item => item.Genre === "Fighting");
    var fightingSales = fightingArray.map(item => item.Global_Sales);
    var shooterArray = yearsGenres.filter(item => item.Genre === "Shooter");
    var shooterSales = shooterArray.map(item => item.Global_Sales);
    var sportsArray = yearsGenres.filter(item => item.Genre === "Sports");
    var sportsSales = sportsArray.map(item => item.Global_Sales);
    var platformArray = yearsGenres.filter(item => item.Genre === "Platform");
    var platformSales = platformArray.map(item => item.Global_Sales);
    var puzzleArray = yearsGenres.filter(item => item.Genre === "Puzzle");
    var puzzleSales = puzzleArray.map(item => item.Global_Sales);
    var racingArray = yearsGenres.filter(item => item.Genre === "Racing");
    var racingSales = racingArray.map(item => item.Global_Sales);
    var simulationArray = yearsGenres.filter(item => item.Genre === "Simulation");
    var simulationSales = simulationArray.map(item => item.Global_Sales);
    var adventureArray = yearsGenres.filter(item => item.Genre === "Adventure");
    var adventureSales = adventureArray.map(item => item.Global_Sales);
    var roleplayingArray = yearsGenres.filter(item => item.Genre === "Role-Playing");
    var roleplayingSales = roleplayingArray.map(item => item.Global_Sales);
    var strategyArray = yearsGenres.filter(item => item.Genre === "Strategy");
    var strategySales = strategyArray.map(item => item.Global_Sales);
    var miscArray = yearsGenres.filter(item => item.Genre === "Misc");
    var miscSales = miscArray.map(item => item.Global_Sales);

    // Plot data
    const actionTrace = {
        x: uniqueYears,
        y: actionSales,
        name: "Action Games",
        hovertemplate: "<b>%{x} Action Sales: </b>" + "$%{y}<extra></extra>",
        type: "line",
        line: {
            color: "#8a045a",
        }
    };
    const fightingTrace = {
        x: uniqueYears,
        y: fightingSales,
        name: "Fighting Games",
        hovertemplate: "<b>%{x} Fighting Sales: </b>" + "$%{y}<extra></extra>",
        type: "line",
        line: {
            color: "#bb2b45",
        }
    };
    const shooterTrace = {
        x: uniqueYears,
        y: shooterSales,
        name: "Shooter Games",
        hovertemplate: "<b>%{x} Shooter Sales: </b>" + "$%{y}<extra></extra>",
        type: "line",
        line: {
            color: "#4acdb0",
        }
    };
    const sportsTrace = {
        x: uniqueYears,
        y: sportsSales,
        name: "Sports Games",
        hovertemplate: "<b>%{x} Sports Sales: </b>" + "$%{y}<extra></extra>",
        type: "line",
        line: {
            color: "#cf6796",
        }
    };
    const platformTrace2 = {
        x: uniqueYears,
        y: platformSales,
        name: "Platform Games",
        hovertemplate: "<b>%{x} Platform Sales: </b>" + "$%{y}<extra></extra>",
        type: "line",
        line: {
            color: "#d83b07",
        }
    };
    const puzzleTrace = {
        x: uniqueYears,
        y: puzzleSales,
        name: "Puzzle Games",
        hovertemplate: "<b>%{x} Puzzle Sales: </b>" + "$%{y}<extra></extra>",
        type: "line",
        line: {
            color: "#d1a65b",
        }
    };
    const racingTrace = {
        x: uniqueYears,
        y: racingSales,
        name: "Racing Games",
        hovertemplate: "<b>%{x} Racing Sales: </b>" + "$%{y}<extra></extra>",
        type: "line",
        line: {
            color: "#297e5d",
        }
    };
    const simulationTrace = {
        x: uniqueYears,
        y: simulationSales,
        name: "Simulation Games",
        hovertemplate: "<b>%{x} Simulation Sales: </b>" + "$%{y}<extra></extra>",
        type: "line",
        line: {
            color: "#e68354",
        }
    };
    const adventureTrace = {
        x: uniqueYears,
        y: adventureSales,
        name: "Adventure Games",
        hovertemplate: "<b>%{x} Adventure Sales: </b>" + "$%{y}<extra></extra>",
        type: "line",
        line: {
            color: "#9a81e3",
        }
    };
    const roleplayingTrace = {
        x: uniqueYears,
        y: roleplayingSales,
        name: "Role-Playing Games",
        hovertemplate: "<b>%{x} Role-Playing Sales: </b>" + "$%{y}<extra></extra>",
        type: "line",
        line: {
            color: "#28599a",
        }
    };
    const strategyTrace = {
        x: uniqueYears,
        y: strategySales,
        name: "Strategy Games",
        hovertemplate: "<b>%{x} Strategy Sales: </b>" + "$%{y}<extra></extra>",
        type: "line",
        line: {
            color: "#ccfbb1",
        }
    };
    const miscTrace = {
        x: uniqueYears,
        y: miscSales,
        name: "Miscellaneous Games",
        hovertemplate: "<b>%{x} Miscellaneous Sales: </b>" + "$%{y}<extra></extra>",
        type: "line",
        line: {
            color: "#1a58ec",
        }
    };
    const crashTrace = {
        x: ["1983", "1983"],
        y: [0, 126000000],
        mode: "lines",
        type: "line",
        showlegend: false,
        line: {
            color: "#FFFFFF",
            dash: "dot",
            width: .75
        }
    };
    const marioTrace = {
        x: ["1985", "1985"],
        y: [0, 114000000],
        mode: "lines",
        type: "line",
        showlegend: false,
        line: {
            color: "#FFFFFF",
            dash: "dot",
            width: .75
        }
    };
    const atariTrace = {
        x: ["1986", "1986"],
        y: [0, 100000000],
        mode: "lines",
        type: "line",
        showlegend: false,
        line: {
            color: "#FFFFFF",
            dash: "dot",
            width: .75
        },
    };
    const xboxTrace = {
        x: ["2001", "2001"],
        y: [0,100000000],
        mode: "lines",
        type: "line",
        showlegend: false,
        line: {
            color: "#FFFFFF",
            dash: "dot",
            width: .75
        },
    };
    const gtaTrace = {
        x: ["2002", "2002"],
        y: [0,126000000],
        mode: "lines",
        type: "line",
        showlegend: false,
        line: {
            color: "#FFFFFF",
            dash: "dot",
            width: .75
        },
    };
    const wiiTrace = {
        x: ["2006", "2006"],
        y: [0,145000000],
        mode: "lines",
        type: "line",
        showlegend: false,
        line: {
            color: "#FFFFFF",
            dash: "dot",
            width: .75
        },
    };
    const codTrace = {
        x: ["2010", "2010"],
        y: [0,157000000],
        mode: "lines",
        type: "line",
        showlegend: false,
        line: {
            color: "#FFFFFF",
            dash: "dot",
            width: .75
        },
    };
    const genreLayout = {
        title: {
            text: "Global Video Game Sales by Genre, 1980-2016",
            font: {
                family: "Helvetica",
                size: 34,
                color: "yellow"
            }
        },
        autosize: true,
        height: 700,
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
            showgrid: false,
            zeroline: false,
            gridcolor: "#767171",
            tickfont: {
                color: "#FFFFFF",
            },
            range: ["1980", "2018"],
            type: "date"
        },
        yaxis: {
            showgrid: false,
            zeroline: false,
            gridcolor: "#767171",
            tickfont: {
                color: "#FFFFFF",
            },
            range: [0, 160000000],
            type: "linear"
        },
        annotations: [
            {
                x: "1983",
                y: 130000000,
                xref: "x",
                yref: "y",
                xanchor: "left",
                text: "<i>Video Game Crash of 1983</i>",
                font: {
                    color: "#FFFFFF"
                },
                showarrow: false,
                ax: 200,
                ay: -40
            },
            {
                x: "1985",
                y: 118000000,
                xref: "x",
                yref: "y",
                xanchor: "left",
                text: "<i>Release of Ninendo Entertainment System</i>",
                font: {
                    color: "#FFFFFF"
                },
                showarrow: false,
                ax: 200,
                ay: -40
            },
            {
                x: "1986",
                y: 104000000,
                xref: "x",
                yref: "y",
                xanchor: "left",
                text: "<i>Atari Sales Flatline</i>",
                font: {
                    color: "#FFFFFF"
                },
                showarrow: false,
                ax: 200,
                ay: -40            
            },
            {
                x: "2001",
                y: 104000000,
                xref: "x",
                yref: "y",
                xanchor: "right",
                text: "<i>Release of Microsoft Xbox</i>",
                font: {
                    color: "#FFFFFF"
                },
                showarrow: false,
                ax: 200,
                ay: -40            
            },
            {
                x: "2002",
                y: 130000000,
                xref: "x",
                yref: "y",
                xanchor: "right",
                text: "<i>Release of GTA: Vice City</i>",
                font: {
                    color: "#FFFFFF"
                },
                showarrow: false,
                ax: 200,
                ay: -40            
            },
            {
                x: "2006",
                y: 150000000,
                xref: "x",
                yref: "y",
                xanchor: "right",
                text: "<i>Release of Wii Sports</i>",
                font: {
                    color: "#FFFFFF"
                },
                showarrow: false,
                ax: 200,
                ay: -40            
            },
            {
                x: "2010",
                y: 160000000,
                xref: "x",
                yref: "y",
                xanchor: "right",
                text: "<i>Release of Call of Duty: Black Ops</i>",
                font: {
                    color: "#FFFFFF"
                },
                showarrow: false,
                ax: 200,
                ay: -40            
            }
        ],
        legend: {
            font: {
                color: "#FFFFFF"
            }
        }
    };
    var finalTraceData = [
                            crashTrace,
                            atariTrace,
                            marioTrace,
                            xboxTrace,
                            gtaTrace,
                            wiiTrace,
                            codTrace,
                            actionTrace,
                            fightingTrace,
                            shooterTrace,
                            sportsTrace,
                            platformTrace2,
                            puzzleTrace,
                            racingTrace,
                            simulationTrace,
                            adventureTrace,
                            roleplayingTrace,
                            strategyTrace,
                            miscTrace
                        ];
    
    Plotly.newPlot("genre", finalTraceData, genreLayout);


});