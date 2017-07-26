// import Backbone from 'backbone';
const Backbone = require('backbone');

import Trip from '../models/competition.js';

var CompetitionList = Backbone.Collection.extend({
  model: Competition,
  url: 'http://example-env.fqbb3r2ykh.us-west-2.elasticbeanstalk.com/competitions'
});

export default CompetitionList;
