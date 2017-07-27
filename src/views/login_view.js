// import Backbone from 'backbone';
const Backbone = require('backbone');
import _ from 'underscore';
import $ from 'jquery';

import Login from '../models/login.js';
import Traveler from '../models/traveler.js';
import TravelerList from '../collections/traveler_list.js';
import TravelerListView from './traveler_list_view.js';

import Trip from '../models/trip.js';
import TripList from '../collections/trip_list.js';
import TripListView from './trip_list_view.js';

const LoginView = Backbone.View.extend({

  initialize: function(params) {
    this.map = params.map;

    console.log('Initializing Login View');
    this.template = params.template;
    this.listenTo(this.model, "update", this.render);

  },
  render: function() {
    console.log("Inside LoginView render");
    console.log(this);

    var compiledTemplate = this.template(this.model.toJSON());
    this.$('#login-form').html(compiledTemplate);
    return this;

  },
  events: {
    "click #loginButton" : "loginTraveler"
  },
  loginTraveler: function(event) {
    var that = this;
    event.preventDefault();
    console.log("loginView, loginTraveler button");
    var loginEmail = this.$("#loginEmail").val();
    var loginPassword = this.$("#loginPassword").val();

    var formDetails = {
      auth: {
        email: loginEmail,
        password: loginPassword
      }
    };
    var loginTraveler = new Login();
    loginTraveler.url = "https://route.triptrackerapi.com/traveler_token";
    loginTraveler.save(formDetails,  {
      success: function(data) {

        console.log("token created");
        // set localStorage
        window.localStorage.setItem("Authorization", loginTraveler.attributes.jwt);
        console.log(localStorage.getItem("Authorization"));

        var myTravelerList = new TravelerList();
        myTravelerList.fetch( {
          headers: {'Authorization' : 'Bearer ' + localStorage.getItem("Authorization")},
          success: function() {
            var myTravelerListView = new TravelerListView({
              model: myTravelerList,
              template: _.template($('#welcome-traveler-template').html()),
              el: 'header'
            });
            console.log(myTravelerListView);
            myTravelerListView.render();
          },
          error: function() {
            console.log("Bad auth token...");
          }
        });
        // instantiate the collection
        var myTripList = new TripList();
        // fetch with special Authorization
        myTripList.fetch( {
          headers: {'Authorization' : 'Bearer ' + localStorage.getItem("Authorization")},
          success: function() {
            that.$("#add-trip-button").show();
            that.$('#nav-bar').show();
            var myTripListView = new TripListView({
              travelerList: myTravelerList,
              model: myTripList,
              template: _.template($('#list-trips-template').html()),
              deetTemplate: _.template($('#trip-info-template').html()),
              map: that.map,
              el: 'body'
            });
            myTripListView.render();
          },
          error: function() {
            console.log("Bad auth token...");
          }
        });
      },
      error: function(data) {
        console.log("token creation failed");
      }
    });
  }
});

export default LoginView;
