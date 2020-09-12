// Plug in the GeoJson data:
var link1 = "static/data/geojson/EU.json";
d3.json(link1, function(data){
    L.geoJSON(data, features).addTo(myMaps)
});

var link2 = "static/data/geojson/JP.json";
d3.json(link2, function(data){
    L.geoJSON(data, features).addTo(myMaps)
});
var link3 = "static/data/geojson.NA.json";
d3.geoJSON(link3, function(data){
    L.geoJSON(data, features).addTo(myMaps)
});  



// Plug in Json Sales data:
 var link4 = "static/data/sales_data.json";
 d3.json(link4, function(data) {
     createFeatures(data(sales_data.json(NA_Sales, EU_Sales, JP_Sales, Other_Sales)))
     
    //L.json(data).addTo(myMaps)
 });

 function createFeatures(data){
     function onEachFeature(data, layer) {
         layer.bindPopup("")
     }
 }


// Create function for map
function createMap(salesLocation) {
    
    // Create a map object
    const myMap = L.map("map", {
        center: [15.5994, -28.6731],
        zoom: 8,
        layers: [streetmap, salesLocation]
    });
    
    L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "mapbox.streets-basic",
        accessToken: API_KEY
    }).addTo(myMap);

    // Define a base baseMap object to hold our base layer:
    var baseMaps = {
        "Street Map" : streetmap
    };

    var overlayMaps = {
        Saleslocation : salesLocation
    };
    // Create a layer control containing our base maps:
    // Add the overlay layer containing the salerLocation GeoJSON:
    L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
    }).addTo(mayMaps);
    
    };



