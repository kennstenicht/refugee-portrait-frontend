import Ember from 'ember';
import Gestures from 'ember-cli-tuio/mixins/gestures';

const {
  Component,
  inject,
  computed,
  on
} = Ember;

export default Component.extend(Gestures, {
  classNames: ['time-line-item'],
  classNameBindings: ['modifierHighlight', 'modifierActive'],

  // BEM modifier
  modifierHighlight: computed('chapter.highlight', function() {
    if( this.get('chapter.highlight') ) {
      return 'time-line-item--highlight';
    }
  }),

  modifierActive: computed('active', function() {
    if( this.get('active') ) {
      return 'time-line-item--active';
    }
  }),

  // Gesture Settings
  gestures: ['tap', 'press', 'pressup'],

  recognizers: {
    tap: {threshold: 10},
  },

  // Targeting Service
  targeting: inject.service('targeting'),

  active: computed('targeting.currentChapter', function () {
    if(this.get('chapter') === this.get('targeting.currentChapter')) {
      return true;
    }
  }),

  // Gesture Events
  tap: function () {
    this.get('targeting').setChapter(this.get('chapter'));
  },

  press: function () {
    this.get('targeting').setPreview(this.get('chapter'));
  },

  pressUp: function () {
    this.get('targeting').setPreview(null);
  }
});
