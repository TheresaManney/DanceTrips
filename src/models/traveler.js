import Backbone from 'backbone';

var Traveler = Backbone.Model.extend({
     defaults: {
       id: 0,
       first_name: '',
       last_name: '',
       email: '',
       password: ''
     },
});

export default Traveler;
