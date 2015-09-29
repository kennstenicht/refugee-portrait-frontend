import Ember from 'ember';
import Gestures from 'ember-cli-tuio/mixins/gestures';
import animationIf from '../mixins/animation-if';

const {
  Component,
  run: {
    later
  }
} = Ember;

export default Component.extend(Gestures, animationIf, {
  classNames: ['preview-test'],

  gestures: ['tap', 'press', 'pressup', 'pan', 'pandown'],

  recognizers: {
    tap: {threshold: 30},
    press: {threshold: 30},
    pan: {threshold: 40}
  },

  // Animated If's
  previewIn: function(speed) {
    this.$().find('.preview-test__background').fadeIn(speed);
    this.$().find('.preview-test__content').slideDown(speed);
    this.$().find('.preview-test__trigger').slideDown(speed);
    this.$().find('.preview-test__button').addClass('active');
  },

  previewOut: function(speed) {
    this.$().find('.preview-test__background').fadeOut(speed);
    this.$().find('.preview-test__content').slideUp(speed);
    this.$().find('.preview-test__trigger').slideUp(speed);
    this.$().find('.preview-test__button').removeClass('active');
  },

  hintIn: function(speed) {
    this.$().find('.preview-test__hint').fadeIn(speed);
    later(this, function() {
      this.animationOut('hint', 200, 800);
    }, speed);
  },

  hintOut: function(speed) {
    this.$().find('.preview-test__hint').fadeOut(speed);
  },

  // Gestures
  tap: function() {
    this.animationIn('hint', 200);
  },

  press: function() {
    this.animationIn('preview', 300);
  },

  pressup: function() {
    this.animationOut('preview', 300);
  },

  pandown: function() {
    this.animationOut('preview', 300);
    this.sendAction('setTarget', this.get('target'));
  }
});
