


// Plug in Json Sales data:
 var link = "static/data/sales_data.json";
 d3.json(link, function(data) {
     createFeatures(data(link(NA_Sales, EU_Sales, JP_Sales, )))
     //L.json(data).addTo(myMaps)
     console.log(link)
 });

 function createFeatures(data){
     function onEachFeature(data, layer) 
 };


// Create function for map
function createMap(salesLocation) {
    
    // Create a map object
    const myMap = L.map("map", {
        center: [15.5994, -28.6731],
        zoom: 8,
       
    });
    
    L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "mapbox.streets-basic",
        accessToken: API_KEY
    }).addTo(myMap);

    // Region  Data
    const region = [
        {
            name: "North America",
            location: [37.751, -97.822],
            createFeatures: NA_Sales 
        },
        {
            name: "Europe",
            location: [48.23610, 21.22574],
            createFeatures: EU_Sales
        },
        {
            name: "Japan",
            location: [36.2048, 138.2529],
            createFeatures: JP_Sales
        },
    ];


    // Loop through the region array and create one marker for each region object
    region.forEach(regions => {
    // Conditionals for countries points
    let color = "";
    if (createFeatures = NA_Sales) {
        color = "yellow";
    }
    else if (createFeatures = EU_Sales) {
        color = "blue";
    }
    else if (createFeatures = JP_Sales) {
        color = "green";
    }
    else {
        color = "red";
    }
     // Add circles to map
     L.circle(regions.location, {
        fillOpacity: 0.75,
        color: "white",
        fillColor: color,
        // Adjust radius
        radius: country.points * 15000
    }).bindPopup("<h1>" + regions.name + "</h1> <hr> <h3>Points: " + regions.createFeatures + "</h3>").addTo(myMap);
})



    }
   





