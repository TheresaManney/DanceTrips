// import Backbone from 'backbone';
const Backbone = require('backbone');

import Competition from '../models/competition.js';

var CompetitionList = Backbone.Collection.extend({
  model: Competition,
  url: 'https://route.triptrackerapi.com/competitions'
});

export default CompetitionList;
