import Backbone from 'backbone';

import Trip from '../models/trip.js';

var TripList = Backbone.Collection.extend({
  model: Trip,
  url: 'http://localhost:3000/trips'
});

export default TripList;
