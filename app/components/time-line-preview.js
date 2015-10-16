import Ember from 'ember';
import Gestures from 'ember-cli-tuio/mixins/gestures';
import animationIf from '../mixins/animation-if';

const {
  Component,
  $,
  observer,
  on,
  computed,
  run: {
    later
  }
} = Ember;

export default Component.extend(Gestures, animationIf, {
  classNames: ['time-line-preview'],
  classNameBindings: ['previewModifier'],

  previewModifier: computed('preview', function () {
    if(this.get('preview')) {
      return 'time-line-preview--active';
    }
  }),

  gestures: ['tap', 'press', 'pressup', 'pan', 'pandown'],

  recognizers: {
    tap: {threshold: 10},
    press: {threshold: 10},
    pan: {direction: Hammer.DIRECTION_ALL, threshold: 30}
  },

  targeting: Ember.inject.service('targeting'),

  setContainerPosition: on('tap', 'press', 'pan', function () {
    $('#time-line-preview').css({
      left: this.$().offset().left + ( this.$().width() / 2 ),
      top: this.$().offset().top
    });
  }),

  // Animated If's
  previewIn: function(speed) {
    $('.time-line-preview__background').fadeIn(speed);
    $('.time-line-preview__content').slideDown(speed);
    $('.time-line-preview__trigger').slideDown(speed);
    this.$('.time-line-preview__button').addClass('active');
  },

  previewOut: function(speed) {
    $('.time-line-preview__background').fadeOut(speed);
    $('.time-line-preview__content').slideUp(speed);
    $('.time-line-preview__trigger').slideUp(speed);
    this.$('.time-line-preview__button').removeClass('active');
  },

  hintIn: function(speed) {
    $('.time-line-preview__hint').fadeIn(speed);
    later(this, function() {
      this.animationOut('hint', 200, 800);
    }, speed);
  },

  hintOut: function(speed) {
    $('.time-line-preview__hint').fadeOut(speed);
  },

  // Gestures
  tap: function() {
    this.animationIn('hint', 200);
  },

  press: function(e) {
    this.animationIn('preview', 300);
  },

  pressup: function() {
    console.log('up');
    this.animationOut('preview', 300);
  },

  pan: function () {
    this.animationOut('preview', 300);
  },

  pandown: function() {
    this.get('targeting').setTarget(this.get('chapter'));
  }
});
