// import Backbone from 'backbone';
const Backbone = require('backbone');
import $ from 'jquery';
import _ from 'underscore';

import Trip from '../models/trip.js';
import TripList from '../collections/trip_list.js';

var travelerTrips = new TripList();
var AddTripFormView = Backbone.View.extend({
  initialize: function(params) {
    // this.collection = travelerTrips;
    // console.log(this.collection);
    this.model = params.model;
    console.log(this.model);
    this.template = params.template;
    this.listenTo(this.model, "update", this.render);
  },
  render: function() {
    console.log("Inside AddTripFormView render");
    console.log("!!!!!!!");
    var compiledTemplate = this.template(this.model.toJSON());
    this.$('#trip-form').html(compiledTemplate);
    return this;
  }
});

export default AddTripFormView;
