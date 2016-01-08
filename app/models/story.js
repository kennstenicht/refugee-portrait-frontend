import DS from 'ember-data';
import moment from 'moment';

const {
  attr,
  hasMany
} = DS;

const {
  computed
} = Ember;

export default DS.Model.extend({
  name: attr('string'),
  description: attr('string'),
  start: attr('date'),
  end: attr('date'),
  active: attr('boolean'),

  chapters: hasMany('chapter', { async: true })
});
