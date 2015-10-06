import DS from 'ember-data';

const {
  attr,
  belongsTo
} = DS;

export default DS.Model.extend({
  title: attr('string'),
  description: attr('string'),
  date: attr('date'),
  location: attr('string'),
  lat: attr('number'),
  lng: attr('number'),
  accuracy: attr('number'),
  action: attr('string'),
  feeling: attr('string'),
  type: attr('string'),

  story: belongsTo('story', { async: true })
});
