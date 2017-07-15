import Backbone from 'backbone';

import Traveler from '../models/traveler.js';

var TravelerList = Backbone.Collection.extend({
  model: Traveler,
  url: 'http://localhot:3000/travelers'
});

export default TravelerList;
