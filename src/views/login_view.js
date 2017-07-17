import Backbone from 'backbone';
import _ from 'underscore';
import $ from 'jquery';

import Login from '../models/login.js';
import Traveler from '../models/traveler.js';

const LoginView = Backbone.View.extend({
  initialize: function(params) {

    console.log('Initializing Login View');
    this.template = params.template;
    this.listenTo(this.model, "update", this.render);

  },
  render: function() {
    console.log("Inside LoginView render");
    console.log(this);
    // var that = this;
    // this.model.each(function(login) {
      // var loginView = new LoginView({
      //   model: login,
      //   template: that.template
      // });
      // console.log(login);
      // that.listenTo(loginView, "getLoginForm", that.getLoginForm);
    var compiledTemplate = this.template(this.model.toJSON());
    this.$el.html(compiledTemplate);
    return this;
    // });
  },
  events: {
    "click #loginButton" : "loginTraveler"
  },
  loginTraveler: function(event) {
    event.preventDefault();
    console.log("loginView, loginTraveler button");
    var loginEmail = this.$("#loginEmail").val();
    var loginPassword = this.$("#loginPassword").val();
    // console.log(loginEmail);
    // console.log(loginPassword);
    var formDetails = {
      auth: {
        email: loginEmail,
        password: loginPassword
      }
    };
    var loginTraveler = new Login();
    loginTraveler.url = "http://localhost:3000/traveler_token";
    loginTraveler.save(formDetails,  {
      success: function(data) {
        // console.log(loginTraveler);
        // console.log(loginTraveler.attributes.jwt);
        console.log("token created");
        // set localStorage
        window.localStorage.setItem("Authorization", loginTraveler.attributes.jwt);
        console.log(localStorage.getItem("Authorization"));

        // var backboneSync = Backbone.sync;
        // Backbone.sync = function(method, model, options) {
        //   options.headers = {
        //     'Authorization': 'Bearer ' + loginTraveler.attributes.jwt
        //   };
        //   backboneSync(method, model, options);
        //   console.log(backboneSync(method, model, options));
        // };
      },
      error: function(data) {
        console.log("token creation failed");
      }
    });
  },

});

export default LoginView;
