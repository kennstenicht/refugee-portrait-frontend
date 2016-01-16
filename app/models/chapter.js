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
  zoom: attr('number'),
  bearing: attr('number'),
  pitch: attr('number'),
  action: attr('string'),
  feeling: attr('string'),
  highlight: attr('boolean'),
  route: attr('array'),
  background: attr('string'),

  hotspots: hasMany('hotspot', { async: true }),
  story: belongsTo('story', { async: true }),

  unixDate: computed('date', function() {
    return moment(this.get('date')).format('X');
  }),

  excerpt: computed('description', function() {
    var text = this.get('description'),
      max_length = 200,
      suffix = (text && text.length > max_length) ? '...' : '';

    if (text) {
      return text.substring(0, max_length) + suffix;
    }
  }),
});
