// import Backbone from 'backbone';
const Backbone = require('backbone');
import _ from 'underscore';
import $ from 'jquery';

import Traveler from '../models/traveler.js';
import TravelerListView from './traveler_list_view.js';

var TravelerView = Backbone.View.extend({
  initialize: function(params) {
    this.template = params.template;
    this.listenTo(this.model, 'change', this.render);
  },
  render: function() {
    var compiledTemplate = this.template(this.model.toJSON());
    this.$el.html(compiledTemplate);
    return this;
  }
});

export default TravelerView;
