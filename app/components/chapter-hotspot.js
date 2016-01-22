import Ember from 'ember';
import Gestures from 'ember-cli-tuio/mixins/gestures';

const {
  Component,
  computed
} = Ember;

export default Component.extend(Gestures, {
  classNames: ['chapter-hotspot'],
  classNameBindings: ['modifierType', 'modifierNumber', 'modifierOpen'],

  // BEM modifier
  modifierNumber: computed('number', function () {
    return 'chapter-hotspot--' + this.get('number');
  }),

  modifierType: computed('hotspot.type', function () {
    return 'chapter-hotspot--' + this.get('hotspot.type');
  }),

  modifierOpen: computed('open', function () {
    if(this.get('open')) {
      return 'chapter-hotspot--open';
    }
  }),

  // Gesture Settings
  gestures: ['tap', 'pinch', 'pinchin'],

  recognizers: {
    pan: {direction: Hammer.DIRECTION_HORIZONTAL}
  },

  // Video.js settings
  setup: {
    controls: true,
    fluid: true,
  },

  pinchin: function () {
    this.set('open', false);
  },

  actions: {
    toggleHotspot: function () {
      this.toggleProperty('open');
    }
  }
});
