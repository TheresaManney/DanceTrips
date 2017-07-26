// import Backbone from 'backbone';
const Backbone = require('backbone');

var Traveler = Backbone.Model.extend({
  defaults: {
    first_name: '',
    last_name: '',
    email: ''
    // password: ''
  }
});

export default Traveler;
