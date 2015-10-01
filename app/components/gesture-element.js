import Ember from 'ember';
import Gestures from 'ember-cli-tuio/mixins/gestures';

const {
  Component
} = Ember;

export default Component.extend(Gestures, {
  didInsertElement: function() {
    console.log(this.get('tap'));
  },

  tap: function() {
    this.sendAction('tap');
  },

  press: function() {
    this.sendAction('press');
  }
});
