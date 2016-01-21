import DS from 'ember-data';
import Ember from 'ember';

const {
  Model,
  attr,
  hasMany
} = DS;

const {
  computed
} = Ember;

export default Model.extend({
  title: attr('string'),
  description: attr('string'),
  start: attr('date'),
  end: attr('date'),
  active: attr('boolean'),

  chapters: hasMany('chapter', { async: true }),

  sortProperties: ['number:asc'],
  sortedChapters: computed.sort('chapters', 'sortProperties')
});
