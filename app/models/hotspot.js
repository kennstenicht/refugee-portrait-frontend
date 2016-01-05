import DS from 'ember-data';

const {
  Model,
  attr,
  belongsTo
} = DS;

export default Model.extend({
  title: attr('string'),
  description: attr('string'),
  image: attr('string'),
  video: attr('string'),
  type: attr('string'),

  chapter: belongsTo('chapter', { async: true })
});
