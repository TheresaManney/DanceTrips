import Backbone from 'backbone';
import _ from 'underscore';
import $ from 'jquery';

import TripView from './trip_view.js';
import Trip from '../models/trip.js';
import TripList from '../collections/trip_list.js';
import AddTripFormView from './add_trip_form_view.js';

import Traveler from '../models/traveler.js';
import TravelerList from '../collections/traveler_list.js';
import TravelerView from './traveler_view.js';
import TravelerListView from './traveler_list_view.js';

var TripListView = Backbone.View.extend({
  initialize: function(params) {
    this.$("#signup-form").hide();
    $("#map").show();

    console.log(">>> Breadcrum #1");
    console.log(params);
    // console.log(params.model.traveler);
    this.template = params.template;
    console.log(params.template);
    console.log(params.model);
    console.log(params.model.trip);

    this.traveler = params.travelerList;

    // this.model = params.model.trip;
    this.listenTo(this.model, "update", this.render);
    this.$("#login-form").hide();
  },
  render: function() {
    console.log(">>> Breadcrum #2");
    var that = this;
    console.log(this.model.length);
    this.model.each(function(trip) {
      var tripView = new TripView({
        model: trip,
        template: that.template
      });
      that.$('#list-trips').append(tripView.render().el);
    });
    // gets all locations
    var locations = [];
    for (var i = 0; i < this.model.length; i++) {
      locations.push(this.model.models[i].attributes.location);
    }
    console.log(locations);
    return this;
    // var addTrip = new AddTripFormView

  },
  events: {
    'click #add-trip-button' : 'getAddTripForm',
    'click #submit-trip-button' : 'addTrip'
  },
  // getFormData: function() {
  //   var location = this.$('#tripLocation').val();
  //   var eventName = this.$('#eventName').val();
  //   var details = this.$('#tripDetails').val();
  //   var startDate = this.$('#tripStartDate').val();
  //   var endDate = this.$('#tripEndDate').val();
  //   var eventPaid = this.$('#eventPaid').val();
  //   var flightScheduled = this.$('#flightScheduled').val();
  //   var hotelReserved = this.$('#hotelReserved').val();
  //   var tripDetails = {
  //     location: location,
  //     event_name: eventName,
  //     details: details,
  //     start_date: startDate,
  //     end_date: endDate,
  //     event_paid: eventPaid,
  //     flight_paid: flightScheduled,
  //     hotel_reserved: hotelReserved
  //   };
  //   return tripDetails;
  // },
  addTrip: function(event) {
    event.preventDefault();
    // this.$("#trip-form").show();
    // render form
    console.log(this.model);
    var location = this.$('#tripLocation').val();
    var eventName = this.$('#eventName').val();
    var details = this.$('#tripDetails').val();
    var startDate = new Date( this.$('#tripStartDate').val());
    var endDate = new Date(this.$('#tripEndDate').val());
    var eventPaid = this.$('#eventPaid').is(":checked");
    var flightScheduled = this.$('#flightScheduled').is(":checked");
    var hotelReserved = this.$('#hotelReserved').is(":checked");

    // this.model.fetch( {
    //   headers: {'Authorization' : 'Bearer ' + localStorage.getItem("Authorization")},
    //   success: function() {
    //     var currentTraveler = new TravelerList();
    //     console.log(currentTraveler.fetch());
    //   }
    // });
    console.log(this.traveler);
    console.log(this.traveler.first());
    // var travelerId = ;
    var tripDetails = {
      location: location,
      event_name: eventName,
      details: details,
      start_date: startDate,
      end_date: endDate,
      event_paid: eventPaid,
      flight_paid: flightScheduled,
      hotel_reserved: hotelReserved,
      traveler_id: this.traveler.first().get("id")
    };
    // var newTrip = new Trip();
    // newTrip.url = "http://localhost:3000/trips";
    console.log("add trip button");
    var that = this;
    this.model.fetch( {
      headers: {'Authorization' : 'Bearer ' + localStorage.getItem("Authorization") },
      success: function() {
        console.log("successful authorization for adding a trip");
        // console.log(this.model);
        var newTrip = new Trip(tripDetails);
        newTrip.url = "http://localhost:3000/trips";
        // that.model.save(newTrip);
        newTrip.save(tripDetails, {
          success: function(data) {
            console.log("Trip created");
            that.$("#trip-form").hide();
            // that.$("#list-trips").empty();
            that.$("#list-trips").show();
          },
          error: function(data) {
            console.log("Trip did not save");
          }
        });
        // this.model.create(newTrip);
      },
      error: function() {
        console.log("Not authorized");
      }
    });
    // newTrip.save(tripDetails)
  },
  getAddTripForm: function() {
    console.log("inside getAddTripForm");
    this.$("#list-trips").empty();
    this.$("#trip-form").show();
    this.$("#trip-form").empty();

    var newTrip = new Trip();

    var tripForm = new AddTripFormView({
      model: newTrip,
      template: _.template($("#trip-form-template").html()),
      el: 'main'
    });
    // this.$("#trip-form").append(tripForm.render().$el);
    tripForm.render();
  }
});

export default TripListView;
