import Ember from 'ember';
import Gestures from 'ember-cli-tuio/mixins/gestures';

const {
  Component
} = Ember;

export default Component.extend(Gestures, {
  classNames: ['chapter-hotspot'],

  // Gesture Settings
  gestures: ['tap'],

  recognizers: {
    pan: {direction: Hammer.DIRECTION_HORIZONTAL}
  },

  // Video.js settings
  setup: {
    controls: true,
    fluid: true
  },

  actions: {
    toggleHotspot: function () {
      this.$().parent().find('.chapter-hotspot__overlay').slideToggle(300);
    }
  }
});
