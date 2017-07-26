// import Backbone from 'backbone';
const Backbone = require('backbone');
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


// global for the sake of this example
var App = null;

/**
 * The App
 * Our overall **AppView** is the top-level piece of UI.
 */
var AppView = Backbone.View.extend({

    el: $("#hub"),

    //--------------------------------------
    // Event wiring (events and event handlers)

    // events: {
    //   'click #btn_content' : 'show_content',
    //   'click #btn_map' : 'show_map'
    // },

    show_content: function() { //triggers "content" mode
      var self = this;
      var top = 200;
      var speed = 600;

      // set content position and fade in
      self.main.animate({top: (top) + 'px'}, speed, function() {
       self.main.fadeIn();
      });


      // controls to switch back to map
      self.controls.hide().css({top: (top - 100) + 'px'});
      setTimeout(function() {
        self.content_controls.fadeIn();
      }, 2 * speed);

      // resize map canvas
      self.show_map.animate({height: (top) + 'px'}, speed);
    },

    show_map: function() { // triggers "map" mode
      var self = this;
      var speed = 800;

      // hide content
      self.main.fadeOut();

      // hide controls
      self.controls.hide();

      // resize map canvas. make map 100%
      self.show_map.animate({height: '100%'}, speed);

      setTimeout(function() {
        // show map controls
        self.map_controls.css({top: '80%'});
        self.map_controls.fadeIn();
      }, speed);
    },

    // END Events and event handlers
    //----------------------------------


    //--------------------------------------
    // Initialise map
    //--------------------------------------
    _initialize_map : function() {
      var center = new google.maps.LatLng(20.397, -5.644);
      var styles = [
        {
          elementType: "geometry",
          stylers: [
            { lightness: 33 },
            { saturation: -90 }
          ]
        }
      ];

      var mapOptions = {
          zoom: 2,
          // mapTypeId: google.maps.MapTypeId.ROADMAP,
          center: center,
          styles: styles
      };
      this.map = new google.maps.Map(document.getElementById('show-map'),
        mapOptions);
    },


    //--------------------------------------
    // Initialise app
    //--------------------------------------

    initialize: function() {
      var self = this;

      // cache DOM elements for faster access
      // self.main = $('#main');
      // self.controls = $('.nav_controls');
      // self.content_controls = $('#content_controls');
      self.map_controls = $('#map_controls');
      self.show_map = $('#show-map');
      self.header = $('header');

      // initialize map
      self._initialize_map();

      // Initial control positions
      // Move header up (out of window)
      self.header.css({top:'-1000px'});
      self.header.animate({top: '0px'}, 1500);

      // hide all controls
      // self.controls.hide();
      // self.controls.css({top: '80%'});

      // self.map_controls.fadeIn();
      setTimeout(function() {
        self.map_controls.fadeIn();
      }, 1000);
    }
});


$(document).ready(function() {
  // Load the application once the DOM is ready, using `jQuery.ready`:

  // $(function() {
  var App = new AppView();
  console.log(App.map);
  // });
  // console.log(App._initialize_map());

  $("#add-trip-button").hide();
  $('#section-trip-form').hide();

  // create conditional that will check if there has been a token set... might use logic from loginView

  // Signup Form
  var signupView = new SignupView({
    model: traveler,
    template: _.template($('#sign-up-template').html()),
    el: 'body'
  });
  signupView.render();

  // Login Form
  var loginView = new LoginView({
    model: login,
    template: _.template($('#login-form-template').html()),
    map: App.map,
    el: 'main'
  });
  loginView.render();


});
