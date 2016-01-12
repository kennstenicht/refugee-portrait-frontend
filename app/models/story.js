import DS from 'ember-data';

const {
  attr,
  hasMany
} = DS;

export default DS.Model.extend({
  name: attr('string'),
  description: attr('string'),
  start: attr('date'),
  end: attr('date'),
  active: attr('boolean'),

  chapters: hasMany('chapter', { async: true }),
});
