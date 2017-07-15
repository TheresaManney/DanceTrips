import Backbone from 'backbone';

var Traveler = Backbone.Model.extend({
  defaults: {
    first_name: '',
    last_name: '',
    email: ''
    // password: ''
  },
  url: function() {
   return 'http://localhost:3000/travelers';
  }
});

export default Traveler;
