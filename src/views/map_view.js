// import Backbone from 'backbone';
const Backbone = require('backbone');

import _ from 'underscore';
import $ from 'jquery';

import Trip from '../models/trip.js';
import TripList from '../collections/trip_list.js';
import TripView from './trip_view.js';
import TripListView from './trip_list_view.js';

var MapView = Backbone.View.extend({
  initialize: function(params) {
    var self = this;
    self.model = params.model;
    console.log(self.model);
    self.map = params.map;
    console.log(self.map);

    // gets all locations
    var locations = [];
    for (var i = 0; i < this.model.length; i++) {
      locations.push(this.model.models[i].attributes.location);
    }
    console.log(locations);

    var baseUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address=';

    var getLocation = function(location) {
      var url = baseUrl + encodeURI(location);

      return $.get(url);
    };

    var geocodeArray = [];
    var requests = $.map(locations, getLocation);

    $.when.apply(null, requests).then(function(...location) {
      // console.log(location[0][0].results[0]);
      // console.log(location[0][0].results[0].geometry.location.lat);
      console.log(location.length);
      for (var i = 0; i < location.length; i += 1) {
        geocodeArray.push([location[i][0].results[0].geometry.location.lat, location[i][0].results[0].geometry.location.lng]);
      }
      console.log(geocodeArray);

      for (var j = 0; j < geocodeArray.length; j++) {
        var locations = geocodeArray[j];
        // console.log(locations[0]);
        var marker = new google.maps.Marker({
          map: self.map,
          position: {lat: locations[0], lng: locations[1]},
          animation: google.maps.Animation.DROP
        });
      }
    });
    var map = self.map;
  }
});

export default MapView;
