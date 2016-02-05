import Ember from 'ember';
import Gestures from 'ember-cli-tuio/mixins/gestures';

const {
  Component,
  inject
} = Ember;

export default Component.extend(Gestures, {
  classNames: ['chapter-close'],

  // Gesture Settings
  gestures: ['tap'],

  recognizers: {
    tap: {threshold: 20}
  },

  // Targeting Service
  targeting: inject.service('targeting'),

  didInsertElement: function () {
    this.$().css({
      top: this.get('closeHintPos.y') + "px",
      left: this.get('closeHintPos.x') + "px"
    });
  },

  tap: function () {
    this.get('targeting').backToStory();
  }
});
