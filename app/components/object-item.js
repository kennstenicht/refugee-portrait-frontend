import Ember from 'ember';
import Gestures from 'ember-cli-tuio/mixins/gestures';

const {
  Component,
  observer
} = Ember;

export default Component.extend(Gestures, {
  classNames: ['object-item'],

  setPosition: observer('object.{pageX,pageY}', function () {
    this.$().css({
      'top': this.get('object.pageY'),
      'left': this.get('object.pageX')
    });
  }),

  actions: {
    easeIn: function() {
      console.log('easeIn');
      this.sendAction('setTarget', 'easeIn');
      // TODO include service
    },

    easeOut: function() {
      this.sendAction('setTarget', 'easeOut');
    }
  }
});
