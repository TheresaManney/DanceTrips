import Backbone from 'backbone';
import _ from 'underscore';
import $ from 'jquery';

import TravelerView from './traveler_view.js';
import Traveler from '../models/traveler.js';
import TravelerList from '../collections/traveler_list.js';

var TravelerListView = Backbone.View.extend({
  initialize: function(params) {
    console.log(">>> Breadcurm #1");
    this.template = params.template;
    this.listenTo(this.model, "update", this.render);
  },
  render: function() {
    var that = this;
    this.model.each(function(traveler) {
      var travelerview = new TravelerView({
        model: traveler,
        template: that.template
      });
      that.$('list-travelers').append(travelerView.render().$el);
    });
    return this;
  }
});
 
export default TravelerListView;
