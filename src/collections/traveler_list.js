// import Backbone from 'backbone';
const Backbone = require('backbone');


import Traveler from '../models/traveler.js';

var TravelerList = Backbone.Collection.extend({
  model: Traveler,
  url: 'https://route.triptrackerapi.com/travelers'
  // url: 'http://localhost:3000/travelers'
});

export default TravelerList;
