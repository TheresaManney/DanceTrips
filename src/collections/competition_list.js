import Backbone from 'backbone';

import Trip from '../models/competition.js';

var CompetitionList = Backbone.Collection.extend({
  model: Competition,
  url: 'http://localhost:3000/competitions'
});

export default CompetitionList;
