import $ from 'jquery';
import _ from 'underscore';

import Traveler from './models/traveler.js';
import TravelerList from './collections/traveler_list.js';
import TravelerView from './views/traveler_view.js';
import TravelerListView from './views/traveler_list_view.js';

import Trip from './models/trip.js';
import TripList from './collections/trip_list.js';
import TripView from './views/trip_view.js';
import TripListView from './views/trip_list_view.js';

import Login from './models/login.js';
import LoginView from './views/login_view.js';

// var travelerList = new TravelerList();
var tripList = new TripList();
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
});
