import Backbone from 'backbone';
import $ from 'jquery';
import _ from 'underscore';

// import Traveler from './models/traveler.js';
// import TravelerList from './collections/traveler_list.js';
// import TravelerView from './views/traveler_view.js';
// import TravelerListView from './views/traveler_list_view.js';
//
// import Trip from './models/trip.js';
// import TripList from './collections/trip_list.js';
// import TripView from './views/trip_view.js';
// import TripListView from './views/trip_list_view.js';

import Login from './models/login.js';
import LoginView from './views/login_view.js';

// var travelerList = new TravelerList();
// var tripList = new TripList();
var login = new Login();

$(document).ready(function() {
  // var travelerListView = new TravelerListView({
  //   model: travelerList,
  //   template: _.template($('#list-travelers-template').html()),
  //   el: 'main'
  // });
  // travelerListView.render();
  var loginView = new LoginView({
    model: login,
    template: _.template($('#login-form-template').html()),
    el: 'main'
  });
  loginView.render();

  var initMap = function() {
  var myLatlng = {lat: -25.363, lng: 131.044};

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center: myLatlng
  });

  var marker = new google.maps.Marker({
    position: myLatlng,
    map: map,
    title: 'Click to zoom'
  });

  map.addListener('center_changed', function() {
    // 3 seconds after the center of the map has changed, pan back to the
    // marker.
    window.setTimeout(function() {
      map.panTo(marker.getPosition());
    }, 3000);
  });

  marker.addListener('click', function() {
    map.setZoom(8);
    map.setCenter(marker.getPosition());
  });
};
});
