import Backbone from 'backbone';
import _ from 'underscore';
import $ from 'jquery';

import TripView from './trip_view.js';
import Trip from '../models/trip.js';
import TripList from '../collections/trip_list.js';

var TripListView = Backbone.View.extend({
  initialize: function(params) {
    console.log(">>> Breadcrum #1");
    console.log(params);
    this.template = params.template;
    this.listenTo(this.model, "update", this.render);
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
  }
});

export default TripListView;
