// map.js
let map;
let marker;
const infoWindow = new google.maps.InfoWindow();

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8
    });

    const autocomplete = new google.maps.places.Autocomplete(document.getElementById("autocomplete"));
    autocomplete.bindTo("bounds", map);

    autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        if (!place.geometry) {
            return;
        }

        map.setCenter(place.geometry.location);
        map.setZoom(15);
        dropPin(place.geometry.location);
        showInfoWindow(place);
    });

    map.addListener("click", (event) => {
        dropPin(event.latLng);
        getPlaceDetails(event.latLng);
    });
}