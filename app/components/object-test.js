import Ember from 'ember';
import Gestures from 'ember-cli-tuio/mixins/gestures';

const {
  Component
} = Ember;

export default Component.extend(Gestures, {
  classNames: ['object-test'],

  didInsertElement: function() {
    this.$().css({
      'top': this.get('object.clientY'),
      'left': this.get('object.clientX')
    });
  },

  actions: {
    easeIn: function() {
      this.sendAction('setTarget', 'easeIn');
    },

    easeOut: function() {
      this.sendAction('setTarget', 'easeOut');
    }
  }
});
