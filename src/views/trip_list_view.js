import Backbone from 'backbone';
import _ from 'underscore';
import $ from 'jquery';

import TripView from './trip_view.js';
import Trip from '../models/trip.js';
import TripList from '../collections/trip_list.js';
import AddTripFormView from './add_trip_form_view.js';

var TripListView = Backbone.View.extend({
  initialize: function(params) {
    console.log(">>> Breadcrum #1");
    console.log(params);
    this.template = params.template;
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
      that.$('#list-trips').append(tripView.render().$el);
    });
    return this;
    var addTrip = new AddTripFormView

  },
  events: {
    'click #add-trip-button' : 'getAddTripForm'
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

    var location = this.$('#tripLocation').val();
    var eventName = this.$('#eventName').val();
    var details = this.$('#tripDetails').val();
    var startDate = this.$('#tripStartDate').val();
    var endDate = this.$('#tripEndDate').val();
    var eventPaid = this.$('#eventPaid').val();
    var flightScheduled = this.$('#flightScheduled').val();
    var hotelReserved = this.$('#hotelReserved').val();
    var tripDetails = {
      location: location,
      event_name: eventName,
      details: details,
      start_date: startDate,
      end_date: endDate,
      event_paid: eventPaid,
      flight_paid: flightScheduled,
      hotel_reserved: hotelReserved
    };
    var newTrip = new Trip();
    newTrip.url = "http://localhost:3000/trips";
    console.log("add trip button");
    newTrip.fetch( {
      headers: {'Authorization' : 'Bearer ' + localStorage.getItem("Authorization") },
      success: function() {
        // var newTrip = new Trip(this.getFormData());
        // newTrip.url = "http://localhost:3000/trips";
        // this.model.create(newTrip);
        console.log("successful authorization for adding a trip");
      },
      error: function() {
        console.log("Not authorized");
      }
    });
    // newTrip.save(tripDetails)
  },
  getAddTripForm: function() {
    console.log("inside getAddTripForm");
    this.$("#list-trips").hide();
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
