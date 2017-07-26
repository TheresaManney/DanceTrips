// import Backbone from 'backbone';
const Backbone = require('backbone');

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
  createTraveler: function(event) {
    event.preventDefault();
    console.log("inside createTraveler function");

    var formFirstName = this.$('#firstName').val();
    var formLastName = this.$('#lastName').val();
    var formEmail = this.$('#inputEmail').val();
    var formPassword = this.$('#signupPassword').val();
    var formPasswordConfirmation = this.$('#signupPasswordConfirmation').val();

    var travelerDetails = {
      traveler: {
        first_name: formFirstName,
        last_name: formLastName,
        email: formEmail,
        password: formPassword,
        password_confirmation: formPasswordConfirmation
      }
    };

    var that = this;
    var newTraveler = new Traveler(travelerDetails);
    newTraveler.url = "https://example-env.fqbb3r2ykh.us-west-2.elasticbeanstalk.com/travelers";
    newTraveler.save(travelerDetails, {
      success: function(data) {
        console.log(data);
        console.log("Traveler Created!");
        that.$("#sign-up").hide();
        $("#login-alert").removeClass("callout alert-callout-border alert");
        $("#login-alert").addClass("callout alert-callout-border success");
        $("#login-message").html("You have successfully signed up! Please login to begin tracking your trips.");
      },
      error: function(data) {
        console.log("Traveler did not save");
        $("#login-alert").removeClass("callout alert-callout-border success");
        $("#login-alert").addClass("callout alert-callout-border alert");
        $("#login-message").html("Sorry that email has already been taken. Please try login in or sign up with a different email.");
      }
    });
  }
});
export default SignupView;
