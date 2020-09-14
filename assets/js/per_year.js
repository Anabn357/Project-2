function initialPage(data1, data2, data3){


    // Creating highchart plot for genre 

    var year = data1[0].Year;
    var new_year = year;
   
    var genre = [];
    var NA_sale = [];
    var EU_sale = [];
    var JP_sale = [];
    var other_sale = [];

    i = 0;

    while (new_year === year) {
        genre.push(data1[i].Genre);
        NA_sale.push ( data1[i].NA_Sales*1000000);
        EU_sale.push( data1[i].EU_Sales*1000000);
        JP_sale.push( data1[i].JP_Sales*1000000);
        other_sale.push(data1[i].Other_Sales*1000000);
        i +=1;
        new_year = data1[i].Year;
      };
    
    data_series = [];
    colors = ["#b11226", "yellow", "blue", "orange", "purple", "green", "red", "gray", "#fa9fb5", "#addd8e", "#7fcdbb", "#fec44f", "#fc9272", "#566573", "#A569BD", "#F7DC6F", "#229954", "#ECF0F1", "#78281F", "#1B4F72", "#B7950B", "#E74C3C", "#8E44AD", "#3498DB", "#16A085", "#2ECC71", "#D68910", "#BA4A00", "#A6ACAF", "#707B7C", "#273746", "#922B21"];

    for (j = 0; j < genre.length; j++){
        data_series.push({name:genre[j],data:[NA_sale[j],EU_sale[j],JP_sale[j],other_sale[j]]})
        
    }

      Highcharts.chart('genre', {
        colors: colors,
        chart: {
            backgroundColor: '#181818',
            type: 'column',
            inverted: true,
            polar: true
        },
        legend: {
            color: 'white',
             
        },
    
        title: {
            style: {
                color: "white"
            },
            text: "Geographical Sales based on Genre in " + year
        },
        tooltip: {
            outside: true
        },
        pane: {
            size: '100%',
            innerSize: '5%',
            endAngle: 270
        },
        xAxis: {
            tickInterval: 1,
            labels: {
                align: 'right',
                useHTML: true,
                allowOverlap: true,
                step: 1,
                y: 3,
                style: {
                    fontSize: '13px',
                    color: "white"
                }
            },

            categories: [
                'NA Sales' +
                '</span></span>',
                'EU Sales' +
                '</span></span>',
                'JP Sales' +
                '</span></span>',
                'Other Sales' +
                '</span></span>',
            ]
        },
        yAxis: {
            labels: {
                style:{
                    color: "white"
                }
            },
            crosshair: {
                enabled: true,
            },
            lineWidth: 0,
            tickInterval: 6000000,
            reversedStacks: false,
            endOnTick: true,
            showLastLabel: true
            
        },
        plotOptions: {
            column: {
                stacking: 'normal',
                borderWidth: 0,
                pointPadding: 0,
                groupPadding: 0.15
            }
        },
        series: data_series
    });
    
    // Creating highchart plot for platform
    // /////////////////////////////////

    var year = data2[0].Year;
    var new_year = year;
   
    var platform = [];
    var NA_sale = [];
    var EU_sale = [];
    var JP_sale = [];
    var other_sale = [];

    i = 0;

    while (new_year === year) {
        platform.push(data2[i].Platform);
        NA_sale.push ( data2[i].NA_Sales*1000000);
        EU_sale.push( data2[i].EU_Sales*1000000);
        JP_sale.push( data2[i].JP_Sales*1000000);
        other_sale.push(data2[i].Other_Sales*1000000);
        i +=1;
        new_year = data2[i].Year;
      };
    
    data_series_platfrom= [];

    for (j = 0; j < platform.length; j++){
        data_series_platfrom.push({name:platform[j],data:[NA_sale[j],EU_sale[j],JP_sale[j],other_sale[j]]})
        
    }

      Highcharts.chart('platform', {
        colors: colors,
        chart: {
            backgroundColor: '#181818',
            type: 'column',
            inverted: true,
            polar: true
        },
        legend: {
            // backgroundColor: 'white'
        },
    
        title: {
            style: {
                color: "white"
            },
            text: "Geographical Sales based on Platform in " + year
        },
        tooltip: {
            outside: true
        },
        pane: {
            size: '100%',
            innerSize: '5%',
            endAngle: 270
        },
        xAxis: {
            tickInterval: 1,
            labels: {
                align: 'right',
                useHTML: true,
                allowOverlap: true,
                step: 1,
                y: 3,
                style: {
                    fontSize: '13px',
                    color: "white"
                }
            },

            categories: [
                'NA Sales' +
                '</span></span>',
                'EU Sales' +
                '</span></span>',
                'JP Sales' +
                '</span></span>',
                'Other Sales' +
                '</span></span>',
            ]
        },
        yAxis: {
            labels: {
                style:{
                    color: "white"
                }
            },
            crosshair: {
                enabled: true,
            },
            lineWidth: 0,
            tickInterval: 6000000,
            reversedStacks: false,
            endOnTick: true,
            showLastLabel: true
            
        },
        plotOptions: {
            column: {
                stacking: 'normal',
                borderWidth: 0,
                pointPadding: 0,
                groupPadding: 0.15
            }
        },
        series: data_series_platfrom
    });

    /////////////////////////////////////////////////////////////

    // creating bar chart for top 10 based on selling:

    var year = data3[data3.length - 1].Year;
    var new_year = year;

    top_10_names = [];
    top_10_sales = [];

    colors_bar = ["red", "orangered","#FF6666", "FF9933", "#FFFF99", "#CCFF99",  "yellow", "#00FF00","green", "#056608"]
    

    var i = 0

    var count = 0;

    for (i= 0; i<data3.length; i++) {
    new_year = data3[i].Year;
      if (new_year == year && count<10){
        count +=1;
        name = data3[i].Name;
        sale = data3[i].Global_Sales;
        top_10_names.push(name);
        top_10_sales.push(sale);
      }
    };


    //  Create the bubble dataset
    
    var dataset_bar = [{
      x: top_10_sales*1000000,
      y: (top_10_names).reverse(),
      type: "bar",
      name: "Global Sales",
      text: top_10_names,
      orientation: 'h',
      width: 0.5,
      marker: {
          color: colors_bar,
        }
  }];
  
  var layout_bar = {
    title: {text: "Top 10 Selling Games in " +year,
    font: {
      color: "white"
    }},
    xaxis: { title: {text: "Global Sale (million)",  font: {
      color: "white"
    } }, 
    tickfont: {
      color: "#FFFFFF",
  },
  },
    yaxis:{tickfont: {
      color: "#FFFFFF",
  } },
    margin: {
      t: 40,
      l:200,
      pad: 4
    },
    // hovermode:'closest',
    plot_bgcolor :'#181818',
    paper_bgcolor: "#181818",
    
  };
  
   // Plot the chart to a div tag with id "plot"
   
   Plotly.newPlot("top_10_sales", dataset_bar, layout_bar);


    }

