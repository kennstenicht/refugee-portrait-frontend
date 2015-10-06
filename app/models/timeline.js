import DS from 'ember-data';

const {
  attr,
  hasMany
} = DS;

export default DS.Model.extend({
  name: attr('string'),
  description: attr('string'),
  start: attr('utc'),
  end: attr('utc'),

  items: hasMany('item', { async: true })
});
