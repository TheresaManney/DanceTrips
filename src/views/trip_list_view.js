// import Backbone from 'backbone';
const Backbone = require('backbone');
import _ from 'underscore';
import $ from 'jquery';

import TripView from './trip_view.js';
import Trip from '../models/trip.js';
import TripList from '../collections/trip_list.js';
import AddTripFormView from './add_trip_form_view.js';

import MapView from './map_view.js';

var TripListView = Backbone.View.extend({
  initialize: function(params) {
    this.map = params.map;
    // this.model.on('add', this.addedTrip, this);
    this.$("#all-login").hide();
    $("#map").show();

    console.log(">>> Breadcrum #1");
    console.log(params);
    // console.log(params.model.traveler);
    this.template = params.template;
    this.detailsTemplate = params.deetTemplate;
    // console.log(params.template);
    // console.log(params.model);
    //
    // console.log(this);

    var that = this;

    var mapView = new MapView({
      model: that.model,
      map: that.map
    });
    // mapView.render();

    this.traveler = params.travelerList;

    this.listenTo(this.model, "update", this.render);

    this.listenTo(this.model, 'change', this.render);

    // this.listenTo(this.model, 'change', function(){
    //   console.log("test....");
    //   new MapView({
    //     model: that.model,
    //     map: that.map
    //   });
    // });

    this.$("#all-login").hide();
  },
  render: function() {
    this.$('#section-trip-form').hide();
    this.$('#list-trips').empty();
    console.log(">>> Breadcrum #2");
    var that = this;
    console.log(this.model.length);
    this.model.each(function(trip) {
      var tripView = new TripView({
        model: trip,
        template: that.template
      });
      that.listenTo(tripView, 'selected', that.tripDetails);
      that.$('#list-trips').append(tripView.render().el);
    });
    return this;
  },
  events: {
    'click #add-trip-button' : 'getAddTripForm',
    'click #submit-trip-button' : 'addTrip',
    'click #home' : 'allTrips',
    'click #logout' : 'logoutTraveler'
  },
  tripDetails: function(trip) {
    this.$('#list-trips').hide();
    this.$('#trip-info').show();
    console.log(this.$('#list-trips'));
    var showTripDetails = this.detailsTemplate(trip.attributes);
    console.log(showTripDetails);
    this.$('#trip-info').append(showTripDetails);
    console.log(this.$('#list-trips'));

  },
  addTrip: function(event) {
    event.preventDefault();
    this.$("#trip-form").show();
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

    console.log(this.traveler);
    console.log(this.traveler.first());

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

    console.log("add trip button");
    var that = this;
    this.model.fetch( {
      headers: {'Authorization' : 'Bearer ' + localStorage.getItem("Authorization") },
      success: function() {
        console.log("successful authorization for adding a trip");
        // console.log(this.model);
        var newTrip = new Trip(tripDetails);
        newTrip.url = "https://route.triptrackerapi.com/trips";
        // newTrip.url = 'http://localhost:3000/trips';
        newTrip.save(tripDetails, {
          success: function(data) {
            console.log("Trip created");

            that.allTrips();

            that.model.add(newTrip);

            new MapView({
              model: that.model,
              map: that.map
            });
          },
          error: function(data) {
            that.$("#section-trip-form").show();

            console.log("Trip did not save");
          }
        });
      },
      error: function() {
        console.log("Not authorized");
      }
    });
  },
  getAddTripForm: function() {
    console.log("inside getAddTripForm");
    this.$('#trip-info').empty();

    this.$("#list-trips").hide();
    this.$("#section-trip-form").show();
    this.$("#trip-form").show();
    this.$("#trip-form").empty();

    var newTrip = new Trip();

    var tripForm = new AddTripFormView({
      model: newTrip,
      template: _.template($("#trip-form-template").html()),
      el: 'body'
    });
    tripForm.render();
  },
  // addedTrip: function(trip) {
  //   console.log("hit addedTrip");
  //   var markerView = new MapView({map: this.map});
  // },
  allTrips: function() {
    console.log("clicked on home");
    console.log(this);
    this.$('#section-trip-form').hide();
    this.$('#trip-info').empty();

    console.log(this.$('#list-trips'));
    this.$('#list-trips').show();
  },
  logoutTraveler: function() {
    console.log("clicked logout button");
    window.location.reload();
  }
});

export default TripListView;
