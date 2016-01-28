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

  // Variables
  open: false,

  // Gesture Settings
  gestures: ['tap'],

  recognizers: {
    tap: {threshold: 20}
  },


  // Video.js settings
  setup: {
    controls: true,
    fluid: true,
  },

  // Gesture Events
  // pinchin: function () {
  //   this.set('open', false);
  // },
  //
  // tap: function (e) {
  //   this.toggleProperty('open');
  //   e.stopPropagation();
  // },

  actions: {
    openHotspot: function () {
      this.set('open', true);
    },

    closeHotspot: function () {
      this.set('open', false);
    }
  }
});
