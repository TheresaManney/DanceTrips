const Backbone = require('backbone');


import Trip from '../models/trip.js';

var TripList = Backbone.Collection.extend({
  model: Trip,
  url: 'https://route.triptrackerapi.com/trips'
});

export default TripList;
