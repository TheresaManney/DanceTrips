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
        for (var i = 0; i < location.length; i++) {
          geocodeArray.push([location[i][0].results[0].geometry.location.lat, location[i][0].results[0].geometry.location.lng]);
        }
        console.log(geocodeArray);

        for (var j = 0; j < geocodeArray.length; j++) {
          var locations = geocodeArray[j];
          console.log(locations[0]);
          var marker = new google.maps.Marker({
            map: self.map,
            position: {lat: locations[0], lng: locations[1]},
            animation: google.maps.Animation.DROP
          });
        }
      });
      var map = self.map;
    // };
  }


  // //  el: $('#map'),
  //
  //
  // initialize: function(params) {
  //   console.log("MapView initialize");
  //   var firstLocation = this.model.models[0].attributes.location;
  //   console.log(firstLocation);
  //   // this.template = params.template;
  //   // console.log(this.template);
  //
  //   // gets all locations
  //   var locations = [];
  //   for (var i = 0; i < this.model.length; i++) {
  //     locations.push(this.model.models[i].attributes.location);
  //   }
  //   console.log(locations);
  //   this.locations = locations;
  // },
  // render: function() {
  //
  //   console.log(this.locations.length);
  //   console.log(this.model);
  //
  //   // var compiledTemplate = this.template({locations: this.locations});
  //   // this.$('#map').html(compiledTemplate);
  //   // return this;
  //   console.log("MapView render");
  //   var baseUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
  //
  //   console.log(this.locations);
  //
  //   window.getLocation = function(location) {
  //     url = baseUrl + encodeURI(location);
  //
  //     return $.get(url);
  //   };
  //
  //   window.setMarkers = function(map) {
  //     var geocodeArray = [];
  //     var requests = $.map(this.locations, getLocation);
  //
  //     $.when.apply(null, requests).then(function(...location) {
  //       for (var i = 0; i < location.length; i++) {
  //         geocodeArray.push([location[i][0].results[0].geometry.location.lat, location[i][0].results[0].geometry.location.lng]);
  //       }
  //       console.log(geocodeArray);
  //
  //       for (var j = 0; j < geocodeArray.length; j++) {
  //         var locations = geocodeArray[i];
  //
  //         var marker = new google.maps.Marker({
  //           position: {lat: locations[0], lng: locations[1]},
  //           map: show-map
  //         });
  //       }
  //     });
  //   };
  //   window.initMap = function() {
  //     // display of map
  //     var map = new google.maps.Map(document.getElementById('map'), {
  //       zoom: 2,
  //       center: new google.maps.LatLng(20.397, -5.644)
  //     });
  //     setMarkers(map);
  //   };
  //   var mapUrl = "https://maps.googleapis.com/maps/api/js?key=AIzaSyCVAKeLRJGXxhSe6gUvUXe4_-p9iyVa8pQ&callback=initMap";
  //   // return $.ajax({
  //   //   beforeSend: function(xhrObj) {
  //   //     xhrObj.setRequestHeader("Access-Control-Allow-Origin", "*");
  //   //   },
  //   //   url: mapUrl,
  //   //   type: "GET",
  //   //   dataType: 'jsonp',
  //   //   success: function(response){
  //   //     console.log(response);
  //   //   },
  //   //   error: function(response) {
  //   //     console.log(response);
  //   //   }
  //   // });
  //
  //   // document.write("<script async defer src='https://maps.googleapis.com/maps/api/js?key=AIzaSyCVAKeLRJGXxhSe6gUvUXe4_-p9iyVa8pQ&callback=initMap'></script>");
  // }
});

export default MapView;
