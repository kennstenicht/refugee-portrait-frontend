import Ember from 'ember';
import Gestures from 'ember-cli-tuio/mixins/gestures';

const {
  Component,
  $,
  run: {
    later
  }
} = Ember;

export default Component.extend(Gestures, {
  classNames: ['time-line'],

  gestures: ['pan', 'panstart', 'panmove', 'pinch', 'pinchstart', 'pinchmove'],

  recognizers: {
    pan: {threshold: 40, direction: Hammer.DIRECTION_HORIZONTAL},
    pinch: {enable: true}
  },

  startPos: 0,
  startWidth: 3000,

  setStartValues: function() {
    let $slider = this.$().find('.time-line__slider');

    this.set('startPos', $slider.position().left );
    this.set('startWidth', $slider.width() );
  },


  // Gestures
  panstart: function() {
    this.setStartValues();
  },

  panmove: function(e) {
    this.$().find('.time-line__slider').css({
      left: this.get('startPos') + e.gesture.deltaX,
    });
  },

  pinchstart: function(e) {
    this.setStartValues();
  },

  pinchmove: function(e) {
    let pinchLeftRelative = e.gesture.center.x / $(window).innerWidth(),
      pinchDistance = e.gesture.distance * 10;

      console.log(e.gesture);
    this.$().find('.time-line__slider').css({
      left: this.get('startPos') - ( pinchDistance * pinchLeftRelative ),
      width: this.get('startWidth') + pinchDistance
    });
  }
});
