import Backbone from 'backbone';
import _ from 'underscore';
import $ from 'jquery';

import Traveler from '../models/traveler.js';
import TravelerList from '../collections/traveler_list.js';
import TravelerListView from './traveler_list_view.js';

// might need login form to render after signing up

const SignupView = Backbone.View.extend({
  initialize: function(params) {
    console.log('Initializing Signup View');
    this.template = params.template;
    this.listenTo(this.model, "update", this.render);
  },
  render: function() {
    console.log("Inside SignupView render");
    console.log(this);

    var compiledTemplate = this.template(this.model.toJSON());
    this.$('#signup-form').html(compiledTemplate);
    return this;
  },
  events: {
    "click #signupButton" : "createTraveler"
  },
  createTraveler: function() {
    
  }
});
export default SignupView;
