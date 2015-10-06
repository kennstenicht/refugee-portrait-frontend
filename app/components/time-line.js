import Ember from 'ember';
import Gestures from 'ember-cli-tuio/mixins/gestures';

const {
  Component,
  observer
} = Ember;

export default Component.extend(Gestures, {
  classNames: ['time-line'],

  gestures: ['pan', 'panstart', 'panmove', 'pinch', 'pinchstart', 'pinchmove', 'pinchout', 'pinchin'],

  recognizers: {
    pan: {threshold: 40, direction: Hammer.DIRECTION_HORIZONTAL},
    pinch: {enable: true}
  },

  zoomStep: 50,

  setStartValues: function() {
    let $slider = this.$().find('.time-line__slider');

    this.set('startPos', $slider.position().left );
    this.set('startWidth', $slider.width() );
  },

  setPosition: observer('position', function () {
    this.$().find('.time-line__slider').css({
      left: this.get('position'),
    });
  }),

  // Gestures
  panstart: function() {
    this.setStartValues();
  },

  panmove: function(e) {
    let newPosition = this.get('startPos') + e.gesture.deltaX;

    this.set('position', newPosition);
  },

  // pinchstart: function () {
  //   this.setStartValues();
  // },
  //
  // pinchout: function (e) {
  //   let pinchLeftRelative = e.gesture.center.x / this.$().innerWidth();
  //
  //   this.$().find('.time-line__slider').css({
  //     left: "-=" + ( this.get('zoomStep') * pinchLeftRelative ),
  //     width: "+=" + this.get('zoomStep')
  //   });
  // },
  //
  // pinchin: function (e) {
  //   let pinchLeftRelative = e.gesture.center.x / $(window).innerWidth();
  //
  //   this.$().find('.time-line__slider').css({
  //     left: "+=" + ( this.get('zoomStep') * pinchLeftRelative ),
  //     width: "-=" + this.get('zoomStep')
  //   });
  // },



  // pinchstart: function(e) {
  //   this.setStartValues();
  // },
  //
  // pinchmove: function(e) {
  //   let pinchLeftRelative = e.gesture.center.x / $(window).innerWidth(),
  //     pinchDistance = e.gesture.distance * 10;
  //
  //   this.$().find('.time-line__slider').css({
  //     left: this.get('startPos') - ( pinchDistance * pinchLeftRelative ),
  //     width: this.get('startWidth') + pinchDistance
  //   });
  // }
});
