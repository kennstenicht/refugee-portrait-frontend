import DS from 'ember-data';

const {
  Model,
  attr,
  belongsTo
} = DS;

const {
  computed
} = Ember;

export default Model.extend({
  title: attr('string'),
  description: attr('string'),
  image: attr('string'),
  video: attr('string'),
  audio: attr('string'),
  type: attr('string'),
  source: attr('string'),
  secondary: attr('boolean'),

  chapter: belongsTo('chapter', { async: true }),

  sourceExcerpt: computed('source', function() {
    var text = this.get('source'),
      max_length = 25,
      suffix = (text && text.length > max_length) ? '...' : '';

    if (text) {
      return text.substring(0, max_length) + suffix;
    }
  }),
});
