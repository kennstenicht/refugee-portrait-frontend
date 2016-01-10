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

  chapters: hasMany('chapter', { async: true }),

  sortedComments: computed.sort('chapters', 'commentsSorting'),
  chaptersSorting: ['sortChapter:desc'],
  sortChapter: computed('number', function() {
    if (!this.get('number')) { return 0; }

    return this.get('number');
  }),
});
