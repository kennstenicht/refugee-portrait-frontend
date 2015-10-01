import Ember from 'ember';
import Gestures from 'ember-cli-tuio/mixins/gestures';

const {
  Component
} = Ember;

export default Component.extend(Gestures, {
  gestures: ['tap', 'press'],

  recognizers: {
    tap: {threshold: 30},
    press: {threshold: 30}
  },

  click: function() {
    console.log('click');
  },

  tap: function() {
    console.log('tap');
  }
});
