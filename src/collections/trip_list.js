const Backbone = require('backbone');


import Trip from '../models/trip.js';

var TripList = Backbone.Collection.extend({
  model: Trip,
  url: 'https://example-env.fqbb3r2ykh.us-west-2.elasticbeanstalk.com/trips'
});

export default TripList;
