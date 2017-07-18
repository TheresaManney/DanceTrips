import Backbone from 'backbone';

import Traveler from '../models/traveler.js';

var TravelerList = Backbone.Collection.extend({
  model: Traveler,
  url: 'http://localhost:3000/trips'
});

export default TravelerList;
