import Ember from 'ember';
import Gestures from 'ember-cli-tuio/mixins/gestures';

const {
  Component
} = Ember;

export default Component.extend(Gestures, {
  classNames: ['tap-wrapper'],

  // Gesture Settings
  gestures: ['tap'],

  recognizers: {
    tap: {threshold: 20}
  },

  tap: function (e) {
    this.sendAction('callback');
    e.stopPropagation();
  }
});
