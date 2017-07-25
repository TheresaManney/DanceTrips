import Backbone from 'backbone';
import _ from 'underscore';
import $ from 'jquery';

import Trip from '../models/trip.js';
import TripListView from './trip_list_view.js';

var TripView = Backbone.View.extend({
  initialize: function(params) {
    this.template = params.template;
    this.listenTo(this.model, 'change', this.render);
  },
  render: function() {
    var compiledTemplate = this.template(this.model.toJSON());
    this.$el.html(compiledTemplate);
    return this;
  },
  events: {
    'click .trip' : 'onClick'
  },
  onClick: function() {
    var click = this.trigger('selected', this.model);
    console.log('click', click);

  }
});

export default TripView;
