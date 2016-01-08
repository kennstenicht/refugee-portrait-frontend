import DS from 'ember-data';
import Ember from 'ember';
import moment from 'moment';

const {
  Model,
  attr,
  belongsTo,
  hasMany
} = DS;

const {
  computed
} = Ember;

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
  highlight: attr('boolean'),

  hotspots: hasMany('hotspot', { async: true }),
  story: belongsTo('story', { async: true }),

  unixDate: computed('date', function() {
    return moment(this.get('date')).format('X');
  })
});
