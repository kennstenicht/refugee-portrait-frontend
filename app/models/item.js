import DS from 'ember-data';

const {
  attr,
  belongsTo
} = DS;

export default DS.Model.extend({
  title: attr('string'),
  description: attr('string'),
  date: attr('utc'),
  location: attr('string'),
  lat: attr('number'),
  lng: attr('number'),
  accuracy: attr('number'),
  action: attr('string'),
  feeling: attr('string'),
  type: attr('string'),

  timeline: belongsTo('timeline', { async: true })
});
