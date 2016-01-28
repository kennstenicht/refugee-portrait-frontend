import Ember from 'ember';
import Gestures from 'ember-cli-tuio/mixins/gestures';

const {
  Component,
  inject,
  computed
} = Ember;

export default Component.extend(Gestures, {
  classNames: ['time-line-item'],
  classNameBindings: ['modifierHighlight', 'modifierActive', 'modifierSize', 'modifierVisible'],

  // BEM modifier
  modifierHighlight: computed('chapter.highlight', function() {
    if( this.get('chapter.highlight') ) {
      return 'time-line-item--highlight';
    }
  }),

  modifierActive: computed('current', function() {
    if( this.get('current') ) {
      return 'time-line-item--current';
    }
  }),

  modifierSize: computed('size', function () {
    if( this.get('size') === 'big' ) {
      return 'time-line-item--big';
    }
  }),

  modifierVisible: computed('active', function () {
    if(!this.get('active')) {
      return 'time-line-item--hidden';
    }
  }),

  // Gesture Settings
  gestures: ['tap', 'press', 'pressup'],

  recognizers: {
    tap: {threshold: 20},
    press: {threshold: 20},
  },

  // Targeting Service
  targeting: inject.service('targeting'),

  current: computed('targeting.currentChapter', function () {
    return this.get('chapter') === this.get('targeting.currentChapter');
  }),

  active: computed('chapter.id', 'targeting.routeChapters.@each.properties.id', function () {
    return this.get('targeting.routeChapters').findBy('properties.id', this.get('chapter.id')) ? true : false;
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
