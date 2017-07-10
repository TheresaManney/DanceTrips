// collection - travelers.js
import Backbone from 'backbone';

import Traveler from '../models/traveler.js';

var Travelers = Backbone.Collection.extend({
  model: Traveler,
  url: 'http://localhost:3000/travelers'
});

export default Travelers;
