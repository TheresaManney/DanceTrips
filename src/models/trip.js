import Backbone from 'backbone';

var Trip = Backbone.Model.extend({
  defaults: {
    location: '',
    event_paid: '',
    hotel_reserved: false,
    flight_paid: false,
    details: '',
    event_name: '',
    start_date: '',
    ende_date: ''
  }
});

export default Trip;