(async function(){

    // read our data
    var data1 = await d3.json("../../Resources/genre_year.json");
    var data2 = await d3.json("../../Resources/platform_year.json");
    var data3 = await d3.json("../../Resources/top_sales.json")

    initialPage(data1, data2, data3);

    // Select the button
    var button = d3.select("#button");

    // Select the form
    var form_input = d3.select("#form-input");
    
    // Create event handlers 
    button.on("click", updatePage);
    form_input.on("submit",updatePage);
    
    
    function updatePage(){

        d3.event.preventDefault();

        //Selecting the user input:
        year = d3.select("#year").node().value;

        // updating data using user request:
    
        var genre = [];
        var NA_sale = [];
        var EU_sale = [];
        var JP_sale = [];
        var other_sale = [];

        i = 0;

        for (i= 0; i<data1.length; i++) {
        new_year = data1[i].Year;
        if (new_year == year){
            genre.push(data1[i].Genre);
            NA_sale.push ( data1[i].NA_Sales*1000000);
            EU_sale.push( data1[i].EU_Sales*1000000);
            JP_sale.push( data1[i].JP_Sales*1000000);
            other_sale.push(data1[i].Other_Sales*1000000);
        }
        };
        
        data_series = [];
        // colors = ["#fa9fb5", "#addd8e", "#7fcdbb", "#fec44f", "#fc9272", "#566573", "#A569BD", "#F7DC6F", "#229954", "#0000cc", "#78281F", "#1B4F72", "#B7950B", "#E74C3C", "#8E44AD", "#3498DB", "#16A085", "#2ECC71", "#D68910", "#BA4A00", "#A6ACAF", "#707B7C", "#273746", "#922B21"];
    
        for (j = 0; j < genre.length; j++){
            data_series.push({name:genre[j],data:[NA_sale[j],EU_sale[j],JP_sale[j],other_sale[j]]})
            
        };

        Highcharts.chart('genre', {
            colors: colors,
            chart: {
                backgroundColor: '#181818',
                type: 'column',
                inverted: true,
                polar: true
            },
            legend: {
                // backgroundColor: 'white',
            },
            title: {
                style: {
                    color: "white"
                },
                text: "Geographical Sales based on Genre in " + year
            },
            tooltip: {
                outside: true
            },
            pane: {
                size: '100%',
                innerSize: '5%',
                endAngle: 270
            },
            xAxis: {
                tickInterval: 1,
                labels: {
                    align: 'right',
                    useHTML: true,
                    allowOverlap: true,
                    step: 1,
                    y: 3,
                    style: {
                        fontSize: '13px',
                        color: "white"
                    }
                },
    
                categories: [
                    'NA Sales' +
                    '</span></span>',
                    'EU Sales' +
                    '</span></span>',
                    'JP Sales' +
                    '</span></span>',
                    'Other Sales' +
                    '</span></span>',
                ]
            },
            yAxis: {
                labels: {
                    style:{
                        color: "white"
                    }
                },
                crosshair: {
                    enabled: true,
                },
                lineWidth: 0,
                tickInterval: 6000000,
                reversedStacks: false,
                endOnTick: true,
                showLastLabel: true
                
            },
            plotOptions: {
                column: {
                    stacking: 'normal',
                    borderWidth: 0,
                    pointPadding: 0,
                    groupPadding: 0.15
                }
            },
            series: data_series
        });

        var platform = [];
        var NA_sale = [];
        var EU_sale = [];
        var JP_sale = [];
        var other_sale = [];

        i = 0;

        for (i= 0; i<data2.length; i++) {
        new_year = data2[i].Year;
        if (new_year == year){
            platform.push(data2[i].Platform);
            NA_sale.push ( data2[i].NA_Sales*1000000);
            EU_sale.push( data2[i].EU_Sales*1000000);
            JP_sale.push( data2[i].JP_Sales*1000000);
            other_sale.push(data2[i].Other_Sales*1000000);
        }
        };
        
        data_series_platform = [];
        // colors = ["#fa9fb5", "#addd8e", "#7fcdbb", "#fec44f", "#fc9272", "#566573", "#A569BD", "#F7DC6F", "#229954", "#0000cc", "#78281F", "#1B4F72", "#B7950B", "#E74C3C", "#8E44AD", "#3498DB", "#16A085", "#2ECC71", "#D68910", "#BA4A00", "#A6ACAF", "#707B7C", "#273746", "#922B21"];
    
        for (j = 0; j < platform.length; j++){
            data_series_platform.push({name:platform[j],data:[NA_sale[j],EU_sale[j],JP_sale[j],other_sale[j]]})
            
        };

        Highcharts.chart('platform', {
            colors: colors,
            chart: {
                backgroundColor: '#181818',
                type: 'column',
                inverted: true,
                polar: true
            },
            legend: {
                style: {
                    color: "white"
                },
                // backgroundColor: 'white'
            },
        
            title: {
                style: {
                    color: "white"
                },
                text: "Geographical Sales based on Platform in " + year
            },
            tooltip: {
                outside: true
            },
            pane: {
                size: '100%',
                innerSize: '5%',
                endAngle: 270
            },
            xAxis: {
                tickInterval: 1,
                labels: {
                    align: 'right',
                    useHTML: true,
                    allowOverlap: true,
                    step: 1,
                    y: 3,
                    style: {
                        fontSize: '13px',
                        color: "white"
                    }
                },
    
                categories: [
                    'NA Sales' +
                    '</span></span>',
                    'EU Sales' +
                    '</span></span>',
                    'JP Sales' +
                    '</span></span>',
                    'Other Sales' +
                    '</span></span>',
                ]
            },
            yAxis: {
                labels: {
                    style:{
                        color: "white"
                    }
                },
                crosshair: {
                    enabled: true,
                },
                lineWidth: 0,
                tickInterval: 6000000,
                reversedStacks: false,
                endOnTick: true,
                showLastLabel: true
                
            },
            plotOptions: {
                column: {
                    stacking: 'normal',
                    borderWidth: 0,
                    pointPadding: 0,
                    groupPadding: 0.15
                }
            },
            series: data_series_platform
        });

    top_10_names = [];
    top_10_sales = [];

    var i = 0
    var count = 0;

    for (i= 0; i<data3.length; i++) {
    new_year = data3[i].Year;
      if (new_year == year && count<10){
        count +=1;
        name = data3[i].Name;
        sale = data3[i].Global_Sales;
        top_10_names.push(name);
        top_10_sales.push(sale);
      }
    };


    //  Create the bubble dataset
    var dataset_bar = [{
      x: top_10_sales*1000000,
      y: (top_10_names).reverse(),
      type: "bar",
      name: "Global Sales",
      text: top_10_sales,
      orientation: 'h',
      width: 0.5,
      marker: {
          color:  colors_bar,
        }
  }];
  

  var layout_bar = {
    title: {text: "Top 10 Selling Games in " +year,
    font: {
      color: "white"
    }},
    xaxis: { title: {text: "Global Sale (million)",  font: {
      color: "white"
    } }, 
    tickfont: {
      color: "#FFFFFF",
  },
  },
    yaxis:{tickfont: {
      color: "#FFFFFF",
  } },
    margin: {
      t: 40,
      l: 200,
      pad: 4
    },
    // hovermode:'closest',
    plot_bgcolor :'#181818',
    paper_bgcolor: "#181818",
    
  };
  
   // Plot the chart to a div tag with id "plot"
   
   Plotly.newPlot("top_10_sales", dataset_bar, layout_bar);   
    
    
    
        
        }
    
    })();    


    

  