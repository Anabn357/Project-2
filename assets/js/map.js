 
const myMap = L.map("map", {
        center: [37.983810, 23.727539],
        zoom: 2
        });
        
        // Define lightmap layers

L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.outdoors",
    accessToken: API_KEY
}).addTo(myMap);

var JPStyle = {
    color: "white",
    fillColor: "brown",
    fillOpacity: 0.5,
    weight: 0.5
}; 

var NAStyle = {
    color: "white",
    fillColor: "red",
    fillOpacity: 0.5,
    weight: 0.5
};  

var EUStyle = {
    color: "white",
    fillColor: "yellow",
    fillOpacity: 0.5,
    weight: 0.5
}; 

var otherStyle = {
    color: "white",
    fillColor: "blue",
    fillOpacity: 0.5,
    weight: 0.5
}; 

(async function(){

    // reading our jeojson data:
    const JP_map = "Resources/JP.json";
    var JP_data = await d3.json(JP_map)

    const NA_map = "Resources/NA.json";
    var NA_data = await d3.json(NA_map)

    const EU_map = "Resources/EU.json";
    var EU_data = await d3.json(EU_map)

    const other_map = "Resources/other.json";
    var other_data = await d3.json(other_map)

    // Adding to the map:

    L.geoJson(JP_data, {
        // Passing in our style object
        style: JPStyle
    }).addTo(myMap);

    L.geoJson(NA_data, {
        // Passing in our style object
        style: NAStyle
    }).addTo(myMap);

    L.geoJson(EU_data, {
        // Passing in our style object
        style: EUStyle
    }).addTo(myMap);

    L.geoJson(other_data, {
        // Passing in our style object
        style: otherStyle
    }).addTo(myMap);


    // We concluded this data from our sales_dat.scv dataset

    var Top_Seller_NA_EU = [{Name: "Wii Sports", Platform: "Wii", NA_sale: 41.49, EU_Sale: 29.02}];
    var Top_Seller_JP =[{Name: "Pokemon Red/Pokemon Blue", Platform: "GB", JP_sale: 10.22}]
    var Top_Seller_other =[{Name: "Grand Theft Auto: San Andreas", Platform: "PS", other_sale: 10.57}]
   

//  Having representative for our four regions:

    coordinates = [[55.000000, -115.000000],[65, 90],[25.443707, 139.638031],[20.715298, 51.404343]]

    // Changing icon format

    var Icon = L.icon({
        iconUrl: 'assets/images/icon_game.png',
        // shadowUrl: 'leaf-shadow.png',
        iconSize:     [70, 70], // size of the icon
        iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
        popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
    });

    // Adding sales data to our map

    L.marker(coordinates[0], {icon: Icon}).bindPopup("<h3>" + Top_Seller_NA_EU[0].Name +
    "</h3><hr><p>" +"Platform: "+ Top_Seller_NA_EU[0].Platform + "<br> NA Sale: $"+
    Top_Seller_NA_EU[0].NA_sale + " Million </p>").addTo(myMap);

    L.marker(coordinates[1],  {icon: Icon}).bindPopup("<h3>" + Top_Seller_NA_EU[0].Name +
    "</h3><hr><p>" +"Platform: "+ Top_Seller_NA_EU[0].Platform + "<br> EU Sale: $"+
    Top_Seller_NA_EU[0].EU_Sale + " Million </p>").addTo(myMap);

    L.marker(coordinates[2],  {icon: Icon}).bindPopup("<h3>" + Top_Seller_JP[0].Name +
    "</h3><hr><p>" +"Platform: "+ Top_Seller_JP[0].Platform + "<br> JP Sale: $"+
    Top_Seller_JP[0].JP_sale + " Million </p>").addTo(myMap);
    
    L.marker(coordinates[3],  {icon: Icon}).bindPopup("<h3>" + Top_Seller_other[0].Name +
    "</h3><hr><p>" +"Platform: "+ Top_Seller_other[0].Platform + "<br> Other Sale: $"+
    Top_Seller_other[0].other_sale + " Million </p>").addTo(myMap);


})()
