import Backbone from 'backbone';
import _ from 'underscore';
import $ from 'jquery';

import Traveler from '../models/traveler.js';

var TravelerView = Backbone.View.extend({
  initialize: function(params) {
    this.template = params.template;
    this.listenTo(this.model, 'change', this.render);
  },
  events: {
    'click #login-btn' : 'returningTraveler',
    'click #signin-btn' : 'newTraveler'
  },
  returningTraveler: function() {
    event.preventDefault();
    console.log('returningTraveler clicked');
  },
  newTraveler: function() {
    event.preventDefault();
    console.log('newTraveler clicked');
  }
});

export default TravelerView;
