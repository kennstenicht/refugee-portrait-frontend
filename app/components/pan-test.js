import Ember from 'ember';
import Gestures from 'ember-cli-tuio/mixins/gestures';

const {
  Component,
  computed
} = Ember;

export default Component.extend(Gestures, {
  classNames: ['pan-test'],

  gestures: ['pan', 'panstart', 'panmove'],

  panstart: function() {
    this.set('startX', this.$().position().left);
    this.set('startY', this.$().position().top);
  },

  panmove: function(e) {
    this.$().css({
      top: this.get('startY') + e.gesture.deltaY,
      left: this.get('startX') + e.gesture.deltaX
    })
  }
});
