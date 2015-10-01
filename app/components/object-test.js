import Ember from 'ember';

const {
  Component
} = Ember;

export default Component.extend({
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
