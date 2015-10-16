import Ember from 'ember';
import Gestures from 'ember-cli-tuio/mixins/gestures';
import animationIf from '../mixins/animation-if';

const {
  Component
} = Ember;

export default Component.extend(Gestures, animationIf, {
  classNames: ['chapter-content'],

  gestures: ['pan', 'panleft', 'press', 'pressup'],

  recognizers: {
    pan: {direction: Hammer.DIRECTION_HORIZONTAL}
  },

  panleft: function () {
    this.sendAction('closeChapter');
  },

  press: function () {
    console.log('press');
  },

  pressup: function () {
    console.log('up');
  }
});
