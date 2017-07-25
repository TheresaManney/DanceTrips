import Backbone from 'backbone';
import _ from 'underscore';
import $ from 'jquery';

import Trip from '../models/trip.js';
import TripList from '../collections/trip_list.js';
import TripView from './trip_view.js';
import TripListView from './trip_list_view.js';

// 1. Create a variable that will hold all the trip locations
// Consol.log will show all locations
// 2. In trip_list_view.js, render the map with all the trips

const MapView = Backbone.View.extend({
  initialize: function(params) {
    console.log("MapView initialize");
    var firstLocation = this.model.models[0].attributes.location;
    console.log(firstLocation);

    // gets all locations
    var locations = [];
    for (var i = 0; i < this.model.length; i++) {
      locations.push(this.model.models[i].attributes.location);
    }
    console.log(locations);
  },
  render: function() {
    console.log("MapView render");
    var baseUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address=';

    console.log(locations);

    var getLocation = function(location) {
      url = baseUrl + encodeURI(location);

      return $.get(url);
    };

    var setMarkers = function(map) {
      var geocodeArray = [];
      var requests = $.map(locations, getLocation);

      $.when.apply(null, requests).then(function(...location) {
        for (var i = 0; i < location.length; i++) {
          geocodeArray.push([location[i][0].results[0].geometry.location.lat, location[i][0].results[0].geometry.location.lng]);
        }
        console.log(geocodeArray);

        for (var j = 0; j < geocodeArray.length; j++) {
          var locations = geocodeArray[i];

          var marker = new google.maps.Marker({
            position: {lat: locations[0], lng: locations[1]},
            map: map
          });
        }
      });
    };
    var initMap = function() {
      // display of map
      var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 2,
        center: new google.maps.LatLng(20.397, -5.644)
      });
      setMarkers(map);
    };
  }
});

export default MapView;
