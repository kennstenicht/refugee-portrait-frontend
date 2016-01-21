import Ember from 'ember';
import Gestures from 'ember-cli-tuio/mixins/gestures';

const {
  Component,
  inject,
  computed
} = Ember;

export default Component.extend(Gestures, {
  classNames: ['time-line-item'],
  classNameBindings: ['modifierHighlight', 'modifierActive', 'modifierSize'],

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

  modifierSize: computed('size', function () {
    if( this.get('size') === 'big' ) {
      return 'time-line-item--big';
    }
  }),

  // Gesture Settings
  gestures: ['tap', 'press', 'pressup'],

  recognizers: {
    tap: {threshold: 10},
    press: {threshold: 20},
  },

  // Targeting Service
  targeting: inject.service('targeting'),

  active: computed('targeting.currentChapter', function () {
    return this.get('chapter') === this.get('targeting.currentChapter');
  }),

  // Gesture Events
  tap: function () {
    this.get('targeting').setChapter(this.get('chapter'));
  },

  press: function () {
    this.get('targeting').setPreview(this.get('chapter'));
  },

  pressup: function () {
    this.get('targeting').closePreview();
  }
});
