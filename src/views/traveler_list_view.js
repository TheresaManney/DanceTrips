import Backbone from 'backbone';
import _ from 'underscore';
import $ from 'jquery';

import TravelerView from './traveler_view.js';
import Traveler from '../models/traveler.js';
import TravelerList from '../collections/traveler_list.js';

var TravelerListView = Backbone.View.extend({
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
    this.model.each(function(traveler) {
      var travelerView = new TravelerView({
        model: traveler,
        template: that.template
      });
      that.$('#welcome-traveler').append(travelerView.render().el);
    });
    return this;
  }
});

export default TravelerListView;
