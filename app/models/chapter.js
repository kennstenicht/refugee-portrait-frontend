import DS from 'ember-data';

const {
  Model,
  attr,
  belongsTo,
  hasMany
} = DS;

export default Model.extend({
  number: attr('number'),
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

  hotspots: hasMany('hotspot', { async: true }),
  story: belongsTo('story', { async: true })
});
