import $ from 'jquery';
import _ from 'underscore';

import Traveler from './models/traveler.js';
import TravelerList from './collections/traveler_list.js';
import TravelerView from './views/traveler_view.js';
import TravelerListView from './views/traveler_list_view.js';
import Login from './models/login.js';
import LoginView from './views/login_view.js';

var travelerList = new TravelerList();
var login = new Login();

$(document).ready(function() {
  // var travelerListView = new TravelerListView({
  //   model: travelerList,
  //   template: _.template($('#list-travelers-template').html()),
  //   el: 'main'
  // });
  // travelerListView.render();
  var loginView = new LoginView({
    model: login,
    template: _.template($('#login-form-template').html()),
    el: 'main'
  });
  loginView.render();
});
