import Ember from 'ember';
import Gestures from 'ember-cli-tuio/mixins/gestures';

const {
  Component,
  computed
} = Ember;

export default Component.extend(Gestures, {
  classNames: ['gesture-test'],
  classNameBindings: ['modifierOpen'],

  modifierOpen: computed('isOpen', function() {
    if(this.get('isOpen')) {
      return "gesture-test--is-open";
    }
  }),

  gestures: ['tap', 'swipe', 'swipeup', 'swipedown'],

  recognizers: {
    tap: {threshold: 20},
    swipe: {direction: Hammer.DIRECTION_ALL}
  },

  tap: function() {
    this.set('isOpen', true);
  },

  swipedown: function() {
    this.set('isOpen', true);
  },

  swipeup: function(e) {
    this.set('isOpen', false);
  },

  actions: {
    close: function() {
      this.set('isOpen', false);
    }
  }
});
