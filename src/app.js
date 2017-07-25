import Backbone from 'backbone';
import $ from 'jquery';
import _ from 'underscore';

import Traveler from './models/traveler.js';
import TravelerList from './collections/traveler_list.js';
import TravelerView from './views/traveler_view.js';
import TravelerListView from './views/traveler_list_view.js';
//
// import Trip from './models/trip.js';
// import TripList from './collections/trip_list.js';
// import TripView from './views/trip_view.js';
// import TripListView from './views/trip_list_view.js';

import Login from './models/login.js';
import LoginView from './views/login_view.js';

import SignupView from './views/signup_view.js';

// var travelerList = new TravelerList();
// var tripList = new TripList();
var login = new Login();
var traveler = new Traveler();

$(document).ready(function() {
  // $("#map").hide();
  $("#add-trip-button").hide();

  // create conditional that will check if there has been a token set... might use logic from loginView

  // Signup Form
  var signupView = new SignupView({
    model: traveler,
    template: _.template($('#sign-up-template').html()),
    el: 'main'
  });
  signupView.render();

  // Login Form
  var loginView = new LoginView({
    model: login,
    template: _.template($('#login-form-template').html()),
    el: 'main'
  });
  loginView.render();

  // Google maps
  // var initMap = function() {
  // var myLatlng = {lat: -25.363, lng: 131.044};
  //
  // var map = new google.maps.Map(document.getElementById('map'), {
  //   zoom: 4,
  //   center: myLatlng
  // });

  // var marker = new google.maps.Marker({
  //   position: myLatlng,
  //   map: map,
  //   title: 'Click to zoom'
  // });

  // map.addListener('center_changed', function() {
  //   // 3 seconds after the center of the map has changed, pan back to the
  //   // marker.
  //   window.setTimeout(function() {
  //     map.panTo(marker.getPosition());
  //   }, 3000);
  // });
  //
  // marker.addListener('click', function() {
  //   map.setZoom(8);
  //   map.setCenter(marker.getPosition());
  // });
// };
});
