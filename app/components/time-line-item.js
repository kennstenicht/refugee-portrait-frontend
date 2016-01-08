import Ember from 'ember';
import Gestures from 'ember-cli-tuio/mixins/gestures';

const {
  Component,
  inject,
  computed
} = Ember;

export default Component.extend(Gestures, {
  classNames: ['time-line-item'],
  classNameBindings: ['modifierHighlight'],

  // BEM modifier
  modifierHighlight: computed('chapter.highlight', function() {
    if( this.get('chapter.highlight') ) {
      return 'time-line-item--highlight';
    }
  }),

  gestures: ['tap'],

  recognizers: {
    tap: {threshold: 10},
  },

  targeting: inject.service('targeting'),

  tap: function () {
    this.get('targeting').setChapter(this.get('chapter'));
  }
});
