// import Backbone from 'backbone';
const Backbone = require('backbone');


import Traveler from '../models/traveler.js';

var TravelerList = Backbone.Collection.extend({
  model: Traveler,
  url: 'http://example-env.fqbb3r2ykh.us-west-2.elasticbeanstalk.com/travelers'
});

export default TravelerList;
