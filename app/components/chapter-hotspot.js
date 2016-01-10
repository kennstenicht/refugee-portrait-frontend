import Ember from 'ember';
import Gestures from 'ember-cli-tuio/mixins/gestures';

const {
  Component,
  computed
} = Ember;

export default Component.extend(Gestures, {
  classNames: ['chapter-hotspot'],

  gestures: ['tap'],

  recognizers: {
    pan: {direction: Hammer.DIRECTION_HORIZONTAL}
  },

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
